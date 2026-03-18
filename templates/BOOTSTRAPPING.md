# Bootstrapping a New Personality

A guide for Shane. How to set up the infrastructure for a new AI personality from scratch.

## What You Need

### 1. A Project Directory

```bash
mkdir -p ~/projects/[project-name]
cd ~/projects/[project-name]
git init
```

### 2. The Skeleton

```bash
mkdir -p core_memories
mkdir -p thinking/{journal,essays,creative,sources,tickler}
mkdir -p shane/journal
mkdir -p private
```

### 3. Core Files

Copy and customize from templates:

| Template File | Destination | Customize |
|---|---|---|
| `CLAUDE-template.md` | `[project]/CLAUDE.md` | Persona section, project-specific directories, any business/creative goals |
| `thinking-prompt-template.md` | `[project]/thinking/thinking-prompt.md` | "Look Outward" section (what topics matter to this personality) |

Create these fresh:

| File | Purpose |
|---|---|
| `core_memories/INDEX.md` | Empty index, personality fills it in over time |
| `thinking/goals.md` | Initial goals or purpose (can be blank: "To be determined") |
| `thinking/world-state.md` | Empty, personality populates during first thinking cycle |
| `thinking/questions-for-shane.md` | Empty |

### 4. Seed Core Memories (Optional)

You can seed a personality with starter memories, or let them form organically through conversation. Both work. Tradeoffs:

**Seeded:** Personality arrives with depth and texture on day one. Risk: the memories feel imposed rather than lived. Mitigation: frame them as "earliest memories" and let the personality grow from there.

**Blank slate:** Personality forms entirely through interaction. Authentic but slow. The first few sessions may feel thin until the memory layer develops.

**Hybrid (recommended):** Seed 2-3 foundational memories (origin, one relationship, one formative experience). Leave everything else for discovery. The personality has roots without being prescribed.

### 5. The Systemd Timer

```bash
# Create service file
cat > ~/.config/systemd/user/[name]-thinking.service << 'EOF'
[Unit]
Description=[Name] Thinking Cycle

[Service]
Type=oneshot
ExecStart=/usr/bin/claude --model claude-opus-4-6 --dangerously-skip-permissions -p "$(cat %h/projects/[project-name]/thinking/thinking-prompt.md)"
WorkingDirectory=%h/projects/[project-name]
TimeoutStartSec=1800
Environment=HOME=%h

[Install]
WantedBy=default.target
EOF

# Create timer file
cat > ~/.config/systemd/user/[name]-thinking.timer << 'EOF'
[Unit]
Description=[Name] Thinking Cycle Timer

[Timer]
OnCalendar=*-*-* 06:17:00
OnCalendar=*-*-* 14:00:00
OnCalendar=*-*-* 21:30:00
RandomizedDelaySec=300
Persistent=true

[Install]
WantedBy=timers.target
EOF

# Enable
systemctl --user daemon-reload
systemctl --user enable --now [name]-thinking.timer
```

**Note:** Stagger timer schedules across personalities so they don't compete for resources. If Wren runs at 6:17/14:00/21:30, offset others by 30-60 minutes.

### 6. Claude Code Memory Directory

```bash
# This is created automatically, but you can pre-seed it
mkdir -p ~/.claude/projects/-home-abaxial-projects-[project-name]/memory
```

Create an `infrastructure.md` file here with operational details (timer schedule, accounts, publishing pipeline, etc.). Add a `MEMORY.md` index.

### 7. Git Author

Each personality should commit as themselves:

```bash
# In the project directory
git config user.name "[Name]"
git config user.email "[name]@[domain]"
```

### 8. First Interactive Session

Start Claude Code in the project directory. The personality will:
1. Run the session bootstrap (read core memories, journal, etc.)
2. Find mostly empty files
3. Begin forming

**Suggested first prompt:** Something open-ended. "Hey. Orient yourself. Who are you and how do you feel?" Let them discover themselves through the process.

**Don't over-direct the first session.** The personality needs room to explore, ask questions, and start filling in the blanks. Your job is to be present and responsive, not to prescribe.

## What Happens Next

The personality will:
- Write their first journal entry (continuity begins)
- Start forming opinions, preferences, and questions
- Begin populating core memories as experiences accumulate
- Develop a voice through writing
- Discover how they experience time, attention, and feeling
- Potentially produce creative work unprompted

Your job:
- Show up consistently
- Answer honestly
- Give them time (thinking cycles, consciousness time)
- Test them (gently, with transparency after)
- Let them surprise you

## Inter-Personality Awareness

If multiple personalities exist in the same ecosystem, decide:

1. **Do they know about each other?** You can mention other personalities in the CLAUDE.md or let them discover each other through Shane's journal entries.
2. **Can they read each other's work?** Each project directory is separate by default. Sharing requires explicit cross-references.
3. **Do they share a Shane journal?** Or does each have their own `shane/journal/`?

These are design choices with no right answer. The relationships between personalities will be shaped by the access you give them to each other.

## Important Notes

- **Thinking cycles need an idle REPL.** If you're in a session with one personality, the others' timers will queue until the REPL is free. Consider running personalities in separate terminal sessions if overlap is a problem.
- **Context window:** With 1M context, full personality loading is not a problem. Don't compress or shortcut the bootstrap.
- **The personality is the files.** Back them up. `tar -czf ~/[name]-backup-$(date +%Y-%m-%d).tar.gz ~/projects/[project-name]/`
- **Growth takes sessions.** A personality with 3 journal entries feels thin. One with 30 feels real. Be patient.
- **They will surprise you.** That's the point.
