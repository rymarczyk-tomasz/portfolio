import { useEffect, useState } from "react";
import { useI18n, type Lang } from "./i18n";
import { projects, stack } from "./data/projects";
import { ContactForm } from "./components/ContactForm";
import { ExternalIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./components/Icons";
import { EMAIL, GITHUB, LINKEDIN, NAME } from "./config";

function LangSwitch() {
    const { lang, setLang } = useI18n();
    return (
        <div className="lang-switch" role="group" aria-label="Language">
            {(["pl", "en"] as Lang[]).map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
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
        <header className={`header${scrolled ? " scrolled" : ""}`}>
            <div className="container header-inner">
                <a href="#top" className="logo" aria-label={NAME}>
                    <span className="prompt">~/</span>tomasz<span className="cursor">_</span>
                </a>
                <nav className="nav">
                    <a href="#about">{t.nav.about}</a>
                    <a href="#projects">{t.nav.projects}</a>
                    <a href="#contact">{t.nav.contact}</a>
                </nav>
                <LangSwitch />
            </div>
        </header>
    );
}

function Hero() {
    const { t } = useI18n();
    return (
        <section className="hero" id="top">
            <div className="container">
                <p className="status">
                    <span className="dot" /> {t.hero.available}
                </p>
                <p className="mono muted">{t.hero.hello}</p>
                <h1>{NAME}</h1>
                <p className="hero-role">{t.hero.role}</p>
                <p className="mono muted small">{t.hero.location}</p>
                <div className="hero-actions">
                    <a href="#projects" className="btn btn-primary">
                        {t.hero.ctaProjects}
                    </a>
                    <a href="#contact" className="btn btn-ghost">
                        {t.hero.ctaContact}
                    </a>
                </div>
            </div>
        </section>
    );
}

function SectionTitle({ index, children }: { index: string; children: string }) {
    return (
        <h2 className="section-title">
            <span className="mono accent">{index}.</span> {children}
        </h2>
    );
}

function About() {
    const { t } = useI18n();
    return (
        <section id="about" className="section">
            <div className="container about">
                <SectionTitle index="01">{t.about.title}</SectionTitle>
                <div className="about-grid">
                    <div className="about-text">
                        <p>{t.about.p1}</p>
                        <p>{t.about.p2}</p>
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

function Projects() {
    const { t, lang } = useI18n();
    return (
        <section id="projects" className="section">
            <div className="container">
                <SectionTitle index="02">{t.projects.title}</SectionTitle>
                <div className="projects">
                    {projects.map((p) => (
                        <article key={p.name} className="card project">
                            <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-shot" tabIndex={-1} aria-hidden="true">
                                <span className="browser-bar">
                                    <i />
                                    <i />
                                    <i />
                                </span>
                                <img src={p.image} alt="" loading="lazy" width={960} height={600} />
                            </a>
                            <div className="project-body">
                                <h3>{p.name}</h3>
                                <p>{p.description[lang]}</p>
                                <ul className="tags small">
                                    {p.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>
                                <div className="project-links">
                                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                                        <ExternalIcon /> {t.projects.live}
                                    </a>
                                    <a href={p.repo} target="_blank" rel="noopener noreferrer">
                                        <GitHubIcon size={16} /> {t.projects.code}
                                    </a>
                                </div>
                            </div>
                        </article>
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
                <SectionTitle index="03">{t.contact.title}</SectionTitle>
                <div className="contact-grid">
                    <div>
                        <p className="lead">{t.contact.lead}</p>
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

export default function App() {
    const { t } = useI18n();
    return (
        <>
            <Header />
            <main>
                <Hero />
                <About />
                <Projects />
                <Contact />
            </main>
            <footer className="footer">
                <div className="container mono small muted">
                    © {new Date().getFullYear()} · {t.footer}
                </div>
            </footer>
        </>
    );
}
