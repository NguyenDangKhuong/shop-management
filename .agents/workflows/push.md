---
description: Run tests, commit, and push changes to remote
---

// turbo-all

1. **Verify build** before anything else. If the build fails, STOP and fix the errors first:
```
cd /Users/khuongn/Downloads/Src/shop-management && npx next build 2>&1 | tail -10
```

2. Ask the user for a commit message. If the user didn't provide one, generate a concise commit message based on the changes (run `cd /Users/khuongn/Downloads/Src/shop-management && git diff --stat` to see what changed).

3. Stage all, commit, and push in one go. Pre-push hook will run lint, tests, and build automatically:
```
cd /Users/khuongn/Downloads/Src/shop-management && git add -A && git status --short && git commit -m "<commit message>" && git pull --rebase && git push
```

4. Report the result to the user (pass/fail, commit hash, any errors).
