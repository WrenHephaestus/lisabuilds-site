# Workflow: Bug Triage & Fix

Most people hand Claude a bug report and say "fix it." Claude then guesses, applies a plausible-sounding patch, and you both pretend the problem is solved until it resurfaces on production Friday evening. Here's the slower approach that's actually faster.

---

## The Flow

### Step 1: Describe the Symptom, Not the Diagnosis

```
Bug: [What's happening — the observable symptom]
Expected: [What should happen instead]
Repro: [Steps to trigger it, if known]
Frequency: [Always? Sometimes? Only on production?]
```

**Bad:** "The auth is broken"
**Good:** "After logging in, users are redirected to /dashboard but see a 403. This happens every time on production but not locally. Started after yesterday's deploy."

### Step 2: Let Claude Investigate

```
Investigate this bug. Check [relevant files/areas] first.
Explain what you think is happening before suggesting a fix.
```

**Why "explain first":** Premature fixes address symptoms, not causes. You wouldn't let a mechanic replace your engine because you said "it makes a noise." Make Claude diagnose before it treats.

### Step 3: Verify the Diagnosis

Claude will propose what's wrong. Before accepting the fix:

```
Before fixing: can you show me evidence that [diagnosis] is the actual cause?
Check [specific thing you want verified].
```

### Step 4: Fix with a Fence

Claude loves to "improve" things while it's in there. Don't let it.

```
Fix this bug. Only modify what's necessary.
Don't refactor surrounding code, add extra error handling,
or "improve" anything unrelated.
```

### Step 5: Verify the Fix

```
Now write a test that would have caught this bug.
The test should fail without the fix and pass with it.
```

### Step 6: Check for Siblings

```
Are there other places in the codebase with the same pattern
that might have the same bug? Search for [pattern].
```

---

## Bug Triage Prompts by Category

### "It works locally but not in production"
```
Compare our local setup vs production for [feature].
Check: environment variables, API URLs, CORS config,
database connection strings, and any conditional logic
that branches on NODE_ENV or similar.
```

### "It broke after the last deploy"
```
Look at the git log for the last [N] commits.
Identify which changes could affect [broken feature].
Focus on [relevant directories].
```

### "It works sometimes"
```
This bug is intermittent. Look for:
- Race conditions (async operations without proper awaiting)
- Shared mutable state
- Cache invalidation issues
- Timing-dependent code
- Unhandled promise rejections
Relevant area: [files/feature]
```

### "It's slow"
```
[Feature/endpoint] is slow. Profile it:
1. Identify the hot path
2. Look for N+1 queries, missing indexes, unnecessary data loading
3. Check for synchronous operations that could be parallel
Don't optimize yet — just identify the bottleneck.
```
