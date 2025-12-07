# Wizard101 Interactive Guide

A React + Vite catalog for Wizard101 spells, gear, furniture, characters, fishing spots, treasure cards, and locations. The bundled `W101 Images` folder already lives in `public/` so the app can show official icons and spell art without extra setup.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173/.

## Preview the production build locally

```bash
npm run build
npm run preview
```

The preview server respects the Vite base path (`/InteractiveMapGuide-Wizard101/`), so assets load correctly instead of showing a blank page.

## Using the `W101 Images` library

Drop art into `public/W101 Images` and the app will pick it up automatically:

- Fire spells: keep the existing Title_Case + underscore filenames in `public/W101 Images/Wizard101 Fire_Spells` (for example, `Fire Cat` → `Fire_Cat.png`).
- Other categories: use slug-style filenames (lowercase, spaces become dashes) inside their folders:
  - `public/W101 Images/treasure-cards/<card-name>.png`
  - `public/W101 Images/gear/<item-name>.png`
  - `public/W101 Images/furniture/<item-name>.png`
  - `public/W101 Images/characters/<npc-name>.png`
  - `public/W101 Images/fishing/<spot-name>.png`
  - `public/W101 Images/locations/<location-name>.png`
  - `public/W101 Images/worlds/bubbles/<world-name>.png`
  - `public/W101 Images/worlds/maps/<world-name>.png`

PNG is the default; JPEG and WebP also work.

## Deploying

The Vite config sets `base` to `/InteractiveMapGuide-Wizard101/` for GitHub Pages. Build with `npm run build` and deploy the `dist/` folder to your preferred static host (or use GitHub Pages) to avoid the blank-screen issue.

## Requirements

Node.js 18+ is recommended.
