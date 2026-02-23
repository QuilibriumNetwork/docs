#!/bin/bash
set -euo pipefail

NODE_DIR="/opt/quilibrium/node"
RELEASE_URL="https://releases.quilibrium.com/release"
SERVICE_NAME="quilibrium-node"
SYMLINK_PATH="${NODE_DIR}/quilibrium-node"

detect_arch() {
  local arch
  arch=$(uname -m)
  case "$arch" in
    x86_64)  echo "linux-amd64" ;;
    aarch64) echo "linux-arm64" ;;
    arm64)   echo "linux-arm64" ;;
    *)
      echo "Error: unsupported architecture: $arch" >&2
      exit 1
      ;;
  esac
}

get_current_version() {
  if [ -L "$SYMLINK_PATH" ]; then
    local target
    target=$(readlink "$SYMLINK_PATH")
    echo "$target" | grep -oP 'node-\K[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+'
  fi
}

get_latest_version() {
  local platform="$1"
  curl -sL "$RELEASE_URL" | grep -oP "node-\K[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+(?=-${platform}$)" | head -1
}

get_release_files() {
  local platform="$1"
  curl -sL "$RELEASE_URL" | grep "${platform}"
}

echo "=== Quilibrium Node Update Script ==="
echo

PLATFORM=$(detect_arch)
echo "Detected platform: ${PLATFORM}"

CURRENT=$(get_current_version)
if [ -n "$CURRENT" ]; then
  echo "Current version:   ${CURRENT}"
else
  echo "Current version:   not found (fresh install)"
fi

LATEST=$(get_latest_version "$PLATFORM")
if [ -z "$LATEST" ]; then
  echo "Error: could not determine latest version from ${RELEASE_URL}" >&2
  exit 1
fi
echo "Latest version:    ${LATEST}"

BINARY="node-${LATEST}-${PLATFORM}"

if [ "$CURRENT" = "$LATEST" ]; then
  EXPECTED_FILES=$(get_release_files "$PLATFORM")
  MISSING=0
  while IFS= read -r file; do
    if [ ! -f "${NODE_DIR}/${file}" ]; then
      MISSING=1
      break
    fi
  done <<< "$EXPECTED_FILES"

  if [ "$MISSING" -eq 0 ]; then
    echo
    echo "Already up to date — all files present."
    exit 0
  else
    echo
    echo "Version matches but some files are missing. Re-downloading..."
  fi
else
  echo
  echo "New version available. Updating ${CURRENT:-'(none)'} -> ${LATEST}..."
fi

mkdir -p "$NODE_DIR"
cd "$NODE_DIR"

EXPECTED_FILES=$(get_release_files "$PLATFORM")
DOWNLOAD_COUNT=0
SKIP_COUNT=0

while IFS= read -r file; do
  if [ -f "${NODE_DIR}/${file}" ]; then
    echo "  [skip]     ${file} (already exists)"
    SKIP_COUNT=$((SKIP_COUNT + 1))
  else
    echo "  [download] ${file}"
    wget -q "https://releases.quilibrium.com/${file}" -O "${file}"
    DOWNLOAD_COUNT=$((DOWNLOAD_COUNT + 1))
  fi
done <<< "$EXPECTED_FILES"

echo
echo "Downloaded ${DOWNLOAD_COUNT} file(s), skipped ${SKIP_COUNT} file(s)."

chmod +x "${NODE_DIR}/${BINARY}"

if systemctl is-active --quiet "$SERVICE_NAME"; then
  echo
  echo "Stopping ${SERVICE_NAME}..."
  systemctl stop "$SERVICE_NAME"
fi

echo "Updating symlink -> ${BINARY}"
ln -sf "${NODE_DIR}/${BINARY}" "$SYMLINK_PATH"

echo "Starting ${SERVICE_NAME}..."
systemctl start "$SERVICE_NAME"

echo
echo "=== Update complete ==="
echo "Version: ${LATEST}"
echo "Run 'systemctl status ${SERVICE_NAME}' to verify."
