// Mniejsze wersje zrzutów (<nazwa>-<szerokość>.webp z scripts/shots.mjs) do srcset.
const files = import.meta.glob<string>("./assets/projects/*-*.webp", { eager: true, import: "default" });

const variants: Record<string, { url: string; width: number }[]> = {};
for (const [path, url] of Object.entries(files)) {
    const m = path.match(/\/([a-z-]+)-(\d+)\.webp$/);
    if (m) (variants[m[1]] ??= []).push({ url, width: Number(m[2]) });
}

/** srcset z mniejszymi wersjami i oryginałem; asset() dokleja ścieżkę do katalogu głównego. */
export function shotSrcSet(name: string, original: string, originalWidth: number, asset: (url: string) => string) {
    return [...(variants[name] ?? []), { url: original, width: originalWidth }]
        .sort((a, b) => a.width - b.width)
        .map((v) => `${asset(v.url)} ${v.width}w`)
        .join(", ");
}
