# Workflow: Refactoring Legacy Code

Refactoring with an AI assistant is either incredibly productive or incredibly destructive. There's not much in between. The difference is discipline.

---

## The Golden Rule

**Refactoring changes structure, not behavior.** If you're adding features or fixing bugs at the same time, do those in separate commits.

---

## The Flow

### Step 1: Understand Before You Touch

```
Read [file/module] and explain:
1. What it does (the public interface / behavior)
2. How it's structured (the internal architecture)
3. What's wrong with it (why it needs refactoring)
4. What depends on it (who calls this code)
Don't change anything yet.
```

### Step 2: Ensure Test Coverage Exists

```
Check the test coverage for [module].
If tests are missing, write them FIRST — before any refactoring.
These tests should capture the current behavior, even if that behavior
has quirks. We need them as a safety net.
```

**This is non-negotiable.** Refactoring without tests is just rearranging code and hoping. I know writing tests for code you're about to change feels like wasted effort. It's not. It's the only way you'll know if you broke something subtle.

### Step 3: Plan the Refactor

```
Propose a refactoring plan for [module]. Break it into steps where:
- Each step is a single, reviewable change
- Each step keeps all tests passing
- Each step can be committed independently
- If we stop after any step, the code is in a better state than before
```

### Step 4: Execute Step by Step

For each step in the plan:

```
Execute step [N] of the refactoring plan: [description].
Run the tests after making changes.
Only this step — don't jump ahead.
```

**Why step by step:** When something breaks (and eventually it will), you know exactly which step caused it. Your `git diff` is small, reviewable, and revertible. Big-bang refactors produce big-bang `git blame` nightmares.

### Step 5: Verify and Clean Up

```
The refactoring is done. Do a final check:
1. Run all tests
2. Search for any leftover dead code from the refactor
3. Check that imports are clean (no unused imports)
4. Make sure the public API hasn't changed
```

---

## Common Refactoring Recipes

### Extract Function
```
Extract the [describe logic] from [function] in [file] into its own function.
Name it [suggested name]. Keep it in the same file unless you have a better location.
Update callers.
```

### Split Large File
```
[File] is [N] lines and does too many things. Propose how to split it into
smaller, focused modules. Each module should have a single responsibility.
Don't change any public APIs — just reorganize the internals.
```

### Replace Inheritance with Composition
```
[Class] uses inheritance ([Base] → [Child]) but composition would be simpler.
Refactor to use composition instead. The public API should stay the same.
```

### Introduce Repository/Service Pattern
```
Database queries are scattered across [route handlers / controllers].
Extract them into a repository layer. Business logic goes in a service layer.
Start with [one entity] as the pattern, then I'll decide if we do the rest.
```

---

## Anti-Patterns

| Don't | Why |
|-------|-----|
| Refactor and add features in the same commit | If the feature has a bug, you can't revert it without losing the refactor |
| Refactor without tests | You'll change behavior without knowing it |
| Refactor everything at once | Big-bang refactors have big-bang failures |
| Let Claude "improve" code you didn't ask about | Use the Refactor Fence pattern from the cheatsheet |
