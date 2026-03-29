-- 0.2.2 Users table — indexes for auth_uid and email (PostgreSQL)
-- Apply with: psql "$DATABASE_URL" -f database/migrations/001_users_table_and_indexes.sql

BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  auth_uid TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Session lookups by provider user id (e.g. Firebase/Auth0 subject)
CREATE INDEX IF NOT EXISTS idx_users_auth_uid ON users (auth_uid);

-- Login and duplicate-email checks by email
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

COMMIT;
