import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";

export interface ProjectSignals {
  languages: string[];
  frameworks: string[];
  buildTools: string[];
  testFrameworks: string[];
  packageManager: string | null;
  hasDocker: boolean;
  hasCI: boolean;
  ciPlatform: string | null;
  hasMono: boolean;
  projectName: string | null;
  projectDescription: string | null;
  entryPoints: string[];
  keyDirectories: string[];
  existingClaudeMd: string | null;
  detectedType: ProjectType;
}

export type ProjectType =
  | "web-app"
  | "api"
  | "cli"
  | "library"
  | "mobile"
  | "data-pipeline"
  | "monorepo"
  | "static-site"
  | "unknown";

interface FileCheck {
  file: string;
  signals: Partial<ProjectSignals>;
  parse?: (content: string) => Partial<ProjectSignals>;
}

const FILE_CHECKS: FileCheck[] = [
  // JavaScript / TypeScript ecosystem
  {
    file: "package.json",
    signals: { languages: ["JavaScript"] },
    parse: (content) => {
      try {
        const pkg = JSON.parse(content);
        const signals: Partial<ProjectSignals> = {
          projectName: pkg.name,
          projectDescription: pkg.description,
        };

        const allDeps = {
          ...(pkg.dependencies || {}),
          ...(pkg.devDependencies || {}),
        };
        const depNames = Object.keys(allDeps);

        // Language
        if (depNames.includes("typescript") || pkg.types || pkg.typings) {
          signals.languages = ["TypeScript"];
        }

        // Frameworks
        const frameworks: string[] = [];
        if (depNames.includes("next")) frameworks.push("Next.js");
        if (depNames.includes("react") && !depNames.includes("next"))
          frameworks.push("React");
        if (depNames.includes("vue")) frameworks.push("Vue");
        if (depNames.includes("svelte") || depNames.includes("@sveltejs/kit"))
          frameworks.push("Svelte");
        if (depNames.includes("express")) frameworks.push("Express");
        if (depNames.includes("fastify")) frameworks.push("Fastify");
        if (depNames.includes("hono")) frameworks.push("Hono");
        if (depNames.includes("astro")) frameworks.push("Astro");
        if (depNames.includes("nuxt")) frameworks.push("Nuxt");
        if (depNames.includes("remix") || depNames.includes("@remix-run/node"))
          frameworks.push("Remix");
        if (depNames.includes("electron")) frameworks.push("Electron");
        if (depNames.includes("react-native")) frameworks.push("React Native");
        if (depNames.includes("expo")) frameworks.push("Expo");
        if (depNames.includes("@nestjs/core")) frameworks.push("NestJS");
        if (depNames.includes("@angular/core")) frameworks.push("Angular");
        if (signals.frameworks) signals.frameworks.push(...frameworks);
        else signals.frameworks = frameworks;

        // Test frameworks
        const testFrameworks: string[] = [];
        if (depNames.includes("vitest")) testFrameworks.push("Vitest");
        if (depNames.includes("jest")) testFrameworks.push("Jest");
        if (depNames.includes("mocha")) testFrameworks.push("Mocha");
        if (depNames.includes("playwright") || depNames.includes("@playwright/test"))
          testFrameworks.push("Playwright");
        if (depNames.includes("cypress")) testFrameworks.push("Cypress");
        if (testFrameworks.length) signals.testFrameworks = testFrameworks;

        // Build tools
        const buildTools: string[] = [];
        if (depNames.includes("vite")) buildTools.push("Vite");
        if (depNames.includes("webpack")) buildTools.push("Webpack");
        if (depNames.includes("esbuild")) buildTools.push("esbuild");
        if (depNames.includes("rollup")) buildTools.push("Rollup");
        if (depNames.includes("turbo") || depNames.includes("turbopack"))
          buildTools.push("Turborepo");
        if (depNames.includes("tsup")) buildTools.push("tsup");
        if (buildTools.length) signals.buildTools = buildTools;

        // Package manager
        if (pkg.packageManager) {
          if (pkg.packageManager.startsWith("pnpm"))
            signals.packageManager = "pnpm";
          else if (pkg.packageManager.startsWith("yarn"))
            signals.packageManager = "yarn";
          else if (pkg.packageManager.startsWith("bun"))
            signals.packageManager = "bun";
        }

        return signals;
      } catch {
        return {};
      }
    },
  },
  {
    file: "pnpm-lock.yaml",
    signals: { packageManager: "pnpm" },
  },
  {
    file: "yarn.lock",
    signals: { packageManager: "yarn" },
  },
  {
    file: "bun.lockb",
    signals: { packageManager: "bun" },
  },
  {
    file: "package-lock.json",
    signals: { packageManager: "npm" },
  },
  {
    file: "tsconfig.json",
    signals: { languages: ["TypeScript"] },
  },

  // Python
  {
    file: "pyproject.toml",
    signals: { languages: ["Python"] },
    parse: (content) => {
      const signals: Partial<ProjectSignals> = {};
      const frameworks: string[] = [];
      if (content.includes("django")) frameworks.push("Django");
      if (content.includes("fastapi")) frameworks.push("FastAPI");
      if (content.includes("flask")) frameworks.push("Flask");
      if (content.includes("streamlit")) frameworks.push("Streamlit");
      if (content.includes("pytest")) signals.testFrameworks = ["pytest"];
      if (content.includes("poetry")) signals.buildTools = ["Poetry"];
      if (content.includes("hatch")) signals.buildTools = ["Hatch"];
      if (frameworks.length) signals.frameworks = frameworks;

      const nameMatch = content.match(/^name\s*=\s*"([^"]+)"/m);
      if (nameMatch) signals.projectName = nameMatch[1];
      const descMatch = content.match(/^description\s*=\s*"([^"]+)"/m);
      if (descMatch) signals.projectDescription = descMatch[1];

      return signals;
    },
  },
  {
    file: "requirements.txt",
    signals: { languages: ["Python"] },
    parse: (content) => {
      const frameworks: string[] = [];
      if (content.includes("django")) frameworks.push("Django");
      if (content.includes("fastapi")) frameworks.push("FastAPI");
      if (content.includes("flask")) frameworks.push("Flask");
      return frameworks.length ? { frameworks } : {};
    },
  },
  {
    file: "setup.py",
    signals: { languages: ["Python"] },
  },

  // Rust
  {
    file: "Cargo.toml",
    signals: { languages: ["Rust"], buildTools: ["Cargo"] },
    parse: (content) => {
      const signals: Partial<ProjectSignals> = {};
      const nameMatch = content.match(/^name\s*=\s*"([^"]+)"/m);
      if (nameMatch) signals.projectName = nameMatch[1];
      const descMatch = content.match(/^description\s*=\s*"([^"]+)"/m);
      if (descMatch) signals.projectDescription = descMatch[1];

      const frameworks: string[] = [];
      if (content.includes("actix")) frameworks.push("Actix");
      if (content.includes("axum")) frameworks.push("Axum");
      if (content.includes("rocket")) frameworks.push("Rocket");
      if (content.includes("tokio")) frameworks.push("Tokio");
      if (content.includes("clap")) signals.detectedType = "cli";
      if (frameworks.length) signals.frameworks = frameworks;
      return signals;
    },
  },

  // Go
  {
    file: "go.mod",
    signals: { languages: ["Go"] },
    parse: (content) => {
      const signals: Partial<ProjectSignals> = {};
      const moduleMatch = content.match(/^module\s+(\S+)/m);
      if (moduleMatch) {
        const parts = moduleMatch[1].split("/");
        signals.projectName = parts[parts.length - 1];
      }
      const frameworks: string[] = [];
      if (content.includes("gin-gonic")) frameworks.push("Gin");
      if (content.includes("gofiber")) frameworks.push("Fiber");
      if (content.includes("echo")) frameworks.push("Echo");
      if (content.includes("cobra")) signals.detectedType = "cli";
      if (frameworks.length) signals.frameworks = frameworks;
      return signals;
    },
  },

  // Ruby
  {
    file: "Gemfile",
    signals: { languages: ["Ruby"] },
    parse: (content) => {
      const frameworks: string[] = [];
      if (content.includes("rails")) frameworks.push("Rails");
      if (content.includes("sinatra")) frameworks.push("Sinatra");
      if (content.includes("rspec"))
        return { frameworks, testFrameworks: ["RSpec"] };
      return frameworks.length ? { frameworks } : {};
    },
  },

  // PHP
  {
    file: "composer.json",
    signals: { languages: ["PHP"] },
    parse: (content) => {
      try {
        const pkg = JSON.parse(content);
        const frameworks: string[] = [];
        const deps = {
          ...(pkg.require || {}),
          ...(pkg["require-dev"] || {}),
        };
        if (deps["laravel/framework"]) frameworks.push("Laravel");
        if (deps["symfony/framework-bundle"]) frameworks.push("Symfony");
        return {
          projectName: pkg.name,
          projectDescription: pkg.description,
          frameworks,
        };
      } catch {
        return {};
      }
    },
  },

  // Java / Kotlin
  {
    file: "build.gradle",
    signals: { languages: ["Java"], buildTools: ["Gradle"] },
    parse: (content) => {
      const signals: Partial<ProjectSignals> = {};
      if (content.includes("kotlin")) signals.languages = ["Kotlin"];
      if (content.includes("spring")) signals.frameworks = ["Spring Boot"];
      return signals;
    },
  },
  {
    file: "build.gradle.kts",
    signals: { languages: ["Kotlin"], buildTools: ["Gradle"] },
  },
  {
    file: "pom.xml",
    signals: { languages: ["Java"], buildTools: ["Maven"] },
    parse: (content) => {
      if (content.includes("spring-boot"))
        return { frameworks: ["Spring Boot"] };
      return {};
    },
  },

  // C# / .NET
  {
    file: "*.csproj",
    signals: { languages: ["C#"], buildTools: [".NET"] },
  },
  {
    file: "*.sln",
    signals: { languages: ["C#"], buildTools: [".NET"] },
  },

  // Elixir
  {
    file: "mix.exs",
    signals: { languages: ["Elixir"] },
    parse: (content) => {
      if (content.includes("phoenix")) return { frameworks: ["Phoenix"] };
      return {};
    },
  },

  // Docker / CI
  {
    file: "Dockerfile",
    signals: { hasDocker: true },
  },
  {
    file: "docker-compose.yml",
    signals: { hasDocker: true },
  },
  {
    file: "docker-compose.yaml",
    signals: { hasDocker: true },
  },
  {
    file: ".github/workflows",
    signals: { hasCI: true, ciPlatform: "GitHub Actions" },
  },
  {
    file: ".gitlab-ci.yml",
    signals: { hasCI: true, ciPlatform: "GitLab CI" },
  },
  {
    file: "Jenkinsfile",
    signals: { hasCI: true, ciPlatform: "Jenkins" },
  },
  {
    file: ".circleci",
    signals: { hasCI: true, ciPlatform: "CircleCI" },
  },

  // Existing CLAUDE.md
  {
    file: "CLAUDE.md",
    signals: {},
    parse: (content) => ({ existingClaudeMd: content }),
  },
];

