# Erogarden Global

A mobile-first, four-page storefront and installable PWA aligned with the original Erogarden visual identity.

## Pages
- `/` or `index.html` — editorial home and discovery
- `market.html` — searchable, category-filtered marketplace
- `cart.html` — persistent cart, quantity controls and WhatsApp order handoff
- `profile.html` — editable guest profile stored locally on the current device

## Brand direction
- Warm paper: #FAF9F6
- Garden sage: #4A6B4A
- Deep sage: #344D35
- Charcoal: #1A1A1A
- Soft stone: #DCDDD5
- Typography: DM Serif Display and Inter

## Stack
Semantic HTML, shared CSS, vanilla JavaScript, Tailwind CDN utilities, localStorage, Web App Manifest and Service Worker. No build step or backend is required.

## Local development
Serve the repository root over HTTP (service workers require HTTPS or localhost), e.g. `python -m http.server 8080`.

## Deployment
Deploy the repository root as a static site on Vercel or another static host.

## Motion and accessibility
Page changes use the native View Transitions API where supported, with a simple browser-navigation fallback. Product feedback uses quick opacity/transform-friendly states. Motion is disabled or minimized under `prefers-reduced-motion`; hover-only effects are limited to fine pointers.

## Production follow-ups
- Replace generic WhatsApp handoff links with the verified business number.
- Confirm product names, prices, stock, images, delivery fees and service coverage.
- A real account system, synced order history, inventory and payment processing require a backend.
- Generate 192px and 512px PNG icons if broader install-prompt compatibility is required.
