# Git Hooks

This folder contains Git hooks that are automatically installed for all developers.

## Hooks

### pre-push

Runs before every `git push` to ensure code quality:

1. **Linting** - Checks code style with ESLint
2. **Testing** - Runs all Jest tests
3. **Build** - Verifies production build works

## Installation

Hooks are **automatically installed** when you run:

```bash
npm install
```

The `postinstall` script in `package.json` runs `scripts/setup-hooks.sh` which copies hooks from this folder to `.git/hooks/`.

## Manual Installation

If needed, you can manually install hooks:

```bash
npm run postinstall
# or
bash scripts/setup-hooks.sh
```

## Bypassing Hooks

In rare cases, you can skip pre-push checks with:

```bash
git push --no-verify
```

⚠️ **Warning:** Only bypass checks if absolutely necessary. Failed checks usually indicate real issues.

## Troubleshooting

### "npm: command not found" error

The pre-push hook includes common Node.js paths. If you still get this error:

1. Check your Node.js installation: `which node`
2. Update the PATH in `.githooks/pre-push`
3. Re-run: `npm run postinstall`

### Hooks not running

1. Verify hooks are executable: `ls -la .git/hooks/pre-push`
2. Re-install: `npm run postinstall`
3. Check Git version: `git --version` (should be 2.x+)

## Adding New Hooks

To add a new hook:

1. Create hook file in `.githooks/`
2. Make it executable: `chmod +x .githooks/your-hook`
3. Update `scripts/setup-hooks.sh` to copy it
4. Commit both files
5. Run `npm install` to test

## For Contributors

When you clone this repo and run `npm install`, Git hooks are automatically set up. You don't need to do anything else!
