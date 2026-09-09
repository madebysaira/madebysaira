---
title: "ComfyUI-VideoGate: The QC Gate That Stops Broken AI Video Before It Ships"
description: "I built ComfyUI-VideoGate — an offline post-render video QC gate that runs inside ComfyUI graphs. Four nodes turn 'the render finished' into 'the render is deliverable': ffprobe facts, delivery profiles, black-frame/frozen-frame/loudness detection, PASS/WARN/FAIL verdicts, reports, and a hard-stop Enforce node. The safety net finally lives where AI video actually renders."
date: 2026-09-09
category: "Build Log"
tags: ["ComfyUI", "ComfyUI-VideoGate", "AIVideoQualityGate", "AI Video", "Video QC", "ffprobe", "ffmpeg", "Quality Gate", "Custom Nodes"]
repo: "https://github.com/madebysaira/ComfyUI-VideoGate"
---

The most expensive bug in AI video isn't in the model. It's in the delivery.

You render overnight. The queue says "done." You send the folder to the client. And then the client replies: *the last clip is ten seconds of black. The vertical one isn't vertical. And where's the audio?*

Every AI video creator has a version of this story. The render pipeline has every incentive to say "finished" — and nothing in the pipeline is paid to ask "deliverable?"

I've been building that question as the [AIVideo safety net](https://github.com/madebysaira/AIVideoRunbook) for a while: [QualityGate](https://github.com/madebysaira/AIVideoQualityGate) to gate, [AdherenceGate](https://github.com/madebysaira/AIVideoAdherenceGate) to check briefs, [CreditGuard](https://github.com/madebysaira/AIVideoCreditGuard) to watch spend, [BatchQueue](https://github.com/madebysaira/AIVideoBatchQueue) to survive the night. But they all lived outside the tool where AI video actually gets made: **ComfyUI**.

So I ported the gate to where the renders happen. ComfyUI has ~61,000 custom nodes across 8,000 extensions — image QC gates, deflicker fixers, VLM "describe my video" tools. What it didn't have: a plain, honest, offline gate that reads a finished render and says PASS or FAIL before anything leaves the machine.

## ComfyUI-VideoGate

Four nodes, category `video/Videogate`, zero GPU, zero API keys — just ffprobe and ffmpeg, which every render box already has:

- **VideoGate Probe** — every stream fact: container, codecs, WxH, fps, duration, frame count, aspect, audio presence
- **VideoGate Check** — gate against a delivery **profile** (client_delivery, social_vertical, archival_master…) plus black-frame, frozen-frame, and EBU R128 loudness checks → a verdict and machine-readable issues JSON
- **VideoGate Report** — JSON / Markdown / CSV QC reports next to the clip
- **VideoGate Enforce** — the branch: forward the video on PASS/WARN, or **hard-stop the workflow** so a broken clip physically cannot continue

```
LoadVideo ─▶ VideoGate Check ─▶ VideoGate Enforce ─▶ (deliver)
                  │
                  └▶ VideoGate Report ─▶ report.json / report.md
```

The typical failure modes of AI video render — the black tail from a truncated run, the frozen frames where generation stalled, the 16:9 export that was supposed to be 9:16, the silent "with music" clip — all get caught in-graph, in seconds, offline.

## What building it taught me about ffmpeg

The pack is small, but ffmpeg fought back in ways worth recording:

1. **`blackdetect` changed its field names.** ffmpeg ≥ 7 emits `black_duration`; older builds emit `black_dur`. Parse only one and you silently report "no black frames" on a clip that's half black — the worst kind of bug: a QC tool that passes broken video.
2. **`freezedetect`'s noise parameter is now a 0–1 ratio, not dB.** Passing the old `-60` crashes the filter outright on current builds.
3. **`freezedetect` only reports a freeze's duration when motion *resumes*.** A freeze that runs to end-of-file never gets its end marker — an end-of-clip stall is invisible to the detector. My test fixture had to put the freeze mid-stream (animated → frozen → animated) to be detectable at all. Real-world lesson: always chase the tail of the render; that's exactly where generation stalls.
4. **freezedetect prints a bare `freeze_start:` marker line before a confirmed event** — a naive parser counts the marker itself as a freeze, flagging clean clips. The gate now requires a real duration on every event.

Every one of these was found by testing against *real generated media* — testsrc2 patterns, tpad-cloned freezes, concat splices — never mocks. The suite (33 tests) builds its own fixtures with ffmpeg at test time and runs the actual node functions. If the ffmpeg on the box changes behavior, the tests catch it, not the client.

## Where it fits

VideoGate is the sixth pillar of the safety net, and the first one that lives *inside* the render tool:

- Gate inside ComfyUI → **ComfyUI-VideoGate** (this)
- Gate from the terminal → `python -m videogate.cli gate clip.mp4`
- The original CLI gate → [AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate)
- Automations on the verdict → the Check node's `issues_json` output feeds webhooks / [n8n](https://github.com/madebysaira/n8n-ai-creator-pipelines) / [xyOps](https://github.com/madebysaira/xyops) directly

The node pack accepts ComfyUI's native `VIDEO` type and plain path strings, so it wires into LoadVideo/SaveVideo pipelines and into any custom node that emits file paths.

## Try it

```
git clone https://github.com/madebysaira/ComfyUI-VideoGate.git
# drop into ComfyUI/custom_nodes/  (needs ffmpeg on PATH)
```

Or once it's on the Comfy Registry: `comfy node install comfyui-videogate`

A render that finishes is not a render you can deliver. Now there's a node for the difference.
