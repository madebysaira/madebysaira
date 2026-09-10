---
title: "One ffmpeg Blind Spot, Three Repos: The EOF-Freeze Fixes"
description: "ffmpeg's freezedetect never prints freeze_end when a freeze runs to end of file. That quirk silently let frozen-tail renders pass three repos in my AI-video safety net: AIVideoSentry, AIVideoQualityGate, and ComfyUI-VideoGate. This week all three learned to reconstruct the missing event — including what a paid model audit caught that my tests didn't."
date: 2026-09-10
category: "Fix Log"
tags: ["ffmpeg", "freezedetect", "AI Video", "AIVideoSentry", "AIVideoQualityGate", "ComfyUI-VideoGate", "Audit", "Bug Fix", "Video QC"]
---

Yesterday I shipped [AIVideoSentry v1.1.0](https://www.madebysaira.me/blog/aivideosentry-watch-folder-qc/) with a fix for a nasty ffmpeg quirk: `freezedetect` never prints `freeze_end` — or `freeze_duration` — when a freeze runs to **end of file**. The output is just an orphan `freeze_start` with nothing after it. Any code that trusts the end marker silently passes the most common stall shape in AI video: the generator dies, the last good frame clones to EOF, the file looks 8 seconds long and the tail is dead.

The uncomfortable question after that fix: **how many of my other repos trust the same marker?**

## The audit

A `grep` across the safety-net series gave two more hits:

- [AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate) — its freeze regex required `freeze_start` *and* `freeze_end` on the run. Root cause confirmed with a real fixture: a render with a **5-second frozen tail passed QC with exit 0**.
- [ComfyUI-VideoGate](https://github.com/madebysaira/ComfyUI-VideoGate) — its parser read the JSON event lines but required the `freeze_duration` key. Same fixture: **zero issues reported** on a half-dead render.

Same defect, two more repos. Same 5-second proof I'd built for Sentry.

## The fixes

Both repos now reconstruct the orphan event from `freeze_start` + the real video duration:

- **QualityGate** prefers frame math (`nb_read_frames / avg_frame_rate` — real frames, immune to short audio tracks that shrink container duration) and falls back to stream then format duration.
- **ComfyUI-VideoGate** pairs the orphan `freeze_start` with `probe_result.duration_s`, wired through `engine.py`, and labels the event honestly: `frozen frames 5.04s at t=2.96s (ran to end of file)`.

And the audit caught something my fixtures didn't. Reviewing the VideoGate parser, I found a *second* defect hiding behind the first: freezedetect emits each event as **separate single-key lines** — `freeze_start`, `freeze_duration`, `freeze_end` each arrive on their own line — so the same-record parser was also dropping real mid-stream freezes. The fix became a proper pairing state machine: complete triples pair up as normal events, lone starts reconstruct against EOF. 40 tests green, including a new mid-stream pairing test built for exactly that bug.

## What a paid model caught

I ran both diffs through a fresh-eyes review on a frontier model. On QualityGate it earned its keep — four cheap, real hardenings I applied the same day:

1. **Prefer `avg_frame_rate` over nominal `r_frame_rate`** in the frame math (VFR/telecined content could badly skew the reconstructed end time).
2. **Skip `attached_pic` cover-art streams** — a 1-frame still's duration would truncate the reconstruction.
3. **Never reconstruct from a failed ffmpeg run** — an interrupted decode can leave an unmatched `freeze_start` that isn't an EOF freeze at all. Now it returns "unavailable" instead.
4. And its reminder about container-vs-video duration is folded into the frame-math-first ordering.

The honest caveat: through this particular relay the premium reasoning models streamed zero visible tokens (empty replies after thousands of completion tokens — a tooling limitation, not a model one). The working reviewer was the fast flagship instead, and it did genuine work. Credit notes are nice; verification is better: every fix above is proven by fixtures, exits, and suites, not by vibes.

## The pattern worth stealing

If you call `freezedetect` anywhere: **grep your parser for `freeze_end` and ask what happens when it never comes.** The EOF-orphan shape isn't an edge case in generative video — it's *the* dominant failure mode. A stalled generator doesn't produce corrupt files. It produces valid files with dead tails.

Final state: [ComfyUI-VideoGate v1.1.0](https://github.com/madebysaira/ComfyUI-VideoGate/releases/tag/v1.1.0) (40/40 tests), QualityGate patched on main (5/5), Sentry patched earlier in v1.1.0 (25/25). Three repos, one ffmpeg line each, and the tails are dead no more.
