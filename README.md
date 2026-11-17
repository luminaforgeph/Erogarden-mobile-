# Erogarden Global

A mobile-first marketplace and services PWA, visually aligned with the original Erogarden brand.

## Brand direction

The mobile experience follows the visual identity of [luminaforgeph/erogarden](https://github.com/luminaforgeph/erogarden):

- Warm paper: #FAF9F6
- Garden sage: #4A6B4A
- Deep sage: #344D35
- Charcoal: #1A1A1A
- Soft stone: #DCDDD5
- Typography: DM Serif Display and Inter

The hero, transformation and philosophy photography reuse the corresponding image references from the original Erogarden website. Marketplace product photography remains product-specific.

## Stack

- Semantic HTML and Tailwind CSS CDN
- Vanilla JavaScript (no build step)
- Web App Manifest + Service Worker
- Local cart persistence with localStorage

## Run locally

Serve the repository root over HTTP (service workers require HTTPS or localhost). For example: python -m http.server 8080

## Deployment

Deploy the repository root as a static site on Vercel or another static host. The included vercel.json uses the root as the public directory.

## Before production

- Replace placeholder WhatsApp links with the verified business number in international format.
- Confirm product names, prices, stock, images, delivery fees and service coverage.
- Connect checkout and order management to a trusted backend/payment provider.
- Generate PNG icons at 192px and 512px if broader install-prompt compatibility is required.
