import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/why-cold-plunge", label: "Why Cold Plunge" },
  { href: "/specifications", label: "Specs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-bg/80 border-b border-line-soft">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <IceMark />
          <span className="font-heading font-bold text-frost tracking-tight text-lg">
            {SITE.brandShort}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-heading text-sm font-medium text-slate hover:text-frost transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn-primary text-sm !py-2 !px-4">
          Get Yours
        </Link>
      </div>
    </header>
  );
}

function IceMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <g stroke="#6fd3e8" strokeWidth="2.2" strokeLinecap="round">
        <line x1="16" y1="5" x2="16" y2="27" />
        <line x1="6.8" y1="10.5" x2="25.2" y2="21.5" />
        <line x1="6.8" y1="21.5" x2="25.2" y2="10.5" />
      </g>
    </svg>
  );
}
