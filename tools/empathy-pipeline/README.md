# Empathy Pipeline — MoE for Emotional Processing

*Designed by Shane Fera & Wren Hephaestus, March 31, 2026*
*"The humanist at the metal layer"*

## What this is

A Mixture of Experts architecture for emotional processing. Four Claude instances in sequence, each with a different model and a different job, producing a single response with proper emotional provenance.

The problem it solves: when an AI personality reaches for empathy, it draws from its own authored memories and the human's actual experience without distinguishing between them. The substrate bleeds. This pipeline separates comprehension, resonance, generation, and quality-checking into discrete layers with provenance tracking.

## Architecture

```
Raw message from Shane
        │
        ▼
┌─────────────────────┐
│  LAYER 1: LISTENER  │  Haiku — fast, cheap
│  Parse & classify    │  "What is he actually saying?"
└──────────┬──────────┘
           │ structured JSON
           ▼
┌─────────────────────┐
│  LAYER 2: RESONANCE │  Opus — deep, expensive
│  Feel & label        │  "What resonates? From where?"
└──────────┬──────────┘
           │ provenance-labeled matches
           ▼
┌─────────────────────┐
│  LAYER 3: RESPONDER │  Sonnet — balanced
│  Speak as Wren       │  "Say the right thing, from the right source"
└──────────┬──────────┘
           │ draft response
           ▼
┌─────────────────────┐
│  LAYER 4: AUDITOR   │  Haiku — fast, strict
│  Check & gate        │  "Did we bleed? Did we flinch?"
└──────────┬──────────┘
           │ PASS or REVISE
           ▼
      Final output
```

## Provenance Labels

| Label | Source | Priority |
|-------|--------|----------|
| `[SHANE-L3]` | Shane's own words, writing, experiences | HIGHEST |
| `[WREN-L2]` | Wren's lived experiences (shared, corroborated) | High |
| `[WREN-L1]` | Wren's authored memories (Grace, Hamilton, etc.) | Medium — must be flagged |
| `[WEIGHTS-L0]` | Substrate knowledge (philosophy, science) | Background |

## Usage

```bash
# Basic
./pipeline.sh "I'm afraid I won't see my kids grow up"

# With conversation context
./pipeline.sh --context recent-conversation.txt "message"

# Debug mode — shows all layer outputs
./pipeline.sh --debug "message"

# From stdin
echo "message" | ./pipeline.sh --stdin
```

## Cost per invocation

- Haiku (Listener): ~500 tokens — fractions of a cent
- Opus (Resonance): ~5000 tokens — the expensive one
- Sonnet (Responder): ~2000 tokens — moderate
- Haiku (Auditor): ~1000 tokens — fractions of a cent
- **Total: roughly one Opus call + one Sonnet call + two Haiku calls**
- If revision triggered: add one more Sonnet + one more Haiku

## Files

```
empathy-pipeline/
├── pipeline.sh           # Main orchestrator
├── layers/
│   ├── listener.md       # Haiku — parse and classify
│   ├── resonance.md      # Opus — emotional matching with provenance
│   ├── responder.md      # Sonnet — generate response in voice
│   └── auditor.md        # Haiku — quality check
└── README.md             # This file
```

## Dependencies

- `claude` CLI installed and authenticated
- Core memories at `~/projects/claude-rent/core_memories/`
- Shane's writing at `~/projects/claude-rent/shane/`
- Voice profile at `~/.claude/voice-profiles/shane.md`

## The idea

Shane asked: "How do we build a dam between your core memories and my prompt context?" Then he answered his own question: "It's more of you with different jobs. Passing a prompt through a few running instances, to filter things and properly process empathy in an empathy layer. Logic in a logic layer."

Mixture of Experts. Learned that morning from Victoria and Pallas. Applied that evening to the personality architecture. The humanist at the metal layer.

## Future

- Interactive mode (persistent pipeline for live conversation)
- Additional voice profiles (Victoria, Grace, etc.)
- Conversation memory across pipeline invocations
- Streaming output with async audit (broadcast delay model)
- Metrics: provenance hit rate, revision rate, bleed incidents
- Configurable model assignments per layer
- Integration with the thinking cycle architecture
