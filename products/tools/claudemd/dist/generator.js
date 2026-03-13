export function generateClaudeMd(signals, answers) {
    const sections = [];
    // Header
    sections.push(generateHeader(answers));
    // Tech Stack
    sections.push(generateTechStack(signals, answers));
    // Architecture (if provided)
    if (answers.architecture) {
        sections.push(generateArchitecture(signals, answers));
    }
    // Development Workflow
    sections.push(generateWorkflow(answers));
    // Code Style
    if (answers.codeStyle.length > 0) {
        sections.push(generateCodeStyle(answers));
    }
    // Key Files
    if (answers.keyFiles.length > 0) {
        sections.push(generateKeyFiles(signals, answers));
    }
    // Common Tasks
    if (answers.commonTasks.length > 0) {
        sections.push(generateCommonTasks(answers));
    }
    // Do NOT rules
    if (answers.doNotRules.length > 0) {
        sections.push(generateDoNotRules(answers));
    }
    // Testing
    if (answers.testCommand) {
        sections.push(generateTesting(signals, answers));
    }
    // Additional Notes
    if (answers.additionalNotes) {
        sections.push(generateAdditionalNotes(answers));
    }
    return sections.join("\n\n") + "\n";
}
function generateHeader(answers) {
    const lines = [`# ${answers.projectName}`];
    if (answers.projectDescription) {
        lines.push("", answers.projectDescription);
    }
    return lines.join("\n");
}
function generateTechStack(signals, answers) {
    const lines = ["## Tech Stack"];
    if (answers.languages.length) {
        lines.push(`- **Language${answers.languages.length > 1 ? "s" : ""}:** ${answers.languages.join(", ")}`);
    }
    if (answers.frameworks.length) {
        lines.push(`- **Framework${answers.frameworks.length > 1 ? "s" : ""}:** ${answers.frameworks.join(", ")}`);
    }
    if (signals.buildTools.length) {
        lines.push(`- **Build:** ${signals.buildTools.join(", ")}`);
    }
    if (signals.testFrameworks.length) {
        lines.push(`- **Testing:** ${signals.testFrameworks.join(", ")}`);
    }
    if (signals.packageManager) {
        lines.push(`- **Package Manager:** ${signals.packageManager}`);
    }
    if (signals.hasDocker) {
        lines.push("- **Containerization:** Docker");
    }
    if (signals.hasCI && signals.ciPlatform) {
        lines.push(`- **CI/CD:** ${signals.ciPlatform}`);
    }
    return lines.join("\n");
}
function generateArchitecture(signals, answers) {
    const lines = ["## Architecture", "", answers.architecture];
    if (signals.keyDirectories.length > 0) {
        lines.push("", "### Key Directories", "```");
        for (const dir of signals.keyDirectories) {
            lines.push(`${dir}/`);
        }
        lines.push("```");
    }
    return lines.join("\n");
}
function generateWorkflow(answers) {
    const lines = ["## Development Workflow"];
    if (answers.devCommand) {
        lines.push("", "### Run locally", "```bash", answers.devCommand, "```");
    }
    if (answers.buildCommand) {
        lines.push("", "### Build", "```bash", answers.buildCommand, "```");
    }
    return lines.join("\n");
}
function generateCodeStyle(answers) {
    const lines = ["## Code Style"];
    const styleDescriptions = {
        "single-quotes": "Use single quotes for strings",
        "double-quotes": "Use double quotes for strings",
        semicolons: "Always use semicolons",
        "no-semicolons": "No semicolons (rely on ASI)",
        "indent-2": "2-space indentation",
        "indent-4": "4-space indentation",
        "indent-tab": "Tab indentation",
        "prefer-const": "Prefer `const` over `let` where possible",
        functional: "Prefer functional patterns (map, filter, reduce over loops)",
        oop: "OOP patterns (classes, interfaces, inheritance)",
        "explicit-returns": "Always use explicit return types",
        "strict-null": "Strict null checks enabled, handle nullable values explicitly",
    };
    for (const style of answers.codeStyle) {
        if (styleDescriptions[style]) {
            lines.push(`- ${styleDescriptions[style]}`);
        }
    }
    return lines.join("\n");
}
function generateKeyFiles(signals, answers) {
    const lines = ["## Key Files"];
    for (const file of answers.keyFiles) {
        lines.push(`- \`${file}\``);
    }
    return lines.join("\n");
}
function generateCommonTasks(answers) {
    const lines = [
        "## Common Tasks",
        "",
        "When I ask for help, it will often be with:",
    ];
    for (const task of answers.commonTasks) {
        lines.push(`- ${task}`);
    }
    return lines.join("\n");
}
function generateDoNotRules(answers) {
    const lines = [
        "## Do NOT",
        "",
        "These are hard boundaries. Respect them always:",
    ];
    for (const rule of answers.doNotRules) {
        // Ensure the rule starts with "Do not" or similar
        const normalized = rule.startsWith("Do not") || rule.startsWith("do not") || rule.startsWith("Don't") || rule.startsWith("don't") || rule.startsWith("Never") || rule.startsWith("never")
            ? rule
            : `Do not ${rule.charAt(0).toLowerCase()}${rule.slice(1)}`;
        lines.push(`- ${normalized}`);
    }
    return lines.join("\n");
}
function generateTesting(signals, answers) {
    const lines = [
        "## Testing",
        "",
        "### Run tests",
        "```bash",
        answers.testCommand,
        "```",
    ];
    if (signals.testFrameworks.length > 0) {
        lines.push("", `Tests use ${signals.testFrameworks.join(" and ")}. Follow existing test patterns when adding new tests.`);
    }
    return lines.join("\n");
}
function generateAdditionalNotes(answers) {
    return ["## Notes", "", answers.additionalNotes].join("\n");
}
//# sourceMappingURL=generator.js.map