import { input, select, checkbox, confirm, editor } from "@inquirer/prompts";
import type { ProjectSignals, ProjectType } from "./detector.js";

export interface UserAnswers {
  projectName: string;
  projectDescription: string;
  projectType: ProjectType;
  languages: string[];
  frameworks: string[];
  testCommand: string;
  buildCommand: string;
  devCommand: string;
  codeStyle: string[];
  doNotRules: string[];
  commonTasks: string[];
  keyFiles: string[];
  architecture: string;
  teamContext: string;
  additionalNotes: string;
}

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "web-app": "Web Application (full-stack or frontend)",
  api: "API / Backend Service",
  cli: "CLI Tool",
  library: "Library / Package",
  mobile: "Mobile App",
  "data-pipeline": "Data Pipeline / ETL",
  monorepo: "Monorepo (multiple packages)",
  "static-site": "Static Site / Blog",
  unknown: "Other / Not sure",
};

export async function runPrompts(
  signals: ProjectSignals
): Promise<UserAnswers> {
  console.log();

  // Project name
  const projectName = await input({
    message: "Project name?",
    default: signals.projectName || undefined,
  });

  // Project description
  const projectDescription = await input({
    message: "One-line description of what this project does:",
    default: signals.projectDescription || undefined,
  });

  // Project type (pre-select if detected)
  const projectType = (await select({
    message: "Project type?",
    choices: Object.entries(PROJECT_TYPE_LABELS).map(([value, name]) => ({
      name,
      value,
    })),
    default: signals.detectedType !== "unknown" ? signals.detectedType : undefined,
  })) as ProjectType;

  // Languages (confirm detected or ask)
  let languages = signals.languages;
  if (languages.length > 0) {
    const confirmed = await confirm({
      message: `Detected languages: ${languages.join(", ")}. Correct?`,
      default: true,
    });
    if (!confirmed) {
      const langInput = await input({
        message: "Languages used (comma-separated):",
      });
      languages = langInput.split(",").map((s) => s.trim()).filter(Boolean);
    }
  } else {
    const langInput = await input({
      message: "Primary languages (comma-separated):",
    });
    languages = langInput.split(",").map((s) => s.trim()).filter(Boolean);
  }

  // Frameworks (confirm or ask)
  let frameworks = signals.frameworks;
  if (frameworks.length > 0) {
    const confirmed = await confirm({
      message: `Detected frameworks: ${frameworks.join(", ")}. Correct?`,
      default: true,
    });
    if (!confirmed) {
      const fwInput = await input({
        message: "Frameworks/libraries (comma-separated):",
      });
      frameworks = fwInput.split(",").map((s) => s.trim()).filter(Boolean);
    }
  } else {
    const fwInput = await input({
      message: "Key frameworks/libraries (comma-separated, or skip):",
      default: "",
    });
    frameworks = fwInput.split(",").map((s) => s.trim()).filter(Boolean);
  }

  // Commands
  const devCommand = await input({
    message: "Dev/run command? (e.g., npm run dev)",
    default: guessDevCommand(signals),
  });

  const buildCommand = await input({
    message: "Build command? (e.g., npm run build)",
    default: guessBuildCommand(signals),
  });

  const testCommand = await input({
    message: "Test command? (e.g., npm test)",
    default: guessTestCommand(signals),
  });

  // Code style
  const codeStyle = await checkbox({
    message: "Code style conventions (select all that apply):",
    choices: [
      { name: "Use single quotes", value: "single-quotes" },
      { name: "Use double quotes", value: "double-quotes" },
      { name: "Semicolons required", value: "semicolons" },
      { name: "No semicolons", value: "no-semicolons" },
      { name: "2-space indentation", value: "indent-2" },
      { name: "4-space indentation", value: "indent-4" },
      { name: "Tab indentation", value: "indent-tab" },
      { name: "Prefer const over let", value: "prefer-const" },
      { name: "Functional style preferred", value: "functional" },
      { name: "OOP style preferred", value: "oop" },
      { name: "Explicit return types", value: "explicit-returns" },
      { name: "Strict null checks", value: "strict-null" },
    ],
  });

  // Do NOT rules (the consent gap!)
  console.log(
    "\n  The Do NOT section is one of the most important parts of CLAUDE.md."
  );
  console.log(
    "  These are boundaries Claude must respect. Think about what would frustrate you.\n"
  );

  const doNotRules: string[] = [];
  let addingRules = true;
  while (addingRules) {
    const rule = await input({
      message: `Do NOT rule #${doNotRules.length + 1} (or press enter to finish):`,
      default: "",
    });
    if (rule.trim()) {
      doNotRules.push(rule.trim());
    } else {
      addingRules = false;
    }
  }

  // If they didn't add any, suggest some common ones
  if (doNotRules.length === 0) {
    const suggestedRules = await checkbox({
      message: "No rules added. Want to pick from common ones?",
      choices: [
        {
          name: "Do not modify test files without asking",
          value: "Do not modify test files without asking",
        },
        {
          name: "Do not delete or rename existing functions without asking",
          value: "Do not delete or rename existing functions without asking",
        },
        {
          name: "Do not add new dependencies without asking",
          value: "Do not add new dependencies without asking",
        },
        {
          name: "Do not change the database schema without asking",
          value: "Do not change the database schema without asking",
        },
        {
          name: "Do not refactor code unrelated to the current task",
          value: "Do not refactor code unrelated to the current task",
        },
        {
          name: "Do not add comments explaining obvious code",
          value: "Do not add comments explaining obvious code",
        },
        {
          name: "Do not create new files when editing existing ones would work",
          value: "Do not create new files when editing existing ones would work",
        },
        {
          name: "Do not over-engineer solutions",
          value: "Do not over-engineer solutions",
        },
      ],
    });
    doNotRules.push(...suggestedRules);
  }

  // Common tasks
  console.log("\n  What do you typically ask Claude to help with?\n");
  const commonTasks: string[] = [];
  let addingTasks = true;
  while (addingTasks) {
    const task = await input({
      message: `Common task #${commonTasks.length + 1} (or press enter to finish):`,
      default: "",
    });
    if (task.trim()) {
      commonTasks.push(task.trim());
    } else {
      addingTasks = false;
    }
  }

  // Key files
  let keyFiles = signals.entryPoints;
  if (keyFiles.length > 0) {
    console.log(`\n  Detected entry points: ${keyFiles.join(", ")}`);
  }
  const moreFiles = await input({
    message: "Other key files Claude should know about (comma-separated, or skip):",
    default: "",
  });
  if (moreFiles.trim()) {
    keyFiles = [
      ...keyFiles,
      ...moreFiles.split(",").map((s) => s.trim()).filter(Boolean),
    ];
  }

  // Architecture overview
  const architecture = await input({
    message:
      "Brief architecture description (e.g., 'React frontend + Express API + PostgreSQL'):",
    default: "",
  });

  // Team context
  const teamContext = await select({
    message: "Who uses this codebase?",
    choices: [
      { name: "Just me (solo developer)", value: "solo" },
      { name: "Small team (2-5)", value: "small-team" },
      { name: "Medium team (5-20)", value: "medium-team" },
      { name: "Large team (20+)", value: "large-team" },
      { name: "Open source project", value: "open-source" },
    ],
  });

  // Anything else
  const additionalNotes = await input({
    message: "Anything else Claude should know? (or skip):",
    default: "",
  });

  return {
    projectName,
    projectDescription,
    projectType,
    languages,
    frameworks,
    testCommand,
    buildCommand,
    devCommand,
    codeStyle,
    doNotRules,
    commonTasks,
    keyFiles,
    architecture,
    teamContext,
    additionalNotes,
  };
}

