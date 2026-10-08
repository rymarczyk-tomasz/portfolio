import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pl" | "en";

const dict = {
    pl: {
        meta: {
            title: "Strony internetowe Elbląg · Tomasz Rymarczyk, web developer",
        },
        nav: { services: "Usługi", projects: "Realizacje", about: "O mnie", faq: "FAQ", quote: "Wycena" },
        hero: {
            title: "Strony internetowe i\u00A0sklepy dla małych firm",
            lead: "Szybkie, czytelne na telefonie i proste w obsłudze. Rozmawiasz bezpośrednio ze mną.",
            available: "Przyjmuję zlecenia · Elbląg i zdalnie",
            ctaContact: "Opisz swój projekt",
            ctaCall: "Zadzwoń",
        },
        services: {
            title: "Usługi",
            example: "Przykład",
            items: [
                {
                    name: "Strona firmowa",
                    forWhom: "Warsztaty, gabinety, firmy usługowe, rzemieślnicy, artyści",
                    points: ["Kilka podstron: oferta, o firmie, galeria, kontakt", "Formularz kontaktowy i mapa dojazdu", "Opcjonalnie prosty panel do samodzielnej edycji"],
                    exampleSlug: "crouzen",
                },
                {
                    name: "Landing page",
                    forWhom: "Wydarzenia, kampanie, nowa usługa lub produkt",
                    points: ["Jedna strona nastawiona na zapis lub kontakt", "Formularze zgłoszeń, także ze zdjęciami", "Integracje, np. z Google Drive"],
                    exampleSlug: "streetshow",
                },
                {
                    name: "Sklep internetowy",
                    forWhom: "Rękodzieło, mała produkcja, sprzedaż lokalna",
                    points: ["Płatności online (Przelewy24)", "Wysyłka InPost z mapą Paczkomatów", "Panel do zarządzania produktami i zamówieniami"],
                    exampleSlug: "przytulanki",
                },
                {
                    name: "Narzędzia dla firm",
                    forWhom: "Firmy produkcyjne i biura, które mają dość arkuszy Excela",
                    points: ["Kalkulatory, normatywy, wyceny", "Zamiana arkuszy w wygodną aplikację w przeglądarce", "Znam produkcję od środka, bo w niej pracuję"],
                    exampleSlug: "factoryops",
                },
            ],
            cta: "Nie wiesz, czego potrzebujesz? Opisz problem, a podpowiem rozwiązanie.",
            ctaButton: "Napisz do mnie",
        },
        projects: {
            title: "Realizacje",
            count: (n: number) => {
                const mod10 = n % 10;
                const mod100 = n % 100;
                const word = n === 1 ? "projekt" : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "projekty" : "projektów";
                return `${n} ${word}`;
            },
            live: "Zobacz stronę ↗",
            demo: "Zobacz demo ↗",
            noImage: "Zrzut wkrótce",
        },
        process: {
            title: "Jak wygląda współpraca",
            steps: [
                { name: "Rozmowa", text: "Dzwonisz albo piszesz. Ustalamy, czego potrzebujesz, dla kogo jest strona i na kiedy. Bez zobowiązań." },
                { name: "Wycena i plan", text: "Dostajesz konkretny zakres prac, termin i wycenę, zanim cokolwiek zaczniemy." },
                { name: "Projekt i wykonanie", text: "Pokazuję postępy na bieżąco. Możesz zgłaszać uwagi i widzisz, jak strona powstaje." },
                { name: "Start i wsparcie", text: "Publikuję stronę na Twojej domenie, pomagam z hostingiem i zostaję do dyspozycji przy zmianach." },
            ],
        },
        about: {
            title: "O mnie",
            p1: "Na co dzień pracuję w firmie, która produkuje spawane konstrukcje stalowe. Po godzinach projektuję i koduję strony oraz aplikacje webowe, od prostych wizytówek po sklep z płatnościami online.",
            p2: "Z produkcji wyniosłem nawyk dokładnego mierzenia i sprawdzania, czy wszystko trzyma tolerancję. Przy kodzie robię tak samo: strona ma działać szybko, dobrze wyglądać na telefonie i być łatwa w utrzymaniu.",
            ai: "W pracy korzystam z narzędzi AI, które pomagają mi pisać kod szybciej. Każdy fragment przeglądam, testuję i biorę za niego odpowiedzialność, a to przekłada się na krótszy czas realizacji i niższy koszt dla Ciebie.",
            p3: "Pracujesz bezpośrednio ze mną. Nie ma pośredników ani przekazywania projektu dalej, więc wiesz, kto odpowiada za Twoją stronę.",
            stack: "Z czym pracuję",
        },
        faq: {
            title: "Najczęstsze pytania",
            items: [
                {
                    q: "Ile kosztuje strona?",
                    a: "Każdą wycenę przygotowuję indywidualnie, bo zależy od zakresu: liczby podstron, funkcji i integracji. Po krótkiej rozmowie dostajesz konkretną kwotę, zanim zaczniemy pracę.",
                },
                {
                    q: "Ile trwa wykonanie?",
                    a: "To też zależy od zakresu. Prosta strona firmowa powstaje szybciej niż sklep z płatnościami. Termin ustalamy na starcie, razem z wyceną.",
                },
                {
                    q: "Czy pomożesz z domeną i hostingiem?",
                    a: "Tak. Pomogę wybrać i skonfigurować domenę, hosting i pocztę firmową. Wszystko może być zarejestrowane na Ciebie, więc strona zostaje Twoją własnością.",
                },
                {
                    q: "Czy będę mógł sam zmieniać treści?",
                    a: "Jeśli tego potrzebujesz, dodam prosty panel, w którym zmienisz teksty czy zdjęcia, nawet z telefonu. Możesz też po prostu wysłać mi zmiany, a ja je wprowadzę.",
                },
                {
                    q: "Mam już stronę. Czy możesz ją odświeżyć?",
                    a: "Tak. Mogę poprawić wygląd i szybkość istniejącej strony albo przenieść ją na nowoczesne rozwiązanie z zachowaniem treści.",
                },
                {
                    q: "Co po uruchomieniu strony?",
                    a: "Zostaję do dyspozycji przy poprawkach i rozwoju strony. Jeśli chcesz, możemy ustalić stałą opiekę.",
                },
                {
                    q: "Czy wystawiasz fakturę?",
                    a: "Tak. Na życzenie wystawiam fakturę bez VAT, bo jestem zwolniony z VAT. Kwota z wyceny jest więc kwotą końcową, bez doliczania podatku.",
                },
                {
                    q: "Czy pracujesz tylko w Elblągu?",
                    a: "Nie. Pracuję zdalnie z klientami z całej Polski. Z firmami z Elbląga i okolic chętnie spotkam się osobiście.",
                },
            ],
        },
        contact: {
            title: "Kontakt",
            lead: "Masz pomysł na stronę albo aplikację? Zadzwoń lub opisz krótko, czego potrzebujesz. Odpowiem najszybciej, jak to możliwe.",
            name: "Imię",
            email: "E-mail",
            phone: "Telefon (opcjonalnie)",
            type: "Czego potrzebujesz?",
            types: ["Strona firmowa", "Landing page", "Sklep internetowy", "Narzędzie dla firmy", "Odświeżenie istniejącej strony", "Coś innego"],
            message: "Wiadomość",
            send: "Wyślij wiadomość",
            sending: "Wysyłanie…",
            success: "Dzięki! Wiadomość dotarła, odezwę się wkrótce.",
            error: "Nie udało się wysłać wiadomości. Napisz bezpośrednio na",
            subject: "Nowa wiadomość z portfolio",
            or: "albo znajdziesz mnie tutaj",
        },
        mobileCta: { call: "Zadzwoń", write: "Napisz" },
        footer: "Zaprojektowane i zbudowane przez Tomasza Rymarczyka",
    },
    en: {
        meta: {
            title: "Tomasz Rymarczyk · Web Developer, Elbląg, Poland",
        },
        nav: { services: "Services", projects: "Work", about: "About", faq: "FAQ", quote: "Get a quote" },
        hero: {
            title: "Websites and online shops for small businesses",
            lead: "Fast, easy to read on a phone and simple to run. You talk directly to me.",
            available: "Open for work · Elbląg & remote",
            ctaContact: "Tell me about your project",
            ctaCall: "Call",
        },
        services: {
            title: "Services",
            example: "Example",
            items: [
                {
                    name: "Business website",
                    forWhom: "Workshops, clinics, service companies, craftspeople, artists",
                    points: ["A few pages: services, about, gallery, contact", "Contact form and a map", "Optional simple panel to edit content yourself"],
                    exampleSlug: "crouzen",
                },
                {
                    name: "Landing page",
                    forWhom: "Events, campaigns, a new service or product",
                    points: ["One page focused on sign-ups or enquiries", "Entry forms, including photo uploads", "Integrations, e.g. with Google Drive"],
                    exampleSlug: "streetshow",
                },
                {
                    name: "Online shop",
                    forWhom: "Handmade goods, small-scale production, local sales",
                    points: ["Online payments (Przelewy24)", "InPost shipping with a parcel-locker map", "Admin panel for products and orders"],
                    exampleSlug: "przytulanki",
                },
                {
                    name: "Business tools",
                    forWhom: "Manufacturers and offices tired of spreadsheets",
                    points: ["Calculators, work-time standards, quotes", "Turning spreadsheets into a handy browser app", "I know manufacturing from the inside, I work in it"],
                    exampleSlug: "factoryops",
                },
            ],
            cta: "Not sure what you need? Describe the problem and I'll suggest a solution.",
            ctaButton: "Get in touch",
        },
        projects: {
            title: "Selected work",
            count: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
            live: "Live site ↗",
            demo: "View demo ↗",
            noImage: "Screenshot coming soon",
        },
        process: {
            title: "How we work together",
            steps: [
                { name: "Conversation", text: "Call or write. We agree on what you need, who the site is for and when you need it. No strings attached." },
                { name: "Quote and plan", text: "You get a clear scope, deadline and quote before any work starts." },
                { name: "Design and build", text: "I share progress as I go. You can give feedback and see the site take shape." },
                { name: "Launch and support", text: "I publish the site on your domain, help with hosting and stay available for changes." },
            ],
        },
        about: {
            title: "About me",
            p1: "By day I work at a company that manufactures welded steel structures. After hours I design and code websites and web apps, from simple business pages to an online shop with payments.",
            p2: "Manufacturing taught me to measure carefully and check that everything stays within tolerance. I treat code the same way: a site should be fast, look good on a phone and be easy to maintain.",
            ai: "I use AI tools to write code faster. I review and test every part of it and take full responsibility for the result, which means shorter delivery times and lower costs for you.",
            p3: "You work directly with me. Nobody else gets handed your project, so you always know who is responsible for your site.",
            stack: "What I work with",
        },
        faq: {
            title: "Frequently asked questions",
            items: [
                {
                    q: "How much does a website cost?",
                    a: "Every quote is individual, because it depends on scope: number of pages, features and integrations. After a short conversation you get a specific figure before any work starts.",
                },
                {
                    q: "How long does it take?",
                    a: "That depends on scope too. A simple business site is quicker than a shop with payments. We agree on the deadline at the start, together with the quote.",
                },
                {
                    q: "Will you help with the domain and hosting?",
                    a: "Yes. I'll help you choose and set up a domain, hosting and business email. Everything can be registered in your name, so the site stays yours.",
                },
                {
                    q: "Can I edit the content myself?",
                    a: "If you need to, I'll add a simple panel where you can change text and photos, even from your phone. Or just send me the changes and I'll make them.",
                },
                {
                    q: "I already have a website. Can you refresh it?",
                    a: "Yes. I can improve the look and speed of an existing site or move it to a modern setup while keeping your content.",
                },
                {
                    q: "What happens after launch?",
                    a: "I stay available for fixes and further development. If you like, we can agree on ongoing maintenance.",
                },
                {
                    q: "Do you issue invoices?",
                    a: "Yes. On request I issue an invoice without VAT, as I'm VAT-exempt. The quoted amount is the final amount, with no tax added on top.",
                },
                {
                    q: "Do you only work in Elbląg?",
                    a: "No. I work remotely with clients from all over Poland and abroad. With businesses in and around Elbląg I'm happy to meet in person.",
                },
            ],
        },
        contact: {
            title: "Contact",
            lead: "Have an idea for a website or app? Call or tell me briefly what you need and I'll get back to you as soon as I can.",
            name: "Name",
            email: "Email",
            phone: "Phone (optional)",
            type: "What do you need?",
            types: ["Business website", "Landing page", "Online shop", "Business tool", "Refresh of an existing site", "Something else"],
            message: "Message",
            send: "Send message",
            sending: "Sending…",
            success: "Thanks! Your message is in, I'll reply soon.",
            error: "Something went wrong. Please email me directly at",
            subject: "New message from portfolio",
            or: "or find me here",
        },
        mobileCta: { call: "Call", write: "Write" },
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
        document.title = dict[lang].meta.title;
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
