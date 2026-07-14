---
title: "How I Built My Portfolio Site, Start to Finish"
description: "The story behind madebysaira.me, from a rough idea to a fast, static site that a brand can trust. What I used, what I changed, and why."
date: 2026-07-14
category: "Case Study"
tags: ["Portfolio", "React", "Web Design", "AI Workflow"]
repo: "https://github.com/madebysaira/madebysaira"
---

I wanted a portfolio that felt like me. Not a template with my name dropped into it, but something that looked considered, loaded fast, and gave a brand a reason to trust me before we ever spoke. This is the story of how it came together, and the small decisions that ended up mattering the most.

## Starting with a feeling, not a layout

Most portfolio advice tells you to start with the sections. I started with a feeling instead. I wanted the site to feel calm and confident, a bit cinematic, with plenty of black space so the work could breathe. Once I had that in my head, the layout mostly designed itself. A quiet sidebar, a big honest headline, and then the work, close to the top where it belongs.

The tone had to match too. I write the way I talk, so the copy is plain and warm rather than stuffed with buzzwords. If a sentence sounded like a brochure, it got cut.

## The stack, kept deliberately simple

Under the hood it is a static site built with React and Vite, styled with Tailwind. Nothing exotic, and that is the point. A portfolio does not need a database or a server. It needs to load instantly, work on a cheap phone on slow data, and never go down.

Because everything is prebuilt into plain files, the whole thing can sit on a CDN and load in a blink. That also means the running cost is close to nothing, which matters when a site is doing its job quietly in the background for years.

> The best portfolio is the one that is still online, still fast, and still true five years from now.

## The details that took the most time

The flashy parts were quick. The boring parts were slow, and they are the ones people actually feel.

- **Mobile first, honestly.** Most people who find me are on a phone. I tested every section at a narrow width and fixed the small misalignments that pile up into a cheap feeling.
- **Real thumbnails for video.** A muted video shows a black frame on many phones until you tap it. I generate a still image for each clip so the work looks alive the moment the page loads.
- **A share preview that works.** When someone drops the link in a chat, the little card needs to show my face and my line, not a broken box. That took more fiddling than I expected, and it was worth it.

## What AI actually did here

People assume AI wrote the whole thing. It did not. I used it the way I use it for client work, as a fast pair of hands that I direct closely. It helped me move quickly through the plumbing so I could spend my attention on taste, on the words, and on the feel. The judgement stayed mine. The tools just made the judgement cheaper to act on.

## Where it goes next

A site is never really finished. This journal is the proof. Every time I ship something new, a short post lands here explaining what I made and why it matters. If you want to see how I think, this is the place to watch.

If any of this sounds like the kind of care you want on your own project, [book a quick call](/#booking) and tell me what you are building.
