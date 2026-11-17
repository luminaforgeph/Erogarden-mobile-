# Erogardens Nigeria Limited

A mobile-first, four-page storefront and installable PWA designed as the first stage of Erogardens's wider plant and garden-services ecosystem.

## Pages
- `/` or `index.html` — editorial home and discovery
- `market.html` — searchable, category-filtered first-party product catalogue
- `cart.html` — persistent cart, quantity controls and WhatsApp order handoff
- `profile.html` — editable guest profile stored locally on the current device

## Brand system
- Earth green: `#2C4A3E`
- Soft cream: `#F9F8F6`
- Deep charcoal: `#1A1A1A`
- Warm amber: `#D97706`
- Typography: DM Serif Display and Inter
- Sharp, square-edged interface; 44px minimum touch targets

## Architecture
- `data.js` owns the first-party product catalogue and a separate service-category taxonomy.
- `app.js` owns rendering, cart/profile persistence, filtering, checkout handoff and PWA registration.
- `styles.css` owns shared responsive design tokens and interaction states.
- First-party products are intentionally distinct from future independent provider listings. Phase 2 can add provider profiles, service offers, ratings and booking requests without treating providers as store products.
- Cart and guest profile data are local to the customer's browser. There is no account sync or backend yet.

## Stack
Semantic HTML, shared CSS, vanilla JavaScript, Tailwind CDN utilities, localStorage, Web App Manifest and Service Worker. No build step or backend is required.

## Local development
Serve the repository root over HTTP (service workers require HTTPS or localhost), e.g. `python -m http.server 8080`.

## Deployment
Deploy the repository root as a static site on Vercel or another static host.

## Checkout configuration
Set `whatsappNumber` in `data.js` to the verified international business number using digits only (country code included, no plus sign or spaces). Until it is configured, WhatsApp opens with the prepared order message and lets the customer choose a recipient. Confirm product names, prices, availability, images, delivery fees and service coverage before production launch.

## Motion and accessibility
Motion is deliberately limited to a short hero entrance, subtle section reveals, desktop-only add-to-cart image flight, and immediate add-button feedback. Motion uses opacity and transforms, is disabled for reduced-motion preferences, and falls back to instant tap feedback on touch devices. Native cross-document View Transitions are used where supported, with ordinary navigation as fallback.

## Production follow-ups
- Configure the verified WhatsApp business number.
- Confirm product names, prices, availability, images, delivery fees and service coverage.
- Add PNG 192px and 512px icons if broader install-prompt compatibility is required.
- A real account system, synced orders, inventory, provider marketplace, booking workflows and payment processing require a backend.
