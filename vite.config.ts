import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// W dev wersja angielska pod /en/ dostaje <html lang="en"> (po buildzie robi to scripts/prerender.mjs).
function devLang(): Plugin {
    return {
        name: "dev-lang",
        apply: "serve",
        transformIndexHtml(html, ctx) {
            return /\/en(\/|\/index\.html)?$/.test(ctx.originalUrl?.split(/[?#]/)[0] ?? "") ? html.replace('<html lang="pl">', '<html lang="en">') : html;
        },
    };
}

// base "./" — zbudowana strona działa w dowolnym katalogu (Hostinger, GitHub Pages, Netlify, Mikrus)
export default defineConfig({
    plugins: [react(), devLang()],
    base: "./",
    experimental: {
        // Adresy plików importowanych w JS (zrzuty) jako „assets/…”, takie same w buildzie klienta i SSR;
        // App.tsx dokleja do nich ścieżkę do katalogu głównego (./ albo ../ w /en/).
        renderBuiltUrl: (filename, { hostType }) => (hostType === "js" ? filename : undefined),
    },
    // Rok w stopce wpisany podczas builda: ten sam w HTML z prerenderingu i po hydratacji.
    define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
});
