# Workflow: PR Review with Claude Code

Code review is one of those tasks where Claude genuinely shines. It doesn't get tired, doesn't skim, and doesn't rubber-stamp things because it's Friday afternoon. Here's how to use that.

---

## The Flow

### Quick Review (5 minutes)

For the "I'm about to commit and want a sanity check" moment.

```
Review my staged changes (or: review this diff).
Flag anything that's:
- Incorrect (bugs, logic errors)
- Insecure (injection, auth bypass, data exposure)
- Inconsistent with existing patterns in the codebase
Keep it brief — just the issues.
```

### Deep Review (15 minutes)

```
Do a thorough review of all changes in this branch since [base branch].
For each file changed, check:

1. Correctness: Does the logic do what it claims?
2. Security: Any OWASP top 10 issues? Data validation? Auth checks?
3. Performance: N+1 queries? Unnecessary re-renders? Missing indexes?
4. Error handling: What happens when things fail?
5. Edge cases: Empty arrays? Null values? Concurrent access?
6. Testing: Are the new/changed paths tested?
7. Style: Consistent with the existing codebase?

Format as a list of findings with severity (critical/warning/nit).
```

### Pre-Merge Checklist

The "last call" before you hit the green button. I've caught embarrassing things with this one.

```
I'm about to merge this PR. Final checklist:
- [ ] Are all tests passing?
- [ ] Are there any TODOs or temporary code that shouldn't be merged?
- [ ] Are environment variables documented if new ones were added?
- [ ] Is the migration reversible if we need to rollback?
- [ ] Would this change break anything for existing users?
```

---

## Reviewing Specific Concerns

### Security Review
```
Review [files/changes] specifically for security issues:
- SQL injection (raw queries, string interpolation)
- XSS (unsanitized user input in HTML/JSX)
- Auth/authz (missing checks, privilege escalation)
- Data exposure (logging sensitive data, overfetching in APIs)
- CSRF (state-changing GETs, missing tokens)
- File upload issues (path traversal, unrestricted types)
```

### Performance Review
```
Review [files/changes] for performance:
- Database: N+1 queries, missing indexes, full table scans
- Frontend: Unnecessary re-renders, bundle size impact, unoptimized images
- API: Unbounded queries, missing pagination, no caching where appropriate
- Memory: Unbounded growth, large objects held longer than needed
```

### API Contract Review
```
Review the API changes in this PR:
- Are request/response shapes documented?
- Are breaking changes to existing endpoints?
- Is input validated and sanitized?
- Are error responses consistent with our existing error format?
- Is pagination/filtering handled for list endpoints?
```
