import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectPath = process.cwd();
const unsafeCharacters = ["?"]; // Characters that break Vite/Node resolution on some platforms

if (unsafeCharacters.some((ch) => projectPath.includes(ch))) {
  const normalizedPath = path.resolve(projectPath);
  throw new Error(
    `Your project folder path contains characters (like "?") that Vite cannot read. Please rename the folder to remove the special character and reinstall dependencies. Current path: ${normalizedPath}`,
  );
}

export default defineConfig({
  plugins: [react()],
  // Use the repository name as the base so assets load correctly on GitHub Pages
  base: "/InteractiveMapGuide-Wizard101/",
});
