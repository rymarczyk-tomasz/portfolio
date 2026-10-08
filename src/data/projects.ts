import streetshow from "../assets/projects/streetshow.webp";
import przytulanki from "../assets/projects/przytulanki.webp";
import calculator from "../assets/projects/calculator.webp";
import crouzen from "../assets/projects/crouzen.webp";
import type { Lang } from "../i18n";

type Text = Record<Lang, string>;

export type ProjectSlug = "streetshow" | "factoryops" | "przytulanki" | "crouzen" | "calculator";

export type Project = {
    /** kotwica #project-<slug>, linki z Usług */
    slug: ProjectSlug;
    name: string;
    /** brak zrzutu = placeholder na karcie */
    image?: string;
    live: string;
    /** zostaje w danych, nie jest wyświetlany */
    repo?: string;
    /** zostaje w danych, nie jest wyświetlany */
    tags: string[];
    featured: boolean;
    /** etykieta nad tytułem */
    category: Text;
    /** 1–2 zdania o efekcie dla klienta */
    summary: Text;
    /** tylko featured, max 3 */
    highlights?: Text[];
    linkLabel?: "live" | "demo";
    note?: Text;
    // zostają na potrzeby SEO / ewentualnego widoku szczegółów, nie są wyświetlane
    client: Text;
    task: Text;
    solution: Text;
};

