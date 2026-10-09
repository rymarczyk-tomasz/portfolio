import { renderToString } from "react-dom/server";
import App from "./App";
import { CITY, EMAIL, GITHUB, LINKEDIN, NAME, PHONE } from "./config";
import { dict, type Lang } from "./i18n";
import { SITE_URL } from "./site";

export { SITE_URL };

// Wywoływane przez scripts/prerender.mjs dla każdej wersji językowej.
export function render(lang: Lang) {
    return renderToString(<App lang={lang} />);
}

const langs: Lang[] = ["pl", "en"];
const locales: Record<Lang, string> = { pl: "pl_PL", en: "en_GB" };
const paths: Record<Lang, string> = { pl: "/", en: "/en/" };
const site = SITE_URL.replace(/\/+$/, "");

/** Pełny adres strony w danym języku; pusty, dopóki nie ma SITE_URL. */
export const pageUrl = (lang: Lang) => (site ? site + paths[lang] : "");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// JSON w <script>: bez „</script>” w treści
const ldJson = (data: object) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

// Tagi w <head> dla danego języka (scripts/prerender.mjs wstawia je w miejsce <!--app-head-->).
// notFound: wersja do 404.html — noindex, bez canonical i hreflang.
export function head(lang: Lang, { notFound = false } = {}) {
    const t = dict[lang];
    const url = pageUrl(lang);
    const meta = (attr: "name" | "property", key: string, content: string) => `<meta ${attr}="${key}" content="${esc(content)}" />`;
    const tags = [
        `<title>${esc(t.meta.title)}</title>`,
        meta("name", "description", t.meta.description),
        notFound && meta("name", "robots", "noindex"),
        meta("property", "og:type", "website"),
        meta("property", "og:title", t.meta.title),
        meta("property", "og:description", t.meta.description),
        meta("property", "og:locale", locales[lang]),
        ...langs.filter((l) => l !== lang).map((l) => meta("property", "og:locale:alternate", locales[l])),
    ];

    if (site) {
        if (!notFound) {
            tags.push(
                `<link rel="canonical" href="${url}" />`,
                ...langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l)}" />`),
                `<link rel="alternate" hreflang="x-default" href="${pageUrl("pl")}" />`,
                meta("property", "og:url", url),
            );
        }
        tags.push(
            meta("property", "og:image", `${site}/og-image.png`),
            meta("property", "og:image:width", "1200"),
            meta("property", "og:image:height", "630"),
            meta("name", "twitter:card", "summary_large_image"),
        );
    }

    tags.push(
        ldJson({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: `${NAME} · Web Developer`,
            description: t.meta.description,
            ...(site && { url, image: `${site}/og-image.png` }),
            telephone: PHONE,
            email: EMAIL,
            founder: { "@type": "Person", name: NAME },
            address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: "warmińsko-mazurskie", addressCountry: "PL" },
            areaServed: [
                { "@type": "City", name: CITY },
                { "@type": "Country", name: lang === "pl" ? "Polska" : "Poland" },
            ],
            knowsLanguage: langs,
            sameAs: [GITHUB, LINKEDIN],
        }),
        // Te same pytania i odpowiedzi co w sekcji FAQ na stronie
        ldJson({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: lang,
            mainEntity: t.faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
        }),
    );

    return tags.filter(Boolean).join("\n        ");
}

/** sitemap.xml z obiema wersjami językowymi; null bez SITE_URL. */
export function sitemap(lastmod: string) {
    if (!site) return null;
    const alternates = [...langs.map((l) => [l, pageUrl(l)]), ["x-default", pageUrl("pl")]]
        .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
        .join("\n");
    const urls = langs.map((l) => `  <url>\n    <loc>${pageUrl(l)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/** robots.txt; linia Sitemap: tylko z SITE_URL. */
export function robots() {
    return ["User-agent: *", "Allow: /", ...(site ? [`Sitemap: ${site}/sitemap.xml`] : [])].join("\n") + "\n";
}
