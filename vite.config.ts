import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base "./" — zbudowana strona działa w dowolnym katalogu (Hostinger, GitHub Pages, Netlify, Mikrus)
export default defineConfig({
    plugins: [react()],
    base: "./",
});
