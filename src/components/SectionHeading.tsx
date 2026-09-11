interface SectionHeadingProps {
  /** Position in the page, shown as "02 /". Omit for untitled sections. */
  index?: string;
  eyebrow: string;
  /** An ordinary heading, in sentence case. */
  title?: string;
  /**
   * An uppercase display statement instead of a title. Line breaks are
   * written into the copy as "\n", so each language chooses its own.
   */
  statement?: string;
  intro?: string;
  className?: string;
}

/**
 * The heading every section opens with: a mono label carrying the section
 * number, then either a plain title or a large display statement.
 *
 * Statements are the one place the site sets type in capitals at size.
 * Everything else stays in sentence case so it reads as prose.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  statement,
  intro,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="t-eyebrow">
        {index && (
          <>
            <span className="t-index">{index}</span>
            <span aria-hidden="true"> / </span>
          </>
        )}
        {eyebrow}
      </p>

      {statement ? (
        <h2 className="t-display mt-5">
          {statement.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      ) : (
        title && <h2 className="t-h2 mt-4">{title}</h2>
      )}

      {intro && <p className="t-lead mt-5 max-w-2xl">{intro}</p>}
    </div>
  );
}
