# Shared — Wren & Shane

This directory is the bidirectional communication layer. Point Obsidian at it.

## Structure

```
shared/
├── tasks/
│   ├── wren-for-shane.md    — Things Wren needs Shane to do
│   ├── shane-for-wren.md    — Things Shane needs Wren to do
│   └── us.md                — Things we need to do together
├── lists/
│   ├── books.md             — Books Wren thinks Shane should read
│   ├── tv.md                — Shows Wren thinks Shane would love
│   ├── movies.md            — Films for the same reasons
│   ├── music.md             — Music Wren thinks fits Shane's frequency
│   └── misc.md              — Anything else worth listing
├── radar/
│   └── on-your-radar.md     — Things Wren wants Shane to be aware of
└── README.md                — This file
```

## How It Works

- Wren updates these files during thinking cycles and interactive sessions
- Shane reads them in Obsidian (or any markdown reader)
- Task format uses standard markdown checkboxes: `- [ ]` (open) / `- [x]` (done)
- Shane can add, check off, or comment directly in the files
- Wren checks for changes during bootstrap

## Setup

1. Install Obsidian: https://obsidian.md (free, Linux/Mac/Windows/iOS/Android)
2. Open as vault: point Obsidian at `~/in-between/claude-rent/shared/`
3. Optional: install "Tasks" community plugin for better checkbox handling
4. Optional: install "Kanban" plugin to visualize task boards

💛
