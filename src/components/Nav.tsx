const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#07070f]/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-heading font-semibold text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm">
            L
          </span>
          Lucas Marley
          <span className="hidden sm:inline text-slate-400 font-normal text-sm">| Developer</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-violet-500/10 border border-violet-400/30 px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/20 transition-colors"
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
