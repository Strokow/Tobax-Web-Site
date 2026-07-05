# Deploy — Tobax (Hetzner + nginx)

Static build served by nginx. Domain: **tobax.online**.

## Build locally

```bash
npm ci
npm run build      # -> dist/
npm run preview    # optional: sanity-check the production build at http://localhost:4173
```

## First-time server setup (Hetzner)

1. Install nginx + certbot: `sudo apt update && sudo apt install nginx certbot python3-certbot-nginx`
2. Create the web root: `sudo mkdir -p /var/www/tobax/dist`
3. Copy [nginx-tobax.conf](../deploy/nginx-tobax.conf) to `/etc/nginx/sites-available/tobax.online`,
   then `sudo ln -s /etc/nginx/sites-available/tobax.online /etc/nginx/sites-enabled/`
4. Point DNS: `A` record for `tobax.online` (and `www`) → the Hetzner server IP.
5. `sudo nginx -t && sudo systemctl reload nginx`
6. TLS: `sudo certbot --nginx -d tobax.online -d www.tobax.online` (auto-renews).

## Every deploy

```bash
npm run build
rsync -avz --delete dist/ user@SERVER_IP:/var/www/tobax/dist/
```

The `--delete` keeps the server clean; the SPA fallback in nginx handles `/impressum` etc.
The HTML entry is served `no-cache` and assets are content-hashed, so new deploys show up immediately.

## Notes / open items

- **SPA fallback is required** — without `try_files ... /index.html`, direct loads of `/impressum` or
  `/datenschutzerklaerung` (and any refresh there) return 404.
- Sign a **Hetzner AV-Vertrag** (Auftragsverarbeitung) — required under DSGVO for hosting.
- When embeds land, revisit **CSP / privacy** (see CLAUDE.md → embeds vs. privacy).
- Later: wire this into a one-command CI deploy (see docs/IDEAS.md → Technical/ops).
