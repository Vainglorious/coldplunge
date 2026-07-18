import Link from "next/link";

const NAV = [
  { href: "/why-cold-plunge", label: "Why Cold Plunge" },
  { href: "/specifications", label: "Specs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-30 px-3 sm:px-5">
      <div className="glass max-w-6xl mx-auto pl-5 sm:pl-7 pr-3 sm:pr-4 h-16 rounded-2xl border border-limestone/10 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Calgary Cold Plunge — home"
        >
          <span className="font-heading font-semibold text-limestone text-sm sm:text-base uppercase tracking-[0.08em] leading-none">
            Calgary Cold Plunge
            <span className="text-champagne">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted hover:text-limestone transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn-primary !py-2.5 !px-5 text-sm">
          Get Yours
        </Link>
      </div>
    </header>
  );
}
