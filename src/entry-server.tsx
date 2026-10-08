import { renderToString } from "react-dom/server";
import App from "./App";
import type { Lang } from "./i18n";

// Wywoływane przez scripts/prerender.mjs dla każdej wersji językowej.
export function render(lang: Lang) {
    return renderToString(<App lang={lang} />);
}
