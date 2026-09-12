"use client";

import { useEffect, type ReactNode } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { IconBolt, IconChat, IconCheck, IconDatabase, IconSpark, IconUsers } from "./icons";
import StatusChip, { type Tone } from "./StatusChip";

/**
 * The hero's right-hand side: a few interface panels layered with depth,
 * showing the kind of system this portfolio is about.
 *
 * It depicts the real-estate WhatsApp agent in Work rather than an invented
 * product: the intent score, the inventory match, and the Airtable, OpenAI
 * and PostgreSQL connections are what that bot actually runs on. Figures
 * inside are interface mock data, not claimed results, and the whole figure
 * is exposed to assistive technology as one labelled illustration.
 *
 * Motion, in order of restraint: a staggered entrance, a slow float on each
 * panel (CSS, so it costs no JavaScript), a few pixels of cursor parallax on
 * desktop pointers only, and a fade as the page scrolls away.
 */

const panelIn = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
};

/** A labelled bar that fills once the panel has arrived. */
function Meter({ label, value, display }: { label: string; value: number; display: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] text-fg-2">{label}</span>
        <span className="font-mono text-[12px] text-fg">{display}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-track">
        <m.div
          className="h-full origin-left rounded-full"
          style={{ backgroundImage: "var(--grad-brand)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 1.05 }}
        />
      </div>
    </div>
  );
}

function SystemRow({
  icon,
  name,
  status,
  tone,
}: {
  icon: ReactNode;
  name: string;
  status: string;
  tone: Tone;
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2.5 text-[12.5px] text-fg">
        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-line bg-fill-card text-fg-2">
          {icon}
        </span>
        {name}
      </span>
      <StatusChip tone={tone}>{status}</StatusChip>
    </li>
  );
}

/** Cursor parallax for one layer: up to `depth` pixels, opposite the pointer. */
function useDepth(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  return {
    x: useTransform(x, (v) => v * -depth),
    y: useTransform(y, (v) => v * -depth),
  };
}

export default function HeroVisual() {
  const { t } = useLanguage();
  const v = t.heroVisual;
  const reduced = useReducedMotion();

  // Pointer position across the viewport, -1 to 1 on each axis, springed
  // so the panels lag the cursor a little rather than tracking it rigidly.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 55, damping: 18, mass: 0.7 });

  useEffect(() => {
    if (reduced) return;
    // Touch screens have no hover position to follow, and phones are where
    // an extra listener costs the most.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        px.set((e.clientX / window.innerWidth - 0.5) * 2);
        py.set((e.clientY / window.innerHeight - 0.5) * 2);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced, px, py]);

  // As the first 400px scroll past, the composition drops back and fades,
  // so the next section starts to arrive while the hero is still in view.
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 400], [0, 60]);
  const fade = useTransform(scrollY, [0, 400], [1, 0.25]);

  const agent = useDepth(sx, sy, 6);
  const systems = useDepth(sx, sy, 10);
  const run = useDepth(sx, sy, 4);
  const api = useDepth(sx, sy, 8);

  return (
    <m.div
      role="img"
      aria-label={v.caption}
      className="relative mx-auto h-[410px] w-full max-w-[560px] sm:h-[500px] lg:mx-0 lg:ml-auto lg:h-[520px]"
      style={reduced ? undefined : { y: drift, opacity: fade }}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: STAGGER.loose, delayChildren: 0.45 } } }}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {/* Light pooled behind the main panel. */}
        <div
          className="absolute left-[4%] top-[8%] h-[70%] w-[80%]"
          style={{
            background: "radial-gradient(closest-side, rgba(var(--accent-rgb),0.22), transparent)",
          }}
        />

        {/* Faint wiring between the panels: the system is connected. */}
        <svg
          className="absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "var(--accent)" }} stopOpacity="0.5" />
              <stop offset="1" style={{ stopColor: "var(--accent-cyan)" }} stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d="M78 13 C 78 20, 80 24, 80 30"
            stroke="url(#wire)"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M80 61 C 80 71, 72 79, 65 79"
            stroke="url(#wire)"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* The agent: the panel the composition is built around. */}
        <m.div
          variants={panelIn}
          style={reduced ? undefined : agent}
          className="absolute left-0 top-0 z-10 w-[90%] sm:top-[14%] sm:w-[64%] lg:top-[11%] lg:w-[62%]"
        >
          <div className="float-a">
            <div className="panel p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(var(--accent-rgb),0.14)] text-accent-hi ring-1 ring-inset ring-[rgba(var(--accent-rgb),0.32)]">
                    <IconSpark size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold text-fg">{v.agent}</p>
                    <p className="font-mono text-[10.5px] text-fg-3">openai · gemini</p>
                  </div>
                </div>
                <StatusChip tone="cyan" pulse>
                  {v.active}
                </StatusChip>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-fill-card px-3 py-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(var(--accent-cyan-rgb),0.12)] text-ai">
                  <IconChat size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] text-fg">{v.newLead}</p>
                  <p className="font-mono text-[10.5px] text-fg-3">
                    {v.channel} · {v.justNow}
                  </p>
                </div>
                <span className="font-mono text-[10.5px] text-accent-hi">#2041</span>
              </div>

              <div className="mt-4 space-y-3">
                <Meter label={v.intent} value={91} display="91 / 100" />
                <Meter label={v.match} value={94} display="94%" />
              </div>
            </div>
          </div>
        </m.div>

        {/* A request arriving: the one line of the system's plumbing shown. */}
        <m.div
          variants={panelIn}
          style={reduced ? undefined : api}
          className="absolute right-0 top-0 z-20 hidden w-[46%] sm:block lg:w-[44%]"
        >
          <div className="float-b">
            <div className="panel px-3.5 py-2.5 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[rgba(var(--accent-blue-rgb),0.14)] px-1.5 py-0.5 text-azure">POST</span>
                <span className="truncate text-fg-2">/webhooks/whatsapp</span>
              </div>
              <div className="mt-1.5 flex items-center gap-3">
                <span className="text-ai">200 OK</span>
                <span className="text-fg-3">84 ms</span>
              </div>
            </div>
          </div>
        </m.div>

        {/* What the agent is wired into. */}
        <m.div
          variants={panelIn}
          style={reduced ? undefined : systems}
          className="absolute bottom-0 right-0 z-30 w-[70%] sm:bottom-[4%] sm:w-[50%] lg:bottom-auto lg:top-[31%] lg:w-[40%]"
        >
          <div className="float-b">
            <div className="panel p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-3">{v.systems}</p>
              <ul className="mt-3 space-y-2.5">
                <SystemRow icon={<IconUsers size={13} />} name="Airtable" status={v.synced} tone="cyan" />
                <SystemRow icon={<IconSpark size={13} />} name="OpenAI" status={v.connected} tone="accent" />
                <SystemRow icon={<IconDatabase size={13} />} name="PostgreSQL" status={v.healthy} tone="blue" />
              </ul>
            </div>
          </div>
        </m.div>

        {/* The run that just finished, step by step. Desktop only. */}
        <m.div
          variants={panelIn}
          style={reduced ? undefined : run}
          className="absolute bottom-0 left-[12%] z-20 hidden w-[52%] lg:block"
        >
          <div className="float-c">
            <div className="panel p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[12.5px] font-semibold text-fg">
                  <span className="text-accent-hi">
                    <IconBolt size={14} />
                  </span>
                  {v.run}
                </span>
                <span className="font-mono text-[10.5px] text-fg-3">1.2s</span>
              </div>
              <ol className="mt-3 space-y-2">
                {[v.stepClassify, v.stepMatch, v.stepSync, v.stepNotify].map((step, i) => (
                  <m.li
                    key={step}
                    className="flex items-center gap-2.5 text-[12px] text-fg-2"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: DURATION.base, ease: EASE_OUT, delay: 1.2 + i * 0.12 }}
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(var(--accent-cyan-rgb),0.14)] text-ai">
                      <IconCheck size={10} strokeWidth={2.4} />
                    </span>
                    {step}
                  </m.li>
                ))}
              </ol>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-2.5">
                <StatusChip tone="cyan">{v.executed}</StatusChip>
                <span className="font-mono text-[10.5px] text-fg-3">run_8f2c</span>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </m.div>
  );
}
