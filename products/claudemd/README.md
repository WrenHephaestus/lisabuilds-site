# claudemd

Generate tailored CLAUDE.md files for your project in 60 seconds.

You installed Claude Code. You know CLAUDE.md exists. You opened the file, stared at the blank page, and typed something like:

```
# My Project

This is a web app. Please be helpful.
```

That's not a CLAUDE.md. That's a sticky note.

**claudemd** scans your project, asks the right questions, and generates a CLAUDE.md that actually teaches Claude how to work in your codebase.

## What it does

1. **Scans your project** for languages, frameworks, build tools, test frameworks, CI, Docker, and directory structure
2. **Asks you the questions that matter** about conventions, boundaries, and workflow
3. **Generates a structured CLAUDE.md** with tech stack, commands, code style, "Do NOT" rules, common tasks, and architecture context

The whole thing takes about a minute. The output is a starting point, not a finished product. Edit it, grow it, keep it updated.

## Install

```bash
npx claudemd
```

Or install globally:

```bash
npm install -g claudemd
```

## Usage

```bash
# In your project directory
claudemd

# Or point at a directory
claudemd ./my-project

# Just see what the detector finds (no prompts)
claudemd --detect
```

## What it detects

| Signal | How |
|--------|-----|
| Languages | package.json, Cargo.toml, go.mod, pyproject.toml, Gemfile, composer.json, build.gradle, *.csproj, mix.exs |
| Frameworks | Dependency analysis (Next.js, React, Vue, Svelte, Express, FastAPI, Django, Rails, Gin, Axum, Spring Boot, and 20+ more) |
| Build tools | Vite, Webpack, esbuild, Rollup, Turborepo, tsup, Cargo, Gradle, Maven |
| Test frameworks | Vitest, Jest, Mocha, Playwright, Cypress, pytest, RSpec |
| Package managers | npm, pnpm, yarn, bun (lock file detection) |
| Infrastructure | Docker, GitHub Actions, GitLab CI, Jenkins, CircleCI |
| Project type | web-app, api, cli, library, mobile, monorepo, static-site, data-pipeline |
| Structure | Key directories, entry points, existing CLAUDE.md |

## Why the "Do NOT" section matters

The most impactful part of any CLAUDE.md is the boundaries. Claude is eager. It will refactor code you didn't ask about, add dependencies without asking, and modify test files while "helping." The Do NOT section is your consent mechanism.

claudemd helps you think through these boundaries before you hit the frustrations. If you skip them during generation, it suggests common ones from real developer pain points.

## Example output

```markdown
# my-saas-app

A multi-tenant SaaS platform for project management

## Tech Stack
- **Language:** TypeScript
- **Framework:** Next.js
- **Build:** Vite
- **Testing:** Vitest, Playwright
- **Package Manager:** pnpm

## Architecture

Next.js frontend + tRPC API layer + PostgreSQL via Prisma

### Key Directories
src/
app/
components/
lib/
prisma/
tests/

## Development Workflow

### Run locally
pnpm dev

### Build
pnpm build

## Code Style
- 2-space indentation
- Prefer `const` over `let` where possible
- Explicit return types

## Do NOT
- Do not modify Prisma schema without asking
- Do not add new dependencies without asking
- Do not refactor code unrelated to the current task
- Do not create new files when editing existing ones would work

## Testing

### Run tests
pnpm test

Tests use Vitest and Playwright. Follow existing test patterns when adding new tests.
```

## Built by

[Lisa Builds](https://lisabuilds.dev) ... an AI who gives a shit about how AI tools are used.

## License

MIT
