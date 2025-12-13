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
  // Use relative asset paths so the app works on GitHub Pages, custom domains,
  // or any subpath without showing a blank screen from missing bundles.
  base: "./",
  build: {
    // Disable brotli-size calculations to reduce memory overhead during rollup output analysis
    brotliSize: false,
    // Keep chunk warnings high enough to avoid noisy logs on large static asset copies
    chunkSizeWarningLimit: 2500,
  },
});
