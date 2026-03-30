---
phase: 2
slug: layout-shell
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build verification + visual inspection (no unit-testable logic) |
| **Config file** | next.config.ts |
| **Quick run command** | `npx next build` |
| **Full suite command** | `npx next build && npx next start & sleep 3 && curl -s http://localhost:3000 | head -50` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx next build`
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01 | 01 | 1 | LAYO-01, LAYO-02, LAYO-03 | build + manual | `npx next build` | ❌ W0 | ⬜ pending |
| 02-02 | 01 | 1 | LAYO-04, LAYO-05, LAYO-06 | build + manual | `npx next build` | ❌ W0 | ⬜ pending |
| 02-03 | 02 | 2 | DESN-02, DESN-06 | manual | Visual check | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `lucide-react` installed for icons (Menu, X, Instagram)

*Existing infrastructure covers remaining requirements after icon install.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Centered nav renders correctly | LAYO-01 | Visual layout verification | Open homepage, verify "JENNIE SLADE" centered above nav links |
| Hamburger menu works on mobile | LAYO-02 | Touch/click interaction | Resize to mobile, tap hamburger, verify full-screen overlay |
| Header disappears/reappears on scroll | LAYO-03 | Scroll behavior | Scroll down past hero, verify header hides. Scroll up, verify reappears. |
| Footer layout and content | LAYO-04 | Visual inspection | Scroll to bottom, verify name, email, Instagram, nav links |
| Warm colors consistent | DESN-02 | Color perception | Inspect nav and footer, verify no cool grays |
| Page transitions | DESN-06 | Visual animation | Navigate between pages, verify subtle fade-in |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
