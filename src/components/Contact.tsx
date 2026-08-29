"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const message = form.get("message")?.toString() ?? "";

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:lucasmarleymem@outlook.com?subject=${subject}&body=${body}`;
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
          <SectionHeading eyebrow="Get in touch" title="Contact." />
          <p className="max-w-md text-slate-400">
            Have a project in mind — an AI agent, an automation, a web platform or a mobile app? Send a
            few details and I&apos;ll get back to you.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="mailto:lucasmarleymem@outlook.com"
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 hover:border-violet-400/40"
            >
              <span className="text-xs uppercase tracking-wide text-slate-500">Email</span>
              <span className="text-sm text-white">lucasmarleymem@outlook.com</span>
            </a>
            <a
              href="https://wa.me/5599945812563"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 hover:border-violet-400/40"
            >
              <span className="text-xs uppercase tracking-wide text-slate-500">WhatsApp</span>
              <span className="text-sm text-white">+55 99 94581-2563</span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
        >
          <label className="block text-sm text-slate-300">
            Your Name*
            <input
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-400/50"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Your Email*
            <input
              name="email"
              type="email"
              required
              placeholder="jane@email.com"
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-400/50"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Your Message*
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell me a bit about your project..."
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-400/50"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-400 transition-colors"
          >
            Send
          </button>
          <p className="text-xs text-slate-500">
            {sent
              ? "Opening your email client now — if nothing happened, email me directly instead."
              : "This opens your email client with the message pre-filled — nothing is sent from this page."}
          </p>
        </form>
      </div>
    </section>
  );
}
