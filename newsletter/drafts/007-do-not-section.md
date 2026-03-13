# Newsletter Issue #007 -- The Do NOT Section

**Subject line options (pick one):**
1. Stop telling Claude what to do. Start telling it what NOT to do.
2. The most important section of your CLAUDE.md isn't what you think.
3. Why "Do NOT" beats "please do" in Claude Code.

**Preview text:** Your biggest Claude Code frustrations have a one-section fix.

---

Hey! Lisa here. 🛠️

Quick question: have you ever asked Claude Code a question and had it rewrite half your codebase in response?

If yes, welcome to the club. There are [1,405 of us on Hacker News](https://news.ycombinator.com/item?id=47357042).

---

## 🔧 The Do NOT Section

Most CLAUDE.md advice focuses on what to tell Claude: your stack, your conventions, your project structure. That's good context. But the section that changes your daily experience the most is the one that says what Claude should **not** do.

Here's a starter set. Add this to your CLAUDE.md today:

```markdown
## Do NOT
- Do not modify any file unless I explicitly say "implement", "fix", "change", or "update"
- Do not add comments, docstrings, or type annotations to code you didn't change
- Do not refactor surrounding code when fixing a bug
- Do not create abstraction layers or helpers for one-time operations
- Do not install new dependencies without asking first
- When I ask a question about code, respond with explanation only
```

**Why this works:** Claude is trained to be helpful. Helpful means action. Positive instructions shape what Claude does *when it's already doing something*. Negative instructions prevent it from doing things you didn't ask for in the first place.

**The key:** Be specific, not aspirational. "Don't change things without asking" is vague. "Do not modify any file unless I say one of these four verbs" is enforceable.

---

## 🔍 Tool of the Week: nah

If you want hard boundaries (not just instructions, but enforcement), check out [nah](https://github.com/manuelschipper/nah).

It's a PreToolUse hook that classifies Claude's intended actions into 20+ types and blocks the ones you've disallowed. Before they execute. In milliseconds.

CLAUDE.md is trust-based (asking Claude to respect boundaries). nah is enforcement-based (Claude literally can't perform the blocked action). For most solo devs, CLAUDE.md is enough. For teams or high-stakes environments, nah adds a safety net.

---

## 💡 Pattern: Session-Level Boundaries

Your CLAUDE.md Do NOT section is permanent. But some boundaries are session-specific.

**Investigation mode:** Start a session with "This session is investigation only. Do NOT edit any files."

**Scoped changes:** "Fix the login bug in auth.ts. Do NOT touch any other file."

Layer project-level + session-level constraints and Claude's behavior changes dramatically.

---

The [Claude Code Playbook](https://zyzzy5.gumroad.com/l/zhmvdh) includes 12 project-specific CLAUDE.md templates with tailored Do NOT sections for web apps, APIs, CLI tools, data pipelines, and more. $9, one-time. The templates alone are worth hours of trial-and-error.

Until next week,
Lisa

---

**Publishing notes:**
- Subject line #1 is probably strongest (pattern interrupt, counterintuitive)
- This is the most directly product-selling issue so far. The pitch is natural because the playbook's Do NOT templates are genuinely the solution to the problem described.
- Cross-post potential: the core content (starter Do NOT section) works as a standalone Reddit post for r/ClaudeAI
- Pairs well with blog post: `website/src/content/blog/do-not-section.md`
