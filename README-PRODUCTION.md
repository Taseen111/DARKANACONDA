# DARKANACONDA — production website package

This version upgrades the original site with:
- SEO metadata, canonical URLs, Open Graph/Twitter metadata and Schema.org structured data
- robots.txt and sitemap.xml
- security headers for Cloudflare Pages/Netlify-style `_headers` hosting
- HTTPS/HSTS policy
- Content Security Policy
- clickjacking, MIME-sniffing and referrer protections
- Permissions Policy
- accessible skip link, keyboard focus states and reduced-motion support
- stronger contact-form validation, honeypot anti-spam field and privacy consent
- maxlength/autocomplete form controls
- custom 404 page
- Privacy Policy, Terms & Conditions and Accessibility pages
- web app manifest and security.txt
- improved FAQ state styling and form status messaging

## Important external setup

Code alone cannot provide every security or management function. Before launch:
1. Connect the real domain and enforce HTTPS.
2. Keep the domain registrar and hosting accounts protected with 2FA.
3. Confirm Formspree receives a test enquiry and enable any available spam protection.
4. Configure DNS through Cloudflare and review SSL/TLS settings.
5. Create and verify Google Search Console for the live domain, then submit `/sitemap.xml`.
6. Create/verify the Google Business Profile if the business is eligible.
7. Add an analytics platform only if needed, and update the privacy/cookie notice and consent process when tracking is introduced.
8. Keep backups/version control for every production release.
9. For a CRM, booking system, online payments or customer portal, connect a real provider/backend; those cannot be safely implemented as a static HTML/CSS/JS-only feature.
10. Replace any placeholder business claims, prices, reviews or portfolio information with accurate details before publishing.

## Deployment

The `_headers` file is intended for static hosts that support it, including Cloudflare Pages and Netlify. If you deploy through another platform, reproduce the same security headers in that platform's configuration.

## Form

The existing Formspree endpoint is retained:
https://formspree.io/f/xeaqbvza

Test the form after deployment. Never put private API keys or secrets in these frontend files.

## Pricing consistency

The six public service starting prices are the canonical DARKANACONDA service prices and must stay identical anywhere the same service is shown:

- Business Websites — $999 AUD
- Landing Pages — $499 AUD
- Website Redesign — $699 AUD
- Mobile Responsive Design — $299 AUD
- Basic SEO — $199 AUD
- Website Maintenance — $99 AUD/month

### Canonical shared add-ons
- Additional Website Page — $100 AUD
- Advanced SEO — $300 AUD
- E-commerce — $500 AUD
- Booking System — $200 AUD
- Copywriting — $150 AUD
- Professional Photography — $250 AUD
- Advanced Integrations — $300 AUD
- Payment Integration — $200 AUD
- Advanced Analytics — $100 AUD

GoDaddy is used only as a market/reference benchmark here; GoDaddy does not publish fixed individual prices for these six services. Do not invent separate prices for the same service on another page.

## Pricing architecture — Version 11
The project planner uses `pricing-data.js` as its single source of truth. The three package identities are Starter/Landing Page ($499), Business/Business Website ($999), and Custom/Custom Solution (Let's Talk). The calculator uses one shared catalogue and ensures that selecting every catalogue service resolves to the same complete-build total ($5,045 one-time, with Website Maintenance shown separately at $99/month).

## V23 CLEAN RESTART
V23 is the clean production baseline after a full project audit. The calculator is external-CSP compatible, the checkbox interaction is deterministic, pricing has a standalone-service source, obsolete navigation/duplicate script issues are removed, and the favicon set is explicit.
