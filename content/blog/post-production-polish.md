---
title: "AI Video Is 80% There. Here's the Last 20%"
description: "The post-production toolkit I built to polish AI renders for client delivery. Remotion templates, ffmpeg scripts, and the workflows that save hours per video."
date: 2026-07-29
category: "Case Study"
tags: ["PostProduction", "AI Video", "Remotion", "Client Workflows"]
repo: "https://github.com/madebysaira/PostProductionForAIVideo"
---

Raw AI video is impressive. It is also rarely client-ready.

I learned this the hard way on a Tanishq jewelry ad last month. The Kling renders looked stunning, but the client needed branded text overlays, exact 30-second timing to match their music bed, and a logo watermark. Doing this manually in After Effects would have taken 3-4 hours for a 30-second spot.

So I built what I wish I had: a set of post-production templates and scripts that handle the last 20% of polish work automatically. Import an AI render, tweak a few props, and export client-ready in 30 minutes instead of 3 hours.

## What the toolkit does

The repo ships three things: Remotion templates for brand videos and explainers, ffmpeg scripts for automation tasks, and After Effects expression snippets for quick fixes.

The Remotion templates are my starting point for most client work now. The brand video template has text overlay components, timing controls, and color grading presets built in. Drop your AI render into the assets folder, update the video path, adjust the text and colors, and render. The explainer template is similar but built for Vox-style breakdowns with callouts and chapter markers.

The scripts handle the tedious stuff. The contact sheet generator creates a grid of frames from your video so clients can pick preferred shots before you do the full polish. The scene detector auto-finds cuts in your AI render and outputs a JSON file you can import directly into Remotion for precise timing. The timing adjuster stretches or compresses clips to match a fixed-duration voiceover without audio artifacts.

## Why I built this

AI video tools have gotten incredibly good at generating raw footage. They have not solved the last mile: making that footage fit a client's brand, timing, and delivery specs.

Before these templates, I was rebuilding the same Remotion compositions for every project. Same text overlay structure, same timing controls, same export settings. That is wasted time. Now I import a template, customize it, and move on to the creative decisions that actually matter to the client.

The time savings are real. A Tanishq ad that used to take 4 hours of post-production now takes 40 minutes total, including the AI generation time. A Horlicks social video went from 2 hours to 20 minutes. A 2-minute Vox-style explainer went from 4-6 hours to about 90 minutes.

## What still needs manual touch

The templates do not replace creative judgement. They replace repetitive setup work.

You still decide which AI renders to use. You still write the actual text on the overlays. You still make the call on whether a shot needs color correction or if the AI got it right. The templates just make acting on those decisions faster and more consistent.

I also skip the templates entirely for high-concept creative work where no template fits, or when a client wants something unlike anything before. Templates are for the 80% of work that follows familiar patterns. The other 20% is where you earn your fee.

## How I use this on client projects

A typical workflow looks like this:

Generate the AI renders based on the brief. Run the scene detector to find cut points. Import the scene JSON into the appropriate Remotion template. Add text overlays for key messages or callouts. Adjust timing to match the music bed or voiceover. Generate a contact sheet for client review. Make any tweaks they request. Render the final.

The client gets professional polish without paying for hours of manual AE work. I get to take on more projects because the repetitive parts are automated.

## What is in the repo

Everything is MIT licensed and ready to use. The README has a quick start guide, a decision tree for which tool to use when, and real before-and-after examples from client work. The templates folder has the Remotion projects. The scripts folder has the Python automation tools. The docs folder has setup instructions and export settings for different platforms.

If you have built your own post-production shortcuts, I want to include them. Open a PR with your script or component, a brief explanation of what it does, and an example of how you used it.

## The point

AI video is not about replacing human creativity. It is about removing the friction between a creative idea and a client-ready deliverable. These templates handle the friction so you can focus on the creativity.

See the toolkit at [github.com/madebysaira/PostProductionForAIVideo](https://github.com/madebysaira/PostProductionForAIVideo). If you want help setting up similar workflows for your studio, [book a quick call](/#booking).
