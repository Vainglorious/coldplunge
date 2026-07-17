/**
 * Single source of truth for the whole site — brand, product, specs, pricing,
 * FAQ, contact details. Edit values here and every page updates.
 *
 * Anything a real business detail is still needed for is marked PLACEHOLDER.
 * Search this file for "PLACEHOLDER" to find everything Adil needs to confirm.
 */

export const SITE = {
  // PLACEHOLDER — real business name / tagline / domain to come.
  brand: "Northwind Cold Plunge",
  brandShort: "Northwind",
  tagline: "Cold therapy, built for Calgary.",
  city: "Calgary",
  region: "Alberta",
  country: "Canada",

  // Contact details shown on the site. The cell that RECEIVES lead texts lives
  // in env as ADMIN_PHONE (set separately). `email` is still a PLACEHOLDER.
  email: "hello@example.com",
  phoneDisplay: "(587) 436-4125",
  address: "23, 2015 32 Ave NE, Calgary, AB T2E 6Z3",

  // Rounded headline price used across the site.
  price: "$4,000",
  priceNote: "+ shipping",
};

/**
 * The product. Numbers marked `verify` are placeholders taken from the
 * comparable competitor unit (the "Oslo" tub + a similar dual chiller) and
 * should be replaced with our unit's real figures.
 */
export const PRODUCT = {
  name: "The Cold Plunge",
  seats: "1–2 people",
  exterior: "Western red cedar",
  interior: "Seamless stainless-steel liner",
  // verify — from the comparable Oslo unit
  dimensions: '84.5" L × 35.8" W × 26" H',
  weightEmpty: "250 lbs (empty)",
  crate: '92" × 40" × 38"',
  assembly: "Ships fully assembled",
  warranty: "1-year limited warranty",
};

/**
 * Chiller specs — PLACEHOLDER values from a comparable dual chiller/heater.
 * `verify` = likely close, confirm; `need` = we don't have it yet.
 */
export const CHILLER = {
  power: "110V / 60Hz — standard Canadian household outlet", // verify
  amperage: "TBD", // need
  dedicatedCircuit: "Recommended (confirming)", // need
  coolsTo: "≈ 37°F (3°C)", // verify
  heatsTo: "≈ 104°F (40°C)", // verify — confirm ours is dual heat + cool
  coolingPower: "1 HP", // verify
  controls: "Digital touchscreen + Wi-Fi app", // verify
  filtration: "TBD", // need
  dualMode: true, // verify — does OUR unit heat as well as cool?
};

export type Spec = { label: string; value: string };

/** Rendered as the specifications table. */
export const SPEC_ROWS: Spec[] = [
  { label: "Capacity", value: PRODUCT.seats },
  { label: "Exterior", value: PRODUCT.exterior },
  { label: "Interior", value: PRODUCT.interior },
  { label: "Dimensions", value: PRODUCT.dimensions },
  { label: "Weight", value: PRODUCT.weightEmpty },
  { label: "Chiller power", value: CHILLER.power },
  { label: "Temperature range", value: `${CHILLER.coolsTo} to ${CHILLER.heatsTo}` },
  { label: "Cooling power", value: CHILLER.coolingPower },
  { label: "Controls", value: CHILLER.controls },
  { label: "Assembly", value: PRODUCT.assembly },
  { label: "Shipping crate", value: PRODUCT.crate },
  { label: "Warranty", value: PRODUCT.warranty },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Who installs it?",
    a: "You can — the tub ships fully assembled, so for most people it's a matter of positioning it, filling it, and plugging in the chiller. If you'd rather not deal with it, we offer installation in the Calgary area for an extra charge. Just ask on the contact form.",
  },
  {
    q: "Do I need special power or plumbing?",
    a: `No plumbing — it's a self-contained tub with an integrated chiller and pump, so it doesn't hook into your home's water lines. For power it runs on a standard ${CHILLER.power} outlet. We recommend a dedicated circuit for the compressor; we'll confirm the exact amperage for your unit.`,
  },
  {
    q: "How cold does it get, and how do I keep it there?",
    a: `The built-in chiller holds your set temperature automatically — as low as ${CHILLER.coolsTo} — so there's no hauling ice. You set it on the digital display (or the app) and it maintains it year-round.`,
  },
  {
    q: "Can I use it indoors and outdoors?",
    a: "Both. The cedar exterior and stainless liner are built for outdoor use, and plenty of people keep theirs in a garage, basement, or on a patio. Outdoors you just want it on a level, load-bearing surface and the chiller cabinet clear for airflow.",
  },
  {
    q: "Does it work through a Calgary winter?",
    a: "Yes. The insulated lid and the chiller do the work — cold weather actually makes it easier to hold temperature. Follow the unit's cold-weather guidance for anything below freezing when it comes to the chiller and plumbing lines.",
  },
  {
    q: "What maintenance does it need?",
    a: "Keep the water clean with the recommended treatment, change it periodically, and wipe down the cedar now and then. It's low-effort — closer to a filtered tub than a pool.",
  },
  {
    q: "How much is shipping and how long does it take?",
    a: "Shipping is quoted based on your location — reach out through the contact form and we'll get you an exact number and timeline. We ship across Canada, and Calgary-area delivery is quick.",
  },
  {
    q: "What's the warranty?",
    a: `It comes with a ${PRODUCT.warranty}. If anything's off, get in touch and we'll make it right.`,
  },
];

/** Product photos in public/images — captions used for alt text + galleries. */
export const PHOTOS = {
  hero: {
    src: "/images/01-hero-full-unit.jpg",
    alt: "Cedar cold plunge tub with stainless-steel liner and insulated slatted lid",
  },
  gallery: [
    {
      src: "/images/02-interior-steel-liner.jpg",
      alt: "Top-down view of the seamless stainless-steel interior liner",
    },
    {
      src: "/images/03-interior-liner-angle.jpg",
      alt: "Angled view of the plunge interior and cedar rim",
    },
    {
      src: "/images/04-detail-slatted-lid.jpg",
      alt: "Detail of the insulated slatted cedar lid",
    },
    {
      src: "/images/05-detail-cedar-vent-cabinet.jpg",
      alt: "Cedar exterior and the vented cabinet that houses the chiller",
    },
  ],
};
