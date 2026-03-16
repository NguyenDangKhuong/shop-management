---
description: Run tests, commit, and push changes to remote
---

// turbo-all

1. Ask the user for a commit message. If the user didn't provide one, generate a concise commit message based on the changes (run `cd /Users/khuongn/Downloads/Src/shop-management && git diff --stat` to see what changed).

2. Stage all, commit, and push in one go. Pre-push hook will run lint, tests, and build automatically:
```
cd /Users/khuongn/Downloads/Src/shop-management && git add -A && git status --short && git commit -m "<commit message>" && git pull --rebase && git push
```

3. Report the result to the user (pass/fail, commit hash, any errors).
