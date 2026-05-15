# Design Context — signified-mvp

## Users

Researchers, writers, and editors working with cited material. The product is a desk where pieces of source — passages, images, drafts — sit on a field, get organized into frames (warm-paper folders that hug their members), and thread together via connections. Users are reading, drafting, and citing in long sessions; the field is meant to feel like a tactile working surface, not a database.

## Brand personality

Three words: **epistemic, paper, dense.**

- **Epistemic**: about knowledge, citation, framing — the visuals carry meaning about how a piece of work is held in context, not just how it looks.
- **Paper**: warm-gray ink on warm cream paper. Thin hairlines. Old-style numerals. Nothing shouts. It should feel like the inside cover of a hardback monograph, not a productivity dashboard.
- **Dense**: information-rich. Multiple frames in view at once. Many objects. The chrome is restrained so the work breathes.

## Aesthetic direction

- **Theme:** light. Warm paper background `#faf8f3`. Warm ink `#37352f`.
- **Type:** serif for object titles + body text (`ui-serif` / Iowan Old Style / Charter / Hoefler Text). Sans for chrome and labels (`ui-sans-serif` / system stack). Mono for kickers, technical labels, readouts (`ui-monospace`). Old-style figures everywhere.
- **Frames:** drawn as 1.5-px stroked outlines, color from the picked 8-swatch palette (Gold, Rose, Ochre, Sage, Plum, Rust, Moss, Slate). Default unpicked = warm gold `140,115,70`. Each frame sits in its own 10-px ring band around its objects.
- **Shared frames:** when a frame has multiple members, the outline merges across them via M-4 bowed-waist envelope (path math, no goo filter, no alpha thresholding). Pinches between adjacent members. Adapts live as objects move.
- **Connections:** 3-strand SVG paths. Source-color gradient based on each endpoint's frame hue. Warm-gray `55,53,47` fallback when an endpoint is unframed. Center-strand width encodes priority (5 px → 2 px across P1–P5). Chevron at destination edge; mirrored for bidirectional.
- **Objects:** small file-window cards with serif titles, soft body text, monospaced metadata foot. White-cream paper with a hairline border and a faint drop shadow. Selected state = sage outline + sage halo.
- **No filigree:** no rounded-everything, no glassmorphism, no neon, no gradient text, no side-stripe accents (impeccable absolute bans).

## Anti-references

- Notion's flat color blocks (we want warmer ink, more paper texture)
- Linear's electric blue + glow chrome (too tech)
- Generic SaaS dashboards (we are not a dashboard)
- Productivity-app glassmorphism (the field is paper, not glass)

## Design principles

1. **Aesthetic matches function.** Every visual decision — line weight, color choice, motion — encodes a meaning the user can read. No decorative stripes. No glow without a reason.
2. **Paper, not screen.** Warm cream surfaces, warm-gray ink, hairlines at 0.5–1 px. Nothing should look retina-sharp; everything should look printed.
3. **Restrained chrome, dense field.** The toolbar/header/legend are quiet so the field can carry information density.
4. **One frame, one identity.** When members of a frame are near each other their outline becomes one continuous shape; when they pull apart, two rings of the same color, never a bridge or a tether.
5. **Mockups exercise picks together.** Single canonical scenes are sometimes right; dense multi-variation sheets are sometimes right. For integrated critique surfaces, render the picks composed on a realistic field — not in isolation.

## Reference implementations

- `~/dev/signified-mvp/.claude/research/shared-frame-adaptive/mockups/shared-frame-basic.html` — basic two-member envelope, draggable, the existing reference for envelope feel.
- `~/dev/signified-mvp/.claude/research/shared-frame-adaptive/mockups/sheet-01-merge-mechanisms.html` — five mechanisms compared; M-4 picked.
- `~/dev/signified-mvp/.claude/research/frame-ring-mechanics/variation-sheets/sheet-01-band-width.html` — visual register for frame ring bands.
- `~/dev/signified-mvp/.claude/research/integrated-mockup-2026-04-28/picks-summary.md` — the canonical pick list driving everything.

## Hard rules for design work in this repo

- Never run mutating git commands. Read-only research. Mockups land in `.claude/research/<mission>/...` (gitignored).
- No package installs without explicit ask.
- Compass system prompt is FROZEN — never edit `packages/core/src/prompts/compass.ts`. Bug fixes to interpolation plumbing only.
- Pre-launch builds gate on `feedback_all_changes_need_approval`: logged D-entries are the approval; build ships from there.
