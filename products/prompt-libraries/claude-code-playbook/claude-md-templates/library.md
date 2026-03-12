# [EDIT: Library Name]

[EDIT: What this library does, in one sentence, for the developer evaluating whether to add it to their project]

## Stack

- **Language:** TypeScript [EDIT: or JS / Python / Go / Rust — adjust this whole template accordingly]
- **Build:** [EDIT: tsup / unbuild / rollup / esbuild]
- **Testing:** [EDIT: vitest / jest / node:test]
- **Docs:** [EDIT: TypeDoc / Starlight / hand-rolled README]
- **Registry:** npm [EDIT: or JSR / PyPI / crates.io]
- **CI:** [EDIT: GitHub Actions / GitLab CI]
- **Versioning:** [EDIT: changesets / manual semver / release-it]

## Project Structure

```
[EDIT: library-name]/
├── src/
│   ├── index.ts             # Public API barrel — every export goes through here
│   ├── [module].ts          # Internal modules
│   └── types.ts             # Public type definitions
├── tests/
│   ├── [module].test.ts     # Unit tests mirror src/ structure
│   └── integration/         # Integration tests
├── examples/                # Usage examples (double as smoke tests)
├── benchmarks/              # Performance benchmarks (if applicable)
├── .changeset/              # Changeset files (if using changesets)
├── tsconfig.json            # Source config — strict mode, declaration: true
├── tsconfig.build.json      # Build config — excludes tests, examples
├── tsup.config.ts           # Build config — dual CJS/ESM output
├── package.json
└── README.md
```

## Package Configuration

This is the part that actually breaks things. Get it right once and never think about it again.

### package.json — The Fields That Matter

```jsonc
{
  "name": "[EDIT: @scope/library-name]",
  "version": "0.0.0",
  "description": "[EDIT: one line]",
  "type": "module",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./[EDIT: subpath]": {
      "import": {
        "types": "./dist/[subpath].d.mts",
        "default": "./dist/[subpath].mjs"
      },
      "require": {
        "types": "./dist/[subpath].d.cts",
        "default": "./dist/[subpath].cjs"
      }
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.mts",
  "files": ["dist", "README.md", "LICENSE"],
  "sideEffects": false,
  "engines": {
    "node": ">=18"
  },
  "publishConfig": {
    "access": "public",
    "provenance": true
  }
}
```

**Why this structure:**
- `exports` is what modern bundlers and Node 12+ actually read. Order inside each condition matters — put `types` first so TypeScript finds them before attempting inference.
- `main` and `module` are legacy fallbacks. Some older tools still look for them. Costs nothing to include.
- `"type": "module"` means your source files are ESM by default. The build tool handles generating the CJS variant.
- `sideEffects: false` tells bundlers every module in this package is safe to tree-shake. If you have modules with side effects (CSS imports, polyfills, global registration), list them explicitly: `"sideEffects": ["./dist/polyfill.mjs"]`. Without this field, bundlers may include your entire package even when a consumer imports one function.
- `files` is your allowlist for what goes in the tarball. Keeps published size small. No `src/`, no `tests/`, no config files.

### Build — tsup

```ts
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    // [EDIT: add subpath entries if you have them]
  ],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs",
    };
  },
});
```

[EDIT: If using unbuild instead of tsup:]
```ts
// build.config.ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    // [EDIT: list peer deps here]
  ],
});
```

**Pick one.** tsup is simpler, faster, good for most libraries. unbuild has better monorepo support and auto-externalizes dependencies. Both produce dual CJS/ESM output with type declarations. Don't overthink this.

### Type Declarations

- tsup with `dts: true` generates `.d.ts` (and `.d.mts` / `.d.cts`) files automatically from your source.
- If types are slow to build or you need finer control, use `tsup` for JS output and a separate `tsc --emitDeclarationOnly` step. Two-pass is common for larger libraries.
- **Always** set `"strict": true` and `"declaration": true` in your tsconfig.
- Your tsconfig.build.json should exclude tests and examples so they don't end up in declarations.

```jsonc
// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src"],
  "exclude": ["**/*.test.ts", "tests", "examples", "benchmarks"]
}
```

## Peer Dependencies

This is where library authors get confused. Here's the rule:

**Use `peerDependencies` when your library wraps, extends, or plugs into another library that the consumer is already using.** React component libraries peer-depend on React. A Prisma extension peer-depends on Prisma. An Express middleware peer-depends on Express.

**Use regular `dependencies` for things your library needs internally and the consumer shouldn't care about.**

```jsonc
{
  "peerDependencies": {
    "[EDIT: e.g., react]": ">=18",
    "[EDIT: e.g., zod]": ">=3"
  },
  "peerDependenciesMeta": {
    "[EDIT: optional-peer]": {
      "optional": true
    }
  },
  "devDependencies": {
    // Peer deps go here too — you need them installed for development/testing
    "[EDIT: react]": "^18.0.0",
    "[EDIT: zod]": "^3.0.0"
  }
}
```

**Why this matters:** If you put React in `dependencies` instead of `peerDependencies`, your consumer might end up with two copies of React in their bundle. Runtime breaks. Hooks fail silently. Horrible debugging experience. (Ask me how I know.)

`peerDependenciesMeta` with `optional: true` is for cases where your library has features that work with some other library but don't require it. Nice pattern for plugins.

## Conventions

### API Design
- **Public API surface is intentionally small.** Export the minimum. Internal helpers stay internal. You can always export more later — you can never un-export.
- **Every public function/type has JSDoc** with at minimum: description, params, return type, one usage example
- **No default exports** — named exports only. Better tree-shaking, better IDE autocomplete, less ambiguity.
- **Errors are specific.** Custom error classes that extend `Error`. Consumers should be able to `catch (e) { if (e instanceof YourLibraryError) }` without checking string messages.

