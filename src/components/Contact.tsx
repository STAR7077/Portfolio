"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SectionScenery from "./SectionScenery";
import Parallax from "./Parallax";

const EMAIL = "lucasmarleymem@outlook.com";
const WHATSAPP_NUMBER = "5599945812563";
const WHATSAPP_DISPLAY = "+55 99 94581-2563";

const FIELD =
  "mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-500 placeholder:text-[var(--faint)] focus:border-[var(--accent)]";

type Status = "idle" | "sending" | "sent" | "failed";

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState({ name: "", email: "", message: "" });

  // When the form was first shown. A submission arriving implausibly soon
  // after is a script rather than a person.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
      message: form.get("message")?.toString() ?? "",
      company: form.get("company")?.toString() ?? "",
      startedAt: openedAt.current,
    };
    setDraft({ name: payload.name, email: payload.email, message: payload.message });
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      track("contact_form_sent");
    } catch {
      // Never swallow a failure: say so, and offer the mail client as a way out.
      setStatus("failed");
      track("contact_form_failed");
    }
  }

  /** What the visitor already typed, handed on to their mail client. */
  const mailtoFallback =
    `mailto:${EMAIL}?subject=${encodeURIComponent(
      t.contact.mailSubject.replace("{name}", draft.name)
    )}&body=${encodeURIComponent(`${draft.message}\n\n${draft.name} (${draft.email})`)}`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--border)] py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={-180} className="absolute -bottom-40 right-[-10%] h-[520px] w-[520px]">
          <div className="mesh-c h-full w-full rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.12)_0%,rgba(192,38,211,0)_66%)] blur-3xl" />
        </Parallax>
        <Parallax speed={300} className="absolute left-[5%] top-[12%] hidden lg:block">
          <div className="h-12 w-12 -rotate-6 rounded-2xl bg-purple-300/25 blur-[2px]" />
        </Parallax>
      </div>

      <SectionScenery preset="contact" />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
            <p className="max-w-md text-[var(--muted)]">{t.contact.intro}</p>
          </Reveal>

          <div className="mt-8 space-y-4">
            <Reveal delay={80}>
              <a
                href={`mailto:${EMAIL}`}
                className="lift flex flex-col rounded-2xl border border-[var(--border)] bg-white px-5 py-3.5 shadow-sm hover:border-[var(--accent)]"
              >
                <span className="text-xs uppercase tracking-wide text-[var(--faint)]">
                  {t.contact.emailLabel}
                </span>
                <span className="text-sm text-[var(--foreground)]">{EMAIL}</span>
              </a>
            </Reveal>
            <Reveal delay={150}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                onClick={() => track("whatsapp_opened", { from: "contact" })}
                target="_blank"
                rel="noopener noreferrer"
                className="lift flex flex-col rounded-2xl border border-[var(--border)] bg-white px-5 py-3.5 shadow-sm hover:border-[var(--accent)]"
              >
                <span className="text-xs uppercase tracking-wide text-[var(--faint)]">
                  {t.contact.whatsappLabel}
                </span>
                <span className="text-sm text-[var(--foreground)]">{WHATSAPP_DISPLAY}</span>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(22,21,28,0.5)]"
          >
            <label className="block text-sm text-[var(--muted)]">
              {t.contact.nameLabel}
              <input
                name="name"
                type="text"
                required
                placeholder={t.contact.namePlaceholder}
                className={FIELD}
              />
            </label>
            <label className="block text-sm text-[var(--muted)]">
              {t.contact.emailFieldLabel}
              <input
                name="email"
                type="email"
                required
                placeholder={t.contact.emailPlaceholder}
                className={FIELD}
              />
            </label>
            <label className="block text-sm text-[var(--muted)]">
              {t.contact.messageLabel}
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t.contact.messagePlaceholder}
                className={FIELD}
              />
            </label>
            {/* Invisible to a person, irresistible to a naive bot. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-[var(--accent)] grad-accent px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_38px_-12px_rgba(var(--accent-rgb),0.8)] transition-transform duration-500 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === "sending" ? t.contact.sending : t.contact.send}
            </button>

            {/* Announced, because the outcome is the whole point of the form. */}
            <p
              role="status"
              aria-live="polite"
              className={`text-xs ${
                status === "failed" ? "text-[#B42318]" : "text-[var(--faint)]"
              }`}
            >
              {status === "sent" && t.contact.hintSent}
              {status === "failed" && (
                <>
                  {t.contact.hintFailed}{" "}
                  <a href={mailtoFallback} className="font-semibold underline">
                    {t.contact.failedAction}
                  </a>
                </>
              )}
              {(status === "idle" || status === "sending") && t.contact.hintIdle}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
