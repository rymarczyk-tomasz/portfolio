import { useState, type FormEvent } from "react";
import { useI18n } from "../i18n";
import { EMAIL } from "../config";

// Wiadomości wysyłane są przez Web3Forms (darmowe, działa na każdym hostingu statycznym).
// Klucz ustaw w pliku .env jako VITE_WEB3FORMS_KEY — patrz README.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
    const { t } = useI18n();
    const [status, setStatus] = useState<Status>("idle");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));

        // Bez klucza otwieramy klienta poczty z wypełnioną wiadomością.
        if (!ACCESS_KEY) {
            const body = `${data.message}\n\n— ${data.name} <${data.email}>`;
            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.subject)}&body=${encodeURIComponent(body)}`;
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    ...data,
                    access_key: ACCESS_KEY,
                    subject: `${t.contact.subject}: ${data.name}`,
                    from_name: "Portfolio",
                }),
            });
            const json = await res.json();
            if (!json.success) throw new Error(json.message);
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
        }
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="name">{t.contact.name}</label>
                <input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className="field">
                <label htmlFor="email">{t.contact.email}</label>
                <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
                <label htmlFor="message">{t.contact.message}</label>
                <textarea id="message" name="message" rows={6} required />
            </div>
            {/* pułapka na boty — ukryte pole */}
            <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" />

            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? t.contact.sending : t.contact.send}
            </button>

            <p className="form-status" role="status" aria-live="polite">
                {status === "success" && <span className="ok">{t.contact.success}</span>}
                {status === "error" && (
                    <span className="err">
                        {t.contact.error} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </span>
                )}
            </p>
        </form>
    );
}
