#!/bin/bash

# Setup Git hooks for the project
# This script is automatically run after npm install

echo "🔧 Setting up Git hooks..."

# Check if .git directory exists
if [ ! -d ".git" ]; then
    echo "⚠️  Not a git repository. Skipping hooks setup."
    exit 0
fi

# Copy pre-push hook
if [ -f ".githooks/pre-push" ]; then
    cp .githooks/pre-push .git/hooks/pre-push
    chmod +x .git/hooks/pre-push
    echo "✅ Pre-push hook installed"
else
    echo "⚠️  .githooks/pre-push not found"
fi

# Copy babel.min.js to public directory so Webpack doesn't bundle it and crash Next.js
if [ -f "node_modules/@babel/standalone/babel.min.js" ]; then
    cp node_modules/@babel/standalone/babel.min.js public/babel.min.js
    echo "✅ babel.min.js copied to public/"
else
    echo "⚠️  node_modules/@babel/standalone/babel.min.js not found"
fi

echo "✨ Git hooks setup complete!"
