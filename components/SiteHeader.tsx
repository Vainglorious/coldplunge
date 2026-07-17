import Link from "next/link";
import Image from "next/image";
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
          <span className="logo-chip w-10 h-10 p-1">
            <Image
              src="/logo-mark.png"
              alt=""
              width={481}
              height={512}
              priority
              className="w-full h-full object-contain"
            />
          </span>
          <span className="font-heading font-extrabold text-frost uppercase tracking-wide text-sm sm:text-base leading-none">
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
