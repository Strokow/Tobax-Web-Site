# UI/UX Pro Max — Design Review Checklist

A thorough pass to run before shipping any interface. Group by concern; fix failures, don't just note them.

## Hierarchy & layout
- [ ] Exactly one primary action per view; secondary actions are visually quieter.
- [ ] Eye path is obvious in ~1s (size/weight/color/space do the work).
- [ ] Content aligned to a grid; consistent left edges; sensible max content width.
- [ ] Whitespace groups related items and separates unrelated ones (proximity).
- [ ] Sections have consistent vertical rhythm; no random gaps.

## Spacing & sizing
- [ ] Every padding/margin/gap comes from the spacing scale (4/8-based). No off-grid values.
- [ ] Consistent control heights (buttons, inputs, selects share a system).
- [ ] Touch targets ≥ 44×44px.

## Color & contrast
- [ ] 4–6 color roles max; accent used sparingly.
- [ ] Body text ≥ 4.5:1; large text & UI elements ≥ 3:1 — verified, not guessed.
- [ ] Meaning never conveyed by color alone.
- [ ] Light/dark variants both defined (if applicable) and both pass contrast.

## Typography
- [ ] Deliberate display + body pairing; modular type scale.
- [ ] Body ≥ 16px, line-height ~1.5; line length ~60–75 chars.
- [ ] Headings tighter line-height; no orphaned words; consistent weights.
- [ ] Numbers, dates, currency formatted consistently.

## States & interaction
- [ ] hover / focus / active / disabled defined for every interactive element.
- [ ] Visible focus ring for keyboard users (no bare `outline: none`).
- [ ] Empty, loading, and error states designed — not just the happy path.
- [ ] Feedback on every user action (loading, success, failure).

## Motion
- [ ] Animations explain something (state/space/feedback), not decoration.
- [ ] Durations 150–300ms for UI; appropriate easing.
- [ ] `prefers-reduced-motion` respected.

## Accessibility
- [ ] Semantic HTML; headings in order; labelled form fields.
- [ ] Meaningful alt text; ARIA only where semantics fall short.
- [ ] Full keyboard operability; logical tab order.
- [ ] Holds up at 200% zoom and 320–360px width without clipping/overflow.

## Responsive
- [ ] Mobile-first; usable at 360px.
- [ ] Fluid type/spacing where helpful (`clamp()`).
- [ ] No horizontal body scroll; wide content scrolls in its own container.

## The "not a template" test
- [ ] Avoids the AI-default looks (cream+serif+terracotta, black+acid accent, purple gradient hero, gratuitous 01/02/03).
- [ ] At least one choice is specific to *this* subject and defensible.
- [ ] Removing one flourish makes it cleaner? Then remove it.
