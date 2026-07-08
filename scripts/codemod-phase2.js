#!/usr/bin/env node

/**
 * Phase 2 Codemod: Replace arbitrary Tailwind values with theme utility classes.
 * 
 * Replaces patterns like:
 *   bg-[var(--bg-tag)]     → bg-bg-tag
 *   text-[var(--text-secondary)] → text-text-secondary
 *   border-[var(--border-primary)] → border-border-primary
 *   bg-[var(--card-bg)]   → bg-card-bg
 *   border-[var(--card-border)] → border-card-border
 */

const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, '..', 'src')

// Mapping of var names to Tailwind utility prefixes
const REPLACEMENTS = [
  // Background colors
  { from: 'bg-[var(--bg-page)]', to: 'bg-bg-page' },
  { from: 'bg-[var(--bg-primary)]', to: 'bg-bg-primary' },
  { from: 'bg-[var(--bg-card)]', to: 'bg-bg-card' },
  { from: 'bg-[var(--bg-card-hover)]', to: 'bg-bg-card-hover' },
  { from: 'bg-[var(--bg-surface)]', to: 'bg-bg-surface' },
  { from: 'bg-[var(--bg-surface-dim)]', to: 'bg-bg-surface-dim' },
  { from: 'bg-[var(--bg-secondary)]', to: 'bg-bg-secondary' },
  { from: 'bg-[var(--bg-input)]', to: 'bg-bg-input' },
  { from: 'bg-[var(--bg-tag)]', to: 'bg-bg-tag' },
  { from: 'bg-[var(--bg-tag-active)]', to: 'bg-bg-tag-active' },
  { from: 'bg-[var(--bg-header)]', to: 'bg-bg-header' },
  { from: 'bg-[var(--bg-header-scrolled)]', to: 'bg-bg-header-scrolled' },
  { from: 'bg-[var(--bg-glow-blue)]', to: 'bg-bg-glow-blue' },
  { from: 'bg-[var(--bg-glow-purple)]', to: 'bg-bg-glow-purple' },
  { from: 'bg-[var(--card-bg)]', to: 'bg-card-bg' },

  // Text colors
  { from: 'text-[var(--text-primary)]', to: 'text-text-primary' },
  { from: 'text-[var(--text-secondary)]', to: 'text-text-secondary' },
  { from: 'text-[var(--text-muted)]', to: 'text-text-muted' },
  { from: 'text-[var(--text-dimmed)]', to: 'text-text-dimmed' },
  { from: 'text-[var(--text-link)]', to: 'text-text-link' },
  { from: 'text-[var(--text-link-hover)]', to: 'text-text-link-hover' },

  // Border colors
  { from: 'border-[var(--border-primary)]', to: 'border-border-primary' },
  { from: 'border-[var(--border-dim)]', to: 'border-border-dim' },
  { from: 'border-[var(--border-input)]', to: 'border-border-input' },
  { from: 'border-[var(--card-border)]', to: 'border-card-border' },

  // Accent
  { from: 'border-[var(--accent-primary)]', to: 'border-accent-primary' },
  { from: 'bg-[var(--accent-primary)]', to: 'bg-accent-primary' },
  { from: 'text-[var(--accent-primary)]', to: 'text-accent-primary' },

  // Hover variants
  { from: 'hover:text-[var(--text-primary)]', to: 'hover:text-text-primary' },
  { from: 'hover:text-[var(--text-secondary)]', to: 'hover:text-text-secondary' },
  { from: 'hover:text-[var(--text-muted)]', to: 'hover:text-text-muted' },
  { from: 'hover:bg-[var(--bg-card-hover)]', to: 'hover:bg-bg-card-hover' },
  { from: 'hover:border-[var(--border-primary)]', to: 'hover:border-border-primary' },
  { from: 'group-hover:text-[var(--text-primary)]', to: 'group-hover:text-text-primary' },
]

function getAllFiles(dir, exts = ['.tsx', '.ts']) {
  let results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '__tests__') continue
      results = results.concat(getAllFiles(fullPath, exts))
    } else if (exts.some(ext => entry.name.endsWith(ext))) {
      results.push(fullPath)
    }
  }
  return results
}

let totalReplacements = 0
let filesChanged = 0

const files = getAllFiles(SRC_DIR)

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8')
  const original = content
  let fileReplacements = 0

  for (const { from, to } of REPLACEMENTS) {
    // Use split/join for exact string replacement (no regex escaping needed)
    const parts = content.split(from)
    if (parts.length > 1) {
      const count = parts.length - 1
      content = parts.join(to)
      fileReplacements += count
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8')
    const relativePath = path.relative(path.join(__dirname, '..'), filePath)
    console.log(`✅ ${relativePath} — ${fileReplacements} replacement(s)`)
    totalReplacements += fileReplacements
    filesChanged++
  }
}

console.log(`\n📊 Summary: ${totalReplacements} replacements across ${filesChanged} files`)
