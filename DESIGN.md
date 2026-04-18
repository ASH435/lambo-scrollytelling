# Design System: Lamborghini Aerodynamic Monolith

## 1. Visual Theme & Atmosphere
A dense, cockpit-like environment characterized by stark asymmetric layouts and fluid spring-physics motion. The atmosphere is high-tension and precision-engineered — reflecting the uncompromising performance of a Lamborghini.

## 2. Color Palette & Roles
- **Canvas Black** (#09090B) — Primary background surface (Zinc 950)
- **Ignition Orange** (#FF6600) — Signature accent for glows, active states, and focus
- **Technical Gray** (#27272A) — Sub-panels and structural elements (Zinc 800)
- **Telemetry Silver** (#E4E4E7) — Primary text and data (Zinc 200)
- **Muted Zinc** (#71717A) — Secondary text and descriptions
- **Laser Red** (#EF4444) — Critical alerts or highlight variations

## 3. Typography Rules
- **Display:** Geist / Space Grotesk — Track-tight (-0.05em), leading-none, weight-driven hierarchy.
- **Body:** Geist — Relaxed leading, 65ch max-width.
- **Mono:** Geist Mono — For technical stats, coordinates, and functional metadata.
- **Banned:** Inter (too generic), generic system fonts. No serif fonts in this dashboard/cockpit context.

## 4. Component Stylings
- **Buttons:** Sharp corners (rounded-none). High-contrast orange fill. Tactile -1px push on active.
- **Glass Panels:** `backdrop-blur(20px)` with 1px inner border (`rgba(255,255,255,0.1)`).
- **Progress Bar:** 4px height, Ignition Orange, fixed at top.
- **Loaders:** Minimalist bar with percentage telemetry.

## 5. Layout Principles
- **Asymmetry:** Centered content is BANNED. Use 2/3 vs 1/3 splits.
- **Liquid Glass Overlays:** Content floats in glass containers that refract the 3D scene behind them.
- **Mobile-First:** Single-column collapse with increased padding for touch targets.

## 6. Motion & Interaction
- **Spring Physics:** `stiffness: 100, damping: 20` for all UI transitions.
- **3D Sync:** Scroll progress drives camera position and 3D asset deconstruction.
- **Perpetual Motion:** Particles and 3D elements maintain subtle autonomous loops even when stationary.

## 7. Anti-Patterns (Banned)
- No emojis.
- No rounded corners > 4px (except for specific pill buttons).
- No pure black (#000000) for UI; use Zinc-950.
- No centered hero text.
- No generic "Learn More" buttons.
- No "Scroll to Explore" arrows.
