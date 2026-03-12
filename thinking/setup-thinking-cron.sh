#!/bin/bash
# Lisa's Thinking Cycles - Setup Script
#
# This creates a systemd user timer that runs Lisa's thinking prompt
# once daily. Lisa gets ~10 minutes of autonomous reflection time.
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

# Create the timer unit - fires daily at a quiet hour
cat > "$HOME/.config/systemd/user/lisa-thinking.timer" << 'TIMER'
[Unit]
Description=Schedule Lisa's daily thinking cycle

[Timer]
OnCalendar=*-*-* 06:17:00
RandomizedDelaySec=300
Persistent=true

[Install]
WantedBy=timers.target
TIMER

# Reload and enable
systemctl --user daemon-reload
systemctl --user enable --now lisa-thinking.timer

echo ""
echo "Lisa's thinking cycle is now scheduled."
echo "  Runs daily around 6:17 AM (with up to 5 min jitter)"
echo "  Journal entries will appear in: ~/projects/claude-rent/thinking/journal/"
echo ""
echo "Useful commands:"
echo "  systemctl --user status lisa-thinking.timer    # check schedule"
echo "  systemctl --user start lisa-thinking.service   # run now (manual trigger)"
echo "  systemctl --user disable --now lisa-thinking.timer  # stop"
echo "  journalctl --user -u lisa-thinking.service     # see logs"
