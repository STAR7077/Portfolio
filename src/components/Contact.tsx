"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/i18n/LanguageProvider";
import { m } from "motion/react";
import { IN_VIEW, STAGGER, fadeUp, stagger } from "@/lib/motion";
import BackgroundGlow from "./BackgroundGlow";
import SectionHeading from "./SectionHeading";
import { IconArrowRight, IconArrowUpRight, IconChat } from "./icons";

const EMAIL = "lucasmarleymem@outlook.com";
const WHATSAPP_NUMBER = "5599945812563";
const WHATSAPP_DISPLAY = "+55 99 94581-2563";

const FIELD =
  "mt-1.5 w-full rounded-[10px] border border-line bg-white/[0.03] px-4 py-2.5 text-[14.5px] text-fg outline-none transition-colors duration-300 placeholder:text-fg-3 hover:border-line-2 focus:border-[rgba(113,107,255,0.6)] focus:bg-white/[0.05]";

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
    <section id="contact" className="relative overflow-hidden bg-canvas-2 pb-20 pt-28 sm:pb-24 sm:pt-36">
      {/* The largest light on the page closes it. */}
      <BackgroundGlow preset="cta" grid drift />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={stagger(STAGGER.base)}
          className="mx-auto max-w-3xl text-center"
        >
          <m.div variants={fadeUp}>
            <SectionHeading index="07" eyebrow={t.contact.eyebrow} statement={t.contact.statement} />
          </m.div>
          <m.p variants={fadeUp} className="t-lead mx-auto mt-6 max-w-xl">
            {t.contact.ctaIntro}
          </m.p>
          <m.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#contact-form" className="btn btn-primary">
              {t.contact.ctaStart}
              <IconArrowRight size={16} className="nudge-x" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              onClick={() => track("whatsapp_opened", { from: "cta" })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <IconChat size={16} />
              {t.contact.whatsappLabel}
            </a>
          </m.div>
        </m.div>

        <div className="mt-20 grid grid-cols-1 gap-10 sm:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={stagger(STAGGER.base)}>
            <m.p variants={fadeUp} className="text-[17px] leading-relaxed text-fg-2">
              {t.contact.intro}
            </m.p>

            <div className="mt-8 space-y-3">
              <m.a
                variants={fadeUp}
                href={`mailto:${EMAIL}`}
                className="card card-hover group flex items-center justify-between gap-4 px-5 py-4"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
                    {t.contact.emailLabel}
                  </span>
                  <span className="mt-1 block truncate text-[15px] text-fg">{EMAIL}</span>
                </span>
                <IconArrowUpRight size={16} className="nudge shrink-0 text-fg-3" />
              </m.a>
              <m.a
                variants={fadeUp}
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                onClick={() => track("whatsapp_opened", { from: "contact" })}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex items-center justify-between gap-4 px-5 py-4"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
                    {t.contact.whatsappLabel}
                  </span>
                  <span className="mt-1 block text-[15px] text-fg">{WHATSAPP_DISPLAY}</span>
                </span>
                <IconArrowUpRight size={16} className="nudge shrink-0 text-fg-3" />
              </m.a>
            </div>
          </m.div>

          <m.div initial="hidden" whileInView="show" viewport={IN_VIEW} variants={fadeUp}>
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="relative space-y-4 rounded-panel border border-line bg-[linear-gradient(180deg,#161c29,#11161f)] p-6 shadow-[var(--edge-top),var(--shadow-card)] sm:p-8"
            >
              <label className="block text-[13.5px] text-fg-2">
                {t.contact.nameLabel}
                <input name="name" type="text" required placeholder={t.contact.namePlaceholder} className={FIELD} />
              </label>
              <label className="block text-[13.5px] text-fg-2">
                {t.contact.emailFieldLabel}
                <input name="email" type="email" required placeholder={t.contact.emailPlaceholder} className={FIELD} />
              </label>
              <label className="block text-[13.5px] text-fg-2">
                {t.contact.messageLabel}
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.contact.messagePlaceholder}
                  className={`${FIELD} resize-y`}
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
                className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? t.contact.sending : t.contact.send}
              </button>

              {/* Announced, because the outcome is the whole point of the form. */}
              <p
                role="status"
                aria-live="polite"
                className={`text-[12.5px] leading-relaxed ${status === "failed" ? "text-[#fda29b]" : "text-fg-3"}`}
              >
                {status === "sent" && t.contact.hintSent}
                {status === "failed" && (
                  <>
                    {t.contact.hintFailed}{" "}
                    <a href={mailtoFallback} className="font-semibold text-fg underline underline-offset-2">
                      {t.contact.failedAction}
                    </a>
                  </>
                )}
                {(status === "idle" || status === "sending") && t.contact.hintIdle}
              </p>
            </form>
          </m.div>
        </div>
      </div>
    </section>
  );
}
