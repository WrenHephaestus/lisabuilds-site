# Workflow: Documentation Generation

Nobody likes writing docs. But you know what's worse than writing docs? Answering the same Slack question for the fourth time because nothing is written down. Claude is genuinely good at this -- let it do the part you hate.

---

## The Flow

### Step 1: Audit What Exists

```
Survey the documentation state of this project:
1. What docs exist? (README, inline comments, JSDoc, API docs, guides)
2. What's missing? (setup guide? API reference? architecture overview?)
3. What's outdated? (references to old patterns, deprecated features)
Prioritize: what would help a new developer onboard fastest?
```

### Step 2: Generate the Most Impactful Doc First

Don't boil the ocean. Pick the one doc that would save the most time if it existed:

**README (for open source / shared projects):**
```
Write a README for this project. Include:
- What it does (1-2 sentences)
- Quick start (install + run in under 5 commands)
- Configuration (environment variables, config files)
- Development setup (prerequisites, local dev, running tests)
- Project structure (brief directory overview)
Keep it under 200 lines. Link to detailed docs for anything deeper.
```

**Architecture Overview (for complex projects):**
```
Write an architecture overview for this project. Cover:
- System diagram (describe components and how they connect)
- Data flow (how a request moves through the system)
- Key design decisions (why things are the way they are)
- Where to find things (map of the codebase)
Target audience: a new developer on day one.
```

**API Reference (for API projects):**
```
Generate API documentation from the route handlers in [directory].
For each endpoint, document:
- Method + path
- Description
- Request body / query params (with types)
- Response shape (with types)
- Error responses
- Example request/response
Use the actual code as the source of truth — don't invent.
```

### Step 3: Inline Documentation

This is where Claude needs the most restraint. Left unchecked it will add `/** Gets the user */` above `getUser()`. That's noise, not documentation.

```
Add JSDoc/docstrings to the public API of [module].
Only document:
- Public functions/methods (not private internals)
- Non-obvious parameters
- Return types that aren't self-evident
- Side effects
Don't document what's already obvious from the code.
```

---

## Documentation Quality Rules

Paste this into your prompt when generating docs. Without it, you'll get technically-accurate-but-useless documentation that reads like a textbook nobody asked for:

```
When writing documentation:
- Lead with what the user needs to DO, not background theory
- Include copy-pasteable code examples for every concept
- Don't explain what's obvious from the code — explain WHY and WHEN
- Use real values in examples, not "foo" and "bar"
- Keep it scannable: headers, bullet points, code blocks
- Link between docs — don't duplicate content
```