export const projects: Project[] = [
    {
        slug: "streetshow",
        name: "Street Show",
        image: streetshow,
        live: "https://streetshow.tojest.dev/",
        repo: "https://github.com/rymarczyk-tomasz/StreetMeetingProject",
        tags: ["React", "TypeScript", "Node.js", "Express", "SQLite", "Google Drive API"],
        featured: true,
        category: { pl: "Strona wydarzenia + panel organizatora", en: "Event site + organiser panel" },
        summary: {
            pl: "Wydarzenie motoryzacyjne na Polsat Plus Arena Gdańsk. Uczestnicy zgłaszają auta ze zdjęciami, a organizator w jednym panelu akceptuje zgłoszenia, pilnuje opłat i sam zmienia treści strony.",
            en: "A motorsport show at Polsat Plus Arena Gdańsk. Participants enter their cars with photos; the organiser approves entries, tracks payments and edits the whole site from one panel.",
        },
        highlights: [
            {
                pl: "Wejściówki z kodem QR, skanowane telefonem na bramie, także bez zasięgu",
                en: "QR entry passes scanned with a phone at the gate, even offline",
            },
            { pl: "Galeria aktualizuje się sama z folderów na Dysku Google", en: "Gallery updates itself from Google Drive folders" },
            { pl: "Raport po wydarzeniu: wjazdy, opłaty, porównanie lat", en: "Post-event report: arrivals, payments, year-on-year" },
        ],
        linkLabel: "live",
        client: {
            pl: "Organizator wydarzenia motoryzacyjnego na Polsat Plus Arena Gdańsk",
            en: "Organiser of a motorsport show at Polsat Plus Arena Gdańsk",
        },
        task: {
            pl: "Strona, która przedstawi wydarzenie, zbierze zgłoszenia uczestników razem ze zdjęciami aut i dobrze wypadnie w Google.",
            en: "A site that presents the event, collects entries with car photos and ranks well on Google.",
        },
        solution: {
            pl: "Podstrony z programem, galerią i FAQ. Zgłoszenia ze zdjęciami trafiają prosto na Google Drive, z którego automatycznie aktualizuje się galeria. Do tego SEO i obsługa zgód na cookies.",
            en: "Pages with the schedule, gallery and FAQ. Entries with photos go straight to Google Drive, which keeps the gallery up to date automatically. Plus SEO and cookie consent.",
        },
    },
    {
        slug: "factoryops",
        name: "FactoryOps",
        // TODO: dodać zrzut src/assets/projects/factoryops.webp (widok osi czasu, 960px, WebP) i podpiąć jako image
        live: "https://rymarczyk-tomasz.github.io/FactoryOps/",
        repo: "https://github.com/rymarczyk-tomasz/FactoryOps",
        tags: ["React", "TypeScript", "Vite", "react-bootstrap", ".NET 8", "Docker"],
        featured: true,
        category: { pl: "Narzędzie dla firmy", en: "Business tool" },
        summary: {
            pl: "Plan pracy linii i maszyn na osi czasu, zamiast arkusza Excela. Awaria maszyny automatycznie przesuwa kolejne zlecenia, a planista od razu widzi obciążenie i może cofnąć każdą zmianę.",
            en: "Line and machine schedules on a timeline instead of a spreadsheet. A breakdown automatically shifts the following orders; the planner sees the load at a glance and can undo any change.",
        },
        linkLabel: "demo",
        note: { pl: "Projekt demo · oparty na mojej pracy na produkcji", en: "Demo project · based on my manufacturing job" },
        client: {
            pl: "Zakład produkcyjny: 8 linii i maszyny pojedyncze (projekt demo na bazie mojej pracy)",
            en: "A factory with 8 production lines and standalone machines (demo based on my job)",
        },
        task: {
            pl: "Zastąpić arkusz Excela, w którym planuje się zlecenia na liniach i maszynach, i ułatwić reagowanie na awarie.",
            en: "Replace the Excel sheet used to schedule orders across lines and machines, and make it easier to react to breakdowns.",
        },
        solution: {
            pl: "Aplikacja z osią czasu dla każdej linii i maszyny. Zgłoszenie awarii przesuwa kolejne zlecenia, widok obciążenia pokazuje wąskie gardła, a każdą zmianę można cofnąć.",
            en: "An app with a timeline for every line and machine. Reporting a breakdown shifts the following orders, a load view shows bottlenecks and every change can be undone.",
        },
    },
    {
        slug: "przytulanki",
        name: "Przytulanki z nitki",
        image: przytulanki,
        live: "https://przytulanki.tojest.dev/",
        repo: "https://github.com/rymarczyk-tomasz/Przytulanki-z-nitki",
        tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Drizzle ORM", "JWT"],
        featured: false,
        category: { pl: "Sklep internetowy", en: "Online shop" },
        summary: {
            pl: "Sklep z Przelewy24, Paczkomatami i panelem dla właścicielki.",
            en: "Shop with Przelewy24, parcel lockers and an owner's admin panel.",
        },
        client: {
            pl: "Pracownia ręcznie robionych misiów szydełkowych",
            en: "A studio making handmade crochet teddy bears",
        },
        task: {
            pl: "Sklep, w którym klienci kupią misie z płatnością online i wysyłką do Paczkomatu, a właścicielka sama ogarnie produkty i zamówienia.",
            en: "A shop where customers can buy with online payment and parcel-locker delivery, and the owner manages products and orders herself.",
        },
        solution: {
            pl: "Pełny sklep: katalog z filtrami, konta klientów, koszyk, zakupy bez rejestracji, kody rabatowe, płatności Przelewy24 i InPost z mapą Paczkomatów. Do tego panel administratora.",
            en: "A complete shop: filterable catalogue, customer accounts, cart, guest checkout, discount codes, Przelewy24 payments and InPost with a parcel-locker map. Plus an admin panel.",
        },
    },
    {
        slug: "crouzen",
        name: "Project Crouzen",
        image: crouzen,
        live: "https://rymarczyk-tomasz.github.io/Project-Crouzen/",
        repo: "https://github.com/rymarczyk-tomasz/Project-Crouzen",
        tags: ["HTML", "CSS", "JavaScript", "Sveltia CMS", "GitHub Pages"],
        featured: false,
        category: { pl: "Strona firmowa", en: "Business website" },
        summary: {
            pl: "Artysta sam dodaje nowe obrazy, także z iPhone'a.",
            en: "The artist adds new paintings himself, even from an iPhone.",
        },
        client: {
            pl: "Artysta malarz",
            en: "A painter",
        },
        task: {
            pl: "Portfolio z galerią obrazów, do którego artysta sam doda nowe prace, bez proszenia programisty.",
            en: "A portfolio with a gallery of paintings that the artist can keep up to date without calling a developer.",
        },
        solution: {
            pl: "Szybka strona statyczna z galerią i filtrami. Nowe obrazy i dane kontaktowe artysta dodaje przez prosty panel (Sveltia CMS), także z iPhone'a.",
            en: "A fast static site with a filterable gallery. The artist adds new paintings and contact details through a simple panel (Sveltia CMS), even from an iPhone.",
        },
    },
    {
        slug: "calculator",
        name: "Kalkulator normatywu",
        image: calculator,
        live: "https://rymarczyk-tomasz.github.io/SheetBurningCalculator/",
        repo: "https://github.com/rymarczyk-tomasz/SheetBurningCalculator",
        tags: ["React", "Vite", "JavaScript", "PapaParse", "GitHub Actions"],
        featured: false,
        category: { pl: "Narzędzie dla firmy", en: "Business tool" },
        summary: {
            pl: "Arkusze i tabele zamienione w aplikację w przeglądarce.",
            en: "Spreadsheets and tables turned into a browser app.",
        },
        client: {
            pl: "Produkcja spawanych konstrukcji stalowych (moje własne stanowisko)",
            en: "Welded steel fabrication (my own job)",
        },
        task: {
            pl: "Szybkie liczenie normatywu czasu dla wielu operacji, bez ręcznego przeszukiwania tabel i arkuszy.",
            en: "Fast work-time calculations for many operations, without digging through tables and spreadsheets.",
        },
        solution: {
            pl: "Aplikacja w przeglądarce, która liczy palenie blach, cięcie piłą i wodą, obróbkę cieplną, fazowanie, spawanie MAG-135 i rury wg ASME B36.10/19. Dane wczytuje z plików CSV, obsługuje skróty klawiszowe.",
            en: "A browser app covering plate burning, saw and waterjet cutting, heat treatment, beveling, MAG-135 welding and ASME B36.10/19 pipes. It loads process data from CSV files and supports keyboard shortcuts.",
        },
    },
];

export const stack = [
    "HTML",
    "CSS / SCSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Vite",
    "Tailwind CSS",
    "Bootstrap",
    "Node.js",
    "Express",
    "SQL / Drizzle ORM",
    "Git / GitHub Actions",
];
