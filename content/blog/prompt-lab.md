---
title: "The One Variable Rule That Fixed My AI Video Prompts"
description: "PromptLab is a browser based lab I built to test AI video prompts one variable at a time, so I stop burning credits on renders that teach me nothing."
date: 2026-08-16
category: "Build Log"
tags: ["PromptLab", "AI Video", "Prompts", "Kling", "Veo"]
repo: "https://github.com/madebysaira/PromptLab"
---

I know the exact moment a render stops being useful. The prompt fails, the character drifts, the lighting is wrong. And I cannot tell which word caused it, because I changed four words between the last attempt and this one.

Every creator I talk to has the same habit. Adjust the pose, the camera, the lighting, and the scene description at the same time, render, and hope. When it fails, you learn nothing. When it works, you do not know which change did the job, so you cannot repeat it. It is the most expensive way to test, and it is the default way everyone tests.

The fix is a boring discipline that shows up in every serious guide: change one variable per round, lock everything else, and run a short clean check before a full render. Fal.ai says it in the Kling guide. The OpenGradient blog says it. PixVerse says it. Everyone agrees, and almost nobody does it, because nothing enforces it.

So I built [PromptLab](https://github.com/madebysaira/PromptLab), a small interactive lab that makes the discipline the path of least resistance.

## What PromptLab does

It is a single HTML file that opens in any browser. No install, no API keys, no account, no backend. Everything stays on your machine.

You build a prompt from nine variable blocks: subject, action, camera move, shot size, lighting, style, mood, duration, and negative prompt. Each block has suggestion chips you can click or a field you can type into. Then you press "Start test round". PromptLab freezes the current state, and from that moment it watches your edits. Change one block and you get a clean test verdict. Change three and it flags the round as contaminated, because you are about to learn nothing.

There is also a lock on every block. Lock the style string and the subject so you physically cannot touch them mid-round. The remaining unlocked block is the only thing left to change, which is the whole point.

The prompt reassembles per model. The same ideas come out structured for Kling, Veo, Runway, Luma, or Seedance, because each model reads prompts differently. Kling likes long cinematic prose with a labeled camera section. Veo prefers short declarative sentences and no camera section at all. The model reference cards in the repo spell out where each one is picky.

Every logged round stores what changed, what you locked, and the exact prompt you used. That history lives in local storage, so you can look back at round seven and see which single change fixed the face drift. And there is a small credits saved counter that ticks up every time you log a clean single variable test. It is a tiny reward for doing it right, and it adds up.

## Why I built it as one file

I could have made it a proper app with a build step and a framework. I did not, because the people I built it for copy repos and open files. A single HTML file with zero dependencies is the lowest friction thing that can exist. Clone, open, use. It works offline, which matters when you are on a shoot or a train and still want to prep a test round.

The whole thing also stays inspectable. The model list lives in one object near the top of the script. Adding a model means adding a key and an assembly template. That is it. I want people to fork it and make it theirs.

The same file also runs on any static host. If you want a shareable URL for a client or a team, drop the folder on Cloudflare Pages or Netlify and it works as is, because there is no backend to configure.

## The decision tree is the part I use most

The repo includes a [decision tree](https://github.com/madebysaira/PromptLab/blob/main/docs/decision-tree.md) that maps render symptoms to the variable you should test next. Face keeps changing between shots? Test the subject wording, then the style, and keep any reference image identical across rounds. Motion looks floaty? Test the action verb first, then the camera move, then duration. Colors are banding? Test style, then lighting, then put color banding in the negative prompt as its own round.

It ends with the one rule that matters: if you changed two variables in the same round and the render is bad, you learned nothing. Re run with one change. PromptLab flags multi variable rounds in the interface for exactly this reason, so the tool argues with you before you waste the render.

## What this changed for me

I do fewer renders per fix now, and each render tells me something. A bad result points at the block I changed. A good result means that block was the answer, and I can lock it and move to the next one. On client work the loop is simple: short check with one variable, then commit to the full render only when the direction is proven. It saves credits, and it saves the worse cost, the hours of rerendering the same wrong thing while changing everything.

The tool does not make the prompts for you. It makes the testing honest, which is the part that was missing.

If you test prompts by feel, give it one session. Open it, lock everything, change one thing, and see what your renders start telling you. The repo is [PromptLab on GitHub](https://github.com/madebysaira/PromptLab).

If you want help building a testing discipline like this into your actual client workflow, [book a quick call](/#booking).
