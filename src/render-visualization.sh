#!/bin/bash
source constants.sh
set -o pipefail

HTML=$1
OUT="${HTML%.html}"

echo "${OUT}.png"

for attempt in {1..3}; do
  pageres $HTML 1440x788 --crop --delay=20 --overwrite --timeout=36000 --filename=$OUT && break
  if [ $attempt -lt 3 ]; then
    echo "Attempt $attempt failed, retrying..." >&2
    sleep 1
  fi
done
