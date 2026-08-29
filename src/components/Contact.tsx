"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import SectionHeading from "./SectionHeading";

const EMAIL = "lucasmarleymem@outlook.com";
const WHATSAPP_NUMBER = "5599945812563";
const WHATSAPP_DISPLAY = "+55 99 94581-2563";

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
        className="pointer-events-none absolute -bottom-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-violet-600/30 via-fuchsia-600/10 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} />
          <p className="max-w-md text-slate-400">{t.contact.intro}</p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${EMAIL}`}
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 hover:border-violet-400/40"
            >
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {t.contact.emailLabel}
              </span>
              <span className="text-sm text-white">{EMAIL}</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 hover:border-violet-400/40"
            >
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {t.contact.whatsappLabel}
              </span>
              <span className="text-sm text-white">{WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
        >
          <label className="block text-sm text-slate-300">
            {t.contact.nameLabel}
            <input
              name="name"
              type="text"
              required
              placeholder={t.contact.namePlaceholder}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-400/50"
            />
          </label>
          <label className="block text-sm text-slate-300">
            {t.contact.emailFieldLabel}
            <input
              name="email"
              type="email"
              required
              placeholder={t.contact.emailPlaceholder}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-400/50"
            />
          </label>
          <label className="block text-sm text-slate-300">
            {t.contact.messageLabel}
            <textarea
              name="message"
              required
              rows={4}
              placeholder={t.contact.messagePlaceholder}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-400/50"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-400 transition-colors"
          >
            {t.contact.send}
          </button>
          <p className="text-xs text-slate-500">
            {sent ? t.contact.hintSent : t.contact.hintIdle}
          </p>
        </form>
      </div>
    </section>
  );
}
