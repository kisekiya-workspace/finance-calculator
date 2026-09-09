# Toolioz Design Language

Chrome, layout, and shared components follow a Vercel-inspired achromatic system: near-white canvas, near-black type, Geist typography, and shadow-as-border. **Tool highlight colors and category card accents stay as defined on each tool** (`tool.color`, finance blue/emerald, PDF red, biodata rose, etc.). Those accents appear on icons, status dots, and tool-owned cards — not as page-wide fills.

---

## 1. Visual Theme

- Canvas: `rgb(250, 250, 250)` / `#FAFAFA`
- Primary text: `rgb(23, 23, 23)` / `#171717`
- Interactive accent (chrome only): `rgb(0, 114, 245)` / `#0072F5`
- Status colors: 10px dots only unless a tool already uses a larger accent
- No decorative gradients, no color for color’s sake, no font-weight 700+

Dark mode maps the same roles: canvas `#0A0A0A`, text `#EDEDED`, secondary `#A1A1A1`.

---

## 2. Color Tokens (`src/app/globals.css`)

| Role | Light | Usage |
| --- | --- | --- |
| Background | `#FAFAFA` | Page canvas |
| Elevated | `#FFFFFF` | Cards, menus |
| Recessed | `#F2F2F2` | Wells, tracks |
| Text primary | `#171717` | Headings, body |
| Text secondary | `#4D4D4D` | Nav, labels |
| Text muted | `#8F8F8F` | Captions, disabled |
| Interactive | `#0072F5` | Links, focus |
| Focus outline (inputs) | `#005FCC` | Native input focus |

### Tool accents (do not flatten)

Keep existing category and tool colors for icons, badges, and tool-specific cards:

- DevTools: pink / cyan / amber as already defined
- Finance: blue / emerald / sky as already defined
- PDF: red / indigo as already defined
- Biodata: rose / pink as already defined
- Design: each tool’s `color` on the icon tile

---

## 3. Typography

- **Geist Sans** for UI (`--font-geist-sans`)
- **Geist Mono** for code (`--font-geist-mono`)
- Ligatures: `font-feature-settings: "liga"`
- Weights: **400 / 500 / 600 only**. Do not use 700, 800, or 900.
- Display tracking: ~−4% to −4.75% on 32px+ headings
- Body (16px and below): normal tracking

| Element | Size | Weight | Tracking |
| --- | --- | --- | --- |
| Hero `h1` | 48px | 600 | −2.28px |
| Section `h2`/`h3` | 32px / 14px labels | 600 / 500 | −1.28px / −0.28px |
| Body | 16px | 400 | normal |
| Buttons / labels | 14px | 400 | normal |
| Captions | 12px | 400 | normal |

SEO still requires one `<h1>` per page. Visual weight comes from size and spacing, not `font-black`.

---

## 4. Components

### Shadow-as-border

Prefer `box-shadow: 0 0 0 1px rgba(0,0,0,0.08)` (token `--ds-shadow-border`) over CSS `border` on cards, menus, and chrome. Utility classes: `.ds-surface`, `.ds-surface-elevated`, `.ds-menu`.

### Focus

Double ring: `0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)`.

### Buttons

Ghost-first nav: transparent default, hover `#EBEBEB`, text `#4D4D4D` → `#171717`. No scale or opacity hover. Radius `6px`. Height 32 / 40 / 48.

### Inputs

Height 40px default, 14px type, transparent background, shadow border, focus outline `#005FCC`. Placeholder `#8F8F8F`.

### Radius

- Controls: `6px`
- Cards / menus: `12px`
- Pills / badges: `9999px`

---

## 5. Layout

- Spacing base: 4px (8, 12, 16, 24, 32, 40, 48)
- Page width: `1200px` (`max-w-[1200px]`), horizontal padding `24px`
- Header height: `64px`
- Separate sections with spacing, not heavy `<hr>` rules
- Root layout mounts `<Navbar />` and `<Breadcrumbs />`. Do not remount Navbar in tool clients.
- Footer is mounted by page clients.

Tool workspace:

```
<main className="mx-auto w-full max-w-[1200px] flex-1 px-4 sm:px-6 py-8 sm:py-12">
```

---

## 6. Do / Don’t

**Do**

- Use shadow-as-border for chrome surfaces
- Cap font weight at 600
- Keep tool `color` on icon tiles and tool-owned highlights
- Use 10px status dots for success/warn/error in chrome

**Don’t**

- Use `font-black` / `font-extrabold` on new UI
- Paint large chromatic backgrounds on the shell (navbar, footer, homepage canvas)
- Animate buttons with `transform` or `opacity`
- Reset `box-shadow` globally to `none`

---

## 7. Privacy badge (tool pages)

Keep the local-processing notice. Style it as a quiet surface with a small green indicator dot rather than a large green fill when adding new pages:

```tsx
<div className="flex items-center gap-3 rounded-[12px] bg-white p-4 ds-surface">
  <span className="size-2.5 rounded-full bg-[#45A557]" />
  <p className="text-xs text-[#4D4D4D] leading-relaxed">
    <strong className="font-medium text-[#171717]">100% Client-Side Privacy Guarantee:</strong> All calculations run locally in your browser. No data is sent to any external server.
  </p>
</div>
```

Existing emerald-filled badges on tools may remain until those pages are restyled.
