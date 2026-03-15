---
description: Run tests, commit, and push changes to remote
---

// turbo-all

1. Check if there are any uncommitted changes:
```
cd /Users/khuongn/Downloads/Src/shop-management && git status --short
```

2. If there are changes, stage all files:
```
cd /Users/khuongn/Downloads/Src/shop-management && git add -A
```

3. Run tests to make sure nothing is broken:
```
cd /Users/khuongn/Downloads/Src/shop-management && npx jest --no-coverage
```

4. If tests pass, ask the user for a commit message. If the user didn't provide one, generate a concise commit message based on the staged changes (use `git diff --cached --stat` to see what changed).

5. Commit with the message:
```
cd /Users/khuongn/Downloads/Src/shop-management && git commit -m "<commit message>"
```

6. Push to remote:
```
cd /Users/khuongn/Downloads/Src/shop-management && git push
```

7. Report the result to the user (pass/fail, commit hash, any errors).
