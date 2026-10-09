# Portfolio — Tomasz Rymarczyk

React 19 + TypeScript + Vite. Strona jednostronicowa (Usługi, Realizacje, Współpraca, O mnie, FAQ, Kontakt) z przełącznikiem PL/EN.

```bash
npm install
npm run dev       # podgląd na http://localhost:5173
npm run build     # gotowa strona w folderze dist/
```

## Gdzie co zmieniać

| Plik | Zawartość |
|---|---|
| `src/i18n.tsx` | wszystkie teksty PL i EN (usługi, kroki współpracy, FAQ, pola formularza) |
| `src/data/projects.ts` | realizacje (dla kogo / zadanie / co zrobiłem, PL/EN, tagi, linki) i lista technologii |
| `src/config.ts` | e-mail, telefon, miasto, GitHub, LinkedIn |
| `scripts/og-image.mjs` | grafika podglądu linku; po zmianie: `node scripts/og-image.mjs` |
| `src/assets/projects/` | zrzuty ekranu projektów (WebP, 960 px) |
| `src/index.css` | wygląd, kolory w `:root` |

## Formularz kontaktowy (Web3Forms)

1. Wejdź na https://web3forms.com, wpisz `trymarczyk91@gmail.com` i odbierz klucz z maila.
2. Skopiuj `.env.example` do `.env` i wklej klucz: `VITE_WEB3FORMS_KEY=...`
3. Zbuduj ponownie (`npm run build`). Klucz jest publiczny z założenia, więc może trafić do kodu strony.

Bez klucza przycisk „Wyślij” otwiera program pocztowy odwiedzającego z gotową wiadomością.
Formularz ma ukryte pole-pułapkę na boty (`botcheck`).

## SEO i domena

Meta tagi, Open Graph i dane strukturalne (schema.org `ProfessionalService` i `FAQPage`) powstają dla każdego
języka w `head()` w `src/entry-server.tsx`, a `robots.txt` i `404.html` (z `noindex`) w `scripts/prerender.mjs`.

Po zakupie domeny wpisz jej adres w `src/site.ts` (`SITE_URL = "https://twojadomena.pl"`) i zbuduj ponownie.
Build doda wtedy `canonical`, `hreflang`, `og:url`, `og:image` (bez pełnego adresu Facebook i Messenger
nie pokażą obrazka), `url` w JSON-LD, `sitemap.xml`, linię `Sitemap:` w `robots.txt` i `<base href>` w `404.html`.
Po wdrożeniu zgłoś sitemapę w Google Search Console.

## Wdrożenie

Po `npm run build` cała strona to statyczne pliki w `dist/` (ścieżki względne, działa też w podkatalogu).
`scripts/prerender.mjs` zapisuje gotowy HTML obu wersji: `dist/index.html` (PL) i `dist/en/index.html` (EN).

- **Hostinger:** hPanel → Menedżer plików → `public_html` → wgraj **zawartość** folderu `dist/`.
  Po zakupie domeny podepnij ją w hPanelu i włącz darmowy SSL.
- **Netlify:** podłącz repo z GitHuba, build command `npm run build`, publish directory `dist`,
  a w *Site settings → Environment variables* dodaj `VITE_WEB3FORMS_KEY`.
- **Mikrus:** skopiuj `dist/` na serwer (`scp -r dist/* ...`) i serwuj przez nginx/Caddy jako pliki statyczne.
