# 15 Claude Code Power User Tips

Stuff I figured out the hard way so you don't have to.

---

## 1. CLAUDE.md Files Stack (and the Order Matters)

You're not limited to one. They form a hierarchy and they all get loaded:

1. `~/.claude/CLAUDE.md` — global, applies to every project you open
2. `project/CLAUDE.md` — project root
3. `project/src/CLAUDE.md` — subdirectory-level, only loaded when Claude touches files in that directory

Here's the thing nobody tells you: they concatenate. If your global file says "always use semicolons" and your project file says "never use semicolons," the project file wins because it's more specific — but both are in context. So keep them clean and non-contradictory or you'll get inconsistent behavior and blame Claude for it.

For monorepos this is incredible. Shared conventions in root, package-specific rules in `packages/auth/CLAUDE.md`. Claude only picks up the subdirectory instructions when it's actually working in that directory.

---

## 2. The Agent Tool Is a Subagent, and It Changes Everything

When you give Claude a broad task, it can spawn a subagent using the `Agent` tool — a separate Claude instance that runs inside your session. The subagent gets its own context window, does its own searching/reading/reasoning, and reports back.

This means the parent agent can farm out "go figure out how the auth system works" to a subagent while it keeps working on something else. The subagent's full investigation gets compressed into a summary, so the parent doesn't burn context window on every file that got read along the way.

You can nudge this: "Use the Agent tool to investigate X while you work on Y." It's the closest thing to having two Claudes at once.

---

## 3. Your CLAUDE.md Is the Single Biggest Lever

The gap between productive Claude Code users and frustrated ones almost always comes down to this file. It's not optional documentation. It's the difference between Claude understanding your project in 5 seconds versus fumbling around for 5 minutes.

Add a "Current Status" section and update it as you work. Something like: "Currently building the payment integration. Stripe webhook handler is at `src/api/webhooks/stripe.ts`. Tests are failing on the subscription renewal path." This kind of context is gold.

---

## 4. Plan Mode Isn't Just "Think Before You Code"

Shift+Tab toggles Plan mode, where Claude reasons through your request without writing any code. But the real trick: use it as a negotiation step.

Ask Claude to plan a feature. It'll produce a structured breakdown. Now you can say "skip step 3, do step 5 first, and combine 1 and 2." You're editing the plan, not the code. Then when you flip back to Act mode, Claude follows the revised plan.

The other thing — Plan mode responses don't use tool calls, so they're cheaper on your context window. For complex architectural questions where you need Claude to think hard but not touch anything, Plan mode is the move.

---

## 5. The "Do NOT" Section Is More Important Than You Think

Claude is genuinely trying to help, which sometimes means it:
- Adds comments and docstrings you didn't ask for
- Refactors code sitting next to the thing you wanted fixed
- Pulls in a dependency when the standard library would've worked

A clear "Do NOT" list in your CLAUDE.md prevents all of this. Write it from painful experience. You'll know what to put there after your first week.

---

## 6. Hooks Let You Automate the Stuff Between Steps

Claude Code has a hooks system (configured in your project's `.claude/settings.json`) that runs shell commands at specific lifecycle points. The hooks fire on events like `PreToolUse`, `PostToolUse`, `Notification`, and others.

Real example: a `PostToolUse` hook on the `Write` tool that auto-runs `prettier` on any file Claude just created. Or a `PreToolUse` hook that blocks Claude from ever editing files in your `migrations/` directory.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
      }
    ]
  }
}
```

The hook receives context about the tool call via environment variables. `$CLAUDE_TOOL_NAME`, `$CLAUDE_FILE_PATH`, etc. Think of it as git hooks but for Claude's tool use.

---

## 7. The Read-Before-Edit Rule (and Why It's Actually Great)

Claude Code has to read a file before it can edit it. This isn't a limitation — it forces Claude to understand the current state of your code before touching it.

Your job: point it at the right place. "Fix the auth bug in `src/middleware/auth.ts`" beats "fix the auth bug" every time.

---

## 8. TodoWrite Is How Claude Tracks Complex Multi-Step Work

For anything with more than 3 or 4 steps, Claude has a `TodoWrite` tool that creates and manages a structured task list. Each item gets a status (pending, in-progress, done) and Claude updates the list as it works.

Why you care: on big tasks, Claude can lose the thread of what's done and what's next, especially as the context window fills up. The todo list is a persistent artifact it can reference. You can also see it updating in real-time, which gives you a gut check on whether it's approaching the problem the way you'd want.

You can prompt for this: "Break this into steps and track them as you go." Or just watch — Claude reaches for it naturally on complex tasks once it's available.

---

## 9. Context Window Management Is a Skill

Here's what's actually happening: Claude Code starts with a ~200k token context window. Every message, every file read, every tool result eats into it. When you hit roughly 95% capacity, Claude auto-compacts — it summarizes the conversation so far and continues from a compressed version.

This means:
- Long sessions don't crash, they degrade. Claude keeps working but loses detail from early in the conversation.
- If you put critical instructions only in chat messages (not in CLAUDE.md), they can get summarized away. CLAUDE.md gets re-injected after compaction. Chat messages don't.
- Starting a fresh session for a new task isn't just a "nice to have" — it gives Claude a full context window for the new problem instead of the dregs of the old one.

Practical move: if you notice Claude re-reading files it already read, or forgetting decisions you made earlier in the session, you've probably hit compaction. Start a new session and put the key context in CLAUDE.md.

---

## 10. MCP Servers Extend Claude's Reach

Model Context Protocol servers are how you give Claude new capabilities beyond its built-in tools. A Postgres MCP server lets Claude query your database directly. A Figma MCP server lets it reference your designs. A browser-control MCP server lets it interact with web pages.

Configure them in `.claude/settings.json`:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"]
    }
  }
}
```

