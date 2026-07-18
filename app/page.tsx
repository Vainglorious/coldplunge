import type { Metadata } from "next";
import Experience from "@/components/experience/Experience";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.brand} — Own the Cold`,
  },
  description: `A cinematic walk through an Alberta winter — and the cedar-and-stainless cold plunge built for it. ${SITE.price} ${SITE.priceNote}, from ${SITE.city}.`,
};

export default function Home() {
  return (
    <main className="flex-1">
      <Experience />
    </main>
  );
}
