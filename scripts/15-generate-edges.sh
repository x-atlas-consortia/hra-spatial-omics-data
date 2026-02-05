#!/bin/bash
source constants.sh
set -ev

CLEAN="false"

rm -f jobs.txt
touch jobs.txt

for NODES in `find $INPUT_DIR/image-store/vccf-data-cell-nodes/published/ -name "*-nodes.csv"`; do
  if [ "$CLEAN" = "true" ]; then
    echo "./src/generate-edges.sh $NODES" >> jobs.txt
  else
    EDGES="${NODES%-nodes.csv}-edges.csv"
    count=`wc -l $EDGES | cut -d ' ' -f 1`
    if [[ $count < 10 ]]; then
      echo "./src/generate-edges.sh $NODES" >> jobs.txt
    fi
  fi
done

shuf jobs.txt > jobs2.txt
node src/parallel-jobs.js jobs2.txt
rm -f jobs.txt jobs2.txt
touch jobs.txt

for NODES in `find $INPUT_DIR/image-store/vccf-data-cell-nodes/published/ -name "*-nodes.csv"`; do
  EDGES="${NODES%-nodes.csv}-edges.csv"
  count=`wc -l $EDGES | cut -d ' ' -f 1`
  if [[ $count < 10 ]]; then
    echo "./src/generate-edges.sh $NODES" >> jobs.txt
  fi
done

shuf jobs.txt > jobs2.txt
node src/parallel-jobs.js jobs2.txt
rm -f jobs.txt jobs2.txt
