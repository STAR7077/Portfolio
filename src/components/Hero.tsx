export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-32 sm:pt-48 sm:pb-40">
      {/* decorative swirl rings, echoing the reference site's line-art */}
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full swirl-rings animate-spin-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[560px] w-[560px] rounded-full swirl-rings animate-spin-slow"
        style={{ animationDirection: "reverse" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-stretch gap-6">
          <div className="w-1 rounded-full bg-gradient-to-b from-violet-400 to-transparent" />
          <div>
            <h1 className="font-heading text-5xl sm:text-6xl font-extrabold text-white">
              Hi, I&apos;m <span className="text-gradient">Lucas</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              AI Agents, Web &amp; Mobile Applications,
              <br />
              Node.js, Python, React, Next.js, LLMs, Automation, …
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-400 transition-colors"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-white/30 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute left-1/2 -translate-x-1/2 bottom-6 flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1"
      >
        <span className="h-2 w-1 rounded-full bg-white/60 animate-float-slow" />
      </a>
    </section>
  );
}
