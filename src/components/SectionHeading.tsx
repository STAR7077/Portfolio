interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/80">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">
        {title}
      </h2>
    </div>
  );
}
