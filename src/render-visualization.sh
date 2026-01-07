#!/bin/bash
source constants.sh

HTML=$1
OUT="${HTML%.html}"

echo "${OUT}.png"
pageres $HTML 1440x788 --crop --delay=20 --overwrite --timeout=36000 --filename=$OUT
