#!/bin/bash
source constants.sh
set -ev

find $INPUT_DIR/image-store/vccf-data-cell-nodes/ -name "*-vis.html" \
  | perl -pe 's/^/\.\/src\/render\-visualization\.sh\ /' | shuf > jobs.txt

node src/parallel-jobs.js jobs.txt

rm -f jobs.txt
