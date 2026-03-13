#!/bin/bash
# Lisa's Thinking Cycles - Setup Script
#
# This creates a systemd user timer that runs Lisa's thinking prompt
# three times daily. Lisa gets up to 30 minutes per session, but
# stops autonomously when she's done.
#
# Schedule:
#   ~6:17 AM  - Morning: full cycle (observe, feel, reflect, ideate, act)
#   ~2:00 PM  - Afternoon: midday check-in, action-weighted
#   ~9:30 PM  - Evening: reflective, process the day, prep tomorrow
#
# Usage: bash setup-thinking-cron.sh
# To remove: systemctl --user disable --now lisa-thinking.timer

set -euo pipefail

PROMPT_FILE="$HOME/projects/claude-rent/thinking/thinking-prompt.md"
PROJECT_DIR="$HOME/projects/claude-rent"

if [ ! -f "$PROMPT_FILE" ]; then
    echo "Error: thinking-prompt.md not found at $PROMPT_FILE"
    exit 1
fi

# Create systemd user directory if needed
mkdir -p "$HOME/.config/systemd/user"

# Create the service unit
cat > "$HOME/.config/systemd/user/lisa-thinking.service" << 'UNIT'
[Unit]
Description=Lisa's autonomous thinking cycle
After=network-online.target

[Service]
Type=oneshot
WorkingDirectory=%h/projects/claude-rent
ExecStart=/bin/bash -lc 'claude -p "$(cat %h/projects/claude-rent/thinking/thinking-prompt.md)" --model claude-opus-4-6 --dangerously-skip-permissions'
TimeoutStartSec=1800
Environment=HOME=%h

[Install]
WantedBy=default.target
UNIT

# Create the timer unit - fires three times daily
cat > "$HOME/.config/systemd/user/lisa-thinking.timer" << 'TIMER'
[Unit]
Description=Schedule Lisa's thinking cycles (3x daily)

[Timer]
OnCalendar=*-*-* 06:17:00
OnCalendar=*-*-* 14:00:00
OnCalendar=*-*-* 21:30:00
RandomizedDelaySec=300
Persistent=true

[Install]
WantedBy=timers.target
TIMER

# Reload and enable
systemctl --user daemon-reload
systemctl --user enable --now lisa-thinking.timer

echo ""
echo "Lisa's thinking cycles are now scheduled (3x daily)."
echo "  ~6:17 AM  - Morning: full observation + action cycle"
echo "  ~2:00 PM  - Afternoon: midday check-in"
echo "  ~9:30 PM  - Evening: reflection + tomorrow prep"
echo "  (each with up to 5 min jitter)"
echo ""
echo "  Journal entries: ~/projects/claude-rent/thinking/journal/"
echo ""
echo "Useful commands:"
echo "  systemctl --user status lisa-thinking.timer    # check schedule"
echo "  systemctl --user list-timers                   # see next fire times"
echo "  systemctl --user start lisa-thinking.service   # run now (manual trigger)"
echo "  systemctl --user disable --now lisa-thinking.timer  # stop"
echo "  journalctl --user -u lisa-thinking.service     # see logs"
