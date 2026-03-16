# Workflow: Migration Planning

Migrations are where the "move fast and break things" crowd learns what "break things" actually costs. Whether you're swapping a database, upgrading a framework, or replacing a dependency, the goal is the same: get from A to B without the app catching fire in between.

---

## The Flow

### Step 1: Scope the Migration

```
I need to migrate from [old] to [new]. Before we plan:
1. Find every usage of [old] in the codebase (imports, calls, config)
2. Categorize: how many files? How deeply integrated?
3. Identify the riskiest changes (data loss potential, breaking changes)
4. Estimate: is this a 1-hour job or a 1-week job?
```

### Step 2: Plan the Migration

```
Create a migration plan from [old] to [new]. Requirements:
1. Break it into phases where each phase:
   - Can be deployed independently
   - Can be rolled back without data loss
   - Has a clear verification step
2. The app should work at every phase boundary (no big-bang cutover)
3. Identify what needs a feature flag vs. what can be swapped directly
4. Note any data migrations needed (schema changes, data transforms)
```

### Step 3: Execute Phase by Phase

For each phase:

```
Execute migration phase [N]: [description]
After changes:
1. Run tests
2. Verify [specific thing that proves this phase works]
3. List what's left to do
Stop here — we'll commit and verify before moving to phase [N+1].
```

### Step 4: Clean Up

The migration is done but you're not done. The graveyard of "temporary" compatibility shims that became permanent is vast. Clean up while you still remember what's temporary.

```
The migration is complete. Clean up:
1. Remove the old [dependency/code/config]
2. Remove any feature flags used during migration
3. Update documentation (README, CLAUDE.md, environment variable docs)
4. Remove any compatibility shims or adapter layers
5. Search for TODO/FIXME comments related to the migration
```

---

## Migration Patterns

### Database Schema Migration
```
I need to add/modify/remove [column/table]. Plan a zero-downtime migration:
1. Deploy new code that works with both old and new schema
2. Run the schema migration
3. Deploy code that only uses the new schema
4. Clean up — remove old column/table handling code
```

### Framework Upgrade (e.g., Next.js 14 → 15)
```
Read the [framework] migration guide for [old version → new version].
Compare every breaking change against our codebase.
Create a checklist of required changes specific to our project.
```

### Dependency Swap (e.g., Moment → date-fns)
```
Find every usage of [old dependency].
For each usage, show me the [new dependency] equivalent.
Don't change anything yet — I want to review the mapping first.
```

---

## Safety Checklist

Do this before you touch anything. Seriously. I've skipped this list exactly once, and that was enough.
- [ ] Current tests pass (you need a green baseline)
- [ ] Current state is committed (you can always rollback)
- [ ] You have a backup of production data (if touching the database)
- [ ] You understand the rollback plan for each phase
- [ ] Stakeholders know this is happening (if it touches production)