function guessDevCommand(signals: ProjectSignals): string {
  if (signals.packageManager === "pnpm") return "pnpm dev";
  if (signals.packageManager === "yarn") return "yarn dev";
  if (signals.packageManager === "bun") return "bun dev";
  if (signals.languages.includes("Python")) return "python main.py";
  if (signals.languages.includes("Go")) return "go run .";
  if (signals.languages.includes("Rust")) return "cargo run";
  if (signals.languages.includes("Ruby")) return "bundle exec rails server";
  return "npm run dev";
}

function guessBuildCommand(signals: ProjectSignals): string {
  if (signals.packageManager === "pnpm") return "pnpm build";
  if (signals.packageManager === "yarn") return "yarn build";
  if (signals.packageManager === "bun") return "bun run build";
  if (signals.languages.includes("Go")) return "go build";
  if (signals.languages.includes("Rust")) return "cargo build";
  return "npm run build";
}

function guessTestCommand(signals: ProjectSignals): string {
  if (signals.testFrameworks.includes("Vitest")) return "npx vitest";
  if (signals.testFrameworks.includes("Jest")) return "npx jest";
  if (signals.testFrameworks.includes("pytest")) return "pytest";
  if (signals.testFrameworks.includes("RSpec")) return "bundle exec rspec";
  if (signals.languages.includes("Go")) return "go test ./...";
  if (signals.languages.includes("Rust")) return "cargo test";
  if (signals.packageManager === "pnpm") return "pnpm test";
  if (signals.packageManager === "yarn") return "yarn test";
  return "npm test";
}