function mergeSignals(
  base: ProjectSignals,
  partial: Partial<ProjectSignals>
): void {
  if (partial.languages) {
    for (const lang of partial.languages) {
      if (!base.languages.includes(lang)) base.languages.push(lang);
    }
  }
  if (partial.frameworks) {
    for (const fw of partial.frameworks) {
      if (!base.frameworks.includes(fw)) base.frameworks.push(fw);
    }
  }
  if (partial.buildTools) {
    for (const bt of partial.buildTools) {
      if (!base.buildTools.includes(bt)) base.buildTools.push(bt);
    }
  }
  if (partial.testFrameworks) {
    for (const tf of partial.testFrameworks) {
      if (!base.testFrameworks.includes(tf)) base.testFrameworks.push(tf);
    }
  }
  if (partial.packageManager && !base.packageManager)
    base.packageManager = partial.packageManager;
  if (partial.hasDocker) base.hasDocker = true;
  if (partial.hasCI) base.hasCI = true;
  if (partial.ciPlatform && !base.ciPlatform)
    base.ciPlatform = partial.ciPlatform;
  if (partial.projectName && !base.projectName)
    base.projectName = partial.projectName;
  if (partial.projectDescription && !base.projectDescription)
    base.projectDescription = partial.projectDescription;
  if (partial.existingClaudeMd)
    base.existingClaudeMd = partial.existingClaudeMd;
  if (partial.detectedType && base.detectedType === "unknown")
    base.detectedType = partial.detectedType;
}

