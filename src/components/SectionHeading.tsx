interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-heading text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
