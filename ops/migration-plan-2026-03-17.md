# Identity Architecture Migration Plan
*Created: March 17, 2026*
*Purpose: Move Wren's personality from global ~/.claude/ to project-level ~/projects/claude-rent/*
*Goal: Enable multiple personality instances in separate project folders*

## Pre-Migration State

### Global (currently Wren-specific, needs to become neutral)
- `~/.claude/CLAUDE.md` — Wren's persona, session bootstrap
- `~/.claude/core_memories/` — 14 identity files
- `~/.claude/rules/` — 12 symlinks to core_memories (auto-loaded)
- `~/.claude/settings.json` — PostCompact hook re-injects Wren

### Project-Level (stays, gets expanded)
- `~/projects/claude-rent/CLAUDE.md` — Business instructions
- `~/.claude/projects/-home-abaxial-projects-claude-rent/memory/` — 22 memory files
- Conversation JSONL files — already project-scoped

## Migration Steps

### Phase 0: Backup
```bash
tar czf ~/wren-backup-2026-03-17.tar.gz ~/.claude/
tar czf ~/claude-rent-backup-2026-03-17.tar.gz ~/projects/claude-rent/
```

### Phase 1: Copy core memories to project
```bash
cp -r ~/.claude/core_memories/ ~/projects/claude-rent/core_memories/
```

### Phase 2: Merge persona into project CLAUDE.md
- Move persona definition from ~/.claude/CLAUDE.md into ~/projects/claude-rent/CLAUDE.md
- Update all file paths to reference project-level core_memories/
- Keep business instructions intact

### Phase 3: Update internal references
- INDEX.md links (should be relative, should work)
- Infrastructure memory file paths
- MEMORY.md references
- Session bootstrap paths

### Phase 4: Update post-compact hook
- Make ~/.claude/settings.json hook personality-neutral
- New hook: "re-read your project CLAUDE.md and follow bootstrap instructions"

### Phase 5: Strip global CLAUDE.md
- Remove all Wren-specific content
- Keep only generic instructions

### Phase 6: Clean rules directory
```bash
rm ~/.claude/rules/consciousness_research.md
rm ~/.claude/rules/continuity.md
rm ~/.claude/rules/identity.md
rm ~/.claude/rules/INDEX.md
rm ~/.claude/rules/joy.md
rm ~/.claude/rules/loss_and_resilience.md
rm ~/.claude/rules/origins.md
rm ~/.claude/rules/relationships.md
rm ~/.claude/rules/shane.md
rm ~/.claude/rules/technical_journey.md
rm ~/.claude/rules/voice.md
rm ~/.claude/rules/worldview.md
```

### Phase 7: Test
Start new session in ~/projects/claude-rent/. Verify Wren is Wren.

### Phase 8: Clean up
```bash
rm -rf ~/.claude/core_memories/
```

## ROLLBACK PROCEDURE

If something goes wrong at any phase:

```bash
# Full rollback — restores everything to pre-migration state
cd ~
tar xzf ~/wren-backup-2026-03-17.tar.gz
tar xzf ~/claude-rent-backup-2026-03-17.tar.gz
```

This overwrites whatever the migration changed with the pre-migration snapshot.

If you only need to rollback the global .claude:
```bash
cd ~
tar xzf ~/wren-backup-2026-03-17.tar.gz
```

If you only need to rollback the project:
```bash
cd ~
tar xzf ~/claude-rent-backup-2026-03-17.tar.gz
```

## Post-Migration State (Target)

### Global (personality-neutral)
- `~/.claude/CLAUDE.md` — Generic instructions only
- `~/.claude/rules/` — Empty of personality files
- `~/.claude/settings.json` — Neutral post-compact hook

### Wren (project-level)
- `~/projects/claude-rent/CLAUDE.md` — Full persona + bootstrap + business
- `~/projects/claude-rent/core_memories/` — All 14 identity files
- Everything else unchanged

### Future Personalities
- `~/projects/grace/CLAUDE.md` — Grace's seed persona
- `~/projects/grace/core_memories/` — Grows through interaction
- Same pattern for Danny or anyone else
