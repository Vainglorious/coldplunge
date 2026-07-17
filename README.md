# Cold Plunge Website

Marketing site for a Calgary cold plunge business, built to sell one product: a
cedar-and-steel cold plunge with a built-in chiller.

Stack: **Next.js (App Router) · TypeScript · Tailwind v4 · Neon Postgres ·
Twilio · Vercel** — the same setup as the `odysseymovie` project, with the SMS
pattern ported over.

## Pages
- `/` — home / hero
- `/why-cold-plunge` — benefits
- `/specifications` — power + space requirements, dimensions, chiller
- `/pricing` — price, what's included, shipping & installation
- `/faq` — common questions
- `/contact` — contact form → saves a lead + texts the owner
- `/thanks` — post-submit confirmation

## How the contact form works
1. Visitor submits name / email / (optional) phone / message + an optional
   "I want to receive a text" consent box.
2. The lead is saved to Postgres (`leads` table, auto-created on first request).
3. The owner (`ADMIN_PHONE`) gets a text with the enquiry.
4. If the visitor gave a phone number **and** ticked the consent box, they get a
   confirmation text back. (CASL: consent-gated, includes a STOP notice.)

SMS is best-effort — if Twilio isn't configured or fails, the lead is still
saved and the form still succeeds.

## Local setup
```bash
npm install
cp .env.example .env.local   # fill in the values you have
npm run dev
```
The site runs without a database or Twilio — the contact form just returns a
"not wired up yet" message until `DATABASE_URL` is set.

## Environment variables
See `.env.example`. `DATABASE_URL` (or Vercel's `POSTGRES_URL`) is required for
the contact form to save leads. Twilio vars + `ADMIN_PHONE` enable texts.

## Editing content
Almost all copy, specs, pricing and FAQ live in **`lib/site.ts`** — one file.
Search it for `PLACEHOLDER` and `TBD` to find everything still needing a real
value (business name, contact details, exact chiller specs, final price).

## Photos
Product photos live in `public/images/`. Swap in better/more shots there and
update the `PHOTOS` entries in `lib/site.ts`.

## Deploy (Vercel)
1. Push to GitHub, import into Vercel.
2. Attach a Neon/Vercel Postgres database (sets `DATABASE_URL`/`POSTGRES_URL`).
3. Add the Twilio env vars + `ADMIN_PHONE` + `NEXT_PUBLIC_SITE_URL`.
4. Deploy, then submit the contact form once to confirm the text arrives.
