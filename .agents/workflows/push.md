---
description: Run tests, commit, and push changes to remote
---

// turbo-all

1. Check if there are any uncommitted changes, stage all, and run tests in one go:
```
cd /Users/khuongn/Downloads/Src/shop-management && git status --short && git add -A && npx jest --no-coverage
```

2. If tests pass, ask the user for a commit message. If the user didn't provide one, generate a concise commit message based on the staged changes (use `git diff --cached --stat` to see what changed).

3. Commit and push in one go (pull --rebase first to avoid non-fast-forward errors):
```
cd /Users/khuongn/Downloads/Src/shop-management && git commit -m "<commit message>" && git pull --rebase && git push
```

4. Report the result to the user (pass/fail, commit hash, any errors).
