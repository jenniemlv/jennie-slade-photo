---
phase: 5
slug: gallery-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build verification + Lighthouse CLI + manual iPhone Safari |
| **Config file** | next.config.ts |
| **Quick run command** | `npx next build` |
| **Full suite command** | `npx next build && npx next start & sleep 3 && curl -s http://localhost:3000/portfolio | head -50` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx next build`
- **After every plan wave:** Run full suite + Lighthouse CLS check
- **Before `/gsd:verify-work`:** Full suite must be green + CLS < 0.1
- **Max feedback latency:** 20 seconds

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Gallery grid renders with generous spacing | PORT-02 | Visual layout | Open /weddings, verify 3-col grid with gaps |
| Lightbox opens on click | PORT-03 | Click interaction | Click any gallery image, verify full-screen lightbox |
| Keyboard navigation in lightbox | PORT-03 | Keyboard test | Use arrow keys in lightbox, verify prev/next |
| Mobile swipe in lightbox | PORT-03 | Touch interaction | Open on iPhone, swipe left/right in lightbox |
| Portfolio hub links to galleries | PORT-01 | Navigation test | Click each tile on /portfolio, verify navigation |
| CLS below 0.1 | SEOP-08 | Lighthouse measurement | Run Lighthouse on each gallery page |
| Alt text is descriptive | SEOP-05 | Content review | Inspect image alt attributes, verify location-specific |
| Warm colors consistent | PORT-02 | Visual perception | Verify no cool grays in grid or lightbox |

---

## Validation Sign-Off

- [ ] All tasks have automated build verify
- [ ] Manual verifications documented
- [ ] CLS < 0.1 on all gallery pages
- [ ] Lightbox works on real iPhone Safari
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
