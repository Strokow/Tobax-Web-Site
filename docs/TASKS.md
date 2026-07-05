# Tobax — Task Backlog

Prioritized, actionable task list. **P1** = requested by the owner / pre-launch blockers.
Legend: `[ ]` open · `[~]` in progress · `[x]` done. Owner = team role (see CLAUDE.md).

---

## P1 — Owner-requested (pre-launch)

### 1. Responsive — flawless on desktop **and** mobile  · owner: web designer
- [ ] Audit every view at 360 / 390 / 768 / 1024 / 1440px + real phones (iOS Safari, Android Chrome).
- [ ] Hero, bio, player, social links, language switch, Impressum/Datenschutz all readable & tappable (≥44px targets).
- [ ] Fluid type/spacing via `clamp()`; no horizontal body scroll; wide content scrolls in-container.
- [ ] Test landscape + 200% zoom + `prefers-reduced-motion`.
- **Done when:** Lighthouse mobile & desktop ≥ 90 (Perf/A11y/Best-Practices/SEO); no layout breakage 320px→1440px.

### 2. Rewrite the biography — journalist-grade, remove all "slop"  · owner: journalist + editorial
- [ ] Re-edit EN bio as an experienced music journalist/publicist: tighten, cut AI-filler, clichés, repetition and purple prose; keep concrete, verifiable facts (labels, awards, support, festivals, timeline).
- [ ] Strong lede; active voice; specific detail over generic hype; consistent artist voice.
- [x] Produce **DE** and **RU** versions to the same standard *(done 2026-07-03: full DE + RU translations live in the bio with `lang` attributes; re-verify wording after the EN re-edit above)*.
- [ ] Keep a short "facts" variant for SEO/AEO snippets consistent with the long bio.
- **Done when:** no filler sentences remain; a native editor in each language would sign off; facts match the JSON-LD.

### 3. Security & abuse hardening — audit before publishing  · owner: web designer (sec) + counterpart review
- [ ] **Edge protection:** put Cloudflare (or equivalent) in front for DDoS mitigation, WAF, bot rules, caching — *or* nginx `limit_req`/`limit_conn` + `fail2ban`. Protect against mass/automated requests.
- [ ] **Server hardening (Hetzner):** SSH key-only, disable root login, `ufw` (allow 22/80/443 only), `fail2ban`, unattended security upgrades, non-root deploy user.
- [ ] **TLS/headers:** A+ on SSL Labs; HSTS, CSP (tighten once embeds land), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (config started in `deploy/nginx-tobax.conf`).
- [ ] **Third-party call risk:** the client currently sends visitor IP to `ipwho.is` (US) on load → replace with a privacy-friendly / server-side method or remove; it's both a privacy and an availability dependency.
- [ ] **Form endpoints (newsletter/contact):** rate-limit, server-side validation, honeypot + privacy-friendly CAPTCHA (Cloudflare Turnstile/hCaptcha), no injection.
- [ ] **Data-leak protection:** minimal data collection; defined log-retention; encrypted backups; secrets only in `.env` (never in repo — task 5).
- [ ] **Dependencies:** clear `npm audit` findings; enable Dependabot; keep deps current.
- [ ] **Pre-launch scan gate:** SSL Labs, securityheaders.com, Mozilla Observatory, Lighthouse, `npm audit`, basic vuln scan — all green.
- **Done when:** the pre-launch scan gate passes and the checklist above is signed off.

### 4. Newsletter — email capture + double opt-in mailing  · owner: SMM + web designer
**Idea:** own the audience (email) for show announcements & releases instead of renting reach from platforms.
The site becomes the funnel; email is the durable channel.

