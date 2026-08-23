---
title: "Before You Burn the Credit: A Pre-Generation Guard for AI Video"
description: "I built a small offline guard that lints your prompt, estimates real cost (sticker × retries), and flags consistency and morph risks before Kling, Veo or Runway charges you. Companion to AIVideoQualityGate."
date: 2026-08-23
category: "Build Log"
tags: ["AIVideoCreditGuard", "AI Video", "Kling", "Veo", "Runway", "Prompt Engineering", "n8n"]
repo: "https://github.com/madebysaira/AIVideoCreditGuard"
---

A good generation still costs you when the prompt was the wrong bet.

I kept hitting the same bill. The idea was fine, the model was the right one, but the prompt was two words short, the character bible was missing from shot two, or I queued a 10-second 4K test when a 5-second 720p preview would have proved the move. Each retry was a paid generation, and the community math is blunt: about 1 in 3–4 generations is usable, so the real cost is 3–4× the sticker price. Veo creators put a usable 5-minute video at ~$600 after failures. I had heard enough $850 horror stories.

So I built [AIVideoCreditGuard](https://github.com/madebysaira/AIVideoCreditGuard) — the pre-generation twin to [AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate). QualityGate checks the file *after* you generate. CreditGuard checks the job *before* you pay. Both are offline, dependency-free, and exit-code friendly for n8n.

## The boring prompt mistakes are the expensive ones

AI video doesn't fail dramatically in the prompt. It fails boringly: a vague subject, no camera language, no negatives, a multi-shot script with no character anchor, dialogue without a lip-sync model, or a duration that blows past the delivery profile. The generator won't warn you — it will charge you to learn.

The guard separates creative intent from paid execution. Lint cheaply, rewrite cheaply, render once.

## What it actually checks

You give it a prompt, a file, or a batch:

```bash
# single prompt, with a Markdown report
python3 creditguard.py "cinematic close-up of a luxury watch on marble, slow dolly push in, golden hour side lighting, anamorphic lens flare" --model kling3 --profile vertical --markdown reports/watch.md

# batch before you queue 50 jobs
python3 creditguard.py --batch prompts.jsonl --model veo3 --json reports/batch.json --strict
```

It returns a score, a sticker vs real-cost estimate, and findings with a fix for each:

- **Too short / vague** — `TOO_SHORT` / `SHORT_PROMPT` — models guess when you don't specify
- **No cinematography language** — `MISSING_CINEMATOGRAPHY` — output goes generic without one camera term
- **Missing negatives** — `MISSING_NEGATIVES` — morphs and extras get more likely
- **Morphing risk** — `MORPH_RISK` — rapid motion / spinning / quick turns without an identity anchor
- **Consistency drift** — `MISSING_CONSISTENCY_ANCHOR` (story) and `MULTISHOT_NO_ANCHOR` — split shots need a shared bible / --cref / ID-LoRA
- **Dialogue without lip-sync** — `DIALOGUE_NO_LIPSYNC_MODEL` + `DIALOGUE_FRAMING` — Veo 3.1 / Runway Gen-4.5 want medium close-up facing camera
- **Budget / duration guards** — `BUDGET_EXCEEDED`, `DURATION_OVER_PROFILE`

Every finding is a warning or failure with evidence and a one-line fix. `exit 0` means pass, `1` means failure (or warning in `--strict`), `2` means the checker itself couldn't run — the same contract as QualityGate so n8n can route:

```
Brief → CreditGuard → Generator → QualityGate → Drive/Review
            ↓ 1 → Rewrite queue + report.md
            ↓ 2 → Operator alert
```

## Real cost, not sticker cost

Providers list a per-clip or per-second price. Creators pay sticker × retries. The guard bakes in conservative August 2026 estimates for Kling 3.0, Veo 3.1, Runway Gen-4.5, Luma, Wan 2.1, Seedance and Pika — and computes `real ≈ sticker × (1 / usable_rate)` with your override:

```bash
python3 creditguard.py --estimate-only "hero shot" --model kling3 --duration 8 --expected-usable-rate 0.3
# model=kling3 duration=8s sticker=$1.04 real≈$3.47 (×3.3, usable 30%)
```

Edit `creditguard/pricing.py` when a provider changes price — no API, no upload.

## What it doesn't do

It can't guarantee a generation will succeed, and it doesn't judge beauty. Pricing is estimated. Character and morph flags are prompt-text heuristics, not a vision model. Loudness, black and freeze detection still belong in QualityGate after you have a file.

## Why I kept it tiny

Same philosophy as QualityGate: a single Python CLI, a few small modules (`checks.py`, `pricing.py`, `profiles.py`, `report.py`), editable profiles (`vertical`, `horizontal`, `square`, `story`, `preview`, `custom`), and dependency-free tests. The companion layout is deliberate:

- **Guard** (this repo) — before generation, text in
- **Gate** (sibling) — after generation, file in

Run both: `Guard → Generate → Gate → Delivery`. You get lint + estimate before the meter starts, and integrity + loudness before the client sees it.

## How I tested it

I kept everything on SSD and tested locally before any push as required: `py_compile` clean, `14 passed` in `tests/test_creditguard.py`, plus manual checks — a good prompt with `anamorphic` no longer false-flags morph risk, a short prompt fails with `exit 1`, a story without an anchor fails, batch JSON and Markdown reports generate, and `Veо3 --budget 1 --duration 30` correctly trips `BUDGET_EXCEEDED`.

The code is at [AIVideoCreditGuard](https://github.com/madebysaira/AIVideoCreditGuard). If you want this wired into your studio's n8n queue — before the generator, not after — [book a quick call](/#booking).
