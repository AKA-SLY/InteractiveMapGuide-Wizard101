import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Use the repository name as the base so assets load correctly on GitHub Pages
  base: "/InteractiveMapGuide-Wizard101/",
});