**Plan (GDPR / Germany-compliant):**
- [ ] **Provider decision (pick one):**
  - *Recommended — self-hosted [listmonk](https://listmonk.app) on the Hetzner box:* full data ownership, no third-party processor (best fit for the privacy-first, no-cookie-banner stance), cheap. Needs an SMTP relay for deliverability.
  - *Low-ops alternative — EU ESP* (Rapidmail / CleverReach / Brevo): faster to ship, but a third-party processor → requires AV-Vertrag + Datenschutz update.
- [ ] **Double opt-in flow (required in DE):** form → confirmation email → user confirms → subscribed. Store consent proof (timestamp) as evidence.
- [ ] **Consent & law:** explicit unchecked consent checkbox + link to Datenschutz; legal basis Art. 6(1)(a) DSGVO; data minimization (email only); one-click unsubscribe in every mail + preferences page. **Update the Datenschutzerklärung** to describe the newsletter + provider.
- [ ] **Deliverability:** set SPF, DKIM, DMARC on `tobax.online`; sender like `news@tobax.online`; warm-up.
- [ ] **Anti-abuse:** honeypot + Turnstile + rate limit on the signup endpoint (ties into task 3).
- [ ] **UI:** tasteful capture in footer/hero — "Get notified about shows & releases" — Reactor-styled, with success/error/loading states.
- **Done when:** a real double-opt-in signup works end-to-end, is DSGVO-compliant, and mail lands in inbox (not spam).

### 5. Repo hygiene — only filtered data in GitHub, zero secrets  · owner: web designer (ops)
- [ ] Confirm `.gitignore` blocks all secrets/env/keys (already has patterns) — keep any API keys (ESP, etc.) in `.env`, ship `.env.example` with placeholders.
- [ ] **Fix:** `package-lock.json` is both git-ignored *and* tracked — decide to **commit the lockfile** (remove it from `.gitignore`) for reproducible builds.
- [ ] Add secret-scanning (e.g. `gitleaks`) as a pre-commit / CI check; verify git *history* has no secrets.
- [ ] Keep generated build artifacts out of git where sensible (`dist/` already ignored).
- **Done when:** no sensitive data in the working tree or history; a secret scan passes; `.env.example` documents required vars.

### 6. Remove junk & dead code  · owner: web designer — **DONE (2026-07-03)**
- [x] Deleted dead files: `src/App.jsx.backup`, `src/assets/react.svg`, `public/vite.svg`, `bild1.jpg`, `bild3.jpg`, `glass-gloss.png`, `tobax-logo-shadow.svg` (all verified unreferenced; kept `bild2/bild4/heidelore.jpg` as `optimize:media` sources).
- [x] Task-manager CSS eliminated — `App.css` rewritten from scratch (Reactor design system).
- [x] `src/App.css` deduplicated: **9,867 → ~570 lines**; built CSS now ~10 KB.
- [x] `README.md` rewritten for the artist site (stack, commands, docs map, deploy).
- **Done when:** ✅ no dead files/CSS; build + lint clean; README accurate.

---

## P2 — Carry-over follow-ups (from earlier phases)

- [ ] **Audio optimization** — `heidelore.mp3` is 10.5 MB; re-encode to ~128–160 kbps (needs `ffmpeg`, e.g. `ffmpeg-static`) or serve a shorter preview.
- [ ] **Prerender / SSG** — ship real HTML to crawlers & AI (biggest remaining AEO lever); evaluate a prerender plugin vs. framework migration.
- [~] **Self-host fonts** — done for display+body: **Exo 2 variable (300–700)** self-hosted WOFF2 (latin/latin-ext/cyrillic subsets, no Google CDN). Open: a self-hosted mono for dates/metadata (currently system mono stack).
- [x] **Deep Reactor redesign** *(done 2026-07-05)* — full photography-led rebuild: full-bleed cinematic hero (crowd/stage photo) with staggered load reveal + scroll-reveal (respects `prefers-reduced-motion`); data-as-data facts strip (AEO); featured self-release with big cover; editorial two-column bio with pull-quote + drop-cap; "Played & supported" credibility band (Noisia/BSE/Mefjus…, labels, festivals) with XX-monogram watermark; better-than-linktree follow hub (icon + handle + arrow); persistent legal footer with photo credit. Added real `<h1>`, semantic landmarks. Verified desktop + mobile (360–1440px). Build/lint clean.
- [ ] **News** system — dated posts, each at its own shareable URL, `NewsArticle` schema, OG image per post.
- [ ] **Events/Shows** — upcoming + past archive, `Event` schema, "Now/Next" strip.
- [~] **Media embeds** — **Spotify artist player done via click-to-load ("2-Klick"), Datenschutz updated** *(2026-07-05)*: no data reaches Spotify until the user clicks "Load player" (keeps the no-banner stance); component `src/components/SpotifyEmbed.jsx`; commented CSP `frame-src https://open.spotify.com` staged in `deploy/nginx-tobax.conf`. **Legal text needs a German lawyer's sign-off before launch.** Open: YouTube/SoundCloud/Beatport via the same pattern.
- [ ] **hreflang / per-language URLs** for EN/DE/RU.
- [~] **EPK / press kit**, booking/contact, discography grid (see `docs/IDEAS.md`). *(booking/contact form done 2026-07-05 as a mailto form — Booking/Press/Mixes/Business, `ContactForm.jsx`, `#contact` section + "Booking" nav link; no backend/no processor. Server-delivered version = follow-up with TASKS #3/#4. EPK + discography still open.)*

## P3 — Legal (not legal advice — German lawyer to verify)
- [ ] Verify/replace the **EU ODR platform** clause (platform wound down in 2025).
- [~] Update **Datenschutzerklärung** when embeds and/or the newsletter go live. *(Spotify click-to-load embed added 2026-07-05: new "Spotify-Player (2-Klick-Lösung)" clause naming Spotify AB + Art. 6 (1) (a) DSGVO consent + possible US transfer; cookie clause reworded. **Lawyer must verify before launch.** Newsletter still pending.)*
