import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const year = 2026; // static: keeps the page a server component with no clock

  return (
    <footer className="border-t border-line-soft">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-10 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-heading font-semibold text-limestone text-lg uppercase tracking-[0.08em]">
            Calgary Cold Plunge<span className="text-champagne">.</span>
          </p>
          <p className="text-muted text-sm mt-4 max-w-xs leading-relaxed">
            {SITE.tagline}
          </p>
          <p className="text-faint text-sm mt-3">{SITE.address}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/why-cold-plunge" className="text-muted hover:text-limestone transition-colors">Why Cold Plunge</Link></li>
            <li><Link href="/specifications" className="text-muted hover:text-limestone transition-colors">Specifications</Link></li>
            <li><Link href="/pricing" className="text-muted hover:text-limestone transition-colors">Pricing</Link></li>
            <li><Link href="/faq" className="text-muted hover:text-limestone transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Get in touch</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/contact" className="text-muted hover:text-limestone transition-colors">Contact us</Link></li>
            <li><a href={`mailto:${SITE.email}`} className="text-muted hover:text-limestone transition-colors">{SITE.email}</a></li>
            <li><span className="text-muted">{SITE.phoneDisplay}</span></li>
          </ul>
        </div>
      </div>

      {/* Oversized ghost-outline brand line */}
      <div aria-hidden className="overflow-hidden select-none">
        <p className="ghost-text font-display uppercase text-[12.5vw] leading-[0.85] tracking-tight whitespace-nowrap text-center translate-y-[16%]">
          Cold, by design
        </p>
      </div>

      <div className="border-t border-line-soft">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
          <span>© {year} {SITE.brand}</span>
          <span>Proudly Canadian — {SITE.city}, {SITE.region}</span>
        </div>
      </div>
    </footer>
  );
}
