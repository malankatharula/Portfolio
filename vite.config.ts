import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Vite configuration for Vercel deployment
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsConfigPaths(),
  ],
});
