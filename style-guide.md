# Website Style Guide — Pete's Preferred Design Language

> Derived from the GeoValue Georgia Property Valuation MVP (2026-03-07).
> Use this as the default aesthetic for all website MVPs unless overridden.

## Design Philosophy

Clean, light, trustworthy. Professional but not corporate. Data-rich interfaces that look expensive without being heavy. Every MVP should feel like it could go in front of a government or investor.

## Colors

```css
:root {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --text-primary: #0d1117;
  --text-secondary: #334155;
  --text-muted: #64748b;
  --accent-primary: #79ce9a;        /* Green — swap per project */
  --accent-secondary: #5bb87e;
  --accent-green: #10b981;
  --accent-amber: #f59e0b;
  --accent-red: #ef4444;
  --accent-blue: #3b82f6;
  --border-color: #e2e8f0;
  --gradient-primary: linear-gradient(135deg, #5bb87e 0%, #79ce9a 50%, #a3e4bc 100%);
}
```

The accent color (green in GeoValue) is the project's identity color. Change it per project but keep the same structural roles (primary, secondary, gradient).

## Typography

| Role | Font | Weight Range | Notes |
|------|------|-------------|-------|
| Headings | Share Tech | 700-800 | Tight letter-spacing (-0.5 to -1.5px) |
| Body | Montserrat | 300-900 | Main text, forms |
| UI/Labels | Poppins | 300-700 | Tags, badges, section labels, uppercase small text |
| Mono/Data | JetBrains Mono | 400-700 | Numbers, prices, metrics, code |

All loaded via Google Fonts CDN. No local font files.

## Layout Patterns

- **Container**: max-width 1100-1200px, 24px padding
- **Sections**: 80-100px vertical padding, alternating white/off-white backgrounds
- **Cards**: White bg, 1px border (#e2e8f0), 20px border-radius, subtle box-shadow, hover lifts border to accent color
- **Grids**: CSS Grid, auto-fit/auto-fill with minmax, 20-28px gaps
- **Navigation**: Fixed top, 64px height, frosted glass (rgba bg + backdrop-filter blur 12-16px)

## Component Patterns

- **Section headers**: Centered, with pill-shaped tag (uppercase, small, accent bg), h2, subtitle paragraph
- **Tags/Badges**: pill-shaped (border-radius 100px), accent bg at 10% opacity, accent border at 20-25% opacity
- **Buttons**: 12-14px padding, 12px border-radius, primary = solid accent, secondary = white + border (glass)
- **Stats row**: Flex, centered, dividers between items, mono font for values, uppercase muted labels
- **Hero**: Full viewport, grid background (subtle lines), floating gradient glows, centered content
- **Cards with metrics**: Grid of metric boxes inside cards, #f8fafc bg, rounded, mono values

## Animations

- **fadeInUp**: opacity 0 + translateY(20px) to visible, 0.6s ease-out, staggered delays (0.1s increments)
- **IntersectionObserver**: .fade-in class, adds .visible on scroll
- **Counter animation**: requestAnimationFrame, ease-out cubic, 1000-1200ms
- **Hover effects**: translateY(-2px) + enhanced shadow on cards/buttons
- **Floating glows**: 8-10s ease-in-out infinite, subtle translate + scale
- **Pulse dot**: 2s ease-in-out infinite, opacity + scale for status indicators

## Tech Stack

- **Build**: Vite (vanilla JS, ES modules, no React/Vue)
- **Backend**: Express (local dev), Vercel serverless functions (production)
- **Deploy**: GitHub (SocialStrategy account) + Vercel auto-deploy
- **Maps**: Leaflet.js via CDN + CartoDB Voyager tiles
- **Fonts**: Google Fonts CDN
- **Multi-page**: Vite rollup input config for multiple HTML entry points

## File Structure Pattern

```
project/
  index.html
  [additional-pages].html
  src/
    main.js
    style.css
    [page].js
    [page].css
  api/
    index.js          (Vercel serverless)
  server/
    index.js          (Express, local dev)
    data/
      [data].json
  vercel.json
  vite.config.js
  package.json
```

## Responsive Breakpoints

- Desktop: default (1200px container)
- Tablet: 1024px (stack 3-col grids to 1-col)
- Mobile: 768px (stack everything, hide nav links, reduce font sizes)
- Always include `@media print` styles

## Rules

- No heavy frameworks (React/Vue) unless the project demands SPA behavior
- Data goes in JSON files (server/data/), not hardcoded in JS
- CSS custom properties for all colors/sizing (easy theme swaps)
- Forms always have loading states (spinner + disabled button)
- Every section has a tag + h2 + subtitle pattern
- Mobile-first responsive (or at minimum, responsive from day one)
- Print styles for any document/proposal pages
