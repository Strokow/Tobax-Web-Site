# Tobax — Official Artist Website

Working instructions for this repository. This is the hub; deep detail lives in
[docs/DESIGN.md](docs/DESIGN.md) (visual system), [docs/IDEAS.md](docs/IDEAS.md) (idea base), and
[docs/TASKS.md](docs/TASKS.md) (the prioritized, actionable task backlog — start there for what to do next).

## What this is

The official website for **Tobax** — Aleksei Strokov (de: *Alexej Strokow*, ru: *Алексей Строков*),
a drum & bass producer & DJ specializing in **neurofunk**, based in **Dresden, Germany** (relocated 2021,
originally from Samara, Russia). Cinematic sci-fi atmospheres + heavy, visceral neuro energy.

- **Domain:** `tobax.online` (purchased)
- **Hosting:** self-managed **Hetzner** server (ready for deployment)
- **Stack:** React 19 + Vite 7, plain CSS. Single-page app (`src/App.jsx`, `src/App.css`).

## Primary goals (in priority order)

1. **Be *the* canonical source about Tobax** — for Google/Bing **and** for AI assistants
   (ChatGPT, Claude, Perplexity, Google AI Overviews). When someone asks an AI "who is Tobax",
   this site's facts should be what it answers with. This drives the SEO/AEO work below.
2. **Tell the story** — biography and musical journey (EN / DE / RU).
3. **Publish** — news posts and event/gig announcements, with embeddable media
   (YouTube video, SoundCloud audio, Beatport players).
4. **Convert** — make it trivial to follow/listen on every platform and to book.

## Standing requirements (owner-mandated — apply to all work)

These are non-negotiable and hold across every task. Tracked in [docs/TASKS.md](docs/TASKS.md).

1. **Responsive parity** — every change must work and look right on **both desktop and mobile** (360px → 1440px+), tested, not assumed.
2. **Editorial quality** — written content (esp. the biography) is edited to an experienced music-journalist standard: **no AI "slop"**, no filler/clichés, concrete verifiable facts, consistent voice, in EN/DE/RU.
3. **Security & abuse hardening before launch** — protection against mass/automated requests and data leaks; all weak spots audited and a pre-launch security scan gate passed *before* the site is published.
4. **Owned-audience newsletter** — plan and build a GDPR-compliant (double opt-in) email capture + mailing (see TASKS #4).
5. **Repo hygiene** — only strictly filtered data reaches GitHub; **never commit secrets/keys/personal-sensitive data**; keys live in `.env` (with `.env.example`); secret-scan before pushing.
6. **Clean codebase** — remove junk and dead code as we go; no leftover task-manager remnants; keep the build and lint clean.

## How we work (the "team")

Every recommendation is delivered as a **synthesis of a multi-role team**, and each role has a
sceptical counterpart whose objections must be answered before something ships:

- **Web designer** (lead visual/UX) — owns the look & feel and the [ui-ux-pro-max](.claude/skills/ui-ux-pro-max/SKILL.md) design method.
- **PR manager** (DJ industry) — positioning, artist narrative, credibility, press.
- **SMM marketer** — social funnels, shareability, growth loops, link-in-bio thinking.
- **Creative/journalism manager + journalist** — editorial voice, news/interview content, accuracy.

**Always proactively propose ideas the user hasn't asked for** — surface non-obvious opportunities,
then log durable ones in [docs/IDEAS.md](docs/IDEAS.md).

## Design direction (summary)

Dark, **technological, moderately minimalist**, with **bright accent colour used sparingly** — the
feel of an electronic/club sci-fi project, not a template. Full token system, palette, type scale and
motion rules are in [docs/DESIGN.md](docs/DESIGN.md). Load the `ui-ux-pro-max` skill before any UI work.

## Content architecture (target)

- **Home / Hero** — the thesis: name, one-line identity, signature moment (atmosphere-first).
- **Bio** — long-form, trilingual (EN/DE/RU). *Currently only EN renders; DE/RU are gaps to fill.*
- **News** — dated posts, each shareable at its own URL.
- **Events / Shows** — upcoming gigs (date, city, venue, ticket link) + past highlights.
- **Music** — embeds: YouTube, SoundCloud, Beatport; plus the local self-release player.
- **Links / Follow** — SoundCloud, Spotify, Beatport, Instagram, VK, Yandex Music.
- **Legal** — `/impressum`, `/datenschutzerklaerung` (already implemented).

## Technical standards & KNOWN ISSUES (fix these)

- **⚠ Production asset bug:** assets are referenced as `/src/assets/...` (logotype, bio image, mp3).
  These 404 after `vite build`. **Import assets** (`import logo from './assets/...'`) or move to `public/`.
- **⚠ CSS bloat:** `src/index.css` imports **both Bootstrap and Bulma** full stylesheets, and both are
  dependencies. They're largely unused and hurt performance/SEO. Remove and build on the design tokens.
- **⚠ Routing / SPA fallback:** `/impressum` & `/datenschutzerklaerung` are read from
  `window.location.pathname`. On Hetzner (nginx), configure `try_files ... /index.html` so deep links
  and refreshes don't 404. Consider a real router if the site grows.
- **i18n gap:** language switch has EN/DE/RU buttons but only EN bio content exists.
- **`App.css` is ~9.8k lines** — refactor toward tokens/components as we go; don't pile on.
- Keep it accessible (WCAG AA), responsive (mobile-first, 360px+), and fast (Lighthouse ≥ 90).

## SEO / AEO (Answer-Engine Optimization) — critical for goal #1

- Per-page `<title>` + `<meta name="description">`, canonical URLs, `lang` set correctly per language.
- **JSON-LD structured data:** `MusicGroup`/`Person` for Tobax (name variants, genre, sameAs links to all
  profiles), `Event` for gigs, `NewsArticle`/`BlogPosting` for news, `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, Open Graph + Twitter card images.
- **Static, crawlable HTML** — a pure client-rendered SPA is weak for crawlers/AI. Strongly consider
  prerendering / SSG (e.g. `vite-plugin-ssg`, Astro islands, or prerender at build) so bots get real HTML.
- Publish clean, factual, quotable prose (AI answer engines lift well-structured facts). Keep an
  up-to-date "facts" block: real name variants, origin, base, genre, labels, awards, notable support.
- Register Google Search Console + Bing Webmaster once live.

## Embeds vs. privacy (important conflict — resolve before adding players)

The current **Datenschutzerklärung explicitly states no external players are embedded**, which is why
there is no cookie-consent banner. **Adding YouTube/SoundCloud/Beatport iframes changes this:** they set
third-party cookies / transfer data (incl. US transfer). Required approach:
- Use **click-to-load ("2-click"/consent)** wrappers and `youtube-nocookie.com`; load the iframe only
  after the user opts in, **or** add a proper consent manager.
- **Update the Datenschutzerklärung** accordingly (name each service + legal basis).
See [docs/IDEAS.md](docs/IDEAS.md) → "Media & embeds".

## Deployment & legal

- **Hetzner + nginx:** static build (`npm run build` → `dist/`), HTTPS (Let's Encrypt), gzip/brotli,
  SPA fallback (above), long-cache hashed assets, HSTS + sensible security headers.
- **Impressum / Datenschutz:** implemented with real data (§5 DDG, §18 Abs. 2 MStV). Open items to
  verify: the **EU ODR platform** reference (the platform was wound down in 2025), and updating privacy
  text when embeds land. **Not legal advice — recommend a German lawyer/anwalt review, especially since
  publishing news = journalistic-editorial content under MStV.**

## Commands

- `npm run dev` — dev server (Vite)
- `npm run build` — production build → `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
