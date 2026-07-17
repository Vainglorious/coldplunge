import type { Metadata } from "next";
import Image from "next/image";
import { SPEC_ROWS, CHILLER, PHOTOS, SITE } from "@/lib/site";
import { PageHeader, CtaBand, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Specifications",
  description:
    "Full specifications for our cedar cold plunge — power requirements, space requirements, dimensions, chiller and materials.",
};

const POWER = [
  { label: "Voltage", value: CHILLER.power },
  { label: "Amperage", value: CHILLER.amperage },
  { label: "Dedicated circuit", value: CHILLER.dedicatedCircuit },
  { label: "Plumbing", value: "None — self-contained, no hookup to house lines" },
];

const SPACE = [
  {
    label: "Footprint",
    value:
      'Roughly 85" × 36". Give the vented chiller cabinet a few inches of clearance for airflow.',
  },
  {
    label: "Floor / surface",
    value:
      "Level and load-bearing. Empty it's about 250 lbs; add water and a person and plan for well over half a tonne.",
  },
  {
    label: "Indoor or outdoor",
    value:
      "Both. Garage, basement, patio or yard — just keep it level and the chiller clear.",
  },
  {
    label: "Access to power",
    value: "A standard outlet within reach of the chiller (a dedicated circuit is best).",
  },
];

export default function SpecificationsPage() {
  return (
    <main className="pt-14 sm:pt-20">
      <Container>
        <PageHeader
          eyebrow="Specifications"
          title="Every number you need before it lands in your space."
          intro="Here's the full picture — power, space, dimensions and materials. A few figures are marked provisional while we finalize the exact spec sheet for our unit; we'll confirm anything you need before you buy."
        />
      </Container>

      {/* Main spec table + photo */}
      <Container className="mt-12">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {SPEC_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 ? "bg-bg-soft/40" : ""}
                  >
                    <th className="text-left font-heading font-medium text-slate px-5 py-3.5 align-top w-2/5">
                      {row.label}
                    </th>
                    <td className="text-frost px-5 py-3.5 align-top">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card frost-shadow overflow-hidden">
            <Image
              src={PHOTOS.gallery[3].src}
              alt={PHOTOS.gallery[3].alt}
              width={1600}
              height={1067}
              sizes="(max-width: 1024px) 100vw, 400px"
              className="w-full h-auto"
            />
          </div>
        </div>
      </Container>

      {/* Power requirements */}
      <Container className="mt-16">
        <h2 className="font-heading font-bold text-frost text-2xl sm:text-3xl">
          Power requirements
        </h2>
        <p className="text-slate mt-2 max-w-2xl">
          The chiller does all the work, so power is the only utility it needs —
          no plumbing.
        </p>
        <div className="card mt-6 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {POWER.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-bg-soft/40" : ""}>
                  <th className="text-left font-heading font-medium text-slate px-5 py-3.5 align-top w-2/5">
                    {row.label}
                  </th>
                  <td className="text-frost px-5 py-3.5 align-top">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      {/* Space requirements */}
      <Container className="mt-16">
        <h2 className="font-heading font-bold text-frost text-2xl sm:text-3xl">
          Space requirements
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 mt-6">
          {SPACE.map((item) => (
            <div key={item.label} className="card p-6">
              <h3 className="font-heading font-semibold text-frost">
                {item.label}
              </h3>
              <p className="text-slate text-sm mt-2 leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Gallery */}
      <Container className="mt-16">
        <h2 className="font-heading font-bold text-frost text-2xl sm:text-3xl">
          A closer look
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {PHOTOS.gallery.map((photo) => (
            <div key={photo.src} className="card overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, 380px"
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
        <p className="text-slate-dim text-xs mt-4">
          Photos are of the actual unit. More coming soon — including it set up in
          a {SITE.city} backyard.
        </p>
      </Container>

      <CtaBand
        heading="Not sure it fits your space?"
        sub="Send us your spot and we'll tell you exactly what it needs."
      />
    </main>
  );
}
