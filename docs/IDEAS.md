# Tobax — Idea Backlog

Living list of ideas to improve the site, synthesized from the team (web designer, PR, SMM, editorial/
journalist) and their sceptics. Ordered roughly by leverage. Tag: 🎯 high-impact · ⚡ quick win · 🌱 later.

## Foundations (do first — they unblock everything)

- 🎯⚡ **Fix the production asset paths** (`/src/assets/...` → imports or `public/`). The site's images/audio
  will be broken in the real build otherwise.
- 🎯⚡ **Remove Bootstrap + Bulma.** Two full CSS frameworks are loaded and unused — dead weight for speed & SEO.
- 🎯 **Add the SEO/AEO layer** (see below) — this is goal #1 and everything else compounds on it.
- ⚡ **Self-host fonts** (WOFF2). Faster, private, no consent burden.

## SEO & AEO — become the source AIs quote

- 🎯 **JSON-LD structured data:** `MusicGroup`/`Person` (all name variants: Aleksei Strokov / Alexej Strokow /
  Алексей Строков, genre, foundingLocation Samara, based Dresden, `sameAs` → every profile), `Event` per gig,
  `NewsArticle` per post. This is *the* strongest lever for AI answer engines.
- 🎯 **Prerender / SSG** so crawlers and AI bots get real HTML, not an empty `<div id="root">`.
- 🎯 **A crisp, factual "About/Press" fact-block** in clean prose — AIs lift well-structured, quotable facts:
  real names, origin, base, genre, notable support (Noisia, Black Sun Empire, Ed Rush, Mefjus, Phace…),
  labels (Titan, Eatbrain, Neuropunk, C4C), awards (DnB Germany Awards 2022/2023), festivals (Let It Roll,
  Rampage, Pirate Station).
- ⚡ Per-page titles/descriptions, canonical tags, correct `lang` per language, `hreflang` for EN/DE/RU.
- ⚡ `sitemap.xml`, `robots.txt`, Open Graph + Twitter cards (auto-generate share images per news/event).
- 🌱 Google Search Console + Bing Webmaster + submit sitemap once live. Track "who is Tobax" style queries.
- 🌱 **llms.txt / an AI-friendly `/facts` page** — a plain, machine-readable summary of verified facts.

## Content architecture

- 🎯 **Bio finished in EN/DE/RU** (currently EN only; DE/RU switch to nothing). DE matters most locally.
- 🎯 **News** as dated posts, each at its own shareable URL, with OG image → great for social + SEO.
- 🎯 **Events/Shows:** upcoming (date, city, venue, ticket link, lineup) + past highlights archive. Auto-sort;
  auto-move past events to an archive. `Event` schema on each.
- ⚡ **Discography / Releases** grid with cover art, label, date, and per-release Beatport/SoundCloud links.
- 🌱 **Press kit / EPK** download (bio, hi-res photos, tech rider, logo pack) — bookers expect this; big PR win.
- ✅ **Booking/contact** — shipped 2026-07-05 (`ContactForm.jsx`): topic-aware form (Booking / Press / Mixes /
  Business) that composes a `mailto:` and opens the visitor's mail client — no backend, no third-party
  processor, honeypot + validation, direct-email fallback. *Upgrade path:* server-delivered version (lands in
  inbox without a mail client) once the backend + anti-abuse hardening exist (TASKS #3/#4).

## Media & embeds (resolve privacy first — see CLAUDE.md)

- 🎯 **Click-to-load embeds** — ✅ **Spotify artist player shipped** (2026-07-05) as a 2-click consent card
  (`SpotifyEmbed.jsx`) in the Listen section; no data to Spotify until the user opts in. Extend the same
  pattern to YouTube (`youtube-nocookie`), SoundCloud, Beatport — a branded poster that loads the iframe only
  on user click. Solves privacy *and* performance (no heavy iframes on first paint).
- ⚡ Keep the **local self-release player** as the always-on, zero-consent listen option in the hero.
- 🌱 **Unified "Latest" music module** that can hold any embed type in a consistent frame.
- 🌱 **Mixes/sets** section (SoundCloud/YouTube) separate from track releases.

## Design & experience (ui-ux-pro-max)

- 🎯 **Hero as thesis** with an ambient/audio-reactive motion signature (degrades gracefully; respects
  reduced-motion). One reactor-cyan focal point.
- ⚡ **Waveform/spectrum motif** as subtle structural texture across sections.
- ⚡ **"Now / Next" strip** — next upcoming show pinned near the top (city + date + tickets). Bookers & fans both win.
- 🌱 **Dark-native micro-interactions**: hover glows, magnetic play button, scroll-linked parallax on the hero grain.
- 🌱 **/live or now-playing** touch: if a set is streaming, surface it; otherwise show latest release.

## Growth & PR (SMM + PR synthesis)

- ⚡ **Link-in-bio parity:** the site should be a *better* linktree — one page with every platform + latest
  release + next show. Then use `tobax.online` as the single Instagram/VK bio link.
- 🌱 **Auto-generated share cards** per news/event (name, date, cover) for Stories/posts.
- 🌱 **Newsletter/notify** ("get notified about shows near you") — owned audience, not rented from platforms.
- 🌱 **Region-aware links** (already hides Instagram for RU IPs) — extend: surface VK/Yandex first for RU,
  Spotify/Beatport for EU. Keep it graceful, never a hard wall.
- 🌱 **UTM tags** on outbound platform links to see what the site actually drives.

## Editorial / journalism

- ⚡ **Consistent artist voice** for news — short, punchy, first-person-adjacent; dates in mono; always a
  cover image + one-line summary (also feeds OG + AI snippets).
- 🌱 **Interview / feature long-reads** (the journalist role) — deep pieces AIs and press love to cite.
- 🌱 **Timeline** of the journey (TDK tapes → Samara → Dresden → awards) — narrative + strong `schema`.

## Technical / ops

- 🎯 **nginx SPA fallback + HTTPS + brotli** on Hetzner; hashed asset caching; security headers/HSTS.
- ⚡ **Lighthouse budget** (≥90 perf/SEO/a11y) checked before deploy.
- 🌱 **CI deploy** (build → rsync/scp to Hetzner) so publishing is one command.
- 🌱 **Analytics that need no consent** (e.g. self-hosted Plausible/Umami) to keep the no-banner privacy stance.
- 🌱 **Backups** of news/events content (flat files or a tiny CMS/headless option if editing gets frequent).

## Legal (not legal advice — flag for a German lawyer)

- 🎯 Update **Datenschutzerklärung** the moment third-party embeds land (name each service + legal basis + US transfer).
- ⚡ Verify the **EU ODR platform** clause — that platform was wound down in 2025; the reference may need removing/updating.
- 🌱 Because news = journalistic-editorial content, keep **§18 Abs. 2 MStV** responsible-person details current.
