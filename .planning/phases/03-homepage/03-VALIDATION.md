---
phase: 3
slug: homepage
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build verification + visual inspection |
| **Config file** | next.config.ts |
| **Quick run command** | `npx next build` |
| **Full suite command** | `npx next build && npx next start & sleep 3 && curl -s http://localhost:3000 | head -100` |
| **Estimated runtime** | ~15 seconds |

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero fills viewport with tagline overlay | HOME-02 | Visual layout | Open homepage, verify hero is full-width ~80vh with centered tagline |
| Welcome copy is warm and personal | HOME-03 | Copy quality | Read welcome section, verify first-person voice and generational story |
| Portfolio tiles link to correct pages | HOME-04 | Navigation check | Click Weddings/Families/Seniors tiles, verify links work |
| Scroll fade-in animations | HOME-05 | Animation timing | Scroll down, verify sections fade in smoothly |
| Mobile layout is beautiful | HOME-06 | Real device check | Open on iPhone/DevTools mobile, verify proportions and readability |
| Editorial whitespace throughout | DESN-01 | Visual perception | Verify generous spacing between sections |
| Photography is hero element | DESN-04 | Design hierarchy | Verify placeholder blocks are dominant visual elements |

---

## Validation Sign-Off

- [ ] All tasks have automated build verify
- [ ] Manual verifications documented
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
