# Wizard101 Interactive Guide

This is your Wizard101 interactive map + lookup app, extracted from ChatGPT and ready for GitHub Pages.

## How to use

1. Create a new GitHub repository named **wizard101-guide** (or any name).
2. Download this folder and upload all files into that repo.
3. Commit and push to the `main` branch.
4. GitHub will run the included GitHub Actions workflow:
   - builds the Vite app
   - deploys to GitHub Pages automatically
5. After the first run finishes, go to your repo → Settings → Pages and confirm the URL.

Locally:

```bash
npm install
npm run dev
```

This runs the app at http://localhost:5173/.

### Preview the production build locally

If you just want to see the finished site in your browser, copy and paste these commands exactly—no tweaking required. These instructions are written for macOS Terminal, but the commands are the same on Windows and Linux.

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

Why those extra flags?
- `--host` lets Vite listen on your computer so the link above works without further setup.
- `--port 4173` avoids conflicts with the dev server that uses port 5173.
