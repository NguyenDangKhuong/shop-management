---
description: Run tests, commit, and push changes to remote
---

// turbo-all

1. Check if there are any uncommitted changes and stage all:
```
cd /Users/khuongn/Downloads/Src/shop-management && git status --short && git add -A
```

2. If there are changes, ask the user for a commit message. If the user didn't provide one, generate a concise commit message based on the staged changes (use `git diff --cached --stat` to see what changed).

3. Commit and push (pull --rebase first to avoid non-fast-forward errors). Pre-push hook will run lint, tests, and build automatically:
```
cd /Users/khuongn/Downloads/Src/shop-management && git commit -m "<commit message>" && git pull --rebase && git push
```

4. Report the result to the user (pass/fail, commit hash, any errors).
