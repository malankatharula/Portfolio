import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Vite configuration - works with both Vercel and GitHub Pages
// For GitHub Pages, uncomment the base line below and replace 'portfolio' with your repo name
export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/portfolio/" : "/",
  plugins: [
    tailwindcss(),
    react(),
    tsConfigPaths(),
  ],
});
