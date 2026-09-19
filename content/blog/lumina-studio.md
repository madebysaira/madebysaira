---
title: "Lumina Studio: a self hosted AI image workbench"
description: "I built a lightweight workbench for AI image generation that talks to any OpenAI compatible endpoint, streams live progress, and keeps your keys on your own machine."
date: 2026-09-19
category: "Build Log"
tags: ["LuminaStudio", "AI Images", "FastAPI", "Self Hosted", "WebSocket"]
repo: "https://github.com/madebysaira/LuminaStudio"
---

Every AI image tool I tried wanted the same deal. Create an account, buy credits on their menu, generate through their proxy, and hope the queue is short today. The model underneath is usually a standard API anyway, so I kept wondering why I needed a middleman with a markup. So I built [Lumina Studio](https://github.com/madebysaira/LuminaStudio), a small workbench that talks straight to the model endpoint of my choice and keeps everything else on my own machine.

The whole thing is FastAPI, SQLite, and one HTML page. It runs on a Raspberry Pi in about 100 MB of RAM. You set two environment variables, your endpoint and your key, and generate from a clean dark UI with live progress. No account, no per seat fees, no assets passing through anyone else's server.

<figure>
  <img src="/images/blog/lumina-workbench.png" alt="Lumina Studio workbench: a prompt box, a blue Generate button, and a running job with a gradient progress bar" />
  <figcaption>The workbench. Prompt in, picture out, progress streaming the whole way.</figcaption>
</figure>

## Bring your own models

The core idea is one small Python class per provider. Each adapter implements a single async method that takes a prompt and returns a finished image URL. That is the entire interface. Right now there are two: one for any OpenAI compatible images endpoint (which covers DALL-E, gpt-image, and every gateway that speaks the same protocol, including free model routers), and one for Gemini image models.

Pointing Lumina at a free model gateway instead of the official API is a config change, not a code change. Your key stays in an environment variable on your machine. Nothing about this setup needs my permission or anyone's subscription.

## The queue does the worrying

Generation is slow and networks are flaky, so the queue is where most of the engineering went. Submits are idempotent, which means hammering Generate twice (or a retry racing the original) gives you one task, not two bills. Failed calls retry with backoff when the error looks temporary, and give up fast when it does not. A bad key fails immediately instead of burning three retries. Anything queued or running can be cancelled with one click.

The queue holds at most three parallel generations by default. That number is deliberate. Enough to feel fast, small enough that a Pi never falls over.

## The bug I fixed before it bit anyone

While researching how similar tools handle plugin traffic, I noticed a pattern worth stealing in reverse. Plenty of servers check whether an upstream *hostname string* looks private and call that an SSRF guard. The problem is that DNS can resolve an innocent looking name to a private IP, which sails straight past a string check. Lumina resolves first and rejects private, loopback, and link local addresses before any traffic flows. It is maybe twenty lines of code and it closes a hole that string matching never will.

## Live progress without the polling hangover

The frontend gets task updates over a WebSocket instead of polling every two seconds like it is 2014. Each socket subscribes only to its own task IDs, capped at fifty, and the server drops frames for slow clients rather than letting them stall the queue. When a socket disconnects, its subscription is released in a finally block. I have seen enough leaked subscriber maps in other codebases to be precious about that one line.

## What this means if you hire me

This is the shape of most of my backend work. Small surface area, explicit failure modes, and the boring parts (retries, cancellation, cleanup) treated as features instead of afterthoughts. If your product wraps AI models behind a UI, that discipline is the difference between a demo and something you can charge for.

The code is MIT licensed and the setup is one container. Try it, break it, tell me what you hit.

[View the code on GitHub](https://github.com/madebysaira/LuminaStudio) or [book a quick call](/#booking).
