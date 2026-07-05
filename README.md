# Tobax — Official Website

Official website of **Tobax** (Aleksei Strokov / Alexej Strokow) — drum & bass producer and DJ
specializing in neurofunk, based in Dresden, Germany. Live at **[tobax.online](https://tobax.online)**.

Biography (EN/DE/RU), music via a local self-hosted player, news & show announcements (planned),
built to be the canonical source about the artist for search engines and AI assistants.

## Stack

- **React 19 + Vite 7**, plain CSS (custom "Reactor" design system — see [docs/DESIGN.md](docs/DESIGN.md))
- No CSS frameworks, no trackers, no cookies requiring consent
- Media pipeline: `sharp` → AVIF/WebP/JPG (`npm run optimize:media`)
- SEO/AEO: JSON-LD (`Person` + `MusicGroup`), Open Graph, sitemap, robots, `noscript` fallback

## Development

```bash
npm ci               # install
npm run dev          # dev server (Vite)
npm run build        # production build -> dist/
npm run preview      # preview the production build
npm run lint         # ESLint
npm run optimize:media  # regenerate optimized images (AVIF/WebP/JPG + og-image)
```

## Project docs

| File | Purpose |
| --- | --- |
| [CLAUDE.md](CLAUDE.md) | Working instructions, goals, standing requirements |
| [docs/DESIGN.md](docs/DESIGN.md) | Design system & visual direction ("Reactor") |
| [docs/TASKS.md](docs/TASKS.md) | Prioritized task backlog |
| [docs/IDEAS.md](docs/IDEAS.md) | Idea base |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Hetzner + nginx deployment guide |

## Deployment

Static build served by nginx on a Hetzner server with HTTPS (Let's Encrypt), SPA fallback,
gzip and security headers — see [docs/DEPLOY.md](docs/DEPLOY.md) and
[deploy/nginx-tobax.conf](deploy/nginx-tobax.conf).

## License

All rights reserved. Website and contents are property of Tobax (Aleksei Strokov).
