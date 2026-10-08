import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from "vite";
import { CITY, EMAIL, GITHUB, LINKEDIN, NAME, PHONE } from "./src/config.ts";

// SEO zależne od domeny: canonical, og:url, og:image (Facebook wymaga pełnego adresu),
// sitemap.xml i robots.txt. Adres strony ustaw w .env jako SITE_URL — patrz README.
function seo(siteUrl: string | undefined): Plugin {
    const url = siteUrl?.replace(/\/+$/, "");
    const abs = (path: string) => (url ? `${url}/${path}` : `./${path}`);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${NAME} · Web Developer`,
        description: "Strony internetowe, sklepy i aplikacje webowe dla małych firm. Elbląg i zdalnie w całej Polsce.",
        ...(url && { url: `${url}/`, image: abs("og-image.png") }),
        telephone: PHONE,
        email: EMAIL,
        founder: { "@type": "Person", name: NAME },
        address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: "warmińsko-mazurskie", addressCountry: "PL" },
        areaServed: [{ "@type": "City", name: CITY }, { "@type": "Country", name: "Polska" }],
        knowsLanguage: ["pl", "en"],
        sameAs: [GITHUB, LINKEDIN],
    };

    return {
        name: "seo",
        transformIndexHtml() {
            const tags: HtmlTagDescriptor[] = [
                { tag: "meta", attrs: { property: "og:image", content: abs("og-image.png") } },
                { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
                { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
                { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
                { tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(jsonLd) },
            ];
            if (url) {
                tags.push(
                    { tag: "link", attrs: { rel: "canonical", href: `${url}/` } },
                    { tag: "meta", attrs: { property: "og:url", content: `${url}/` } },
                );
            }
            return tags;
        },
        generateBundle() {
            const robots = ["User-agent: *", "Allow: /", ...(url ? [`Sitemap: ${url}/sitemap.xml`] : [])].join("\n");
            this.emitFile({ type: "asset", fileName: "robots.txt", source: robots + "\n" });
            if (url) {
                const today = new Date().toISOString().slice(0, 10);
                const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}/</loc><lastmod>${today}</lastmod></url>
</urlset>
`;
                this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
            }
        },
    };
}

// base "./" — zbudowana strona działa w dowolnym katalogu (Hostinger, GitHub Pages, Netlify, Mikrus)
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), seo(env.SITE_URL)],
        base: "./",
    };
});