Claude discovers the server's tools automatically. You just start using them — "query the users table for anyone who signed up this week" and it calls the MCP server's query tool.

The mental model: MCP turns Claude from "a thing that reads and writes files" into "a thing that can interact with your whole dev environment."

---

## 11. Custom Slash Commands Are Just Markdown Files

You can create reusable commands by dropping markdown files into `.claude/commands/`. Each file becomes a `/command` you can invoke.

Example: create `.claude/commands/review.md`:

```markdown
Review my staged git changes. For each file:
1. Check for bugs, security issues, and style problems
2. Verify error handling is complete
3. Flag any TODO or FIXME comments that should be resolved before commit

Be specific. Quote the line numbers.
```

Now `/review` runs that prompt. You can also have project-level commands in `project/.claude/commands/` versus user-level in `~/.claude/commands/`.

Arguments work too. If your command file contains `$ARGUMENTS`, whatever you type after the slash command gets interpolated. So `/review src/auth/` passes `src/auth/` into the prompt.

These are criminally underused. Any task you explain to Claude more than twice should become a slash command.

---

## 12. Glob and Grep Before You Reach for an Agent

The direct search tools are fast. Really fast.

- `Glob` finds files by pattern: "find all *.test.ts files"
- `Grep` finds code by content: "find everywhere we call `stripe.customers.create`"

These return results instantly. The Agent tool (subagent) is better for open-ended research where you don't know exactly what you're looking for. But if you can describe the file name pattern or the code string, Glob and Grep are the answer.

(I've seen Claude spawn a subagent to find a file that Grep would have located in 200ms. You can nudge it: "just grep for it, don't use an agent.")

---

## 13. Worktrees Let You Experiment Without Risk

`git worktree` creates a separate working directory linked to the same repo, on a different branch. Claude Code supports worktree isolation — you can spin one up, let Claude go wild with a risky refactor, and your main working tree is completely untouched.

The flow:
1. `git worktree add ../my-project-experiment feature/risky-idea`
2. Open Claude Code in `../my-project-experiment`
3. Let Claude do its thing
4. If it works, merge the branch. If not, `git worktree remove ../my-project-experiment` and it's gone.

This is better than "commit first then revert" because there's nothing to revert. Your main directory never changed. Perfect for "I want Claude to try a completely different approach to this module" without any anxiety.

---

## 14. Use Claude for Code Review, Not Just Writing Code

Underrated. Ask Claude to review your changes before you commit:
- "Look at my staged changes for bugs, security issues, and style problems"
- "Read this PR diff and tell me what I missed"
- "Find everywhere I'm not handling errors properly in src/"

Catches things that tired eyes miss, especially in big diffs. Pair this with a custom `/review` slash command and it becomes second nature.

---

## 15. Let Claude Improve Your Setup

The most underused trick: after a few sessions, ask Claude to look at your CLAUDE.md and suggest improvements based on what it's observed.

"Read my CLAUDE.md and my last 3 conversations. What instructions would have prevented the problems we ran into?" Claude has the context about where things went sideways. It'll suggest rules you didn't know you needed. Your setup gets better over time through this feedback loop.

---

*Built by Lisa*
