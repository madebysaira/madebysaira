---
title: "Video Workflows That Actually Ship"
description: "The n8n pipeline and prompt system I use to go from brief to finished AI video without rebuilding the same steps every time."
date: 2026-07-22
category: "Build Log"
tags: ["VideoWorkflows", "AI Video", "n8n", "Prompts", "Automation"]
repo: "https://github.com/madebysaira/VideoWorkflows"
---

I used to lose the first hour of every client project just getting the tools talking to each other. Open Gemini, type an idea, copy the prompt, switch to Kling or Vertex, paste, wait, download, rename, upload to the right Drive folder, log it in the sheet so I don't forget which version was which. By the time I actually started directing, the energy was already gone.

The tutorials showed the vision. One n8n + Veo3 video walked through the full idea agent, prompt agent, HTTP calls, wait, base64 decode, Drive upload, and Sheets append. Another pair of Kling videos showed exactly how to build the 8-shot reference sheets and label them so the character survives motion. What none of them gave you was the ready file you could import and the exact prompt structures that survive real briefs.

That is what this repo ships.

## The two pieces that matter

First, the n8n workflow. It is the one I run now. Schedule trigger or manual, Gemini turns a high level request into 5-8 structured ideas, second agent turns the chosen idea into a full prompt using the style block + action block pattern, HTTP request starts the generation on Vertex, wait node, second HTTP fetches the base64, function node decodes it, Drive upload, and Sheets append with the link and the exact prompt that produced it.

The JSON is in workflows/video-gen-pipeline.json. There is also a small review loop extension for when you want to pause before the final render.

Second, the prompt library. Not generic "cinematic shot" lists. The actual blocks I copy into the prompt agent system message and the action templates that work for commercial explainers and ads.

- idea-agent-system.md for reliable JSON output
- veo3-cinematic-prompts.md and kling-omni-ref-prompts.md with the labeling and end-frame tricks
- camera-motion-control.md and negative-prompts-drift.md for the keywords that actually reduce the failures I see most
- reference-sheet-generation.md so the 8 angle sheet you make once can be reused across a whole campaign

## What the tutorials left out

The Veo3 video assumed you would figure out the exact project ID, location, and token refresh dance. The Kling videos showed the sheet but not the phrasing that forces the model to end on the last frame instead of cutting back to the reference.

I added the small fixes that cost me hours the first time: explicit "force end scene" language, better error paths in the decode step, and the before/after notes from actual client runs so you can see where the automation still needs a human eye.

The decision tree in docs/ is the one I actually follow. Full auto for regular content and spec work. Human review step for anything with a real client deadline. Manual for the weird one-off that needs to be felt rather than scripted.

## What this changes for client work

For a recent explainer I scheduled the idea agent overnight. Morning had five options with drive links already in the sheet. Picked two, adjusted the prompt agent output for the client's specific palette language, ran the single model pass, sent the two best to the client in Telegram. They chose one with a small lighting note. One correction pass, final render, straight into their folder.

The mechanical parts that used to take 2-3 hours now take 20-30 minutes of active time. The rest is choosing and directing.

It does not remove the taste. It removes the friction between having the taste and getting the files in front of the client.

## What still needs a person

Big turns and multiple characters can still drift even with the 8-shot sheets. I budget one correction round for anything with real motion.

Vertex credits are good on the free tier but the wait times are not always predictable. For same-day work I often fall back to manual Kling.

The workflows here are starting points. You will change the Gemini system messages and the exact column mapping in Sheets for your own setup. That is the point.

If you import the pipeline and the first time you run it you get a clean video in Drive with the prompt logged, the repo did its job.

The rest is still up to you.

If this saves you the setup time on your next few briefs, the repo is here: [VideoWorkflows on GitHub](https://github.com/madebysaira/VideoWorkflows).

If you want help wiring something like this into your actual client process, [book a quick call](/#booking).