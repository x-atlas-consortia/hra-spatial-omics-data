#!/bin/bash
source constants.sh
set -ev

find $INPUT_DIR/image-store/vccf-data-cell-nodes/ -name "*-vis.html" \
  | perl -pe 's/^/\.\/src\/render\-visualization\.sh\ /' | shuf > jobs.txt

node src/parallel-jobs.js jobs.txt

rm -f jobs.txt

# Find any failed renders and try one more time.
# - A blank image is around 5.1k, so we select all pngs that are less than 6ish k.
for f in `find input-data/image-store/vccf-data-cell-nodes/published/ -name "*-vis.png" -type f -size -6000c`; do
  echo "./src/render-visualization.sh ${f%.png}.html" >> jobs.txt;
done;

node src/parallel-jobs.js jobs.txt

rm -f jobs.txt
