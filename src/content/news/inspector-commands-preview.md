---
title: "Inspector commands enter public preview"
description: "The in-page inspector — a command field that audits tokens, spacing and contrast live in the browser — is now available to try on the docs shell."
pubDate: 2026-09-02
category: community
tags: [tooling, preview, design-engineering]
---

Design systems are easy to publish and hard to police. The **inspector** is our
answer: a terminal-style command field that runs audits against the live page
instead of a static spec sheet.

## A taste of the command set

```text
$ kolinn inspect --tokens        → 81 custom properties, 0 unresolved
$ kolinn inspect --spacing       → 138 nodes on the 8px grid, 4 off-grid
$ kolinn inspect --contrast      → 42 pairs checked, 42 pass AA
$ kolinn inspect --off-grid      → lists the 4 offenders with selectors
```

## Preview ground rules

1. The inspector is read-only — it never mutates the page.
2. Output is copy-pasteable markdown, ready for issue reports.
3. The command grammar is frozen for the preview; only new commands will be
   added before 1.0.

## Try it

The preview is wired into the documentation shell of the demo site. Off-grid
spacing reports have already caught three regressions in internal projects —
exactly the quiet drift a system needs a linter for.

Feedback threads are open in the community channel. Commands that graduate
from preview will land in the [system manifest](/about#manifest).
