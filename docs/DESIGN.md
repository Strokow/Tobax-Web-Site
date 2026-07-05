# Tobax — Design System & Visual Direction

Built with the **ui-ux-pro-max** method. Dark, technological, moderately minimalist, with bright accent
used sparingly. The subject drives every choice: **cinematic sci-fi neurofunk** — cold machined surfaces,
deep space, sub-bass weight, a single reactor-bright light source in the dark.

## 1. Brief (locked)

- **Subject:** Tobax — neurofunk drum & bass producer/DJ, Dresden. Atmosphere first, impact second.
- **Audience:** ravers/DnB fans, promoters/bookers, journalists, and **AI answer engines** citing facts.
- **The one job of the home page:** in 5 seconds, convey *who Tobax is and what he sounds like*, and make
  it one tap to listen and to follow.
- **Mood words:** engineered, cinematic, subterranean, precise, kinetic — never cute, never corporate.

## 2. Token system (define before styling anything)

Implement as CSS custom properties in a single `:root`. Dark is the only theme (this is a night product).

### Colour — roles, not a rainbow
```
--bg:        #07080B;   /* near-black, faint cool tint (space, not pure #000) */
--surface:   #0E1016;   /* cards, player, panels */
--elevated:  #161922;   /* raised / hover surface */
--border:    rgba(255,255,255,0.08);  /* hairline dividers */
--text:      #EAECF2;   /* primary text */
--muted:     #98A0B0;   /* secondary text, captions */
--faint:     #5A6172;   /* disabled, metadata */

/* SIGNATURE ACCENT — spend it sparingly (primary action, live/now, key data) */
--accent:      #21E6C1;  /* "reactor cyan" — cold, electric, on-brand for neuro sci-fi */
--accent-ink:  #04140F;  /* text on top of the accent */
--accent-glow: color-mix(in srgb, var(--accent) 45%, transparent);

/* SECONDARY ACCENT — duotone partner, used only for glows/gradients, never as a 2nd button colour */
--uv: #7A5CFF;  /* UV violet */
```
> **Default recommendation: "Reactor" (cyan + UV violet duotone).** Two alternative directions are
> parked at the bottom of this file — swap only `--accent`/`--uv` to change identity. Avoid the
> AI-default acid-green and the generic purple→blue hero gradient.

### Type
- **Display:** a technical, slightly condensed grotesk with character (e.g. *Space Grotesk*, *Chakra Petch*,
  *Adelle Sans Cond*, or a monospaced-influenced face for the wordmark). Used with restraint, uppercase,
  tight tracking for headings.
- **Body:** a clean neutral sans (e.g. *Inter*, *IBM Plex Sans*). 16px+, line-height ~1.6.
- **Mono/utility:** a mono (e.g. *JetBrains Mono*, *IBM Plex Mono*) for dates, tracklists, timecodes,
  metadata — reinforces the "engineered" feel and encodes data as data.
- **Scale (px):** 12 · 14 · 16 · 20 · 26 · 34 · 48 · 68. Headings line-height 1.05–1.2; tracking -0.01em.
- Self-host fonts (WOFF2) — no Google Fonts CDN (privacy + speed + no consent issue).

### Spacing / radius / elevation
- **Base unit 8px** (allow 4px halfsteps): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Everything snaps to it.
- **Radius:** small, technical — `--r-sm: 4px; --r-md: 8px; --r-lg: 14px`. Not pill-shaped everywhere.
- **Elevation:** soft, layered, cool-tinted shadows + a faint inner top-highlight on glass panels:
  `0 1px 0 rgba(255,255,255,.04) inset, 0 24px 60px -20px rgba(0,0,0,.7)`.
- **Accent glow** (use rarely, on the one hero/primary element):
  `0 0 0 1px var(--accent-glow), 0 0 40px -8px var(--accent-glow)`.

## 3. Layout & hierarchy

- **One primary action per view** (usually **Listen** in the hero; **Get tickets** on an event). The accent
  belongs to it. Everything else is ghost/outline/text.
- Max content width ~1200px app shell; ~68ch for long bio prose. Left-aligned, grid-aligned.
- **Hero = thesis.** Open with the most characteristic thing: the wordmark + a one-line identity + an
  ambient motion layer (see §5), and an immediate Listen affordance. Resist the "big number + 3 cards" default.
- Generous negative space = confident/premium. Group by proximity; separate sections with hairline `--border`,
  not heavy lines.
- Design **empty / loading / error** states for News, Events, and every embed.

## 4. Signature details (where it stops looking templated)

- **"Reactor" accent discipline:** on any given screen the cyan appears in ~1–2 places max (the live dot,
  the play button, an active waveform). Scarcity is what makes it read as bright.
- **Data as data:** dates, BPM, keys, set times, catalog numbers in mono, aligned in columns.
- **Waveform / spectrum motifs** as structural texture (thin, low-contrast) — earned by the subject, not decoration.
- Consistent control system: buttons/inputs share height (44px), padding rhythm, radius.
- Every interactive element has **hover / focus / active / disabled**. Focus = visible cyan ring
  (`box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent)`), never `outline:none` alone.
- Icons: one family, one stroke weight, optically aligned with text.

## 5. Motion — deliberate

- One **orchestrated page-load reveal** for the hero (wordmark settling, faint scanline/grain, a slow
  ambient gradient drift) — the memorable moment. Everything else stays calm.
- UI feedback 150–250ms, ease-out in / ease-in out. Scroll-reveals subtle (opacity + 8–12px rise).
- Optional signature: a **live audio-reactive or ambient shader/waveform** in the hero — impressive but must
  degrade gracefully and be cheap on battery.
- **Respect `prefers-reduced-motion`** — swap to a static, still-beautiful frame. Over-animating reads as AI-generated.

## 6. Accessibility (non-negotiable)

- Contrast: body ≥ 4.5:1, large text/UI ≥ 3:1 — verify cyan-on-dark and muted text especially.
- Never colour-only meaning (live/sold-out get a label + icon too).
- Semantic HTML, ordered headings, labelled controls, full keyboard operation, visible focus.
- Works at 200% zoom and 320–360px width; no horizontal body scroll (wide tracklists scroll in-container).

## 7. Responsive

Mobile-first — most fans arrive from Instagram/link-in-bio on a phone. Content stacks, stays one-tap.
Fluid type/spacing via `clamp()`. The hero must be striking at 360px, not just on desktop.

## Anti-patterns (do not ship)

- Acid-green-on-black or purple→blue gradient hero (AI defaults).
- Numbered 01/02/03 markers on non-sequential content.
- Cyan splashed everywhere (kills the signature). Uniform pill radius on everything.
- Heavy pure-black `#000` void with harsh 1px `#fff` lines — use the tinted near-black + hairlines.

## Alternative accent directions (swap `--accent` / `--uv`)

- **A — Reactor (default):** `--accent:#21E6C1` cyan + `--uv:#7A5CFF` violet. Cold, sci-fi, neuro.
- **B — Hazard:** `--accent:#FF6A2B` industrial amber + `--uv:#00B3A6` teal. Warmer, grittier, machine-shop.
- **C — Plasma:** `--accent:#FF2E97` magenta + `--uv:#22D3EE` cyan, used as a duotone gradient. Club/rave-forward.
