# Build Premium Vite Site for Hinton Construction Ltd

## Project Context

Client: Hinton Construction Ltd (Christchurch/Canterbury, NZ). High‑end residential builder, "Quality over quantity", owner‑operated, architectural new builds & renovations. Established 2013.

Goal: Convert the provided HTML draft into a premium, professional website that feels like it cost $10k+ and blows the client's draft out of the water.

## Assets

- **Images**: In `public/images/`
  - `hero.jpg` – exterior shot for hero section (full‑bleed)
  - `services.jpg` – team/process image
  - `process.jpg` – construction detail
  - `contact.jpg` – craftsmanship detail
  - `gallery1.jpg` … `gallery5.jpg` – project photos for masonry grid
  - `logo.jpg` – logo for nav
- **Logo**: Blue/white (`#2B7CC1`). Use as primary brand color.
- **Clean HTML reference**: `reference.html` (semantic structure, stripped of styles/scripts).
- **Image mapping**: `image‑mapping.json` (maps placeholder names to original files).

## Design Language (Non‑Negotiable)

Follow `style‑guide.md` exactly. Key points:

- **Colors**: `--accent‑primary: #2B7CC1` (brand blue), `--bg‑primary: #f8fafc`, `--bg‑secondary: #ffffff`, `--text‑primary: #0d1117`
- **Typography**: Share Tech (headings), Montserrat (body), Poppins (UI), JetBrains Mono (numbers). Load via Google Fonts CDN.
- **Layout**: Container max‑width 1100‑1200px, 24px padding, sections 80‑100px vertical padding.
- **Cards**: White bg, 1px border (#e2e8f0), 20px border‑radius, subtle shadow, hover lifts border to accent color.
- **Navigation**: Fixed top, 64px height, frosted glass (rgba bg + backdrop‑filter blur 12‑16px), hamburger on mobile.

## Required Premium Features

### 1. Hero Section
- Full‑viewport height, `hero.jpg` as background with subtle gradient overlay.
- CSS grid background pattern (like Coreimpact's data‑rich aesthetic).
- Large confident typography: "Building *exceptional* homes since 2013."
- Subtle parallax effect on scroll.
- Animated "Years in Canterbury" badge.

### 2. Navigation
- Sticky glass‑morphism nav with blur.
- Hamburger animation on mobile.
- Smooth scroll to sections.

### 3. Services Cards
- Each service (Architectural New Builds, Renovations, Alterations, Residential Developments, Project Management, Free Consultation) gets a custom SVG icon (architectural line art).
- Card border turns blue on hover, subtle lift animation.

### 4. Project Gallery
- Masonry grid (not carousel) for gallery images.
- Lightbox that opens to full‑size image.
- Hover overlay with descriptive caption about the craft (e.g., "Custom cedar batten screen, Sumner renovation").

### 5. Process Timeline
- Horizontal animated timeline with icons (Consultation → Scope & Quote → Build → Handover).
- Each step reveals a short description on hover.

### 6. Trust Metrics
- Animated counters for "Years in Canterbury", "Projects Delivered", "Client Satisfaction".
- Use JetBrains Mono for numbers.

### 7. Contact Section
- Clean, validated contact form with loading states.
- Embedded Leaflet map showing Canterbury region (CartoDB Voyager tiles, lightweight).

### 8. Professional Footer
- Dense footer with:
  - Placeholder trust badges (Licensed Building Practitioner, Master Builders Association, 10‑year structural guarantee)
  - Full business address, phone, email
  - Social links (Instagram, Facebook placeholders)
  - Privacy policy, copyright
- Use real content where possible, placeholders where missing.

### 9. Micro‑interactions
- Scroll‑triggered fade‑in for every section (IntersectionObserver).
- Button hovers with smooth color shifts.
- Subtle floating glow behind logo (CSS animation, 8‑10 seconds).
- Print‑optimized styles.

## Tech Stack

- **Vite** (vanilla JS/HTML/CSS) – no React.
- CSS custom properties for all colors/sizing.
- Mobile‑first responsive (stack at 768px, hide nav links).
- All images lazy‑loaded, explicit width/height attributes.
- Use `IntersectionObserver` for scroll animations.

## Deliverables

1. `index.html` – main page with all sections.
2. `src/style.css` – all styles, following style‑guide.
3. `src/main.js` – JavaScript for interactivity (nav toggle, counters, lightbox, form validation, IntersectionObserver).
4. `src/` may contain additional JS modules if needed.
5. `vercel.json` – Vercel config for static deployment.

## Constraints

- Keep the original copy intact (text is deliberate). Only add missing micro‑copy (trust badges, captions, footer details).
- Do not add fictional testimonials. Use placeholders if needed.
- Performance: ensure Lighthouse scores >95 for performance, accessibility, best practices.
- Use `public/images/` for all images; reference them as `/images/hero.jpg`.

## Workflow

1. Analyze `reference.html` for semantic structure.
2. Build the site step‑by‑step, starting with the HTML skeleton.
3. Implement CSS following the style guide.
4. Add JavaScript interactions.
5. Test on mobile, tablet, desktop.
6. Ensure everything works without JS (progressive enhancement).

Start by creating the basic HTML skeleton in `index.html`, then style it, then add interactivity. Report progress as you go.