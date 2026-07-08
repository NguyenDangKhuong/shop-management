---
name: Documentation Writer
description: Skill for creating and maintaining project documentation in /docs. Always checks existing docs first to avoid duplication.
---

# Documentation Writer Skill

## When to Use
Use this skill whenever:
- The user asks to create, add, or update documentation
- The user says "viết doc", "thêm doc", "tạo doc", "document this", etc.
- After implementing a significant feature that should be documented

## Process

### Step 1: Read ALL existing docs
Before writing anything, ALWAYS read all files in the `/docs` directory:
```
find /Users/khuongn/Downloads/Src/shop-management/docs -type f -name "*.md" | head -50
```
Then read each file's content to understand what documentation already exists.

### Step 2: Decide — Update or Create New
- **If related doc exists**: Update/append to the existing file. Add new sections, update outdated info.
- **If no related doc exists**: Create a new `.md` file in `/docs` with a descriptive filename.

### Step 3: Writing Guidelines
- **Format**: Markdown (`.md`)
- **Language**: Match the language of existing docs. If mixed, default to Vietnamese.
- **Structure**:
  ```markdown
  # Title
  
  ## Overview
  Brief description of what this doc covers.
  
  ## Content
  Main content with examples, code blocks, etc.
  
  ## Related
  Links to related docs or resources.
  ```
- **Be concise**: Don't over-explain. Use bullet points, tables, and code blocks.
- **Include examples**: Always include practical examples when documenting code/features.
- **Date**: Add `Last updated: YYYY-MM-DD` at the top or bottom.

### Step 4: Verify
- Check the doc renders properly (valid markdown)
- Ensure no duplicate content across docs
- Commit with message: `docs: <description>`

## File Naming Convention
- Use lowercase with hyphens: `feature-name.md`
- Be descriptive: `camera-rtsp-setup.md` not `setup.md`
- Group related docs with prefixes: `api-auth.md`, `api-endpoints.md`

## Examples
- `deployment.md` — How to deploy the app
- `camera-nas-setup.md` — Camera + NAS configuration
- `interview-roadmap.md` — Frontend interview preparation notes
