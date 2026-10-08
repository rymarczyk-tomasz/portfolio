import { useEffect, useState } from "react";
import { useI18n, type Lang } from "./i18n";
import { projects, stack } from "./data/projects";
import { ContactForm } from "./components/ContactForm";
import { CheckIcon, ExternalIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./components/Icons";
import { EMAIL, GITHUB, LINKEDIN, NAME, PHONE, PHONE_DISPLAY } from "./config";

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
        <header className={`header band-dark${scrolled ? " scrolled" : ""}`}>
            <div className="container header-inner">
                <a href="#top" className="logo" aria-label={NAME}>
                    <span className="logo-mark">TR</span>
                    <span className="logo-name">{NAME}</span>
                </a>
                <nav className="nav">
                    <a href="#services">{t.nav.services}</a>
                    <a href="#projects">{t.nav.projects}</a>
                    <a href="#about">{t.nav.about}</a>
                    <a href="#faq">{t.nav.faq}</a>
                    <a href="#contact">{t.nav.contact}</a>
                </nav>
                <a href={`tel:${PHONE}`} className="header-phone">
                    <PhoneIcon size={16} /> {PHONE_DISPLAY}
                </a>
                <LangSwitch />
            </div>
        </header>
    );
}

function Hero() {
    const { t } = useI18n();
    return (
        <section className="hero band-dark" id="top">
            <div className="container">
                <p className="status">
                    <span className="dot" /> {t.hero.available}
                </p>
                <p className="mono muted">{t.hero.kicker}</p>
                <h1>{t.hero.title}</h1>
                <p className="hero-role">{t.hero.lead}</p>
                <ul className="hero-points">
                    {t.hero.points.map((point) => (
                        <li key={point}>
                            <CheckIcon /> {point}
                        </li>
                    ))}
                </ul>
                <div className="hero-actions">
                    <a href="#contact" className="btn btn-primary">
                        {t.hero.ctaContact}
                    </a>
                    <a href={`tel:${PHONE}`} className="btn btn-ghost">
                        <PhoneIcon size={18} /> {t.hero.ctaCall}: {PHONE_DISPLAY}
                    </a>
                </div>
            </div>
        </section>
    );
}

function SectionTitle({ index, children }: { index: string; children: string }) {
    return (
        <h2 className="section-title">
            <span className="section-index mono">{index}</span>
            <span>{children}</span>
        </h2>
    );
}

function Services() {
    const { t } = useI18n();
    return (
        <section id="services" className="section">
            <div className="container">
                <SectionTitle index="01">{t.services.title}</SectionTitle>
                <div className="services">
                    {t.services.items.map((s) => (
                        <article key={s.name} className="card service">
                            <h3>{s.name}</h3>
                            <p className="service-for">
                                <span className="mono small muted">{t.services.forWhom}:</span> {s.forWhom}
                            </p>
                            <ul className="checklist">
                                {s.points.map((point) => (
                                    <li key={point}>
                                        <CheckIcon size={16} /> {point}
                                    </li>
                                ))}
                            </ul>
                            <a href="#projects" className="service-example mono small">
                                {t.services.example}: {s.example} →
                            </a>
                        </article>
                    ))}
                </div>
                <div className="services-cta">
                    <p>{t.services.cta}</p>
                    <a href="#contact" className="btn btn-primary">
                        {t.services.ctaButton}
                    </a>
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
                                <img src={p.image} alt="" loading="lazy" width={960} height={600} />
                            </a>
                            <div className="project-body">
                                <h3>{p.name}</h3>
                                <dl className="case">
                                    <dt>{t.projects.client}</dt>
                                    <dd>{p.client[lang]}</dd>
                                    <dt>{t.projects.task}</dt>
                                    <dd>{p.task[lang]}</dd>
                                    <dt>{t.projects.solution}</dt>
                                    <dd>{p.solution[lang]}</dd>
                                </dl>
                                <ul className="tags small">
                                    {p.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>
                                <div className="project-links">
                                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                                        <ExternalIcon /> {t.projects.live}
                                    </a>
                                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="muted">
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

function Process() {
    const { t } = useI18n();
    return (
        <section id="process" className="section">
            <div className="container">
                <SectionTitle index="03">{t.process.title}</SectionTitle>
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
                <SectionTitle index="04">{t.about.title}</SectionTitle>
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

function Faq() {
    const { t } = useI18n();
    return (
        <section id="faq" className="section">
            <div className="container">
                <SectionTitle index="05">{t.faq.title}</SectionTitle>
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
                <SectionTitle index="06">{t.contact.title}</SectionTitle>
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

export default function App() {
    const { t } = useI18n();
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Services />
                <Projects />
                <Process />
                <About />
                <Faq />
                <Contact />
            </main>
            <footer className="footer band-dark">
                <div className="container mono small muted">
                    © {new Date().getFullYear()} · {t.footer}
                </div>
            </footer>
            <MobileCta />
        </>
    );
}
