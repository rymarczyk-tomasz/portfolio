import streetshow from "../assets/projects/streetshow.webp";
import przytulanki from "../assets/projects/przytulanki.webp";
import calculator from "../assets/projects/calculator.webp";
import crouzen from "../assets/projects/crouzen.webp";
import type { Lang } from "../i18n";

export type Project = {
    name: string;
    image: string;
    live: string;
    repo: string;
    tags: string[];
    description: Record<Lang, string>;
};

export const projects: Project[] = [
    {
        name: "Street Show",
        image: streetshow,
        live: "https://streetshow.tojest.dev/",
        repo: "https://github.com/rymarczyk-tomasz/StreetMeetingProject",
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "Google Drive API", "Azure"],
        description: {
            pl: "Strona wydarzenia motoryzacyjnego na Polsat Plus Arena Gdańsk. Ma podstrony z programem, galerią i FAQ. Backend w Node.js przyjmuje zgłoszenia ze zdjęciami i zapisuje je na Google Drive, z którego automatycznie synchronizuje się galeria. Strona jest dopracowana pod SEO i ma obsługę zgód na cookies.",
            en: "Website for a motorsport show at Polsat Plus Arena Gdańsk, with schedule, gallery and FAQ pages. A Node.js backend accepts entries with photos and saves them to Google Drive, which automatically syncs the gallery. The site is SEO-tuned and handles cookie consent.",
        },
    },
    {
        name: "Przytulanki z nitki",
        image: przytulanki,
        live: "https://przytulanki.tojest.dev/",
        repo: "https://github.com/rymarczyk-tomasz/Przytulanki-z-nitki",
        tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Drizzle ORM", "JWT"],
        description: {
            pl: "Pełny sklep internetowy z ręcznie robionymi misiami szydełkowymi. Ma katalog z filtrami, konta klientów, koszyk, zakupy bez rejestracji, kody rabatowe, płatności Przelewy24 i wysyłkę InPost z mapą Paczkomatów. Właścicielka zarządza produktami i zamówieniami w panelu administratora.",
            en: "Full online shop for handmade crochet teddy bears. It has a filterable catalogue, customer accounts, a cart, guest checkout, discount codes, Przelewy24 payments and InPost shipping with a parcel-locker map. The owner manages products and orders in an admin panel.",
        },
    },
    {
        name: "Kalkulator normatywu czasu pracy",
        image: calculator,
        live: "https://rymarczyk-tomasz.github.io/SheetBurningCalculator/",
        repo: "https://github.com/rymarczyk-tomasz/SheetBurningCalculator",
        tags: ["React", "Vite", "JavaScript", "PapaParse", "GitHub Actions"],
        description: {
            pl: "Narzędzie, które zbudowałem do własnej pracy w produkcji. Liczy normatyw czasu dla palenia blach, cięcia piłą i wodą, obróbki cieplnej, fazowania, spawania MAG-135 i rur wg ASME B36.10/19. Dane technologiczne wczytuje z plików CSV i działa ze skrótami klawiszowymi.",
            en: "A tool I built for my own job in manufacturing. It calculates standard work times for plate burning, saw and waterjet cutting, heat treatment, beveling, MAG-135 welding and ASME B36.10/19 pipes. It loads process data from CSV files and supports keyboard shortcuts.",
        },
    },
    {
        name: "Project Crouzen",
        image: crouzen,
        live: "https://rymarczyk-tomasz.github.io/Project-Crouzen/",
        repo: "https://github.com/rymarczyk-tomasz/Project-Crouzen",
        tags: ["HTML", "CSS", "JavaScript", "Sveltia CMS", "GitHub Pages"],
        description: {
            pl: "Portfolio artysty malarza z galerią prac i filtrami. Strona jest statyczna, a prace i dane kontaktowe trzyma w plikach JSON. Artysta sam dodaje nowe obrazy przez prosty panel (Sveltia CMS), także z iPhone'a.",
            en: "Portfolio for a painter, with a filterable gallery. The site is static and keeps artworks and contact details in JSON files. The artist adds new paintings through a simple panel (Sveltia CMS), even from an iPhone.",
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
