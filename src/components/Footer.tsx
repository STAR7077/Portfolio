export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Lucas Marley</span>
        <span>Built with Next.js, TypeScript &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
