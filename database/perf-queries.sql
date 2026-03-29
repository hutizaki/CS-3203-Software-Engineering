-- Manual performance checks for 0.2.2 (run after seeding realistic row counts)
-- Goal: lookups by auth_uid / email should be fast (target < 10 ms server-side on modest data)
--
-- Replace :auth_uid and :email with literals when testing, e.g. 'abc123', 'user@school.edu'

EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT id, auth_uid, email, created_at
FROM users
WHERE auth_uid = 'sample-auth-uid';

EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT id, auth_uid, email, created_at
FROM users
WHERE email = 'sample@example.com';

-- Expect "Index Scan" using idx_users_auth_uid / idx_users_email and low execution time
-- in the EXPLAIN output (timing varies by host, dataset size, and cold cache).
