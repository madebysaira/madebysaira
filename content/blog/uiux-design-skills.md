---
title: "I packaged the dark UI system I use for every client dashboard"
description: "I turned the dark glassmorphism design system I reuse for client dashboards into an open source skill, with keyless recipes for icons, images, fonts and video."
date: 2026-08-16
category: "Build Log"
tags: ["uiux-design-skills", "UI Design", "Design Tokens"]
repo: "https://github.com/madebysaira/uiux-design-skills"
---

Every dashboard project used to start the same way. I would open a blank file and rebuild the same dark theme by hand. Same background color. Same glass card with the blur and the thin border. Same Poppins weights. Same icon set. It took an afternoon of fiddling before any real work happened, and the fiddling was always slightly different, so nothing matched the previous project either.

The design itself stopped changing after a few client dashboards. Flat solid colors with no gradients, because gradients date fast and look cheap on monitors. Glassmorphism cards with a subtle border so they stay readable. Poppins for everything, Font Awesome for icons, and metric chips that show live status with a last updated timestamp. That became the house style. The problem was that the house style lived in my head and in half-finished CSS files scattered across old projects. Every new project meant reconstructing it from memory, and memory drifts.

So I packaged it. [uiux-design-skills](https://github.com/madebysaira/uiux-design-skills) is two skills. One encodes the design system itself. The other encodes how to source every visual asset without hunting.

## What the design skill actually contains

It is a design system in the form of tokens and patterns, not a theme file. Backgrounds, borders, text, accent colors, and the full status color set for metrics, each as a named token. Then the component patterns: glass cards, solid primary buttons, metric chips, sidebar layout. Then the checklist that separates a finished interface from a themed one.

The checklist is the part I value most, because it is the part designers carry in their heads and never write down. Contrast at or above 4.5 to 1. Spacing on an 8pt grid. Focus states for keyboard users. Empty, loading, and error states for every data view. Breakpoints that actually get tested. None of this is glamorous. It is what makes a dark theme look expensive instead of moody.

## The asset hunt was the real time sink

Icons were the worst. There are dozens of icon sites, most of them need an account, and half the SVG files you download are outdated or broken. The fix turned out to be Iconify, which serves over 200,000 icons from one API call. You ask for the icon by name and color and it returns clean SVG. No key, no account. Font Awesome 6, Lucide, Tabler, and Bootstrap are all reachable the same way.

Photos and video work the same. Unsplash serves direct CDN images if you pass the right parameters. Pexels and Pixabay have keyless tiers for smaller jobs. Mixkit and Coverr cover stock video with no account. Fonts come from the Google Fonts css2 API, which returns the exact woff2 files a site actually needs.

Every recipe in the skill is a copy paste curl command with the license noted next to it, because sourcing assets without checking the license is how small projects get into trouble.

## The mistakes are documented on purpose

The skill carries the pitfalls I hit while testing every source before publishing. Google Fonts will return ttf files unless you send a browser user agent, and the woff2 versions are a fraction of the size. Unsplash will happily hand you a giant original image unless you add auto=format and q=80 to the URL. Pexels rate limits per hour, so the recipe notes the pacing. These are one line lessons that each cost me a real session to learn, and now they live next to the commands.

I tested every endpoint on the Pi before I wrote the recipes. I did not want to ship a skill full of commands that looked right and failed in practice.

## What this means for client work

New dashboards start from the same tokens instead of a blank file. The first screen takes minutes, not an afternoon. Work across projects looks intentional because it is the same system, and handoff is easier because the decisions are documented instead of being tribal knowledge in my head. When a client asks why a card has that border, there is an answer, and it is written down.

The repo is [uiux-design-skills on GitHub](https://github.com/madebysaira/uiux-design-skills), MIT licensed. If you build interfaces for clients, take the tokens and the checklist, and let the sourcing recipes kill the tab hunt for good.

If you want this kind of system set up inside your own product work, [book a quick call](/#booking).
