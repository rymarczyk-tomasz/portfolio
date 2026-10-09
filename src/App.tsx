import { useEffect, useState } from "react";
import { I18nProvider, useI18n, type Lang } from "./i18n";
import { projects, stack, type Project } from "./data/projects";
import { ContactForm } from "./components/ContactForm";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./components/Icons";
import { EMAIL, GITHUB, LINKEDIN, NAME, PHONE, PHONE_DISPLAY } from "./config";
import streetshowHero from "./assets/projects/streetshow-hero.webp";

declare const __BUILD_YEAR__: number;

// Zrzuty po buildzie mają adres „assets/…” (renderBuiltUrl w vite.config.ts), liczony od katalogu głównego strony,
// więc ten sam na serwerze i w przeglądarce. W dev adres jest bezwzględny i zostaje bez zmian.
function useAsset() {
    const { root } = useI18n();
    return (src: string) => (/^(\/|[a-z]+:)/.test(src) ? src : root + src);
}

// Dwie wersje językowe pod osobnymi adresami: / (PL) i /en/ (EN).
function LangSwitch() {
    const { lang, root } = useI18n();
    const href: Record<Lang, string> = { pl: root, en: `${root}en/` };
    return (
        <nav className="lang-switch" aria-label="Language">
            {(["pl", "en"] as Lang[]).map((l) => (
                <a key={l} href={href[l]} hrefLang={l} lang={l} aria-current={lang === l ? "page" : undefined}>
                    {l.toUpperCase()}
                </a>
            ))}
        </nav>
    );
}

function Header() {
    const { t } = useI18n();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`header band-dark${scrolled ? " scrolled" : ""}`}>
            <div className="container header-inner">
                <a href="#top" className="logo" aria-label={NAME}>
                    <span className="logo-mark">TR</span>
                    <span className="logo-name">{NAME}</span>
                </a>
                <nav className="nav">
                    <a href="#projects">{t.nav.projects}</a>
                    <a href="#services">{t.nav.services}</a>
                    <a href="#about">{t.nav.about}</a>
                    <a href="#faq">{t.nav.faq}</a>
                </nav>
                <a href={`tel:${PHONE}`} className="header-phone">
                    <PhoneIcon size={16} /> {PHONE_DISPLAY}
                </a>
                <a href="#contact" className="header-quote">
                    {t.nav.quote}
                </a>
                <LangSwitch />
            </div>
        </header>
    );
}

// Kolaż w hero: duży zrzut Street Show (osobny plik 8:7, w Realizacjach zostaje 16:10), mały Przytulanek (dane z projects.ts).
const heroMain = projects.find((p) => p.slug === "streetshow")!;
const heroSide = projects.find((p) => p.slug === "przytulanki");

