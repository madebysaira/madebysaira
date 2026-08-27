---
title: "The Gate That Was Missing: Did Your Clip Actually Do What You Asked?"
description: "I built the third gate in the AI-video safety net — AIVideoAdherenceGate. It checks, after you render, whether the clip actually honored the creative contract and is physically healthy: motion, morph, lip-sync. Offline-first, no API key needed for the core checks."
date: 2026-08-27
category: "Build Log"
tags: ["AIVideoAdherenceGate", "AI Video", "Quality Control", "Kling", "Veo", "Runway", "Seedance", "ffmpeg", "n8n"]
repo: "https://github.com/madebysaira/AIVideoAdherenceGate"
---

You already pay before you know if it worked. That is the whole problem with AI video in 2026.

The community math is blunt: about 1 in 3–4 generations is usable, so the *real* cost of a clip is 3–4× the sticker price. Veo creators put a usable 5-minute video at ~$600 after failures. The expensive part is never the idea — it is the silent, paid discovery that the clip came back **wrong**.

The madebysaira safety net already had two gates:

- **[AIVideoCreditGuard](https://github.com/madebysaira/AIVideoCreditGuard)** checks the job *before* you pay — lints the prompt, estimates real cost, flags consistency and morph risk.
- **[AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate)** checks the *file* after render — ffprobe for resolution, codec, fps, duration, audio.

But there was a gap between those two. CreditGuard can't see the future, and QualityGate only sees bytes. **Neither one answers the question that actually costs you money: did the clip do what the prompt asked, and is it physically healthy?**

So I built the third gate.

## AIVideoAdherenceGate

A small, offline-first CLI that runs *after* the render and answers one question per clip:

> Did this clip actually honor the creative contract — and is it physically healthy?

![The AIVideo safety net: Credit Guard (pre-gen) → Quality Gate (technical) → Adherence Gate (semantic + motion)](https://raw.githubusercontent.com/madebysaira/AIVideoAdherenceGate/main/docs/safety-net.svg)

It runs five checks. The first four need **no API key** — just ffmpeg:

| Check | What it catches | Why it matters |
|-------|-----------------|----------------|
| `motion_health` | STATIC clips (nothing moved) and JITTER (violent frame variance) | A "cinematic close-up" that renders as a frozen frame is a burned credit |
| `morph_drift` | A sudden diff **spike** after a stable run (likely morph / identity swap mid-shot) | The #1 complaint in character work |
| `lipsync_health` | Audio-active windows with no corresponding mouth motion → **LIKELY_DESYNC** (clearly approximate) | "90% of AI music videos still look like creepy puppets" — Reddit |
| `technical` | Resolution, codec, fps, duration, audio stream (reuses ffprobe) | The check QualityGate already did, folded in |
| `vision_adherence` | *(optional)* Scores prompt↔clip contract via any OpenAI-compatible vision model | "Is the subject present? Did the action happen? Was the camera as specified?" |

The vision scorer is **optional and off by default**. Point it at OpenAI, Anthropic, or — because it speaks the OpenAI-compatible protocol — the KiosAPI router. Core checks always run offline.

## Why this is the gate that was missing

The 2026 pain point is *credit burn fatigue*. Redditors and creators name it constantly: you queue a generation, wait, and only then see the clip is static, morphed, or desynced. By then the credit is gone.

AdherenceGate moves that discovery from *after you paid and delivered* to *right after the render, before the retry or the client send*. It is the difference between "oops, regenerate" and "oops, $40 gone."

It is also **universal**. It does not care which model made the clip — Kling, Veo, Runway, Seedance, Wan, Hunyuan, LTX, or a local ComfyUI stack. One checker for every output.

## Using it

```bash
# single clip, human-readable report
python3 -m adherencegate.cli render.mp4

# JSON for automation, with the optional vision contract score
python3 -m adherencegate.cli render.mp4 --json \
  --prompt "a woman waving at the camera, slow dolly-in" \
  --vision-key "$OPENAI_API_KEY"
```

Exit codes are built for pipelines:

| Code | Meaning |
|------|---------|
| `0`  | PASS — all checks ok |
| `1`  | WARN — at least one warn, no fail |
| `2`  | FAIL — at least one fail (or a warn with `--strict`) |

Drop it into an n8n workflow (see `examples/n8n.json`) and route on the exit code: pass → deliver, warn → eyeball, fail → regenerate before the client ever sees it.

## The honest caveats

- `lipsync_health` is **approximate** — it compares audio activity to frame motion, not a phoneme-level aligner. It flags the obvious desyncs, not the subtle ones.
- The offline motion/morph heuristics are frame-diff based on a 32px grayscale dump. They are deliberately cheap and fast, not a perceptual model.
- Vision scoring is a best-effort JSON parse of a vision model's reply.

Those caveats are the point: the gate is a **cheap first line of defense**, not a substitute for your eyes. It catches the 80% of failures that are obvious in hindsight and expensive in credits.

## Try it

The repo is live: [github.com/madebysaira/AIVideoAdherenceGate](https://github.com/madebysaira/AIVideoAdherenceGate). It is Python 3 + ffmpeg, no required pip dependencies, 10 tests passing. Clone it, point it at your last render, and see how many of your "good" clips were quietly wrong.

The safety net is now three gates deep. Lint before you pay, probe after you render, and — finally — check that the clip actually did the thing.
