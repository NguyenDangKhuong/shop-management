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

echo "✨ Git hooks setup complete!"
