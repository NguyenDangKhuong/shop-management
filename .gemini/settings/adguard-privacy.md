

# 🔒 AdGuard Home Credentials Rule

> **NEVER expose AdGuard Home login credentials in public-facing content.**

## Forbidden (in commit messages, docs, or any public file)

- AdGuard username/password values
- API authentication tokens
- Any `curl` commands with `-u user:pass`

## Allowed

- Generic references like `(see .env.local → ADGUARD_USER)`
- Architecture descriptions without credentials
- Docker commands without auth details

