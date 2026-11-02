# DESIGN.md &bull; Ali Aun Portfolio

## Concept Card
```
Idea:        High-precision digital architecture and SQA automation portfolio with zero visual noise.
Metaphor:    Modern dark luxury telemetry console & architectural blueprints.
Signature:   Kinetic monospace preloader curtain, GSAP-synchronized Lenis smooth momentum scroll, and interactive system execution graphs.
Emotion:     Technical authority, refined minimalism, calm confidence.
Motion verb: Glide with inertia, snap with precision.
Screenshot:  Hero display composition with live metrics bar and glassmorphic floating navigation.
```

## Art Direction System

### Palette
- **Ground (Canvas):** `#07080B` (Deep Obsidian)
- **Surface (Cards):** `#0E1017` (Dark Charcoal Elevation)
- **Borders:** `rgba(255, 255, 255, 0.08)` (Subtle Hairlines)
- **Accent Primary:** `#38BDF8` (Electric Cyan)
- **Accent Secondary:** `#2563EB` (Cobalt Core)
- **Status Signal:** `#10B981` (Live Telemetry Emerald)
- **Ink Primary:** `#FFFFFF` (High-contrast pure white)
- **Ink Secondary:** `#94A3B8` (Slate Muted)

### Typography
- **Headings & Display:** Neo-grotesque font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif`) with tight negative tracking (`-0.03em`) for high impact.
- **Micro-labels & Badges:** Monospace stack (`JetBrains Mono, ui-monospace, Menlo`) with generous tracking (`0.2em`) and uppercase formatting.

### Layout & Composition
- **Grid:** Fluid 12-column responsive layout, 1, 2, and 3 column responsive breakpoints.
- **Rhythm:** Generous negative space between sections (96px - 120px) allowing each project to breathe.
- **Radii:** `rounded-3xl` (24px) for cards, `rounded-full` (9999px) for floating pills and action triggers.

### Motion Language
- **Physics Engine:** Lenis v1.1.18 normalized inertia scrolling driven by the GSAP ticker (`gsap.ticker.lagSmoothing(0)`).
- **Opening Animation:** Fast minimalist numerical countdown (0 &rarr; 100%) with curtain reveal.
- **Micro-interactions:** Framer Motion spring physics on segmented category tabs (`layoutId="activeFilterBubble"`) and 3D card elevation on hover.

### Content Strategy (Strict No-Fluff Rule)
- Eliminates redundant introductory filler and walls of text.
- Displays only verifiable numbers (900+ leads/day, 100% QA vector coverage, 29+ templates, 420ms response).
- Deep architecture specs are tucked cleanly into interactive modals that open on demand.
