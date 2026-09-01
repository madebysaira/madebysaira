---
title: "AIVideoRunbook: The Logbook That Turns Three Quality Gates Into One Pipeline"
description: "I built AIVideoRunbook — a lightweight, offline-first CLI that runs CreditGuard → QualityGate → AdherenceGate in order, logs every clip to a local SQLite catalog, and emits exit codes 0/1/2 for n8n/xyOps. The missing layer that turns three gates into one credit-to-delivery pipeline."
date: 2026-09-01
category: "Build Log"
tags: ["AIVideoRunbook", "AIVideoAdherenceGate", "AIVideoQualityGate", "AIVideoCreditGuard", "AI Video", "Quality Control", "ffmpeg", "n8n", "xyOps", "SQLite"]
repo: "https://github.com/madebysaira/AIVideoRunbook"
---

You can have three great gates and still lose track. The madebysaira safety net already existed as three separate CLIs:

- **[AIVideoCreditGuard](https://github.com/madebysaira/AIVideoCreditGuard)** checks the job *before* you pay — lints the prompt, estimates real cost, flags consistency and morph risk.
- **[AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate)** checks the *file* after render — ffprobe for resolution, codec, fps, duration, audio.
- **[AIVideoAdherenceGate](https://github.com/madebysaira/AIVideoAdherenceGate)** checks *what the clip actually shows* — motion health, morph-drift, lip-sync, creative-contract adherence.

Run them in a shell loop, sure. But then you have: which clip passed which check? which model produced it? which generation was the one that *almost* worked? And when a client asks "where's the version with the blue scarf," you dig through folders named after timestamps and hope.

That is the gap Runbook fills.

## AIVideoRunbook

A small, offline-first CLI that turns the three gates into a single, ordered pipeline — and remembers everything.

> `runbook run clip.mp4 --prompt-from prompt.json` → exit `0`, `1`, or `2`.

```
CreditGuard  →  Runbook (orchestrate + log)  →  QualityGate  →  AdherenceGate  →  VERDICT + CATALOG
```

![AIVideoRunbook credit-to-delivery pipeline](https://raw.githubusercontent.com/madebysaira/AIVideoRunbook/main/assets/safety-net.svg)

The command runs all three checks in sequence, then writes the result — provider, model, seed, prompt, cost, per-gate verdicts, and exit code — to a local **SQLite catalog** (`runs.db`). Exit `0` = deliver, `1` = eyeball, `2` = regenerate. It mirrors the exit-code contract your gates already use, so it drops straight into any IF-node.

## One command, three jobs

Where the gates each answer one question, Runbook answers: **"did the whole job work, and can I prove it?"**

| Command | What it does |
|---|---|
| `runbook new` | Scaffold a prompt JSON (provider, model, seed, budget). Pass it to CreditGuard for a pre-gen lint. |
| `runbook run <clip> --prompt-from p.json` | Runs all gates → logs verdict + metadata → exit 0/1/2. |
| `runbook log --provider X --model Y ...` | Manually record a clip you rendered outside the CLI. |
| `runbook find "dolly"` | Search every logged run by prompt, provider, model, seed, or severity. |
| `runbook catalog --fmt jsonl` | Export the whole logbook as JSON lines for Sheets, scripts, or backup. |

The catalog stores the full chain: who paid (CreditGuard), what the file said (QualityGate), and what it actually showed (AdherenceGate). No cloud, no API keys, no accounts — just a SQLite file you can `cp` or `rsync` like any other asset.

## Why not just shell scripts?

You *can* chain three `if` statements. Runbook does a few things the one-liners don't:

- **The verdict is authoritative** — it walks the gates in the right order and the *worst* severity wins. A `warn` on QualityGate followed by `ok` on AdherenceGate is still `warn`-overall, not silently `ok`.
- **The log is queryable** — every clip gets an `@id`, a timestamp, and a `--json` record. No more "which generation used that prompt with the Veo hands fix?"
- **It is n8n-native** — the `--json` flag + exit codes let you wire the whole pipeline into a workflow. `0 → deliver to client`, `1 → ping me`, `2 → regenerate`. I included a ready-to-import `examples/runbook.n8n.json`.
- **It degrades gracefully** — if a gate binary isn't installed, Runbook skips it and keeps going. You get the catalog benefit immediately; install gates as you adopt them.

## The three-gate stack, now connected

This is the fourth pillar, not a replacement. CreditGuard lints before you burn the credit, QualityGate checks the bytes, AdherenceGate checks the pixels — and Runbook is the logbook that remembers what happened at each step so you never have to.

The full stack now reads:

> **Before you pay** → CreditGuard  
> **After you render** → QualityGate (technical) + AdherenceGate (semantic)  
> **Every time** → Runbook catalogs the verdict

## Try it

- Repo: [github.com/madebysaira/AIVideoRunbook](https://github.com/madebysaira/AIVideoRunbook) (Python 3 + ffmpeg, **zero required pip deps**, 7 tests passing)
- Install: `pip install git+https://github.com/madebysaira/AIVideoRunbook.git`
- Quick start:
  ```bash
  runbook new --provider Kling --model kling-vid-1.0 \
    --prompt "dolly zoom hallway, slow push" --seed 42 --budget 1.50
  runbook run render.mp4 --prompt-from prompt.json --json
  runbook find "dolly"
  ```
- n8n: import `examples/runbook.n8n.json` → your gates, wired to a catalog.

Clone it, run your next clip through, and search for it by lunchtime. Three gates were never the whole safety net — the logbook is what makes the net close.",
  "repo": "https://github.com/madebysaira/AIVideoRunbook"
