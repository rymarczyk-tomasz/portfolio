import streetshow from "../assets/projects/streetshow.webp";
import przytulanki from "../assets/projects/przytulanki.webp";
import calculator from "../assets/projects/calculator.webp";
import crouzen from "../assets/projects/crouzen.webp";
import type { Lang } from "../i18n";

type Text = Record<Lang, string>;

export type Project = {
    name: string;
    image: string;
    live: string;
    repo: string;
    tags: string[];
    client: Text;
    task: Text;
    solution: Text;
};

export const projects: Project[] = [
    {
        name: "Street Show",
        image: streetshow,
        live: "https://streetshow.tojest.dev/",
        repo: "https://github.com/rymarczyk-tomasz/StreetMeetingProject",
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "Google Drive API", "Azure"],
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
        name: "Przytulanki z nitki",
        image: przytulanki,
        live: "https://przytulanki.tojest.dev/",
        repo: "https://github.com/rymarczyk-tomasz/Przytulanki-z-nitki",
        tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Drizzle ORM", "JWT"],
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
        name: "Kalkulator normatywu czasu pracy",
        image: calculator,
        live: "https://rymarczyk-tomasz.github.io/SheetBurningCalculator/",
        repo: "https://github.com/rymarczyk-tomasz/SheetBurningCalculator",
        tags: ["React", "Vite", "JavaScript", "PapaParse", "GitHub Actions"],
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
    {
        name: "Project Crouzen",
        image: crouzen,
        live: "https://rymarczyk-tomasz.github.io/Project-Crouzen/",
        repo: "https://github.com/rymarczyk-tomasz/Project-Crouzen",
        tags: ["HTML", "CSS", "JavaScript", "Sveltia CMS", "GitHub Pages"],
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
