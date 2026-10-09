// Build z prerenderingiem: dist/index.html (PL) i dist/en/index.html (EN) zawierają gotowy HTML,
// a React w przeglądarce tylko go ożywia (hydrateRoot w src/entry-client.tsx).
// Uruchom: npm run build
import { execSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist`;
const distSsr = `${root}dist-ssr`;

execSync("npx tsc -b", { cwd: root, stdio: "inherit" });

// 1. Klient do dist/
await build({ root });

// 2. Wersja serwerowa, tylko do wygenerowania HTML
await build({ root, publicDir: false, logLevel: "warn", build: { ssr: "src/entry-server.tsx", outDir: distSsr } });

// 3. HTML dla każdego języka (treść z render(), tagi w <head> z head(); oba w src/entry-server.tsx)
const { render, head, robots, sitemap, SITE_URL } = await import(pathToFileURL(`${distSsr}/entry-server.js`).href);
const template = await readFile(`${dist}/index.html`, "utf-8");

const pages = [
    { lang: "pl", file: `${dist}/index.html` },
    { lang: "en", file: `${dist}/en/index.html` },
];

for (const { lang, file } of pages) {
    let html = template.replace('<html lang="pl">', `<html lang="${lang}">`);
    // base "./": strona /en/ jest katalog niżej, więc jej ścieżki do plików muszą wyjść o poziom wyżej.
    if (lang === "en") html = html.replaceAll('="./', '="../');
    html = html.replace("<!--app-head-->", () => head(lang)).replace("<!--app-html-->", () => render(lang));
    await mkdir(fileURLToPath(new URL(".", pathToFileURL(file))), { recursive: true });
    await writeFile(file, html);
    console.log(`prerender: ${file.slice(root.length).replaceAll("\\", "/")} (${lang})`);
}

// GitHub Pages pokazuje 404.html dla nieznanych adresów: wersja PL z noindex.
// Z SITE_URL dostaje <base href>, żeby względne ścieżki do plików działały pod dowolnym adresem.
let notFound = template.replace("<!--app-head-->", () => head("pl", { notFound: true })).replace("<!--app-html-->", () => render("pl"));
if (SITE_URL) notFound = notFound.replace('<meta charset="UTF-8" />', (m) => `${m}\n        <base href="${SITE_URL.replace(/\/+$/, "")}/" />`);
await writeFile(`${dist}/404.html`, notFound);

// robots.txt zawsze, sitemap.xml tylko z SITE_URL
await writeFile(`${dist}/robots.txt`, robots());
const map = sitemap(new Date().toISOString().slice(0, 10));
if (map) await writeFile(`${dist}/sitemap.xml`, map);
console.log(`robots.txt${map ? ", sitemap.xml" : " (bez SITE_URL: bez sitemap.xml)"}`);

// 4. Sprzątanie
await rm(distSsr, { recursive: true, force: true });
