# Erogarden Global

Mobile-first e-commerce and service marketplace PWA.

## Stack
- Semantic HTML and Tailwind CSS CDN
- Vanilla JavaScript (no build step)
- Web App Manifest + Service Worker
- Local cart persistence with localStorage

## Run locally
Serve the repository root over HTTP (service workers require HTTPS or localhost). For example:
`python -m http.server 8080`

## Deployment
Deploy the repository root as a static site on Vercel or another static host. The included `vercel.json` uses the root as the public directory.

## Before production
- Replace placeholder WhatsApp links with the verified business number in international format.
- Confirm product names, prices, stock, images, delivery fees and service coverage.
- Connect checkout and order management to a trusted backend/payment provider.
- Generate PNG icons at 192px and 512px if broader install-prompt compatibility is required.