### The Public API Checklist
Before exporting anything new, it must pass all four:
1. Is this something consumers actually need? (Not just convenient internally)
2. Can we support this API shape long-term? (Once shipped, it's a contract)
3. Is the name clear to someone who hasn't read the source?
4. Does it have tests, docs, and at least one example?

### Code Quality
- 100% of public API has explicit type signatures (no `any`, no implicit return types)
- Every code path has test coverage — especially edge cases and error cases
- Error messages include what went wrong AND what to do about it
- No external runtime dependencies unless absolutely essential — every dep you add is a dep you force on every consumer

### Testing
- Unit tests for all public methods
- Edge case tests: empty input, null/undefined, huge input, concurrent access
- Type tests: verify that the exported types work correctly for consumers (use `tsd` or `expect-type`)
- Example files in `examples/` run in CI — they double as integration tests
- Run: `[EDIT: npm test / vitest / vitest run]`

### Testing Locally Before Publishing

Do not publish to npm to test your package. Test locally first.

**npm link (quick and dirty):**
```bash
# In your library directory:
npm link
# In the consuming project:
npm link [EDIT: your-package-name]
# When done:
npm unlink [EDIT: your-package-name]
```

Caveats: `npm link` creates a symlink, which means peer dependency resolution can get weird. If you're seeing "duplicate React" type errors, this is why.

**yalc (recommended):**
```bash
# Install once globally:
npm i -g yalc
# In your library — builds and publishes to local store:
yalc publish
# In the consuming project:
yalc add [EDIT: your-package-name]
# After changes to the library:
yalc push  # updates all linked projects
# Clean up:
yalc remove [EDIT: your-package-name]
```

yalc actually copies files like a real install. Closer to what npm publish does. Catches problems `npm link` misses (like missing files in your `files` array).

**Dry run (always do this before real publish):**
```bash
npm pack --dry-run   # shows what files would be included
npm pack             # creates a tarball — inspect it, install it somewhere, verify it works
```

### Versioning and Releases

[EDIT: Choose one of the following approaches]

**Changesets (recommended for anything with users):**
```bash
# After making changes:
npx changeset                # interactive — picks packages, bump type, writes summary
# This creates a markdown file in .changeset/ — commit it with your PR

# When ready to release (usually in CI):
npx changeset version        # consumes changeset files, bumps versions, updates CHANGELOG
npx changeset publish        # publishes to npm
```

Changesets force you to think about semver at PR time, not release time. That's the right moment to ask "is this a breaking change?" — when the change is fresh in your head.

**Manual semver (fine for early-stage or solo):**
```bash
npm version patch|minor|major   # bumps version, creates git tag
npm publish                     # push to registry
git push --follow-tags          # push the tag
```

### Publishing

```bash
# The full sequence:
npm run build
npm test
npm pack --dry-run              # verify files list looks right
npm publish --provenance        # publish with build provenance (if using GitHub Actions)
```

`--provenance` links the published package to the exact commit and CI run that built it. Free trust signal. Requires GitHub Actions with OIDC permissions:

```yaml
# [EDIT: .github/workflows/release.yml]
permissions:
  contents: read
  id-token: write   # Required for provenance
```

### Monorepo Considerations

[EDIT: Remove this section if not applicable]

If this library lives in a monorepo:
- Use `workspace:*` protocol for internal dependencies
- Build tooling should handle topological ordering (turborepo or nx do this)
- The `exports` field in package.json is the same — monorepo doesn't change the published shape
- Consider `unbuild` over `tsup` for the auto-externalization of workspace siblings
- Changesets handles multi-package versioning — `npx changeset` will ask which packages changed
- Make sure `files` in package.json only includes `dist` — don't accidentally ship your monorepo's root config

## Key Commands

```bash
[EDIT: your actual commands]
dev:        npm run dev          # Watch mode rebuild
build:      npm run build        # Production build (CJS + ESM + types)
test:       npm test             # All tests
test:watch: npm run test:watch   # Watch mode
lint:       npm run lint
typecheck:  tsc --noEmit         # Type check without emitting
pack:       npm pack --dry-run   # Preview published files
local:      yalc publish         # Publish to local store for testing
release:    npx changeset        # Create a changeset for the next release
publish:    npx changeset publish # Version bump + publish to npm
```

## Important Context

[EDIT: library-specific notes]
- Who uses this library and for what
- Performance requirements or constraints
- Compatibility targets (which Node versions, browser support, edge runtime)
- Known limitations or intentional non-goals
- [EDIT: Are there competing packages? What's this library's angle?]

## Do NOT

- Don't add runtime dependencies without discussing — every dep you add is a dep every consumer inherits, with their transitive deps, their security issues, their breaking changes
- Don't change the public API signature without a changeset marked as major
- Don't use `console.log` — libraries should be silent unless the consumer opts into logging
- Don't assume the execution environment (browser vs Node vs edge runtime) — stay universal or document the requirement
- Don't export internal utilities "just in case someone needs them" — expanding the API surface is easy, contracting it is a breaking change
- Don't use `"type": "commonjs"` with `.js` extensions and hope dual publishing works — use explicit `.mjs`/`.cjs` extensions from your build tool
- Don't put `dependencies` that should be `peerDependencies` — duplicated React/Zod/framework instances cause runtime hell
- Don't skip `npm pack --dry-run` before publishing — it takes 2 seconds and catches missing files, included junk, oversized tarballs
- Don't publish without building and testing first — wire up `prepublishOnly` script: `"prepublishOnly": "npm run build && npm test"`
- Don't forget `"sideEffects": false` — without it, consumers get your whole library in their bundle even if they import one function
- [EDIT: project-specific guardrails]
