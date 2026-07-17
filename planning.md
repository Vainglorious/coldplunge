# Cold Plunge Website — Planning Doc

Calgary-based cold plunge business. We source the unit from China (same tub as the
"Oslo Cold Plunge" a competitor sells) and sell it for less. This doc captures the
plan before we build. **Review it, mark it up, then we build.**

---

## 1. The Product

A cedar-clad, stainless-steel-lined cold plunge tub. Our photos are of the exact
unit (shown in a "Sauna Gang" showroom) — red cedar exterior, seamless steel
inner liner, insulated slatted lid, and a vented lower cabinet.

### Our offer
| | |
|---|---|
| **Price** | **$4,000 + shipping** |
| **Competitor price (Oslo)** | $3,499 CAD **⚠️ see note below** |
| **Market** | Calgary + Canada-wide shipping |
| **Installation** | Optional, for an extra charge (we do it) |

> 💡 **Pricing note — the chiller is our edge.** The competitor's Oslo lists at
> **$3,499 CAD but is manual (ice + water, no power).** Our unit has a **chiller**
> (see below), so we are **not** the cheap option — we're the *better* unit at a
> comparable price. Reframe the pitch from "cheaper" to **"a chillered plunge for
> about the price of their ice tub."** Still confirm: is $4,000 our final number,
> what's bundled, and is shipping on top? `[CONFIRM]`

### ✅ CONFIRMED — our unit has a chiller/pump
Decided with Adil: our unit ships with an **electric chiller + circulation pump**
(the vented lower cabinet in photo 05 is the chiller bay). This means:
- It holds a **set temperature year-round** (no hauling ice) + circulation.
- This is a materially stronger product than the manual Oslo — lean on it in the
  copy and it justifies the price.

#### Chiller specs — PLACEHOLDER (Adil to replace with our real unit's numbers)
Adil's note: our chiller is *similar to* the competitor's "Deluxe Cold Plunge
Dual Chiller/Heater." Using its published specs as a stand-in for now.

| Spec | Placeholder value | Status |
|---|---|---|
| Power | **110V / 60Hz**, standard Canadian household outlet | `[verify]` |
| Amperage / watts | Not published | `[NEED]` |
| Dedicated circuit? | Not published — likely recommended for a compressor | `[NEED]` |
| Cools to | **~37°F (≈3°C)** | `[verify]` |
| Heats to | **~104°F (≈40°C)** — it's a dual chiller *and* heater | `[verify]` |
| Cooling power | **1 HP** | `[verify]` |
| Controls | Digital touchscreen + **Wi-Fi app** | `[verify]` |
| Filtration | Not published | `[NEED]` |
| Warranty | 1-year limited | `[verify]` |

> ⚠️ Two things to note: (1) that competitor chiller sells **alone for $4,499
> CAD** — *more than our entire $4,000 tub+chiller unit*. Great for the value
> pitch, but double-check our price is sustainable. (2) If our unit is a **dual
> chiller/heater**, that's a big selling point (cold plunge *and* hot soak) —
> confirm ours heats too, or if it's cool-only.

---

## 2. Competitor Spec Data (scraped from the Oslo listing)

Source: backcountryrecreation.com/…/oslo-cold-plunge. Use as a baseline; replace
with our real numbers where they differ.

| Spec | Oslo value |
|---|---|
| Seating capacity | 1–2 person |
| Wood type | Red cedar |
| Interior | Seamless metal (steel) liner |
| Dimensions | 84.5" L × 35.8" W × 26" H |
| Weight | 250 lbs |
| Water/temp control | Manual — add ice & water |
| Electrical requirements | N/A (none) |
| Shipping crate | 92 × 40 × 38 in |
| Assembly | Ships fully assembled |
| Warranty | 1-year limited |
| Price | $3,499 CAD |

**Claimed benefits (their marketing):** faster recovery / less inflammation,
immune boost (T-cells), better sleep & mental health, stress relief (lower
cortisol, more dopamine). We'll rewrite these in our own words on "Why Cold
Plunge" and keep the health claims soft/non-medical (see §4).

---

## 3. Photos (organized)

Stored in `assets/product-photos/`. Renamed for clarity; these move into
`public/images/` when we build. **Adil will add more later.**

| File | What it shows | Suggested use |
|---|---|---|
| `01-hero-full-unit.jpg` | Full tub, lid half-on, cedar + cabinet | **Home hero** |
| `02-interior-steel-liner.jpg` | Top-down of steel inner liner | Specs / gallery |
| `03-interior-liner-angle.jpg` | Angled interior + rim detail | Specs / gallery |
| `04-detail-slatted-lid.jpg` | Insulated slatted lid detail | Specs (insulation) |
| `05-detail-cedar-vent-cabinet.jpg` | Cedar top + vented cabinet door | Specs (chiller bay?) |

**Photo gaps to fill later:** a clean studio/outdoor hero (current shots are
showroom-floor with clutter + another brand visible), someone *in* the plunge
(lifestyle), a shot of the chiller unit itself if we have one, and the tub
installed in a real Calgary backyard/garage.

---

## 4. Site Map & Page Content

Small marketing site. Pages from the dev notes:

### Home
- Hero photo (`01-hero-full-unit.jpg`), one-line value prop, price, primary CTA
  → Contact form.
- Quick highlights: cedar + steel, made-for-Calgary, cheaper than competitors,
  we install.
- Short teasers linking to Why Cold Plunge, Specs, Pricing, FAQ.

### Specifications
- **Power requirements** — 110V / standard Canadian outlet (placeholder; amperage
  + dedicated-circuit TBD). See chiller table in §1.
