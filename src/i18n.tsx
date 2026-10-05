import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pl" | "en";

const dict = {
    pl: {
        nav: { about: "O mnie", projects: "Projekty", contact: "Kontakt" },
        hero: {
            hello: "Cześć, jestem",
            role: "Tworzę strony internetowe i małe aplikacje webowe",
            location: "Elbląg · zdalnie w całej Polsce",
            available: "Przyjmuję zlecenia",
            ctaProjects: "Zobacz projekty",
            ctaContact: "Napisz do mnie",
        },
        about: {
            title: "O mnie",
            p1: "Na co dzień pracuję w firmie, która produkuje spawane konstrukcje stalowe. Po godzinach projektuję i koduję strony oraz aplikacje webowe, od prostych wizytówek po sklep z płatnościami online.",
            p2: "Z produkcji wyniosłem nawyk dokładnego mierzenia i sprawdzania, czy wszystko trzyma tolerancję. Przy kodzie robię tak samo: strona ma działać szybko, dobrze wyglądać na telefonie i być łatwa w utrzymaniu.",
            p3: "Chętnie zrobię dla Ciebie stronę firmową, landing page, sklep albo narzędzie, które ułatwi pracę w Twojej firmie.",
            stack: "Z czym pracuję",
        },
        projects: {
            title: "Projekty",
            live: "Zobacz stronę",
            code: "Kod",
        },
        contact: {
            title: "Kontakt",
            lead: "Masz pomysł na stronę albo aplikację? Opisz krótko, czego potrzebujesz. Odpowiem najszybciej, jak to możliwe.",
            name: "Imię",
            email: "E-mail",
            message: "Wiadomość",
            send: "Wyślij wiadomość",
            sending: "Wysyłanie…",
            success: "Dzięki! Wiadomość dotarła, odezwę się wkrótce.",
            error: "Nie udało się wysłać wiadomości. Napisz bezpośrednio na",
            subject: "Nowa wiadomość z portfolio",
            or: "albo znajdziesz mnie tutaj",
        },
        footer: "Zaprojektowane i zbudowane przez Tomasza Rymarczyka",
    },
    en: {
        nav: { about: "About", projects: "Projects", contact: "Contact" },
        hero: {
            hello: "Hi, I'm",
            role: "I build websites and small web applications",
            location: "Elbląg, Poland · working remotely",
            available: "Open for freelance work",
            ctaProjects: "See projects",
            ctaContact: "Get in touch",
        },
        about: {
            title: "About me",
            p1: "By day I work at a company that manufactures welded steel structures. After hours I design and code websites and web apps, from simple business pages to an online shop with payments.",
            p2: "Manufacturing taught me to measure carefully and check that everything stays within tolerance. I treat code the same way: a site should be fast, look good on a phone and be easy to maintain.",
            p3: "I'd be glad to build your company website, a landing page, an online shop or a tool that makes everyday work easier.",
            stack: "What I work with",
        },
        projects: {
            title: "Projects",
            live: "Live site",
            code: "Code",
        },
        contact: {
            title: "Contact",
            lead: "Have an idea for a website or app? Tell me briefly what you need and I'll get back to you as soon as I can.",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send message",
            sending: "Sending…",
            success: "Thanks! Your message is in, I'll reply soon.",
            error: "Something went wrong. Please email me directly at",
            subject: "New message from portfolio",
            or: "or find me here",
        },
        footer: "Designed and built by Tomasz Rymarczyk",
    },
};

export type Dict = (typeof dict)["pl"];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx | null>(null);

function initialLang(): Lang {
    try {
        const saved = localStorage.getItem("lang");
        if (saved === "pl" || saved === "en") return saved;
    } catch {
        /* storage unavailable */
    }
    return navigator.language.toLowerCase().startsWith("pl") ? "pl" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(initialLang);

    useEffect(() => {
        document.documentElement.lang = lang;
        try {
            localStorage.setItem("lang", lang);
        } catch {
            /* storage unavailable */
        }
    }, [lang]);

    return <I18nContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
    return ctx;
}
