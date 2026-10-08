import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { I18nProvider, type Lang } from "./i18n";

// Wersja angielska leży pod …/en/, polska w katalogu głównym.
const lang: Lang = /\/en(\/|\/index\.html)?$/.test(location.pathname) ? "en" : "pl";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <I18nProvider lang={lang}>
            <App />
        </I18nProvider>
    </StrictMode>,
);
