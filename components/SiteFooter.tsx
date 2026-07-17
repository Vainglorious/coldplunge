import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const year = 2026; // static: keeps the page a server component with no clock

  return (
    <footer className="border-t border-line-soft mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-heading font-bold text-frost text-lg">{SITE.brand}</p>
          <p className="text-slate text-sm mt-2">{SITE.tagline}</p>
          <p className="text-slate-dim text-sm mt-1">{SITE.address}</p>
        </div>

        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/why-cold-plunge" className="text-slate hover:text-frost transition-colors">Why Cold Plunge</Link></li>
            <li><Link href="/specifications" className="text-slate hover:text-frost transition-colors">Specifications</Link></li>
            <li><Link href="/pricing" className="text-slate hover:text-frost transition-colors">Pricing</Link></li>
            <li><Link href="/faq" className="text-slate hover:text-frost transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Get in touch</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="text-slate hover:text-frost transition-colors">Contact us</Link></li>
            <li><a href={`mailto:${SITE.email}`} className="text-slate hover:text-frost transition-colors">{SITE.email}</a></li>
            <li><span className="text-slate">{SITE.phoneDisplay}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 text-xs text-slate-dim">
          © {year} {SITE.brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
