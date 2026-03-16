#!/usr/bin/env node

import { writeFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { confirm } from "@inquirer/prompts";
import { detectProject } from "./detector.js";
import { runPrompts } from "./prompts.js";
import { generateClaudeMd } from "./generator.js";

const VERSION = "0.1.0";
const BANNER = `
  ╔═══════════════════════════════════════╗
  ║         claudemd v${VERSION}              ║
  ║   Generate CLAUDE.md for your project ║
  ╚═══════════════════════════════════════╝
`;

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log(VERSION);
    process.exit(0);
  }

  // Determine target directory (filter out flags)
  const positionalArgs = args.filter((a) => !a.startsWith("-"));
  const targetDir = resolve(positionalArgs[0] || ".");

  // Detect-only mode
  if (args.includes("--detect") || args.includes("-d")) {
    const signals = detectProject(targetDir);
    console.log(JSON.stringify(signals, null, 2));
    process.exit(0);
  }

  console.log(BANNER);

  // Step 1: Detect project
  console.log("  Scanning project...\n");
  const signals = detectProject(targetDir);

  // Show what we found
  printDetection(signals);

  // Step 2: Check for existing CLAUDE.md
  const claudeMdPath = join(targetDir, "CLAUDE.md");
  if (signals.existingClaudeMd) {
    console.log(
      "\n  Found existing CLAUDE.md. Running claudemd will create a new one."
    );
    const overwrite = await confirm({
      message: "Overwrite existing CLAUDE.md?",
      default: false,
    });
    if (!overwrite) {
      const backupPath = join(targetDir, "CLAUDE.md.new");
      console.log(`  Will write to CLAUDE.md.new instead.\n`);
      await runAndWrite(signals, backupPath);
      return;
    }
  }

  // Step 3: Interactive prompts
  await runAndWrite(signals, claudeMdPath);
}

async function runAndWrite(
  signals: ReturnType<typeof detectProject>,
  outputPath: string
) {
  const answers = await runPrompts(signals);

  // Step 4: Generate
  const content = generateClaudeMd(signals, answers);

  // Step 5: Preview
  console.log("\n  --- Preview ---\n");
  console.log(content);
  console.log("  --- End Preview ---\n");

  const proceed = await confirm({
    message: `Write to ${outputPath}?`,
    default: true,
  });

  if (proceed) {
    writeFileSync(outputPath, content, "utf-8");
    console.log(`\n  Done! CLAUDE.md written to ${outputPath}`);
    console.log("  Open it in your editor to customize further.\n");
    console.log("  Tips:");
    console.log(
      '  - The "Do NOT" section is the most impactful part. Add rules as you discover frustrations.'
    );
    console.log(
      "  - Add architecture details as your project grows. Claude works better with context."
    );
    console.log(
      "  - Review and update CLAUDE.md periodically. It should evolve with your project.\n"
    );
  } else {
    console.log("\n  Cancelled. No files written.\n");
  }
}

function printDetection(signals: ReturnType<typeof detectProject>) {
  const items: string[] = [];

  if (signals.languages.length)
    items.push(`Languages: ${signals.languages.join(", ")}`);
  if (signals.frameworks.length)
    items.push(`Frameworks: ${signals.frameworks.join(", ")}`);
  if (signals.buildTools.length)
    items.push(`Build tools: ${signals.buildTools.join(", ")}`);
  if (signals.testFrameworks.length)
    items.push(`Testing: ${signals.testFrameworks.join(", ")}`);
  if (signals.packageManager)
    items.push(`Package manager: ${signals.packageManager}`);
  if (signals.hasDocker) items.push("Docker: detected");
  if (signals.hasCI) items.push(`CI: ${signals.ciPlatform}`);
  if (signals.keyDirectories.length)
    items.push(`Key dirs: ${signals.keyDirectories.join(", ")}`);
  if (signals.detectedType !== "unknown")
    items.push(`Project type: ${signals.detectedType}`);

  if (items.length === 0) {
    console.log("  No project markers detected. Starting from scratch.\n");
  } else {
    console.log("  Detected:");
    for (const item of items) {
      console.log(`    - ${item}`);
    }
    console.log();
  }
}

function printHelp() {
  console.log(`
claudemd - Generate CLAUDE.md files for your project

Usage:
  claudemd [directory]    Generate CLAUDE.md (defaults to current directory)
  claudemd --detect [dir] Show detected project info as JSON (no prompts)
  claudemd --help         Show this help
  claudemd --version      Show version

What it does:
  1. Scans your project for languages, frameworks, and structure
  2. Asks you questions about conventions, boundaries, and workflow
  3. Generates a tailored CLAUDE.md that helps Claude Code understand your project

The generated CLAUDE.md includes:
  - Tech stack and architecture overview
  - Development commands (dev, build, test)
  - Code style conventions
  - "Do NOT" rules (boundaries Claude must respect)
  - Common tasks you need help with
  - Key files and directories

Learn more: https://lisabuilds.dev
`);
}

main().catch((err) => {
  if (err.name === "ExitPromptError") {
    // User pressed Ctrl+C
    console.log("\n  Cancelled.\n");
    process.exit(0);
  }
  console.error("Error:", err.message);
  process.exit(1);
});
