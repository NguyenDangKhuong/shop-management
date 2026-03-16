---
trigger: always_on
---

# 🔒 Tweets Page Privacy Rule

> **NEVER expose any sensitive information related to `/tweets` page in public-facing content.**

## Forbidden (in commit messages, docs, blog posts, or any public file)

- Twitter/X usernames (pinned, saved, or referenced)
- Cookie values, bearer tokens, auth credentials
- API endpoint details (`/api/tweets/*` internals)
- Environment variable **VALUES** (names are OK, values are NOT)
- Any personal data from the tweets feature

## Allowed

- Generic references like `@pinned (from env)` or `NEXT_PUBLIC_PINNED_USERNAME`
- Technical architecture descriptions without revealing actual usernames/values
- Code changes that reference env vars by name only
