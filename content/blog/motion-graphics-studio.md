---
title: "I turned a Claude Co-work tutorial into a complete motion graphics studio"
description: "A YouTube video showed the basics. I built the full production system: style sheets, reusable skills, troubleshooting, and complete examples. Here's what the tutorial didn't tell you."
date: 2026-07-31
category: Build Log
tags: ["MotionGraphicsStudio", "Claude Co-work", "AI Video", "Higgsfield", "Prompts"]
repo: "https://github.com/madebysaira/MotionGraphicsStudio"
---

I found a great YouTube tutorial last week. It showed how to use Claude Co-work with Higgsfield to create motion graphics videos. The workflow looked clean: set up a project, connect MCP, generate clips.

So I tried it on a client project. And I immediately hit walls the video didn't mention.

The prompts didn't work as shown. The style drifted between beats. Faces were a no-go (IP safeguards). Motion caused artifacts. And there was no troubleshooting guide when things broke.

The video wasn't wrong. It was just incomplete.

So I did what I always do: I built the system I wish I had.

## What I Built

[MotionGraphicsStudio](https://github.com/madebysaira/MotionGraphicsStudio) is a complete Claude Co-work setup for AI-powered motion graphics. It includes:

- **Style sheets** (Vox explainer, Ink vector, Corporate clean) with exact color codes, typography, and motion principles
- **Reusable skills** for story breakdown and motion building
- **Complete examples** (the LeBron James story from the video, but with actual prompts)
- **Troubleshooting guide** for every issue I encountered

The goal: clone this repo, load it in Claude Co-work, and have a working motion graphics studio in 10 minutes.

## What the Video Didn't Tell You

The tutorial was a great starting point. But here's what it skipped:

### 1. Exact Prompts

The video showed the final results but not the exact prompts used. I reverse-engineered prompts that actually work, with specific parameters for camera movement, parallax, and easing.

Example from the LeBron James story:

```
[Beat 7] Ink vector style illustration of the iconic Finals block moment.

Visual style:
- Near black background with deep blue accents (#004E89)
- Two player silhouettes mid-air
- Basketball frozen at peak moment
- Gold accent (#FFD23F) on the ball for emphasis

Motion for video:
- Slow rotate around the moment (5 degrees over 6s)
- Parallax: Ball moves slightly faster than players
- Ease-out for dramatic pause
```

### 2. IP Workarounds

The video mentioned "no faces" but didn't explain why or how to work around it. AI models have built-in safeguards against generating recognizable public figures.

The repo includes three workarounds:
- Silhouettes with identifying context (jersey numbers, team colors)
- Abstract styles (ink vector, vector art)
- Reference image transformations ("inspired by" rather than literal)

### 3. Motion Parameters

The video showed dynamic clips but didn't specify the exact motion settings. I documented what works:

- **Push-in**: 5-10% zoom over 6 seconds (establishing shots)
- **Parallax**: Foreground moves 20% faster than background (most shots)
- **Easing**: Ease-in-out for natural motion, ease-out for punchy entrances

And what doesn't work:
- Complex motion (rotate + zoom + pan) causes artifacts
- Strong parallax on face shots creates warping
- Exceeding 30 degrees of camera movement in 6 seconds

### 4. Troubleshooting

When clips came out warped or the MCP connector broke, I had to figure it out myself. The repo includes solutions for:

- AI refusing to generate faces (with workarounds)
- Motion artifacts (simplify, shorten, add foreground elements)
- MCP connector failures (re-auth, CLI fallback)
- Inconsistent style across beats (re-read style sheets, batch generation)

### 5. The Editing Phase

The video ends at generation. But you still need to edit clips together, add sound, and color grade. I budget 2-3 hours for post-production on a 60-second video.

The repo includes a shot plan artifact template that makes editing faster.

## Why I'm Sharing This

I could have kept this for my client work. But I've learned that open-sourcing workflows helps me in two ways:

1. **It forces me to document properly**. If strangers will use this, it needs to be clear and complete.
2. **It attracts better clients**. When people see the depth of my workflows, they understand the value I bring.

This repo is now part of my GitHub profile alongside my other tools: CharacterConsistency, VideoWorkflows, RemotionPlaybook, and the cinematic prompts library.

## What's Next

I'm using this on two client projects this week:
- A 60-second explainer for a fintech startup (Vox style)
- A sports biography for a local athlete (Ink vector style)

I'll update the repo with any new patterns or troubleshooting tips that come up.

If you're working with AI video tools, I'd love to hear what workflows you've built. The tools change every week, but good systems last.

---

**MotionGraphicsStudio**: [github.com/madebysaira/MotionGraphicsStudio](https://github.com/madebysaira/MotionGraphicsStudio)

**Source tutorial**: [Claude Co-work Motion Graphics Guide](https://youtu.be/820HhFAlVSw)

**Book a call**: If you need help implementing AI video workflows for your team, [let's talk](/#booking).
