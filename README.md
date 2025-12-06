# Wizard101 Interactive Guide

This is a React/Vite Wizard101 guide with a built-in spell, gear, character, and fishing lookup. The layout now renders immediately (no more blank white screen) and is styled for both desktop and mobile.

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

1. Create a new GitHub repository named **wizard101-guide** (or any name).
2. Download this folder and upload all files into that repo.
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

If you see build errors about `@vitejs/plugin-react-swc` or `vite` not being found, reinstall the dependencies to fix corrupted or partial installs:

```bash
rm -rf node_modules package-lock.json
npm install
```

The project targets **Node.js 18+** (npm 9+). Older Node/npm versions can fail to resolve the Vite plugins.

### Preview the production build locally

If you just want to see the finished site in your browser, copy and paste these commands exactly—no tweaking required. These instructions are written for macOS Terminal, but the commands are the same on Windows and Linux.

> **Do I need the app downloaded?** Yes—because this runs on your own computer, you need the project files on your machine (download the ZIP or clone the repo). If you publish the app to GitHub Pages, you can then view it from that hosted URL without running anything locally.

**Where to type these commands:** open the **Terminal** app. If you downloaded this project, first change into the project folder so your prompt shows this repository’s files (you should see `package.json` when you run `ls`). Do everything below from inside that folder.

1. Install the dependencies (only needed the first time):

   ```bash
   npm install
   ```

2. Build the site (turns the app into static files Vite can serve):

   ```bash
   npm run build
   ```

3. Start the preview server on port **4173**:

   ```bash
   npm run preview -- --host --port 4173
   ```

4. In your browser, open <http://localhost:4173>. If `localhost` does not work, try <http://127.0.0.1:4173> instead—both addresses point to your own computer.

Common macOS tips
- If the terminal says “command not found: npm,” install Node.js (which includes npm) from <https://nodejs.org/> and then rerun the commands.
- If you accidentally close the terminal window, reopen Terminal, `cd` back into the project folder, and repeat steps 2–3.
- To stop the preview server, press `Ctrl + C` in the terminal window where it is running.
- If you see an error with code **ENOENT**, Terminal can’t find the files for this project. Fix it by making sure you are **inside** the project folder before running the commands: use `cd` to go to the folder that contains `package.json` (for example, `cd ~/Downloads/wizard101-guide`) and rerun the steps above.

Why those extra flags?
- `--host` lets Vite listen on your computer so the link above works without further setup.
- `--port 4173` avoids conflicts with the dev server that uses port 5173.
