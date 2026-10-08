#!/usr/bin/env bash
# Ionic Appflow's Fastlane gym sets a global CODE_SIGN_IDENTITY for its archive
# build. With cordova-ios 8 / Swift Package Manager, that setting leaks into
# automatically signed Cordova_Cordova package targets, causing a provisioning
# conflict. Appflow already applies the Distribution identity and provisioning
# profile directly to the main App target in App.xcodeproj before invoking gym.
#
# Remove ONLY the global identity override during archive. Leave DEVELOPMENT_TEAM,
# all build arguments, App target settings and other xcodebuild operations intact.
set -euo pipefail

xcodebuild_bin="${CLICAID_XCODEBUILD_BIN:-/usr/bin/xcodebuild}"
archive_requested=false
for arg in "$@"; do
  if [[ "$arg" == "archive" ]]; then
    archive_requested=true
    break
  fi
done

if [[ "$archive_requested" == true ]]; then
  args=()
  for arg in "$@"; do
    if [[ "$arg" == CODE_SIGN_IDENTITY=* ]]; then
      printf '%s\n' '[Appflow iOS] Removed global CODE_SIGN_IDENTITY override for Swift Package targets; using App target signing settings.' >&2
      continue
    fi
    args+=("$arg")
  done
  exec "$xcodebuild_bin" "${args[@]}"
fi

exec "$xcodebuild_bin" "$@"
