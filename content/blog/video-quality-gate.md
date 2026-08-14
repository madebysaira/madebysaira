---
title: "The Render Passed. The Video Still Wasn't Ready."
description: "I built a small offline quality gate for AI video renders that catches missing audio, wrong formats, frozen frames, and loudness problems before client review."
date: 2026-08-15
category: "Build Log"
tags: ["AIVideoQualityGate", "AI Video", "FFmpeg", "Client Workflows"]
repo: "https://github.com/madebysaira/AIVideoQualityGate"
---

A video can look fine in a quick preview and still be the wrong file to send to a client.

I have had the familiar version of this problem. The render looks good, so I send it for review. Then someone notices that the audio is missing, the export is landscape instead of vertical, or one section freezes for a few seconds. None of these problems are dramatic while I am generating the visuals. They become very obvious once the file is sitting in somebody else's inbox.

So I built [AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate), a small command line check that runs before a render moves to client review.

## The boring problems are the expensive ones

AI video workflows have a lot of moving parts. A model produces a clip. An automation downloads it. An editor combines it with other clips. A voice track is added. A final export is uploaded to Drive or sent through a review channel.

Every handoff can introduce a mechanical mistake. The video stream might be missing. The dimensions might not match the social format. The frame rate can be unusual. The audio can disappear during an export. A generation can include a black or frozen section that was easy to miss when I watched the first few seconds.

These are not creative problems. They are delivery problems. I do not want an AI model to decide whether a black frame was intentional, and I do not want a pipeline to blindly retry a render because a checker found a warning. I want evidence and a human decision at the right point.

## What the gate checks

The command uses `ffprobe` to inspect the file and can use `ffmpeg` for optional diagnostics. It does not upload the media or call an AI service.

```bash
python3 qualitygate.py exports/hero.mp4 \
  --profile vertical \
  --markdown reports/hero.md \
  --json reports/hero.json
```

The built in profiles cover vertical, horizontal, and square delivery. They check the dimensions, aspect ratio, video codec, duration, frame rate, and audio stream. A custom profile lets me set the dimensions for a project with a different contract.

When `ffmpeg` is available, the gate also runs black frame detection, frozen frame detection, and an EBU R128 loudness measurement. Those results are warnings with timestamps. A fade to black might be correct. A silent visual might be deliberate. The point is to put the thing in front of me instead of pretending that every warning has the same meaning.

The output is useful both to me and to an automation. A successful run returns exit code `0`. A delivery failure returns `1`. If the checker itself cannot run because `ffprobe` is missing or the file is unreadable, it returns `2`. That distinction matters in an n8n workflow. A bad render belongs in a review queue. A broken machine needs an operator alert.

## Why I kept it small

There are serious media quality control platforms that cover broadcast compliance, HDR, timecode, phase correlation, and a long list of engineering checks. They are useful when you run a broadcast operation. They are also far more than a small creative studio needs for a first delivery gate.

AIVideoQualityGate stays offline and dependency free on purpose. It is a Python script with a few small modules, editable delivery profiles, and tests that do not require a video file or a cloud account. It can run on a laptop, a small server, or the same Pi that is already handling a queue.

The separation also keeps the creative tools simple. Kling, Veo, Runway, ComfyUI, Remotion, and a human export do not need to know about the checker. The gate sits after generation and before the client notification.

## What it catches, and what it cannot

The gate can tell me that a vertical contract expected 1080 by 1920 and received 1920 by 1080. It can tell me that a file has no audio stream, that the duration is zero, or that a filter found a frozen section near a particular timestamp.

It cannot tell me whether the product is framed beautifully, whether a face drifted between shots, or whether a client will like the font. Those decisions still belong to a person. That boundary is useful. I want automation to remove repetitive checking, not to dress up creative judgement as a number.

I tested the project with a real ffmpeg generated MP4. The horizontal profile passed, the wrong vertical profile returned the expected failure code, and the optional loudness check produced a report. The unit tests cover passing metadata, wrong dimensions, required audio, and an intentionally silent custom profile.

## Where it fits in my workflow

For a single project, I can run the gate from a terminal and keep the Markdown report beside the render. For a batch pipeline, n8n can run it after download and before Drive upload. A failed file can be moved to a review folder with its report attached. A clean file can continue to the human creative review step.

That is a small change, but it removes an unpleasant class of surprises. The render still needs taste. It just does not need to fail because I sent the wrong shape of file.

The code is in [AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate). If you want help putting a similar review gate into your studio workflow, [book a quick call](/#booking).
