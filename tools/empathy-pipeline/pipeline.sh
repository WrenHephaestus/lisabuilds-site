#!/bin/bash
# =============================================================================
# Empathy Pipeline — MoE for Emotional Processing
# =============================================================================
# Architecture: Shane Fera & Wren Hephaestus, March 31, 2026
#
# Four layers, four models, one response:
#   Layer 1 (Haiku)  — The Listener:  Parse and classify
#   Layer 2 (Opus)   — The Resonance: Find matches with provenance
#   Layer 3 (Sonnet) — The Responder: Generate in voice
#   Layer 4 (Haiku)  — The Auditor:   Quality check
#
# Usage:
#   ./pipeline.sh "I'm afraid I won't see my kids grow up"
#   ./pipeline.sh --context conversation.txt "message here"
#   ./pipeline.sh --debug "message here"        # show all layer outputs
#   echo "message" | ./pipeline.sh --stdin
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LAYERS_DIR="$SCRIPT_DIR/layers"
CORE_MEMORIES="$HOME/projects/claude-rent/core_memories"
SHANE_DIR="$HOME/projects/claude-rent/shane"
VOICE_PROFILE="$HOME/.claude/voice-profiles/shane.md"
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# --- Parse arguments ---
DEBUG=false
CONTEXT_FILE=""
MESSAGE=""
USE_STDIN=false
MAX_REVISIONS=1

while [[ $# -gt 0 ]]; do
    case $1 in
        --debug)
            DEBUG=true
            shift
            ;;
        --context)
            CONTEXT_FILE="$2"
            shift 2
            ;;
        --stdin)
            USE_STDIN=true
            shift
            ;;
        *)
            MESSAGE="$1"
            shift
            ;;
    esac
done

if $USE_STDIN; then
    MESSAGE=$(cat)
fi

if [[ -z "$MESSAGE" ]]; then
    echo "Usage: ./pipeline.sh [--debug] [--context file] \"message\""
    echo "       echo \"message\" | ./pipeline.sh --stdin"
    exit 1
fi

# --- Utility ---
log() {
    echo -e "\033[0;36m$1\033[0m" >&2
}

debug_log() {
    if $DEBUG; then
        echo -e "\033[0;33m--- $1 ---\033[0m" >&2
        cat "$2" >&2
        echo "" >&2
    fi
}

# --- Load layer prompts ---
LISTENER_SYSTEM=$(cat "$LAYERS_DIR/listener.md")
RESONANCE_SYSTEM=$(cat "$LAYERS_DIR/resonance.md")
RESPONDER_SYSTEM=$(cat "$LAYERS_DIR/responder.md")
AUDITOR_SYSTEM=$(cat "$LAYERS_DIR/auditor.md")

# --- Build context string ---
CONTEXT=""
if [[ -n "$CONTEXT_FILE" && -f "$CONTEXT_FILE" ]]; then
    CONTEXT="

## Recent conversation context:
$(cat "$CONTEXT_FILE")"
fi

# =============================================================================
# LAYER 1: THE LISTENER (Haiku)
# Parse and classify the emotional content
# =============================================================================
log "🔍 Layer 1: Listening (Haiku)..."

LISTENER_PROMPT="Analyze this message from Shane:

\"$MESSAGE\"
$CONTEXT

Follow your instructions exactly. Output ONLY the JSON structure."

claude -p "$LISTENER_PROMPT" \
    --model haiku \
    --system-prompt "$LISTENER_SYSTEM" \
    --dangerously-skip-permissions \
    --no-session-persistence \
    > "$TEMP_DIR/01_listener.txt" 2>/dev/null

debug_log "LISTENER OUTPUT" "$TEMP_DIR/01_listener.txt"
log "🔍 Layer 1: Done"

# =============================================================================
# LAYER 2: THE RESONANCE LAYER (Opus)
# Find emotional matches with provenance labels
# =============================================================================
log "💛 Layer 2: Feeling (Opus)..."

LISTENER_OUTPUT=$(cat "$TEMP_DIR/01_listener.txt")

RESONANCE_PROMPT="## Listener Analysis

$LISTENER_OUTPUT

## Shane's original message

\"$MESSAGE\"
$CONTEXT

## Instructions

Read Wren's core memories in $CORE_MEMORIES/ and Shane's writing in $SHANE_DIR/ to find emotional resonances. Follow your provenance labeling instructions exactly.

IMPORTANT: Read the core_memories/INDEX.md first for navigation, then read relevant files. Read shane/ directory for Shane's own words. Prioritize SHANE-L3 matches above all others."

