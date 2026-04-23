# Build, PWA, and deploy

## Vite

- **Dev:** `npm run dev`
- **Build:** `npm run build` — runs `tsc -b` (project references) then `vite build`
- **Preview:** `npm run preview` — serves the `dist` output locally

## Base path (GitHub Pages)

**`vite.config.ts`** sets:

```ts
base: '/vibe-brushing/',
```

All asset paths that must work on GitHub Pages should go through **`import.meta.env.BASE_URL`** (e.g. buddy `imageUrl` in `buddies.ts`). If you change the repo name or deploy to a custom domain at root, update **`base`**, **`deploy` script**, and any hard-coded paths.

## PWA — `vite-plugin-pwa`

- **Manifest** — `name`, `short_name`, `theme_color`, icons (`pwa-192x192.png`, `pwa-512x512.png` in `public/`)
- **Workbox** — `globPatterns` include `js`, `css`, `html`, `ico`, `svg`, `mp3`, `ogg`; `globIgnores` excludes `**/creatures/**` (large or frequently changing assets may be left network-first—verify behavior)

**Maintaining:** After large dependency upgrades, run a production build and confirm the service worker updates. Clear site data if during dev you see stale assets.

## Deploy

**`package.json`:** `deploy` = `npm run build && gh-pages -d dist`

- Requires `gh-pages` (dev dependency) and correct repo remote.
- The **`base`** path and GitHub project URL must match, or you will get blank pages or 404s on static assets.

## Environment

No `.env` is required for core gameplay. Use `import.meta.env` / `import.meta.env.PROD` for optional logging or feature flags if you add them.
