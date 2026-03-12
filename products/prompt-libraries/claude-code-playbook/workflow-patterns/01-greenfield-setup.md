# Workflow: Greenfield Project Setup

The most dangerous moment with AI-assisted coding is the very beginning. You've got a blank repo and infinite possibilities, and the temptation is to say "build me a thing" and let Claude go wild. Resist that.

Here's the sequence that actually works.

---

## The Flow

### Step 1: Describe Your Project (to Claude)

```
I'm starting a new [type of project]. Here's what it needs to do:
[2-3 sentences about the product/feature]

Tech preferences: [stack choices, if any]
Constraints: [budget, hosting, team size, timeline]

Before writing any code:
1. Suggest a tech stack with reasoning
2. Propose the project structure
3. Identify the first 3 things we should build
```

**Why start here:** You get Claude's reasoning before any code exists. Course-correcting a plan costs you 30 seconds. Course-correcting a codebase costs you an afternoon.

### Step 2: Generate the CLAUDE.md First

```
Based on this plan, create a CLAUDE.md for this project.
Use the [relevant template] from the playbook as a starting point.
Fill in our specific stack, conventions, and structure.
```

**Why this matters:** The CLAUDE.md is the first file, not the last. Every subsequent interaction benefits from it.

### Step 3: Scaffold the Project

```
Set up the project:
1. Initialize with [package manager / framework CLI]
2. Create the directory structure from our CLAUDE.md
3. Set up [linting / formatting / TypeScript config]
4. Create a minimal "hello world" that proves the stack works
5. Don't add any business logic yet
```

**Why scaffold separately:** I've watched people burn entire sessions debugging a feature only to discover the scaffold itself was broken. Verify the foundation compiles and runs before building anything real on top of it.

### Step 4: Build the First Vertical Slice

```
Build the simplest possible end-to-end version of [core feature].
It should go from [user action] to [result] through every layer of the stack.
Hardcode anything that isn't core to this flow.
```

**Why a vertical slice:** You prove the architecture works across every layer before going wide. Building all models, then all routes, then all UI is the "big bang" approach and it *always* hides integration bugs until the worst possible moment.

### Step 5: Add Tests for the Slice

```
Write tests for [the vertical slice]. Cover:
- Happy path
- One error case
- One edge case
Set up the test runner if it isn't already.
```

### Step 6: Iterate

You now have a working project with tests, a CLAUDE.md, and a proven architecture. Everything after this is the same loop: plan the next slice, implement it, test it. The hard part is already behind you.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Generating the entire app in one prompt | Break it into the steps above |
| Skipping CLAUDE.md | Create it first — it pays for itself immediately |
| No tests until "later" | "Later" is a lie you tell yourself. Test the first slice. |
| Over-specifying the stack | Let Claude suggest — then override where you have opinions |
| Starting with auth/payments | Start with the core value proposition. Auth can be added to a working app. |
