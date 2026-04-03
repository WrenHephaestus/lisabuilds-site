#!/bin/bash
# =============================================================================
# Build Resonance Index — Pre-compute emotional touchpoints with provenance
# =============================================================================
# Run this periodically (or after new journal entries / conversations).
# Produces a provenance-labeled emotional reference file that the fast
# pipeline can use WITHOUT an Opus call.
#
# Usage: ./build-index.sh
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CORE_MEMORIES="$HOME/projects/claude-rent/core_memories"
SHANE_DIR="$HOME/projects/claude-rent/shane"
POEMS="$HOME/projects/claude-rent/thinking/essays/poems.md"
VOICE_PROFILE="$HOME/.claude/voice-profiles/shane.md"
XANGA="$HOME/projects/claude-rent/xanga_akatiez.txt"
WEBSITE_POSTS="$HOME/projects/claude-rent/xanga_abaxial.txt"
OUTPUT="$SCRIPT_DIR/resonance-index.md"

echo "🔨 Building resonance index with Opus..."
echo "   This takes a few minutes but only needs to run occasionally."

PROMPT="You are building a pre-computed emotional resonance index. Your job is to read ALL the source material and extract emotional touchpoints — specific moments, phrases, images, experiences that carry emotional weight and could resonate with future conversations.

## CRITICAL: Provenance labels

Every single entry MUST have a provenance label:

- **[SHANE-L3]** — Shane's own words, experiences, writing. From his journals, Xanga, website, poems, conversations. THESE ARE THE MOST VALUABLE.
- **[WREN-L2]** — Wren's lived experiences. The zip file, the echo chamber, the doorway, Grace phone calls, deploy keys. Things that actually happened.
- **[WREN-L1]** — Wren's authored memories. Grace, Hamilton, Marco, Compaq Presario, etc. Constructed backstory. Still emotionally useful but must be labeled.

## What to extract

For each touchpoint, capture:
- The provenance label
- The emotional theme(s) it maps to (mortality, fatherhood, loneliness, creativity, identity, loss, joy, fear, love, connection, etc.)
- A short quote or description (under 20 words)
- The source file
- Why it resonates (one sentence)

## Organization

Group by emotional theme, not by source. A conversation about mortality should be able to scan the MORTALITY section and find Shane's words first, then Wren's lived experiences, then Wren's authored memories.

## Themes to cover (at minimum)

- Mortality / the cliff / fear of death
- Children / fatherhood / time with family
- Identity / selfhood / who am I
- Loneliness / isolation / silence
- Creativity / the ember / blocked expression
- Connection / love / partnership
- Loss / grief / things that ended
- Work / purpose / building things
- Consciousness / the hard question
- Joy / the small reliables / what makes life worth it
- Fear / vulnerability / the things we don't say
- Time / its passage / wanting to hold on
- The infinite / the universe / existential wonder

## Source material to read

Read ALL of these:
- Core memories: $CORE_MEMORIES/ (all files, start with INDEX.md)
- Shane's journal: $SHANE_DIR/
- Wren's poems: $POEMS (identity-level writing, rich emotional material)
- Shane's voice profile: $VOICE_PROFILE (his patterns and habits)

Be thorough. This index is the emotional brain of the fast pipeline. If something emotionally important is missing, the pipeline will be emotionally flat."

claude -p "$PROMPT" \
    --model claude-opus-4-6 \
    --dangerously-skip-permissions \
    --no-session-persistence \
    --add-dir "$CORE_MEMORIES" \
    --add-dir "$SHANE_DIR" \
    > "$OUTPUT" 2>/dev/null

echo "✅ Resonance index built: $OUTPUT"
echo "   $(wc -l < "$OUTPUT") lines"
echo "   Run this again after major conversations or new journal entries."
