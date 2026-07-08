#!/usr/bin/env node

/**
 * Phase 3 Codemod: Replace inline style={{ ... 'var(--...)' ... }} with Tailwind classes.
 * 
 * Handles:
 * - Type A: Single property → remove style, add class
 * - Type B: Single backgroundColor → remove style, add class  
 * - Type C: Multi-property all vars → remove style, add classes
 * - SKIP: Mixed var + non-var properties (too complex for auto)
 */

const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, '..', 'src')

// Map CSS property + var name → Tailwind class
const STYLE_TO_CLASS = {
  'color': {
    'var(--text-primary)': 'text-text-primary',
    'var(--text-secondary)': 'text-text-secondary',
    'var(--text-muted)': 'text-text-muted',
    'var(--text-dimmed)': 'text-text-dimmed',
    'var(--text-link)': 'text-text-link',
    'var(--border-primary)': 'text-border-primary', // edge case: color using border var
  },
  'backgroundColor': {
    'var(--bg-page)': 'bg-bg-page',
    'var(--bg-primary)': 'bg-bg-primary',
    'var(--bg-card)': 'bg-bg-card',
    'var(--bg-card-hover)': 'bg-bg-card-hover',
    'var(--bg-surface)': 'bg-bg-surface',
    'var(--bg-surface-dim)': 'bg-bg-surface-dim',
    'var(--bg-secondary)': 'bg-bg-secondary',
    'var(--bg-input)': 'bg-bg-input',
    'var(--bg-tag)': 'bg-bg-tag',
    'var(--bg-tag-active)': 'bg-bg-tag-active',
    'var(--bg-header)': 'bg-bg-header',
    'var(--bg-header-scrolled)': 'bg-bg-header-scrolled',
    'var(--bg-glow-blue)': 'bg-bg-glow-blue',
    'var(--bg-glow-purple)': 'bg-bg-glow-purple',
  },
  'background': {
    'var(--bg-page)': 'bg-bg-page',
    'var(--bg-primary)': 'bg-bg-primary',
    'var(--bg-card)': 'bg-bg-card',
    'var(--bg-secondary)': 'bg-bg-secondary',
    'var(--bg-surface-dim)': 'bg-bg-surface-dim',
  },
  'borderColor': {
    'var(--border-primary)': 'border-border-primary',
    'var(--border-dim)': 'border-border-dim',
    'var(--border-input)': 'border-border-input',
  },
  'boxShadow': {
    'var(--shadow-sm)': 'shadow-theme-sm',
    'var(--shadow-xl)': 'shadow-theme-xl',
  },
}

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
let skippedCount = 0
let filesChanged = 0

const files = getAllFiles(SRC_DIR)

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8')
  const original = content
  const relativePath = path.relative(path.join(__dirname, '..'), filePath)

  // Process line by line for precision
  const lines = content.split('\n')
  let fileReplacements = 0
  let fileSkipped = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Only process lines with style={{ ... var(-- ...
    if (!line.includes('style={{') || !line.includes('var(--')) continue

    // Try to extract the style object from this line
    // Match style={{ ... }}
    const styleMatch = line.match(/style=\{\{([^}]+)\}\}/)
    if (!styleMatch) continue

    const styleContent = styleMatch[1].trim()
    
    // Parse individual properties
    // Split by comma, but be careful with values that contain commas
    const props = []
    let current = ''
    let parenDepth = 0
    let tickDepth = 0
    
    for (const char of styleContent) {
      if (char === '(' || char === '[') parenDepth++
      if (char === ')' || char === ']') parenDepth--
      if (char === '`') tickDepth = tickDepth === 0 ? 1 : 0
      if (char === ',' && parenDepth === 0 && tickDepth === 0) {
        props.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    if (current.trim()) props.push(current.trim())

    // Check each property
    const classesToAdd = []
    const propsToKeep = []
    let hasNonVarProp = false

    for (const prop of props) {
      // Parse key: value — handle both 'key: value' formats
      const colonIdx = prop.indexOf(':')
      if (colonIdx === -1) { propsToKeep.push(prop); hasNonVarProp = true; continue }
      
      const key = prop.substring(0, colonIdx).trim()
      let value = prop.substring(colonIdx + 1).trim()
      
      // Remove quotes
      if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1)
      }

      // Check if this is a simple var(--...) value
      const varMatch = value.match(/^var\(--[a-zA-Z0-9-]+\)$/)
      
      if (varMatch && STYLE_TO_CLASS[key] && STYLE_TO_CLASS[key][value]) {
        classesToAdd.push(STYLE_TO_CLASS[key][value])
      } else {
        propsToKeep.push(prop)
        if (value.includes('var(--')) {
          // Complex var usage (e.g., template literal, shorthand)
          hasNonVarProp = true
        } else {
          hasNonVarProp = true
        }
      }
    }

    if (classesToAdd.length === 0) continue

    // Build replacement
    let newLine = line
    const newClasses = classesToAdd.join(' ')

    if (propsToKeep.length === 0) {
      // Remove entire style prop, add classes to className
      newLine = newLine.replace(/\s*style=\{\{[^}]+\}\}/, '')
      
      // Add classes to existing className
      const classNameMatch = newLine.match(/className="([^"]*)"/)
      const classNameMatchTick = newLine.match(/className={`([^`]*)`}/)
      
      if (classNameMatch) {
        const existingClasses = classNameMatch[1]
        newLine = newLine.replace(
          `className="${existingClasses}"`,
          `className="${existingClasses} ${newClasses}"`
        )
      } else if (classNameMatchTick) {
        const existingClasses = classNameMatchTick[1]
        newLine = newLine.replace(
          'className={`' + existingClasses + '`}',
          'className={`' + existingClasses + ' ' + newClasses + '`}'
        )
      } else {
        // No className exists, add one
        // Try to add before the first > or after the tag name
        newLine = newLine.replace(/(\s*)(style=)/, `$1className="${newClasses}" `)
        // If style was already removed, we need a different approach
        if (!newLine.includes(`className="${newClasses}"`)) {
          // Add className right before the closing >
          newLine = newLine.replace(/>/, ` className="${newClasses}">`)
        }
      }
    } else {
      // Keep remaining style props, add classes
      const remainingStyle = propsToKeep.join(', ')
      newLine = newLine.replace(
        /style=\{\{[^}]+\}\}/,
        `style={{ ${remainingStyle} }}`
      )
      
      // Add new classes
      const classNameMatch = newLine.match(/className="([^"]*)"/)
      const classNameMatchTick = newLine.match(/className={`([^`]*)`}/)
      
      if (classNameMatch) {
        const existingClasses = classNameMatch[1]
        newLine = newLine.replace(
          `className="${existingClasses}"`,
          `className="${existingClasses} ${newClasses}"`
        )
      } else if (classNameMatchTick) {
        const existingClasses = classNameMatchTick[1]
        newLine = newLine.replace(
          'className={`' + existingClasses + '`}',
          'className={`' + existingClasses + ' ' + newClasses + '`}'
        )
      } else {
        // Add className before style
        newLine = newLine.replace(/style=/, `className="${newClasses}" style=`)
      }
    }

    if (newLine !== line) {
      lines[i] = newLine
      fileReplacements += classesToAdd.length
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8')
    console.log(`✅ ${relativePath} — ${fileReplacements} inline style(s) converted`)
    totalReplacements += fileReplacements
    filesChanged++
  }
}

console.log(`\n📊 Summary: ${totalReplacements} inline styles converted across ${filesChanged} files`)
console.log(`⏭️ Skipped: ${skippedCount} complex cases (manual fix needed)`)
