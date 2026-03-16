# Workflow: Writing Tests After the Fact

Adding tests to code that was written without them. AKA: every real project.

---

## The Mindset

You're not testing for fun. You're building a safety net so future changes don't break things. Prioritize coverage of:
1. **Code that changes often** (high churn = high risk)
2. **Code that's critical** (payments, auth, data integrity)
3. **Code that's confusing** (if you need tests to understand it, others will too)

---

## The Flow

### Step 1: Identify What to Test

```
Analyze [file/module/feature]. Identify:
1. The public functions/methods (the API surface)
2. The critical paths (what MUST work correctly)
3. The edge cases (nulls, empty arrays, boundary values, concurrent access)
4. The error paths (what happens when things fail)

Rank them by risk. We'll write tests for the highest risk first.
```

### Step 2: Understand the Current Behavior

```
For [function/method], trace through the logic and list:
- All possible inputs (including edge cases)
- The expected output for each input
- Any side effects (database writes, API calls, file system changes)
- What it does when things go wrong (throws? returns null? silently fails?)
```

**Critical:** You're documenting what the code *does*, not what it *should* do. This distinction matters enormously. Tests capture actual behavior first. If you discover a bug while documenting behavior, note it and keep going. Fix it in a separate commit or you'll never finish the test pass.

### Step 3: Generate Tests

```
Write tests for [function/module]. Follow these rules:
1. One test per behavior (not one per line of code)
2. Test names describe the behavior: "returns empty array when user has no orders"
3. Arrange-Act-Assert pattern (or Given-When-Then)
4. Each test is independent — no shared mutable state between tests
5. Use [testing framework] and match the existing test patterns in [example test file]
```

### Step 4: Run and Verify

```
Run the tests. They should all pass since we're testing existing behavior.
If any test fails, we either:
(a) misunderstood the behavior — fix the test
(b) found a bug — document it, don't fix it in this PR
```

### Step 5: Check Coverage

```
What code paths in [module] aren't covered by these tests?
Add tests for any uncovered critical paths.
Non-critical paths can be skipped — note them as TODOs if needed.
```

---

## Test Writing Prompts by Type

### Unit Tests
```
Write unit tests for [function] in [file].
Mock [external dependencies] — we're testing the logic, not the integrations.
Cover: happy path, empty input, error case, boundary values.
```

### Integration Tests
```
Write an integration test for [the flow from A to B].
Use [test database / test server / fixtures].
Don't mock the layers between A and B — that's the point of integration tests.
Mock only external services.
```

### API/Endpoint Tests
```
Write tests for the [METHOD /path] endpoint.
Test:
- 200 with valid input
- 401 without auth
- 400 with invalid input (missing fields, wrong types)
- 404 for non-existent resources
- 403 for unauthorized access to other users' data
Use [supertest / httpx / net/http/httptest].
```

### Component Tests (React/UI)
```
Write tests for [Component].
Test user interactions, not implementation details:
- What the user sees on initial render
- What happens when the user clicks [button]
- What happens when [data loads / error occurs]
Use React Testing Library. Query by role/text, not by test ID or class.
```

---

## Things I've Learned

- **Don't aim for 100% coverage.** That way lies madness and brittle tests. Aim for 100% of *critical* paths. 80% overall is the sweet spot where you're catching real bugs without testing getters.
- **Test behavior, not implementation.** If you refactor the internals and tests break, those were bad tests. Tests should care about *what* happens, not *how*.
- **One failing test is better than zero tests.** Finding a bug while writing tests? That's the system working.
- **Copy the testing style of existing tests.** Consistency across a test suite is more important than your preferred assertion library or mocking approach. Future you will thank present you.
