---
title: "The Character Kit That Stopped Face Drift in My Client AI Videos"
description: "How a locked style block and reference image system cut regeneration rates and made multi-shot AI video reliable for commercial work."
date: 2026-07-15
category: "Case Study"
tags: ["CharacterConsistency", "AI Video", "Prompts", "Kling", "Veo"]
repo: "https://github.com/madebysaira/CharacterConsistency"
---

The face kept changing. I would generate shot one with a woman in a cream blouse, then shot three would have a different jaw or longer hair or the blouse neckline had shifted. Even with the same seed and the same reference photo. It happened on almost every multi-shot job.

Clients noticed. The video felt like it was made by three different people. I was spending hours in post or burning credits on regenerations just to make one person look like herself across a 30 second piece.

I needed something more reliable than "use the same prompt and hope".

## What actually worked

The fix was not a better model or a fancier reference. It was separating what stays fixed from what changes.

I write one detailed style block that describes the character completely. Physical details, exact clothing, lighting direction, color palette, hair. That block stays identical for every clip in the sequence.

Then I generate one reference image from that style block text. I use that image plus the full style block in the video prompt.

For each new shot I only change the action and camera. The character description never moves.

That separation is what dropped my regeneration rate from around 60 percent to under 15 percent on the last few campaigns.

## The style block and action block

The style block is the character bible. It includes things like "warm medium brown skin, sharp jaw, deep brown eyes with slight hood, straight black hair to shoulders with soft waves at ends". It names the exact blouse fabric and cut, the lighting angle, the small mole by the chin.

The action block is just the motion for that shot. "Applies two drops of serum to cheek, gentle circular motion, soft smile." Or "turns head slowly toward camera while speaking the product name".

I paste the full style block every time. The model now has a fixed anchor instead of guessing.

You can see the exact templates in the repo. I keep them short enough to copy but specific enough that the face does not wander.

## What I tried before this

Same seed. Same reference photo from a previous generation. Full prompt repeated. It helped a little but the drift still happened by shot three or four.

Using only the reference image without repeating the text description. The models ignored parts of the image when the prompt did not reinforce it.

Vague descriptions like "beautiful South Asian woman". Too much room for the model to reinterpret.

The locked block plus reference plus explicit negatives for "face change, different person, clothing shift" is what finally held.

## Model differences

Kling gives the best motion but needs the image weight pushed to 0.75 or 0.85 and the drift negatives.

Veo follows the text description more closely, which is useful when the character has lines to say. It still needs the reference and the repeated block, and it costs more so I save it for the shots that matter most.

Runway and Luma work with the same structure but show more variation. Fine for inserts, less reliable for hero shots where the face has to read as the same person.

I now pick the model based on what the shot needs and run the same locked block through it.

## A real client job

I used this on a five shot product explainer for a skincare brand. The same woman applying serum, talking to camera, showing the bottle.

Before the system I would have regenerated most of the clips. The face in shot three would not match shot one.

With the style block and one reference image I generated the sequence, compared frames, and only needed one small hand adjustment in post. The client approved without asking who the person in the third shot was.

The full prompts and notes are in the examples folder if you want to see the exact text.

## What this means for the work

Consistent characters mean the video can actually be used in a campaign or an explainer without the viewer checking out. It saves the hours I used to spend fixing faces. It saves the credits I used to burn.

More importantly it lets me focus on the story and the sell instead of fighting the model on identity.

If you are doing commercial AI video and multi-shot consistency is costing you time or money, the kit is here: https://github.com/madebysaira/CharacterConsistency

It is built from the jobs I actually ship, not from demo reels.

If any of this sounds like the kind of care you want on your own project, [book a quick call](/#booking) and tell me what you are building.
