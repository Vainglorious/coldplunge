import type { Metadata } from "next";
import { PageHeader, CtaBand, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Why Cold Plunge",
  description:
    "Why people cold plunge — recovery, circulation, energy, mood and resilience. The honest version, without the miracle-cure hype.",
};

const BENEFITS = [
  {
    title: "Recovery & sore muscles",
    body: "Cold immersion is a long-standing recovery tool for athletes. Many people find a plunge after training leaves them less sore and readier for the next day — the cold prompts blood vessels to constrict and then flush the muscles as you warm back up.",
  },
  {
    title: "Circulation",
    body: "That constrict-then-dilate cycle is a workout for your circulatory system. Regular plungers often describe warm, tingling limbs and a pleasant flush in the twenty minutes afterward.",
  },
  {
    title: "Energy & alertness",
    body: "The first cold seconds trigger a sharp jump in alertness and a rush of feel-good neurochemistry. A morning plunge is a genuine alternative to a second coffee — you step out wide awake.",
  },
  {
    title: "Mood & stress",
    body: "People consistently report a lift in mood and a calmer baseline with a regular cold routine. Part of it is chemical; part of it is that voluntarily doing a hard thing every day builds a quiet confidence that carries into the rest of your day.",
  },
  {
    title: "Sleep",
    body: "Plenty of plungers say their sleep improves. The reset to your nervous system — and the simple ritual of it — seems to help people wind down at night.",
  },
  {
    title: "Discipline",
    body: "This is the one nobody puts on a spec sheet. Getting into cold water when everything says don't is a rep for your willpower. Do it daily and the rest of your hard choices get a little easier.",
  },
];

export default function WhyPage() {
  return (
    <main className="pt-16 sm:pt-24">
      <Container>
        <PageHeader
          eyebrow="Why cold plunge"
          title="Cold water does something. Here's the honest version."
          intro="Cold plunging has gone from fringe to everywhere — and yes, some of the claims online are overcooked. Below is what people actually get out of it, said plainly. None of this is medical advice; it's why so many of us keep getting in."
        />
      </Container>

      {/* Benefits — editorial index, not cards */}
      <Container className="mt-16 sm:mt-20">
        <div className="border-t border-line">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="grid sm:grid-cols-[64px_1fr] lg:grid-cols-[80px_1fr_1.5fr] gap-3 sm:gap-10 py-10 border-b border-line items-start"
            >
              <span className="font-heading italic text-champagne text-lg tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-limestone text-2xl tracking-tight">
                {b.title}
              </h3>
              <p className="text-body leading-relaxed sm:col-start-2 lg:col-start-3">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Honesty box — deep forest, quiet and serious */}
      <Container className="mt-20">
        <div className="bg-forest rounded-3xl px-8 py-12 sm:px-14 sm:py-16">
          <p className="eyebrow">Straight talk</p>
          <h2 className="font-heading text-limestone text-3xl sm:text-4xl mt-4 max-w-xl">
            The bit we won&apos;t oversell
          </h2>
          <p className="text-limestone/70 mt-5 max-w-2xl leading-relaxed">
            A cold plunge is not a cure for anything, and we&apos;re not going
            to pretend otherwise. The research is genuinely promising on
            recovery, mood and circulation, and thinner on the bigger claims.
            What we can say honestly: it feels incredible, people build a real
            habit around it, and almost nobody who commits to it regrets buying
            one. If you have a heart condition or another medical concern, talk
            to your doctor before starting cold immersion.
          </p>
        </div>
      </Container>

      <CtaBand
        heading="Best way to understand it is to feel it."
        sub="Get a plunge in your own space and make the cold part of the routine."
      />
    </main>
  );
}