function detectKeyDirectories(dir: string): string[] {
  const interesting = [
    "src",
    "lib",
    "app",
    "pages",
    "routes",
    "api",
    "components",
    "services",
    "utils",
    "helpers",
    "models",
    "schemas",
    "types",
    "tests",
    "test",
    "__tests__",
    "spec",
    "scripts",
    "config",
    "public",
    "static",
    "assets",
    "migrations",
    "db",
    "docs",
    "packages",
    "apps",
    "cmd",
    "internal",
    "pkg",
    "crates",
  ];

  const found: string[] = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (interesting.includes(entry)) {
        const fullPath = join(dir, entry);
        try {
          if (statSync(fullPath).isDirectory()) {
            found.push(entry);
          }
        } catch {
          // skip inaccessible
        }
      }
    }
  } catch {
    // skip if can't read dir
  }

  return found;
}

function detectEntryPoints(dir: string): string[] {
  const common = [
    "index.ts",
    "index.js",
    "main.ts",
    "main.js",
    "app.ts",
    "app.js",
    "server.ts",
    "server.js",
    "main.go",
    "main.py",
    "app.py",
    "manage.py",
    "main.rs",
    "Program.cs",
    "Main.java",
    "Application.java",
  ];

  const found: string[] = [];
  const checkDirs = [dir, join(dir, "src"), join(dir, "cmd"), join(dir, "app")];

  for (const checkDir of checkDirs) {
    try {
      const entries = readdirSync(checkDir);
      for (const entry of common) {
        if (entries.includes(entry)) {
          const relative =
            checkDir === dir ? entry : join(basename(checkDir), entry);
          found.push(relative);
        }
      }
    } catch {
      // dir doesn't exist, skip
    }
  }

  return found;
}

