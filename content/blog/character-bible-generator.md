---
title: "I built a character bible for AI video that survives past shot three"
description: "A practical character bible, reference sheet, and review checklist for keeping recurring AI video characters consistent across shots."
date: 2026-08-13
category: "Case Study"
tags: ["CharacterBibleGenerator", "AI Video", "Character Consistency", "Prompts"]
repo: "https://github.com/madebysaira/CharacterBibleGenerator"
---

The face changes first. Then the hair. By the fourth shot, the character is technically wearing the same jacket, but it belongs to somebody else.

That is the point where a lot of AI video workflows become expensive. You regenerate the shot, try a new seed, rewrite the prompt, or blame the model. Sometimes the problem is the model. Often the process gave it too much room to improvise.

I built [CharacterBibleGenerator](https://github.com/madebysaira/CharacterBibleGenerator) to make that process less vague.

## The part most tutorials skip

A lot of advice says to reuse the same prompt and attach the same reference image. That helps, but it is not a production workflow. It does not tell you which details must stay fixed, which details belong to the shot, or when a frame is too different to use.

The repository starts with a character bible. It records the face, hair, skin, build, wardrobe, palette, signature prop, and the changes that count as unacceptable drift. That document becomes the source for every later shot.

The important distinction is simple: identity stays fixed, cinematography changes.

## Identity is not the action

The identity block describes who the character is. The shot block describes what happens now.

```text
CHARACTER IDENTITY, KEEP UNCHANGED:
Mira Sen, a field researcher in her early thirties. Oval face, deep-set brown eyes,
straight nose, small scar above the left eyebrow. Shoulder-length black hair with
loose waves and a side part. Olive field jacket, cream cotton shirt, dark trousers.
Red fabric notebook.

SHOT:
She walks through a wet market at dawn. Slow handheld camera, 50mm lens, soft
overcast light.
```

I do not rewrite the identity section for every shot. I paste it as-is and change only the action, camera, environment, and lighting. That gives the model a stable anchor while still leaving room for the scene to move.

## The reference sheet is a useful checkpoint

Before asking for motion, I generate a small reference sheet with a neutral front view, both profiles, a three-quarter view, and a few expressions. It is not glamorous. It is useful.

The sheet gives me something to compare against when a later frame feels slightly wrong. Without it, “the character changed” stays subjective. With it, I can point to the hairline, the scar, the jacket, or the body proportions and decide whether to pass, revise, or regenerate.

That review step matters more than another paragraph of adjectives in the prompt.

## What to do when the model drifts

I change one variable at a time. If the face drifts, I keep the identity block and reference image, then adjust the reference strength or image instructions. If the wardrobe changes, I add the exact garment details and a short negative list. If several identity-critical details change, I regenerate instead of trying to rescue a bad frame with more prose.

The checklist in the repo covers:

- facial structure and distinguishing marks
- hairline, length, and part
- skin tone and apparent age
- body proportions
- wardrobe and signature props
- unwanted logos, text, jewelry, or accessories

This is not a promise of perfect consistency. No prompt can make that promise honestly. The goal is to catch drift early, record what failed, and avoid burning credits while guessing.

## Why I kept it model agnostic

Reference image controls, seeds, prompt weights, and negative prompt behavior vary between tools. A setting that helps in one model may do very little in another, or may make the result worse.

So the toolkit keeps the process stable and leaves the model-specific syntax in the shot prompt. That makes it easier to move from one tool to another without rebuilding the whole production system.

The research pointed in the same direction. Current AI visual director and video-generation projects show strong interest in structured scene direction, while creator tutorials continue to emphasize character consistency as a practical problem. The gap is the handoff between those two things: a character record that survives into the shot and a review gate before the next shot begins.

## What I would use this for

I would use it for a short product film, a recurring social character, an explainer with a presenter, or any campaign where the same person appears more than once. It is especially useful when several people are generating shots and need to share the same reference instead of relying on memory.

The repository is intentionally small. Copy the YAML template, write the identity block, make the reference sheet, and start testing. The value is in the discipline, not in hiding the workflow behind a large application.

You can find the full toolkit here: [CharacterBibleGenerator on GitHub](https://github.com/madebysaira/CharacterBibleGenerator).

If you are building a commercial AI video workflow and want help making it usable beyond the demo, [book a quick call](/#booking).