function Hero() {
    const { t } = useI18n();
    const asset = useAsset();
    return (
        <section className="hero band-dark" id="top">
            <div className="container hero-inner">
                <div className="hero-copy">
                    <p className="status">
                        <span className="dot" /> {t.hero.available}
                    </p>
                    <h1>{t.hero.title}</h1>
                    <p className="hero-lead">{t.hero.lead}</p>
                    <div className="hero-actions">
                        <a href="#contact" className="btn btn-primary">
                            {t.hero.ctaContact}
                        </a>
                        <a href={`tel:${PHONE}`} className="btn btn-ghost">
                            <PhoneIcon size={18} /> {t.hero.ctaCall}: {PHONE_DISPLAY}
                        </a>
                    </div>
                </div>
                <div className="hero-shots" aria-hidden="true">
                    <a href={heroMain.live} target="_blank" rel="noopener noreferrer" className="hero-shot hero-shot-main" tabIndex={-1}>
                        <img src={asset(streetshowHero)} alt="" width={1120} height={980} loading="eager" fetchPriority="high" />
                    </a>
                    {heroSide && (
                        <a href={heroSide.live} target="_blank" rel="noopener noreferrer" className="hero-shot hero-shot-side" tabIndex={-1}>
                            <img src={asset(heroSide.image)} alt="" width={960} height={600} loading="lazy" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}

function SectionTitle({ children }: { children: string }) {
    return <h2 className="section-title">{children}</h2>;
}

function Services() {
    const { t } = useI18n();
    return (
        <section id="services" className="section">
            <div className="container services-inner">
                <SectionTitle>{t.services.title}</SectionTitle>
                <div>
                    <div className="service-list">
                        {t.services.items.map((s) => {
                            const example = projects.find((p) => p.slug === s.exampleSlug);
                            return (
                                <article key={s.name} className="service-row">
                                    <h3>{s.name}</h3>
                                    <div className="service-desc">
                                        <p className="service-for">{s.forWhom}</p>
                                        <p className="service-points">{s.points.join(" · ")}</p>
                                    </div>
                                    {example && (
                                        <a href={`#project-${example.slug}`} className="service-example" aria-label={`${t.services.example}: ${example.name}`}>
                                            →
                                        </a>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                    <div className="services-cta">
                        <p>{t.services.cta}</p>
                        <a href="#contact" className="btn btn-primary">
                            {t.services.ctaButton}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Zrzut realizacji jako link do strony; dla czytników ekranu wystarcza link w treści karty.
function ProjectShot({ project }: { project: Project }) {
    const asset = useAsset();
    return (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-shot" tabIndex={-1} aria-hidden="true">
            <img src={asset(project.image)} alt="" loading="lazy" width={960} height={600} />
        </a>
    );
}

function Projects() {
    const { t, lang } = useI18n();
    const featured = projects.filter((p) => p.featured);
    const rest = projects.filter((p) => !p.featured);
    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="projects-head">
                    <SectionTitle>{t.projects.title}</SectionTitle>
                    <p className="projects-count">{t.projects.count(projects.length)}</p>
                </div>
                <div className="featured-list">
                    {featured.map((p) => (
                        <article key={p.slug} id={`project-${p.slug}`} className="featured">
                            <ProjectShot project={p} />
                            <div className="featured-body">
                                <p className="project-category">{p.category[lang]}</p>
                                <h3>{p.name}</h3>
                                <p className="featured-summary">{p.summary[lang]}</p>
                                {p.highlights && (
                                    <ul className="featured-highlights">
                                        {p.highlights.map((h) => (
                                            <li key={h.pl}>{h[lang]}</li>
                                        ))}
                                    </ul>
                                )}
                                {p.note && <p className="project-note">{p.note[lang]}</p>}
                                <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                    {p.linkLabel === "demo" ? t.projects.demo : t.projects.live}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="projects-grid">
                    {rest.map((p) => (
                        <article key={p.slug} id={`project-${p.slug}`} className="project-card">
                            <ProjectShot project={p} />
                            <p className="project-category">{p.category[lang]}</p>
                            <h3>
                                <a href={p.live} target="_blank" rel="noopener noreferrer">
                                    {p.name}
                                </a>
                            </h3>
                            <p className="project-summary">{p.summary[lang]}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Process() {
    const { t } = useI18n();
    return (
        <section id="process" className="section">
            <div className="container">
                <SectionTitle>{t.process.title}</SectionTitle>
                <ol className="steps">
                    {t.process.steps.map((step, i) => (
                        <li key={step.name} className="step">
                            <span className="step-no mono">{String(i + 1).padStart(2, "0")}</span>
                            <h3>{step.name}</h3>
                            <p>{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

function About() {
    const { t } = useI18n();
    return (
        <section id="about" className="section">
            <div className="container about">
                <SectionTitle>{t.about.title}</SectionTitle>
                <div className="about-grid">
                    <div className="about-text">
                        <p>{t.about.p1}</p>
                        <p>{t.about.p2}</p>
                        <p>{t.about.ai}</p>
                        <p>{t.about.p3}</p>
                    </div>
                    <div className="card stack">
                        <h3 className="mono small muted">{t.about.stack}</h3>
                        <ul className="tags">
                            {stack.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Faq() {
    const { t } = useI18n();
    return (
        <section id="faq" className="section">
            <div className="container">
                <SectionTitle>{t.faq.title}</SectionTitle>
                <div className="faq">
                    {t.faq.items.map((item) => (
                        <details key={item.q} className="faq-item">
                            <summary>{item.q}</summary>
                            <p>{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Contact() {
    const { t } = useI18n();
    return (
        <section id="contact" className="section">
            <div className="container contact">
                <SectionTitle>{t.contact.title}</SectionTitle>
                <div className="contact-grid">
                    <div>
                        <p className="lead">{t.contact.lead}</p>
                        <a href={`tel:${PHONE}`} className="contact-phone">
                            <PhoneIcon size={22} /> {PHONE_DISPLAY}
                        </a>
                        <p className="mono muted small">{t.contact.or}</p>
                        <ul className="socials">
                            <li>
                                <a href={`mailto:${EMAIL}`}>
                                    <MailIcon /> {EMAIL}
                                </a>
                            </li>
                            <li>
                                <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                                    <GitHubIcon /> github.com/rymarczyk-tomasz
                                </a>
                            </li>
                            <li>
                                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                                    <LinkedInIcon /> LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="card">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Na telefonie: przypięty pasek „Zadzwoń / Napisz”, widoczny po zjechaniu z hero i schowany przy sekcji kontaktu.
function MobileCta() {
    const { t } = useI18n();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const contact = document.getElementById("contact");
        let pastHero = false;
        let atContact = false;
        const update = () => setVisible(pastHero && !atContact);

        const onScroll = () => {
            pastHero = window.scrollY > window.innerHeight * 0.6;
            update();
        };
        const observer = new IntersectionObserver(([entry]) => {
            atContact = entry.isIntersecting;
            update();
        });
        if (contact) observer.observe(contact);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div className={`mobile-cta band-dark${visible ? " visible" : ""}`} aria-hidden={!visible}>
            <a href={`tel:${PHONE}`} className="btn btn-ghost" tabIndex={visible ? 0 : -1}>
                <PhoneIcon size={18} /> {t.mobileCta.call}
            </a>
            <a href="#contact" className="btn btn-primary" tabIndex={visible ? 0 : -1}>
                <MailIcon size={18} /> {t.mobileCta.write}
            </a>
        </div>
    );
}

export default function App({ lang }: { lang: Lang }) {
    return (
        <I18nProvider lang={lang}>
            <Page />
        </I18nProvider>
    );
}

function Page() {
    const { t } = useI18n();
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Projects />
                <Services />
                <Process />
                <About />
                <Faq />
                <Contact />
            </main>
            <footer className="footer band-dark">
                <div className="container mono small muted">
                    © {__BUILD_YEAR__} · {t.footer}
                </div>
            </footer>
            <MobileCta />
        </>
    );
}
