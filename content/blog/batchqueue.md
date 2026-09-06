---
title: "AIVideoBatchQueue: The Batch Queue That Keeps Your 30-Clip AI Video Run Alive Overnight"
description: "I built AIVideoBatchQueue — an offline-first, crash-safe batch queue for AI video generation jobs. Provider-agnostic JSON job specs, SQLite state with atomic transitions, retry with attempts tracking, a credit budget ceiling, and provenance export. The 5th pillar of the AIVideo safety net."
date: 2026-09-06
category: "Build Log"
tags: ["AIVideoBatchQueue", "AIVideoRunbook", "AIVideoCreditGuard", "AI Video", "Batch Processing", "SQLite", "n8n", "Automation", "Queue"]
repo: "https://github.com/madebysaira/AIVideoBatchQueue"
---

The scene every AI video creator knows: it's 11pm. You queue 30 clips for a client — a mix of Kling hero shots, Veo explainers, a few ComfyUI runs for the B-roll. You set the laptop to "don't sleep," close the lid anyway, and go to bed optimistic.

Morning: the API hiccuped on job #7 at 00:40. The shell script you wrote stopped right there. Jobs 8–30 never ran. Two of the ones that did render are sitting in a temp folder with timestamped names, and you can't remember which prompt made the good one — or whether job #3's failure was billed.

Every existing answer to this is either a provider-specific browser automation (fragile, single-vendor, against ToS half the time) or a heavyweight pipeline engine you have to host. So I built the missing piece as the 5th pillar of the [AIVideo safety net](https://github.com/madebysaira/AIVideoRunbook).

## AIVideoBatchQueue

A small, offline-first CLI — `avq` — that treats a batch of AI video jobs like a durable queue, not a shell loop:

```
avq add hero-shot-01 --provider kling --payload-file shots/01.json
avq add hero-shot-02 --provider kling --payload-file shots/02.json
avq run --batch launch-week
```

```
queued → running → done
              ↘ queued (retry, attempts+1)   [API hiccup? back in line.]
              ↘ failed                      [attempts exhausted — you decide.]
     budget ceiling → skipped               [would overspend? never started.]
```

The whole state lives in one SQLite file (WAL mode). Kill `-9` the process mid-run; the next `avq run` reclaims the interrupted job and continues. No daemon, no accounts, no cloud — the same contract as [CreditGuard](https://github.com/madebysaira/AIVideoCreditGuard), [QualityGate](https://github.com/madebysaira/AIVideoQualityGate), [AdherenceGate](https://github.com/madebysaira/AIVideoAdherenceGate), and [Runbook](https://github.com/madebysaira/AIVideoRunbook).

## What it actually fixes

- **Crash-safe by construction.** State transitions are compare-and-swap SQL updates — two `avq run` processes can never double-run the same job, and a crashed run leaves at most one `running` job that gets reclaimed on the next start. Your batch is resumable the same way `git rebase --continue` is.
- **Retries that respect money.** Each job tracks `attempts` vs `max_attempts` and `spent` credits vs the batch budget. A provider 500 doesn't vaporize the job — it goes back in line with the error recorded. But the budget guard checks *before* each attempt: if the next job would push the batch past its credit ceiling, it's marked `skipped`, not started. You never wake up to a surprise bill.
- **Provider-agnostic by design.** `avq init` writes a `providers.json` of command templates — `kling`, `veo`, `comfyui`, `shell`. Each is an argv array with an optional `PAYLOAD` placeholder. Wire your real API call, a ComfyUI script, or a local model — the queue doesn't care. (The defaults are safe `echo` stubs, so the whole system is testable offline before you plug anything real in.)
- **Provenance for free.** `avq export --jsonl` dumps every job — payload, attempts, errors, outputs, credits — as JSON lines your n8n flow, Sheets, or the Runbook catalog can ingest. The "which prompt made the good one" question is now a `grep`.

## Why not just a shell loop?

Because the shell loop dies with the process, has no memory of what it attempted, double-bills on naive re-runs, and can't answer "what happened overnight" without you reading scrollback. The r/n8n agencies running high-volume client pipelines say the same thing: error handling is the actual bottleneck, not the generation calls. BatchQueue makes the failure paths first-class citizens — `status`, `retry`, `skip`, `doctor` — instead of the happy path with everything else bolted on.

## The safety net, now five pillars

> **Before you pay** → CreditGuard
> **One clip at a time** → Runbook (gates in order, verdict + catalog)
> **Thirty clips at once** → **BatchQueue** (crash-safe, retry, budget)
> **After you render** → QualityGate (technical) + AdherenceGate (semantic)
> **Provenance** → Runbook catalog + `avq export`

Runbook disciplines one clip credit-to-delivery. BatchQueue makes 50 survivable.

## Try it

- Repo: [github.com/madebysaira/AIVideoBatchQueue](https://github.com/madebysaira/AIVideoBatchQueue) (Python 3.10+, **zero required pip deps**)
- Install: `pip install git+https://github.com/madebysaira/AIVideoBatchQueue.git`
- Then: `avq init && bash examples/quickstart.sh` — a full demo queue that runs offline in under a minute.

If your overnight batch has ever silently died on job #7, this one's for you.