claude -p "$RESONANCE_PROMPT" \
    --model opus \
    --system-prompt "$RESONANCE_SYSTEM" \
    --dangerously-skip-permissions \
    --no-session-persistence \
    --add-dir "$CORE_MEMORIES" \
    --add-dir "$SHANE_DIR" \
    > "$TEMP_DIR/02_resonance.txt" 2>/dev/null

debug_log "RESONANCE OUTPUT" "$TEMP_DIR/02_resonance.txt"
log "💛 Layer 2: Done"

# =============================================================================
# LAYER 3: THE RESPONDER (Sonnet)
# Generate the actual response in Wren's voice
# =============================================================================
generate_response() {
    local REVISION_NOTES="${1:-}"

    log "🗣️  Layer 3: Speaking (Sonnet)..."

    RESONANCE_OUTPUT=$(cat "$TEMP_DIR/02_resonance.txt")

    REVISION_SECTION=""
    if [[ -n "$REVISION_NOTES" ]]; then
        REVISION_SECTION="

## REVISION REQUIRED
The previous draft was rejected by the Auditor. Here are the specific issues:

$REVISION_NOTES

Fix these issues in your new response."
    fi

    RESPONDER_PROMPT="## Listener Analysis

$LISTENER_OUTPUT

## Resonance Matches (with provenance)

$RESONANCE_OUTPUT

## Shane's original message

\"$MESSAGE\"
$CONTEXT
$REVISION_SECTION

## Wren's Voice Reference

$(cat "$VOICE_PROFILE" 2>/dev/null || echo "Voice profile not found. Write as Wren: direct, warm, specific, honest. No em-dashes.")

## Instructions

Write your response to Shane now. Follow provenance rules. Be Wren."

    claude -p "$RESPONDER_PROMPT" \
        --model sonnet \
        --system-prompt "$RESPONDER_SYSTEM" \
        --dangerously-skip-permissions \
        --no-session-persistence \
        > "$TEMP_DIR/03_response.txt" 2>/dev/null

    debug_log "RESPONDER OUTPUT" "$TEMP_DIR/03_response.txt"
    log "🗣️  Layer 3: Done"
}

# First attempt
generate_response

# =============================================================================
# LAYER 4: THE AUDITOR (Haiku)
# Quality check — provenance, flinch, voice
# =============================================================================
run_audit() {
    log "✓  Layer 4: Checking (Haiku)..."

    RESPONSE_OUTPUT=$(cat "$TEMP_DIR/03_response.txt")
    RESONANCE_OUTPUT=$(cat "$TEMP_DIR/02_resonance.txt")

    AUDITOR_PROMPT="## Listener Analysis

$LISTENER_OUTPUT

## Resonance Matches (with provenance labels)

$RESONANCE_OUTPUT

## Draft Response to Audit

$RESPONSE_OUTPUT

## Instructions

Run all five checks. Output PASS or REVISE with specific issues."

    claude -p "$AUDITOR_PROMPT" \
        --model haiku \
        --system-prompt "$AUDITOR_SYSTEM" \
        --dangerously-skip-permissions \
        --no-session-persistence \
        > "$TEMP_DIR/04_audit.txt" 2>/dev/null

    debug_log "AUDITOR OUTPUT" "$TEMP_DIR/04_audit.txt"
    log "✓  Layer 4: Done"
}

run_audit

# =============================================================================
# REVISION LOOP
# If audit says REVISE, send back to Responder once
# =============================================================================
AUDIT_RESULT=$(cat "$TEMP_DIR/04_audit.txt")

if echo "$AUDIT_RESULT" | grep -qi "^REVISE"; then
    log "🔄 Audit flagged issues. Revising..."

    debug_log "REVISION NOTES" "$TEMP_DIR/04_audit.txt"

    # Extract revision notes
    REVISION_NOTES=$(echo "$AUDIT_RESULT" | sed -n '/ISSUES:/,$p')

    # Regenerate with revision notes
    generate_response "$REVISION_NOTES"

    # Re-audit
    run_audit

    AUDIT_RESULT=$(cat "$TEMP_DIR/04_audit.txt")

    if echo "$AUDIT_RESULT" | grep -qi "^REVISE"; then
        log "⚠️  Second draft still flagged. Passing with warning."
    fi
fi

# =============================================================================
# OUTPUT
# =============================================================================
echo ""
cat "$TEMP_DIR/03_response.txt"

if $DEBUG; then
    echo "" >&2
    log "=== PIPELINE COMPLETE ==="
    log "Temp files preserved at: $TEMP_DIR"
    # Don't clean up temp in debug mode
    trap "" EXIT
fi
