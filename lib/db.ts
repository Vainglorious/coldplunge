import { Pool } from "pg";

/**
 * Neon (or Vercel Postgres). Vercel Postgres exposes POSTGRES_URL; a standalone
 * Neon/Supabase/local database exposes DATABASE_URL. Accept either so the same
 * code runs against whichever is wired up.
 */
function connectionString(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function isDbConfigured(): boolean {
  return Boolean(connectionString());
}

// Cached on the module so warm serverless invocations reuse the pool instead of
// opening a new connection per request. Kept small — hosted Postgres caps
// connections and this site gets a trickle of traffic.
let pool: Pool | null = null;

function getPool(): Pool {
  const url = connectionString();
  if (!url) {
    throw new Error(
      "No database configured. Set DATABASE_URL (or POSTGRES_URL) — see README."
    );
  }
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });
    // Without a listener, a pool-level error (e.g. the host dropping an idle
    // connection) would crash the process rather than just failing a request.
    pool.on("error", (e) => console.error("pg pool error", e));
  }
  return pool;
}

let ensured = false;

/** Idempotent: creates the table on first use so there's no migration step. */
async function ensureTable() {
  if (ensured) return;
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS leads (
      id           TEXT PRIMARY KEY,
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      phone        TEXT,
      message      TEXT,
      sms_consent  BOOLEAN NOT NULL DEFAULT false,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  ensured = true;
}

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  sms_consent: boolean;
};

/**
 * Every enquiry is its own row — unlike the odyssey RSVP form, there's no
 * upsert-on-phone here. We want the full history of who reached out.
 */
export async function saveLead(input: Lead): Promise<void> {
  await ensureTable();
  await getPool().query(
    `INSERT INTO leads (id, name, email, phone, message, sms_consent)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      input.id,
      input.name,
      input.email,
      input.phone,
      input.message,
      input.sms_consent,
    ]
  );
}
