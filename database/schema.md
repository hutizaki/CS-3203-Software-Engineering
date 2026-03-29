# Database schema — users

This folder holds SQL for the server-side **users** store used by the advising app API (distinct from client-side `AsyncStorage` in the mobile app).

## Table: `users`

| Column      | Type         | Notes                          |
|------------|--------------|--------------------------------|
| `id`       | `bigserial`  | Primary key                    |
| `auth_uid` | `text`       | External auth user id (session)|
| `email`    | `text`       | Login and uniqueness checks    |
| `created_at` | `timestamptz` | Row creation time          |

## Indexes (0.2.2)

| Index                 | Column(s)  | Purpose                                      |
|----------------------|------------|----------------------------------------------|
| `idx_users_auth_uid` | `auth_uid` | Fast session / user resolution by auth id   |
| `idx_users_email`    | `email`    | Fast login and duplicate-email checks       |

Both are B-tree indexes created in `migrations/001_users_table_and_indexes.sql`.

## Applying migrations

Use your project’s migration runner, or apply manually:

```bash
psql "$DATABASE_URL" -f database/migrations/001_users_table_and_indexes.sql
```

## Performance verification

Use `database/perf-queries.sql` with `EXPLAIN (ANALYZE, BUFFERS)` on `WHERE auth_uid = …` and `WHERE email = …`. Confirm plans use **Index Scan** on `idx_users_auth_uid` / `idx_users_email`. Execution time under ~10 ms is expected on small-to-medium datasets on a typical dev database; always validate on your own environment and data volume.
