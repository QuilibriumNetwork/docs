#!/bin/bash
set -euo pipefail

NODE_DIR="/opt/quilibrium/node"
RELEASE_URL="https://releases.quilibrium.com/release"
PLIST_PATH="/Library/LaunchDaemons/com.quilibrium.node.plist"
PLIST_LABEL="com.quilibrium.node"
SYMLINK_PATH="${NODE_DIR}/quilibrium-node"

detect_platform() {
  local os arch
  os=$(uname -s)
  arch=$(uname -m)

  if [ "$os" != "Darwin" ]; then
    echo "Error: this script is for macOS only (detected: $os)" >&2
    exit 1
  fi

  case "$arch" in
    arm64) echo "darwin-arm64" ;;
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
    echo "$target" | sed -E 's/.*node-([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+).*/\1/'
  fi
}

get_latest_version() {
  local platform="$1"
  curl -sL "$RELEASE_URL" | grep -o "node-[0-9.]*-${platform}" | head -1 | sed -E 's/node-([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+).*/\1/'
}

get_release_files() {
  local platform="$1"
  curl -sL "$RELEASE_URL" | grep "${platform}"
}

echo "=== Quilibrium Node Update Script (macOS) ==="
echo

PLATFORM=$(detect_platform)
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
    curl -sL "https://releases.quilibrium.com/${file}" -o "${file}"
    DOWNLOAD_COUNT=$((DOWNLOAD_COUNT + 1))
  fi
done <<< "$EXPECTED_FILES"

echo
echo "Downloaded ${DOWNLOAD_COUNT} file(s), skipped ${SKIP_COUNT} file(s)."

chmod +x "${NODE_DIR}/${BINARY}"

if launchctl list "$PLIST_LABEL" &>/dev/null; then
  echo
  echo "Stopping ${PLIST_LABEL}..."
  launchctl unload "$PLIST_PATH" 2>/dev/null || true
fi

echo "Updating symlink -> ${BINARY}"
ln -sf "${NODE_DIR}/${BINARY}" "$SYMLINK_PATH"

if [ -f "$PLIST_PATH" ]; then
  echo "Starting ${PLIST_LABEL}..."
  launchctl load "$PLIST_PATH"
else
  echo "No launchd plist found at ${PLIST_PATH} — skipping service start."
  echo "Set up the launchd service before the node can run as a background service."
fi

echo
echo "=== Update complete ==="
echo "Version: ${LATEST}"
echo "Run 'sudo launchctl list | grep quilibrium' to verify."
