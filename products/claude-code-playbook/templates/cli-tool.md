# [EDIT: Tool Name]

[EDIT: What this CLI tool does in one sentence]

## Stack

- **Language:** [EDIT: TypeScript (Node.js) / Python / Go / Rust]
- **CLI framework:** [EDIT: Commander.js / yargs / Click / Typer / cobra / clap]
- **Package manager:** [EDIT: npm / pnpm / bun / pip / uv / go mod / cargo]
- **Distribution:** [EDIT: npm registry / PyPI / go install / brew tap / binary releases]

## Project Structure

```
[EDIT: tool-name]/
├── src/
│   ├── index.ts             # Entry point, CLI argument parsing
│   ├── commands/            # One file per command/subcommand
│   │   ├── init.ts
│   │   ├── run.ts
│   │   └── [EDIT: commands].ts
│   ├── lib/                 # Core logic (no CLI dependencies)
│   │   ├── config.ts        # Config file loading/parsing
│   │   └── [EDIT: modules].ts
│   ├── utils/               # Shared helpers
│   │   ├── logger.ts        # Structured output (stdout for data, stderr for status)
│   │   └── fs.ts            # File system operations
│   └── types.ts             # Shared type definitions
├── tests/
├── package.json
└── tsconfig.json
```

## Conventions

### CLI Behavior
- **stdout** is for data output (pipeable to other tools)
- **stderr** is for status messages, progress, and errors
- Exit code 0 = success, 1 = user error, 2 = system error
- Support `--json` flag for machine-readable output where applicable
- Support `--quiet` / `--verbose` flags for controlling output verbosity
- Respect `NO_COLOR` environment variable

### Architecture
- **Commands** handle argument parsing and user interaction (prompts, spinners, output formatting)
- **Lib** contains pure business logic — no CLI framework imports, no process.exit, no console.log
- This separation makes core logic testable and reusable

### Error Handling
- Never show stack traces to users in production — show a clear error message with actionable suggestion
- Use a custom error class with exit codes: `ToolError("Config not found. Run `tool init` first.", exitCode: 1)`
- Catch unexpected errors at the top level, log to debug file, show "unexpected error" message with report instructions

### Config Files
- Look for config in this order: CLI flags → env vars → `./[EDIT: .toolrc]` → `~/.config/[EDIT: tool]/config` → defaults
- Use [EDIT: cosmiconfig / configparser / viper] for config resolution
- Always validate config with a schema — fail early with clear messages

### Testing
- Test the lib layer directly with unit tests (no CLI parsing overhead)
- Integration tests run the actual CLI binary and assert on stdout/stderr/exit codes
- Run: `[EDIT: npm test / pytest / go test ./...]`

## Key Commands

```bash
[EDIT: your actual commands]
dev:      npm run dev -- [args]     # Run in development
build:    npm run build             # Compile
test:     npm test                  # Run tests
link:     npm link                  # Install locally for testing
publish:  npm publish               # Publish to registry
```

## Important Context

[EDIT: Add tool-specific context]
- What problem this tool solves
- Who the target users are
- Competing tools and how this differs
- Known limitations

## Do NOT

- Don't use `process.exit()` inside lib/ — only in command handlers
- Don't mix data output with status messages on stdout
- Don't require interactive input without a non-interactive alternative (support piping)
- Don't break existing CLI flags/behavior without a major version bump
- [EDIT: project-specific guardrails]
