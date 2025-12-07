# Wizard101 Interactive Guide

This is a React/Vite Wizard101 guide with a built-in spell, gear, character, and fishing lookup. The layout now renders immediately (no more blank white screen) and is styled for both desktop and mobile. The `organised-layout` branch keeps the entire app in the repository root so you can clone or download it and try the full experience without hunting for nested folders.

## Live site

Open the hosted build at <https://aka-sly.github.io/InteractiveMapGuide-Wizard101/>. The Vite base path is configured for this GitHub Pages URL, so the app should load without a blank white screen.

### Deploying to GitHub Pages

The repository now includes a GitHub Actions workflow that automatically builds and deploys the site to GitHub Pages.

1. Push your changes to the `main` branch.
2. In your repository, go to **Settings → Pages** and set the **Source** to **GitHub Actions** (you only need to do this once).
3. After each push to `main`, the workflow will run, build the Vite app, and publish the `dist` folder to GitHub Pages.
4. When the workflow finishes, refresh <https://aka-sly.github.io/InteractiveMapGuide-Wizard101/> (or your repository’s Pages URL) and the site should render instead of a blank page.

If you still see a white screen, GitHub Pages is likely serving the raw source files instead of the built `dist` folder. Fix it by:
- confirming **Settings → Pages → Source** is set to **GitHub Actions** (not “Deploy from a branch”)
- opening the latest **Deploy to GitHub Pages** workflow run under the **Actions** tab and making sure both the **build** and **deploy** jobs finished successfully
- waiting a minute after the deploy finishes—Pages sometimes needs a moment to serve the new files

## How to use

1. Clone or download this repository (make sure you are on the `organised-layout` branch).
2. Push the files into your own GitHub repository.
3. Commit and push to the `main` branch.
4. GitHub will run the included GitHub Actions workflow:
   - builds the Vite app
   - deploys to GitHub Pages automatically
5. After the first run finishes, go to your repo → Settings → Pages and confirm the URL.
6. If the page ever goes blank again, re-run the **Deploy to GitHub Pages** workflow from the **Actions** tab and refresh the live URL.

Locally:

```bash
npm install
npm run dev
```

This runs the app at http://localhost:5173/. If `npm install` errors on macOS with “ENOENT,” make sure you ran the commands from inside the project folder (where `package.json` lives).

If you see build errors about `@vitejs/plugin-react` or `vite` not being found, reinstall the dependencies to fix corrupted or partial installs:

```bash
rm -rf node_modules package-lock.json
npm install
```

The project targets **Node.js 18+** (npm 9+). Older Node/npm versions can fail to resolve the Vite plugins.

If the path to your project folder contains characters like `?` (for example a downloaded folder named `InteractiveMapGuide-Wizard101?tab=readme-ov-file`), Vite cannot read the config and will print errors such as:

```
failed to load config from /path/InteractiveMapGuide-Wizard101?tab=readme-ov-file/vite.config.mts
✘ [ERROR] Failed to resolve entry for package "vite"
```

Fix it by renaming or moving the folder so the full path has no `?`, then reinstall the dependencies to refresh the module cache:

```bash
cd ~/Documents/GitHub/InteractiveMapGuide-Wizard101
rm -rf node_modules package-lock.json
npm install
```

If you see `The CJS build of Vite's Node API is deprecated`, it means Node is trying to load the config in CommonJS mode. The config file is now `vite.config.mts` and the package uses "type": "module" so Vite can load it as ESM. Pull the latest changes, then reinstall dependencies with the commands above to clear any cached CJS build.

### Preview the production build locally

If you just want to see the finished site in your browser, copy and paste these commands exactly—no tweaking required. These instructions are written for macOS Terminal, but the commands are the same on Windows and Linux.

> **Do I need the app downloaded?** Yes—because this runs on your own computer, you need the project files on your machine (download the ZIP or clone the repo). If you publish the app to GitHub Pages, you can then view it from that hosted URL without running anything locally.

**Where to type these commands:** open the **Terminal** app. If you downloaded this project, first change into the project folder so your prompt shows this repository’s files (you should see `package.json` when you run `ls`). Do everything below from inside that folder; there is no extra nested app directory on this branch.

1. Install the dependencies (only needed the first time):

   ```bash
   npm install
   ```

2. Start the preview server on port **4173** (this also rebuilds the app so you always see the latest changes):

   ```bash
   npm run preview
   ```

3. In your browser, open <http://localhost:4173/InteractiveMapGuide-Wizard101/>. If `localhost` does not work, try <http://127.0.0.1:4173/InteractiveMapGuide-Wizard101/> instead—both addresses point to your own computer. You should see the categories rail and world atlas immediately (not a blank page).

Common macOS tips
- If the terminal says “command not found: npm,” install Node.js (which includes npm) from <https://nodejs.org/> and then rerun the commands.
- If you accidentally close the terminal window, reopen Terminal, `cd` back into the project folder, and repeat steps 2–3.
- To stop the preview server, press `Ctrl + C` in the terminal window where it is running.
- If you see an error with code **ENOENT**, Terminal can’t find the files for this project. Fix it by making sure you are **inside** the project folder before running the commands: use `cd` to go to the folder that contains `package.json` (for example, `cd ~/Downloads/wizard101-guide`) and rerun the steps above.

Why those extra flags?
- The preview script automatically rebuilds, hosts on your computer, pins port 4173, and serves the correct base path (`/InteractiveMapGuide-Wizard101/`) so the page never renders blank.

## Using the `W101 Images` folder (no more generic icons)

You can drop your official Wizard101 art directly into `public/W101 Images` and the app will load it automatically. If an image is missing, the UI falls back to the category or school icon so nothing breaks.

- Spells → The bundled fire spell set in `public/W101 Images/Wizard101 Fire_Spells` is already wired in. The UI expects the existing Title_Case + underscore filenames (for example, `Fire Cat` maps to `Fire_Cat.png`).
- Everything else → Keep using slugged filenames (lowercase, spaces become dashes) inside their folders:
  - `public/W101 Images/treasure-cards/<card-name>.png`
  - `public/W101 Images/gear/<item-name>.png`
  - `public/W101 Images/furniture/<item-name>.png`
  - `public/W101 Images/characters/<npc-name>.png`
  - `public/W101 Images/fishing/<spot-name>.png`
  - `public/W101 Images/locations/<location-name>.png`
  - `public/W101 Images/worlds/bubbles/<world-name>.png`
  - `public/W101 Images/worlds/maps/<world-name>.png`

PNG is used by default; the preview falls back to the placeholder when an image is missing.

## Location data intake

A new **Locations** category is wired in (`src/data/locations.ts`). Populate it slowly, respecting the Wizard101 Central wiki’s rate limits. This repository cannot crawl the wiki automatically from this offline environment, but you can add entries by hand (world, zone, NPCs, bosses, images) and the app will render them with the same pop-up layout as the other categories.
