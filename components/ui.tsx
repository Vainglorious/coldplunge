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
    <header className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="font-heading font-bold text-frost text-4xl sm:text-5xl mt-3 leading-[1.05]">
        {title}
      </h1>
      {intro && <p className="text-mist text-lg mt-5 leading-relaxed">{intro}</p>}
    </header>
  );
}

/** The recurring "ready to get one?" band near the bottom of most pages. */
export function CtaBand({
  heading = "Ready to feel the difference?",
  sub = "Tell us a bit about your space and we'll get you a full quote, shipping included.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24">
      <div className="card frost-shadow overflow-hidden relative">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(94,145,181,0.12), transparent 55%), radial-gradient(circle at 90% 90%, rgba(44,109,158,0.14), transparent 55%)",
          }}
        />
        <div className="relative px-6 sm:px-12 py-12 sm:py-16 text-center">
          <h2 className="font-heading font-bold text-frost text-3xl sm:text-4xl">
            {heading}
          </h2>
          <p className="text-mist mt-4 max-w-xl mx-auto">{sub}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link href="/contact" className="btn-primary">
              Get a Quote
            </Link>
            <Link href="/pricing" className="btn-ghost">
              See Pricing
            </Link>
          </div>
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
