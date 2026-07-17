---
title: "I turned a Remotion masterclass into a kit you can run"
description: "A brilliant AI motion graphics system explained on YouTube, but nothing to download. So I rebuilt it: scripts, prompts, and the grading loop."
date: 2026-07-17
category: "Build Log"
tags: ["RemotionPlaybook", "Remotion", "AI Video", "Claude Code"]
repo: "https://github.com/madebysaira/RemotionPlaybook"
---

I watched a long interview this week about a system where AI agents recreate brand videos in Remotion. The kind of motion graphics ElevenLabs or Higgsfield ship, rebuilt by Claude Code in about fifteen minutes, no After Effects and no keyframes. It was one of the best breakdowns I have seen. And when it ended, there was nothing to download. No scripts, no prompts, just a promise to maybe open source a project if enough people asked in the comments.

That gap annoyed me enough to do something about it. So I rebuilt the whole system from the interview, wrote every step down, and published it as [RemotionPlaybook](https://github.com/madebysaira/RemotionPlaybook).

## What the system actually does

The idea is honest about what each model is good at. Claude Code writes excellent code but cannot watch video. Gemini can watch video, and it happens to write the cleanest JavaScript animation logic of any model right now. So the pipeline splits the work.

A reference video gets cut into short segments. Each segment becomes a handful of frames plus a contact sheet, which is just a tiled collage of those frames with timestamps. That sheet is the trick. A model that cannot play video can still read a start state, three middle states, and an end state from one image, and suddenly it understands motion.

Gemini reads each segment and writes a detailed scene spec. What elements exist, what sits in front of what, every movement with direction and easing and timing. Claude Code takes that spec and builds it in Remotion, renders stills at the same timestamps as the original frames, compares, and fixes what does not match. Two graders score the result, and nothing moves forward under nine out of ten.

## What I added that the video skipped

The interview admitted a few rough edges, so the kit fixes them.

The original cuts video into five second chunks because five felt about right. Both people on the call agreed scene detection would be better, and neither had built it. My split script runs scene cut detection first and only falls back to fixed cuts when the detector gets confused by spiky motion graphics.

The grading was the vaguest part. The builder said his agents just know what good looks like. Mine do not get that luxury, so I wrote the rubric down: layout, stacking order, motion direction, timing feel, and polish, each scored on plain criteria. If a working motion designer would not accept the segment as a draft of the source scene, it is not a nine.

I also wrote down the failure everyone hits. When an image sits behind text, agents reliably build them side by side instead of stacked. The scene reader prompt now demands explicit z-order for every element, and the rubric checks it twice.

## The part worth stealing for any AI work

The learnings file is the quiet genius of the whole system. After every video, the agent writes down which effects worked, which prompts produced them, and which mistakes got fixed. Run one takes a day. Run five takes ten minutes, because the system has taste written down by then. That pattern transfers to almost anything you do with agents, not just video.

## What this means for a client

For a client, this changes what a small budget buys. A brand video used to mean either a real motion designer or a template that looks like one. Now the reference you admire can become a working draft in an afternoon, and the budget goes into directing it toward your brand instead of building it from zero. The taste still has to come from a person. The keyframes no longer do.

If you want a brand video that moves like the ones you keep saving, [book a quick call](/#booking).
