import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectPath = process.cwd();
const unsafeCharacters = ["?"];

if (unsafeCharacters.some((ch) => projectPath.includes(ch))) {
  const normalizedPath = path.resolve(projectPath);
  console.error(
    `Your project folder path contains characters (like "?") that Vite cannot read. Please rename the folder to remove the special character and reinstall dependencies. Current path: ${normalizedPath}`,
  );
  process.exit(1);
}

export default defineConfig({
  plugins: [react()],
  base: "/InteractiveMapGuide-Wizard101/",
});
