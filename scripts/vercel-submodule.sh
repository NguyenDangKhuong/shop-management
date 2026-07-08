#!/bin/bash

# If GITHUB_PAT is set, update the submodule URL to include the token for authentication
if [ -n "$GITHUB_PAT" ]; then
  echo "GITHUB_PAT is found. Configuring submodule authentication..."
  git submodule set-url src/tweets-private https://x-access-token:${GITHUB_PAT}@github.com/NguyenDangKhuong/tweets-x.git
  git submodule update --init --recursive
else
  echo "WARNING: GITHUB_PAT is not set. Trying default submodule update..."
  git submodule update --init --recursive
fi