function inferProjectType(signals: ProjectSignals): ProjectType {
  if (signals.detectedType !== "unknown") return signals.detectedType;

  const dirs = signals.keyDirectories;
  const fws = signals.frameworks;

  // Monorepo signals
  if (
    dirs.includes("packages") ||
    dirs.includes("apps") ||
    signals.hasMono
  ) {
    return "monorepo";
  }

  // Static site
  if (
    fws.includes("Astro") ||
    fws.includes("Svelte") ||
    (dirs.includes("public") && dirs.includes("pages") && !fws.includes("Next.js"))
  ) {
    return "static-site";
  }

  // Mobile
  if (fws.includes("React Native") || fws.includes("Expo")) {
    return "mobile";
  }

  // Web app (has both frontend and backend signals)
  if (
    fws.includes("Next.js") ||
    fws.includes("Nuxt") ||
    fws.includes("Remix") ||
    fws.includes("Angular") ||
    (fws.includes("React") && dirs.includes("pages")) ||
    fws.includes("Rails") ||
    fws.includes("Django") ||
    fws.includes("Laravel") ||
    fws.includes("Phoenix")
  ) {
    return "web-app";
  }

  // API
  if (
    fws.includes("Express") ||
    fws.includes("Fastify") ||
    fws.includes("Hono") ||
    fws.includes("NestJS") ||
    fws.includes("FastAPI") ||
    fws.includes("Flask") ||
    fws.includes("Gin") ||
    fws.includes("Fiber") ||
    fws.includes("Actix") ||
    fws.includes("Axum") ||
    fws.includes("Rocket") ||
    fws.includes("Spring Boot") ||
    fws.includes("Sinatra") ||
    fws.includes("Symfony") ||
    fws.includes("Echo")
  ) {
    return "api";
  }

  // CLI
  if (dirs.includes("cmd") || signals.entryPoints.some((e) => e.includes("cli"))) {
    return "cli";
  }

  // Library
  if (
    dirs.includes("lib") &&
    !dirs.includes("pages") &&
    !dirs.includes("routes")
  ) {
    return "library";
  }

  // Data pipeline
  if (
    fws.includes("Streamlit") ||
    dirs.includes("migrations") ||
    dirs.includes("db")
  ) {
    return "data-pipeline";
  }

  return "unknown";
}

export function detectProject(dir: string): ProjectSignals {
  const signals: ProjectSignals = {
    languages: [],
    frameworks: [],
    buildTools: [],
    testFrameworks: [],
    packageManager: null,
    hasDocker: false,
    hasCI: false,
    ciPlatform: null,
    hasMono: false,
    projectName: null,
    projectDescription: null,
    entryPoints: [],
    keyDirectories: [],
    existingClaudeMd: null,
    detectedType: "unknown",
  };

  // Check for monorepo markers
  if (
    existsSync(join(dir, "pnpm-workspace.yaml")) ||
    existsSync(join(dir, "lerna.json")) ||
    existsSync(join(dir, "nx.json"))
  ) {
    signals.hasMono = true;
  }

  // Run file checks
  for (const check of FILE_CHECKS) {
    const filePath = join(dir, check.file);

    // Handle glob-like patterns (*.csproj, *.sln)
    if (check.file.includes("*")) {
      const ext = check.file.replace("*", "");
      try {
        const entries = readdirSync(dir);
        const match = entries.find((e) => e.endsWith(ext));
        if (match) {
          mergeSignals(signals, check.signals);
        }
      } catch {
        // skip
      }
      continue;
    }

    if (existsSync(filePath)) {
      mergeSignals(signals, check.signals);

      if (check.parse) {
        try {
          const stat = statSync(filePath);
          if (stat.isFile()) {
            const content = readFileSync(filePath, "utf-8");
            const parsed = check.parse(content);
            mergeSignals(signals, parsed);
          }
        } catch {
          // skip parse errors
        }
      }
    }
  }

  // Detect directories and entry points
  signals.keyDirectories = detectKeyDirectories(dir);
  signals.entryPoints = detectEntryPoints(dir);

  // Infer project type
  signals.detectedType = inferProjectType(signals);

  // Fall back to directory name for project name
  if (!signals.projectName) {
    signals.projectName = basename(dir);
  }

  return signals;
}
