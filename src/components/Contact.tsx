"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const EMAIL = "lucasmarleymem@outlook.com";
const WHATSAPP_NUMBER = "5599945812563";
const WHATSAPP_DISPLAY = "+55 99 94581-2563";

const FIELD =
  "mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-colors duration-500 placeholder:text-slate-600 focus:border-violet-400/60 focus:bg-white/[0.06]";

export default function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const message = form.get("message")?.toString() ?? "";

    const subject = encodeURIComponent(t.contact.mailSubject.replace("{name}", name));
    const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/5 py-24 sm:py-28">
      <div className="star-field absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="mesh-c pointer-events-none absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.28)_0%,rgba(232,121,249,0)_66%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
            <p className="max-w-md text-slate-400">{t.contact.intro}</p>
          </Reveal>

          <div className="mt-8 space-y-4">
            <Reveal delay={80}>
              <a
                href={`mailto:${EMAIL}`}
                className="lift flex flex-col rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3.5 backdrop-blur-xl hover:border-violet-400/40"
              >
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {t.contact.emailLabel}
                </span>
                <span className="text-sm text-white">{EMAIL}</span>
              </a>
            </Reveal>
            <Reveal delay={150}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lift flex flex-col rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-3.5 backdrop-blur-xl hover:border-violet-400/40"
              >
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {t.contact.whatsappLabel}
                </span>
                <span className="text-sm text-white">{WHATSAPP_DISPLAY}</span>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <label className="block text-sm text-slate-300">
              {t.contact.nameLabel}
              <input
                name="name"
                type="text"
                required
                placeholder={t.contact.namePlaceholder}
                className={FIELD}
              />
            </label>
            <label className="block text-sm text-slate-300">
              {t.contact.emailFieldLabel}
              <input
                name="email"
                type="email"
                required
                placeholder={t.contact.emailPlaceholder}
                className={FIELD}
              />
            </label>
            <label className="block text-sm text-slate-300">
              {t.contact.messageLabel}
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t.contact.messagePlaceholder}
                className={FIELD}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 px-6 py-3.5 text-sm font-bold text-[#0b0b12] shadow-[0_12px_38px_rgba(168,85,247,0.40)] transition-transform duration-500 hover:scale-[1.02]"
            >
              {t.contact.send}
            </button>
            <p className="text-xs text-slate-500">
              {sent ? t.contact.hintSent : t.contact.hintIdle}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