- **Chiller** — holds ~37°F (≈3°C), 1 HP, digital/Wi-Fi control; dual heat-to-104°F
  `[verify]`. Filtration/cooldown-time TBD.
- Space requirements (footprint, clearance, indoor/outdoor, floor load — 250 lbs
  empty + water) + clearance around the vented chiller cabinet for airflow.
- Dimensions, weight, capacity, materials, insulation, warranty.
- Render from the §2 table once we swap in our real numbers.

### Why Cold Plunge
- The benefits story (recovery, circulation, energy, mood, discipline).
- Keep health claims general and non-medical — "many people find…", link out to
  studies rather than promising outcomes. Avoid anything that reads as medical
  advice.

### Pricing
- $4,000 + shipping `[CONFIRM vs competitor $3,499]`.
- What's included vs. add-ons (installation extra).
- Shipping: flat rate? by region? quote on contact? `[CONFIRM]`

### FAQ
- Who installs it? → We do, for an extra charge.
- Do I need special power/plumbing? `[CONFIRM]`
- How cold does it get / how do I keep it cold?
- Maintenance, water changes, filtration?
- Delivery timeline & shipping cost?
- Warranty & returns?
- Indoor or outdoor? Winter use in Calgary?

### Contact Form  ← core interactive feature
- Fields: name, email, phone (optional), message.
- **On submit:** email the enquiry to Adil.
- **If a phone number is given AND the "I want to receive SMS" box is checked:**
  auto-send the lead a confirmation SMS via Twilio.
- Consent checkbox: "I want to receive SMS" (unchecked by default — required for
  compliance before texting anyone).

---

## 5. Technical Plan

Mirrors the `odysseymovie` project (same stack, same SMS pattern) so we reuse
proven code.

### Stack
- **Next.js** (App Router, TypeScript) — same as odysseymovie (Next 16, React 19).
- **Tailwind CSS v4.**
- **Vercel** for hosting/deploy.
- **Neon Postgres** (via `DATABASE_URL` / `POSTGRES_URL`) — store leads.
- **Twilio** for SMS.
- **Lead notification: text Adil only** (decided). Reuses odysseymovie's admin-SMS
  pattern exactly — each lead fires an SMS to `ADMIN_PHONE`. No email service, no
  Resend, nothing new to add. (Every lead is also saved in Neon as the record.)

### Reuse directly from odysseymovie
These files port over with light edits:
- `lib/twilio.ts` — client setup, `isSmsConfigured()`, `sendSMS()`, message
  formatters. Rewrite the message copy for cold-plunge leads.
- `lib/db.ts` — Neon pool, idempotent `CREATE TABLE`, upsert pattern. Swap the
  `availability` schema for a `leads` table.
- `lib/validate.ts` — phone normalization (`+1…`), name/phone validation. Reuse
  almost as-is; add email validation.
- `app/api/rsvp/route.ts` → becomes `app/api/contact/route.ts`. Same shape:
  validate → save to DB → best-effort SMS (never fail the request on a Twilio
  error) → return ok.
- `components/AvailabilityForm.tsx` → `ContactForm.tsx`. Same client-side
  validation + submit pattern; swap fields (name/email/phone/message + SMS
  consent checkbox).
- `.env.example` — same vars: `DATABASE_URL`, `TWILIO_ACCOUNT_SID`,
  `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `ADMIN_PHONE`, `NEXT_PUBLIC_SITE_URL`
  (+ `RESEND_API_KEY` if we do email).

### Proposed `leads` table
```sql
CREATE TABLE IF NOT EXISTS leads (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  message      TEXT,
  sms_consent  BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```
(No upsert-on-phone here — unlike RSVPs, every enquiry is its own row.)

### Contact flow (server)
1. Validate name + email (+ phone if provided).
2. Insert into `leads`.
3. Notify Adil: SMS to `ADMIN_PHONE`.
4. If `phone` present **and** `sms_consent` true → send the lead a confirmation
   SMS. Best-effort: the lead is already saved, so a Twilio failure just logs.
5. Return ok → redirect to a simple "thanks, we'll be in touch" page.

### SMS compliance note
Only text people who ticked the consent box. Include who we are and a way to stop
("Reply STOP to opt out") in the confirmation message — Twilio + Canadian
anti-spam (CASL) basics.

---

## 6. Open Questions (Adil to answer before build)

1. ~~Chiller or manual?~~ ✅ **Chiller** — confirmed.
2. ~~Lead notification?~~ ✅ **Text Adil only** — confirmed.
3. **Chiller specs** — placeholder in place (110V, ~3–40°C, 1 HP, Wi-Fi). Still
   need our real: **amperage/watts, dedicated-circuit requirement, filtration
   type, and whether ours heats too** (dual) or cools only.
4. **Final price & what's bundled** — is $4,000 firm, is shipping on top? — §1.
5. **Shipping** — flat rate, by-region, or quote-on-request? — §4 Pricing.
6. **Business details** — business name, logo, brand colors, domain, the phone
   number + `ADMIN_PHONE` that leads text to.
7. **Our real specs** — confirm dimensions/weight/warranty match the Oslo or give
   me our numbers.
8. **Installation pricing** — a number, or "contact for quote"?

---

## 7. Suggested Build Order
1. Scaffold Next.js + Tailwind + Vercel (clone odysseymovie's config).
2. Port `lib/` (db, twilio, validate) and the contact API route.
3. Build `ContactForm` + thanks page; wire Neon + Twilio; test end-to-end.
4. Build static pages: Home, Specs, Why, Pricing, FAQ with real content.
5. Style pass + real photos.
6. Deploy to Vercel, connect domain, add env vars, live SMS test.
