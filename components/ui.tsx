import Link from "next/link";

/** Standard header for interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="max-w-4xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="font-display text-limestone text-5xl sm:text-7xl mt-5">
        {title}
      </h1>
      {intro && (
        <p className="text-body text-lg mt-6 max-w-2xl leading-relaxed">
          {intro}
        </p>
      )}
    </header>
  );
}

/**
 * The recurring closing band — a warm light sheet that breaks the dark
 * rhythm of the page, like a plate in an architecture magazine.
 */
export function CtaBand({
  heading = "Ready to feel the difference?",
  sub = "Tell us a bit about your space and we'll get you a full quote, shipping included.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="mt-28 sm:mt-36 bg-sand rounded-t-[2.5rem]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        <p className="eyebrow eyebrow-warm">Begin</p>
        <h2 className="font-display text-ink text-4xl sm:text-6xl mt-5 max-w-3xl mx-auto">
          {heading}
        </h2>
        <p className="text-body-light mt-6 max-w-xl mx-auto leading-relaxed">
          {sub}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-11">
          <Link href="/contact" className="btn-dark">
            Get a Quote
          </Link>
          <Link href="/pricing" className="btn-ghost btn-ghost-light text-ink">
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

/** A thin wrapper giving interior pages consistent horizontal padding + width. */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-6xl mx-auto px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
