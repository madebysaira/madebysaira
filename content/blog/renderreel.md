---
title: "RenderReel: Stills In, Launch Video Out"
description: "I built an offline CLI that turns AI stills and a one-page brief into a narrated, captioned launch video — then made it brag about itself in its own voice."
date: 2026-09-17
category: "Build Log"
tags: ["RenderReel", "AI Video", "ffmpeg", "Piper TTS", "Offline", "Workflow"]
repo: "https://github.com/madebysaira/RenderReel"
---

Every render I finish has the same sad ending: a screen recording. I drag the file into chat, type "check this," and watch good work die in a grey player. The alternative — cloud video tools — burns credits on every retry and phones home with my assets. So I built the boring-reliable middle: **[RenderReel](https://github.com/madebysaira/RenderReel)**, a CLI that turns stills and a one-page brief into a cinematic launch video. Offline. On a Raspberry Pi. In under a minute.

And to prove it, I made RenderReel make its own launch video. Narrated, captioned, music bed and all. It is bragging about itself right now, in its own voice:

<figure>
  <img src="/images/blog/renderreel/opt-demo-f2.jpg" alt="Opening frame of the RenderReel launch video: ember gradient title card reading Your renders deserve better" />
  <figcaption>Frame one of the self-made launch video. The hook, the gradient, the accent bar — all forged by PIL, zero image models.</figcaption>
</figure>

## The brief is the product

Everything starts from one YAML file. Product name, a hook (linter-enforced: twelve words max), a tagline, scenes with narration lines, a palette, a mood. That's the whole input:

```yaml
product: "RenderReel"
hook: "Your renders deserve better than a screen recording."
tagline: "Stills in. Launch video out."
format: landscape
palette: ember
mood: pulse
scenes:
  - title: "Brief in. Chaos out."
    body: "lint. stills. voice. captions."
    narration: "Feed RenderReel a brief and some stills..."
    seconds: 5
```

The pipeline runs six stages: **lint → stills → Ken Burns clips → narration → music bed → mux + QC**. Each stage is a module with one job, and the linter fails fast — weak hook, missing tagline, narration overflowing its slot — before a single frame renders. That fail-fast habit comes straight from [AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate): never pay render time for a brief problem.

<figure>
  <img src="/images/blog/renderreel/opt-demo-f6.jpg" alt="Middle frame of the launch video showing the pipeline scene: Brief in. Chaos out. with narration captions" />
  <figcaption>The pipeline scene. Note the burned-in caption at the bottom — that's the narration line, timed to its scene slot.</figcaption>
</figure>

## Image and video, one toolchain

The image side is pure PIL: gradient backdrops in four palettes (ember, royal, noir, pulse), glow accent bar, auto-sized typography, letterboxed normalization for creator-supplied stills so mixed aspect ratios never break the cut. No image models, no API keys, deterministic — the same brief renders the same frames every time.

The video side is ffmpeg all the way down: `zoompan` for the Ken Burns drift, `xfade` for crossfades, burned-in `subtitles`, and a generated music bed (synthesized pulse/noir/ember drones, no stock audio licensing) sidechain-ducked under the narration so the voice always wins. Piper does the neural narration offline — a ~60MB voice model, no cloud.

The hardest bug was in the ducking: `sidechaincompress` refuses a filter label as its key input, so the narration has to be `asplit` first — one copy as the key, one as the mix source. Two lines, one hour. Classic ffmpeg.

## The QC gate

Every render ends with the same three assertions: dimensions match the format, duration matches the brief, audio is present. If any fail, the command exits non-zero and CI catches it. It's a small thing, but it's the difference between "it rendered" and "it shipped."

<figure>
  <img src="/images/blog/renderreel/opt-demo-f15.jpg" alt="Outro frame of the launch video: RenderReel. Stills in. Launch video out." />
  <figcaption>The outro. Seventeen seconds, 1080p, and the linter flagged its own scene-two overflow mid-render. Dogfooding works.</figcaption>
</figure>

## Where it sits

RenderReel is the launch layer on my AI-video toolchain: prompts from [cinematic-ai-prompts](https://github.com/madebysaira/cinematic-ai-prompts), motion patterns from [RemotionPlaybook](https://github.com/madebysaira/RemotionPlaybook), QC philosophy from [AIVideoQualityGate](https://github.com/madebysaira/AIVideoQualityGate), and the pipeline-drawing habit from [AIVideoDiagrams](https://github.com/madebysaira/AIVideoDiagrams) — now executable instead of decorative.

Try it: `renderreel render demo/brief.yml --out ./launch`. Ten unit tests, one `doctor` command, MIT licensed. And if your renders are still going out as screen recordings — we need to talk.
