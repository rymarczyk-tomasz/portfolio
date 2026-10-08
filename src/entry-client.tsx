import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import type { Lang } from "./i18n";

// Język ustawia prerendering w <html lang>, w dev robi to plugin w vite.config.ts.
const lang: Lang = document.documentElement.lang === "en" ? "en" : "pl";
const root = document.getElementById("root")!;
const app = (
    <StrictMode>
        <App lang={lang} />
    </StrictMode>
);

// Po buildzie #root zawiera gotowy HTML i React go tylko ożywia; w dev jest pusty.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
