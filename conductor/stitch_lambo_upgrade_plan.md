# Implementation Plan: Stitch "Aerodynamic Monolith" Upgrade

## 1. Background & Motivation
The current 3D scrollytelling site uses basic geometric primitives (cylinders, cones) that fail to convey the high-end, premium aesthetic associated with Lamborghini. The user requested to "use Stitch to design everything" and demands "good 3D animations and beautiful looking" visuals. We must elevate the project from a structural prototype to a production-grade, immersive brand experience.

## 2. Scope & Impact
- **Scope:** Complete visual overhaul of the frontend UI and 3D components. 
- **Impact:** 
  - `src/index.css` and `src/App.tsx` will be completely rewritten to follow a new Stitch-generated `DESIGN.md` system.
  - The 3D Acts (`Engine.tsx`, `Aero.tsx`, `Structure.tsx`, `Silhouette.tsx`) will be replaced with complex, high-performance shaders, particles, and materials.
  - Minimal impact on project dependencies, leveraging existing `@react-three/fiber`, `@react-three/drei`, and `gsap` libraries.

## 3. Proposed Solution: "The Aerodynamic Monolith"
We will implement a Google Stitch-inspired design system characterized by:
- **Atmosphere:** A dense, cockpit-like environment (`VISUAL_DENSITY: 8`).
- **Typography:** High-contrast pairing of `Space Grotesk` (or `Geist`) and monospace functional text.
- **Materiality:** Deep `Zinc-950` backgrounds with `Ignition Orange` (#FF6600) neon accents and "Liquid Glass" overlays.
- **3D Upgrades:**
  - **The Core:** A pulsing, chaotic particle engine (using `Points` or `Sparkles`).
  - **The Edge:** Intersecting aerodynamic glass shards refracting light (using `MeshTransmissionMaterial`).
  - **The Frame:** A mathematically perfect, self-assembling carbon-fiber honeycomb (using `InstancedMesh`).
  - **The Silhouette:** Sweeping, glowing neon trails forming the abstract shape of a hypercar.

## 4. Alternatives Considered
- **Keeping Basic Shapes with Better Textures:** Rejected because simple geometry inherently lacks the complexity required for a "high-end" feel, regardless of texture quality.
- **Importing a Full 3D Car Model (.gltf):** Rejected due to performance constraints (mobile 60fps target) and the established "abstract storytelling" narrative.

## 5. Phased Implementation Plan

### Phase 1: Design System Injection
- Create `DESIGN.md` at the project root to formalize the Stitch semantic design rules (Colors, Typography, Layout, Anti-Patterns).

### Phase 2: Frontend & Layout Overhaul
- Rewrite `src/index.css` to implement the new color variables, glassmorphism utilities, and typographic hierarchy.
- Refactor `src/App.tsx` to use asymmetrical, floating content panels (`.glass-panel`) instead of centered text.

### Phase 3: 3D Scene Enhancements
- **Act 1 (Engine.tsx):** Implement a dynamic particle system representing combustion.
- **Act 2 (Aero.tsx):** Implement glass-like aerodynamic planes that slice through the scene.
- **Act 3 (Structure.tsx):** Implement an instanced hexagonal grid that rotates and scales dynamically.
- **Act 4 (Silhouette.tsx):** Implement glowing sweeping lines or a stylized, high-tech wedge profile with intense bloom.

### Phase 4: Animation & Polish
- Update `src/components/Scene.tsx` to refine GSAP ScrollTrigger timings, ensuring smooth transitions between the newly complex 3D assets.
- Adjust Post-Processing (`Bloom`, `Noise`) in `Experience.tsx` to maximize the "neon in the dark" aesthetic without killing framerate.

## 6. Verification
- Run `npm run build` to ensure TypeScript compliance.
- Run `npm run lint` to verify code quality.
- Visually verify that the 3D components render correctly and transition smoothly on scroll.

## 7. Migration & Rollback
- Since this is a new repository, we will commit these changes directly to the `master` branch. If the performance drops below acceptable thresholds, we can revert to the previous commit containing the basic primitives.