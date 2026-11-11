#!/usr/bin/env bash
# Build the Docker image and push it to the registry.
#
# Usage:
#   ./build.sh            # build + push  <version>-<gitsha> and latest
#   ./build.sh v1.2.0     # build + push  v1.2.0 and latest
#   NO_PUSH=1 ./build.sh  # build only
set -euo pipefail

cd "$(dirname "$0")"

# ---- load .env ----
if [[ ! -f .env ]]; then
  echo "❌ .env not found. Copy .env.example to .env and fill it in." >&2
  exit 1
fi
set -a
# shellcheck disable=SC1091
source <(sed 's/\r$//' .env)
set +a

: "${REGISTRY:?REGISTRY is not set in .env}"
: "${IMAGE_NAME:=ocr-website}"
: "${PLATFORM:=linux/amd64}"

# ---- resolve tag ----
VERSION="$(node -p "require('./package.json').version" 2>/dev/null || echo 0.0.0)"
GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo nogit)"
TAG="${1:-${IMAGE_TAG:-${VERSION}-${GIT_SHA}}}"

IMAGE="${REGISTRY}/${IMAGE_NAME}"

echo "🔨 Building ${IMAGE}:${TAG} (${PLATFORM})"
docker build \
  --platform "${PLATFORM}" \
\
  -t "${IMAGE}:${TAG}" \
  -t "${IMAGE}:latest" \
  .

if [[ "${NO_PUSH:-0}" == "1" ]]; then
  echo "✅ Built ${IMAGE}:${TAG} (push skipped)"
  exit 0
fi

# ---- login (optional) ----
if [[ -n "${REGISTRY_USERNAME:-}" && -n "${REGISTRY_PASSWORD:-}" ]]; then
  echo "🔑 Logging in to ${REGISTRY%%/*}"
  echo "${REGISTRY_PASSWORD}" | docker login "${REGISTRY%%/*}" -u "${REGISTRY_USERNAME}" --password-stdin
fi

echo "🚀 Pushing ${IMAGE}:${TAG}"
docker push "${IMAGE}:${TAG}"
docker push "${IMAGE}:latest"

echo "✅ Done: ${IMAGE}:${TAG}"
