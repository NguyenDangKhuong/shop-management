---
description: Add new content to the frontend interview roadmap blog post (both VI and EN versions)
---

# /roadmap — Add Content to Frontend Interview Roadmap

// turbo-all

## Files

- **VI**: `src/app/blogs/posts/roadmap-sections/Phase2JavaScript.tsx` (or Phase3ReactFrontend.tsx, etc.)
- **EN**: `src/app/blogs/posts/roadmap-sections/en/Phase2JavaScript.tsx` (mirror of VI)

## Steps

1. **Understand the topic** — Ask user what they want explained if unclear
2. **Find the right section** — Search for related `TopicModal` in the Phase file to determine where the new content should go
3. **Add content to VI version** using a `<TopicModal>` with:
   - `title` — topic name
   - `emoji` — relevant emoji
   - `color` — hex color (avoid duplicating nearby colors)
   - `summary` — one-line summary with analogy if possible
   - Content structure:
     - `<Paragraph>` — intro with `<Highlight>` for key terms
     - Info card (`div` with rounded-lg, colored bg/border) — key concepts overview
     - `<CodeBlock title="filename.js">` — practical code examples with comments
     - `<Callout type="tip">` — interview tip at the end
4. **Add content to EN version** — translate the same content to English, keep code in English
5. **Verify both files** — ensure JSX is valid (closing tags, escaped quotes in template literals)

## Content Guidelines

- Use **Vietnamese analogies** in VI, **English analogies** in EN
- Use **real names** (Khuong, Lan, Binh) instead of generic (user, obj, foo)
- Code examples should be **practical** with clear comments explaining each step
- Always include an **Interview tip** callout at the end
- Use `{'\`'}` to escape backticks inside JSX template literals
- Use `\` to escape template literal `${}` inside CodeBlock: `\\$\\{name\\}` → displays `${name}`

## Available Components

```tsx
<TopicModal title="..." emoji="..." color="#hex" summary="...">
<Paragraph>...</Paragraph>
<Heading3>...</Heading3>
<Highlight>keyword</Highlight>
<InlineCode>code</InlineCode>
<CodeBlock title="filename.js">{`...`}</CodeBlock>
<Callout type="tip|warning|info">...</Callout>
```
