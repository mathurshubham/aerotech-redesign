-- Lead capture table. `where_` is quoted-safe naming to avoid the `WHERE`
-- keyword; `ip_hash` is a salted SHA-256 digest, never the raw IP.
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL,
  target_date TEXT,
  where_ TEXT,
  message TEXT,
  ip_hash TEXT,
  ua TEXT,
  source_path TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_topic ON leads (topic);
