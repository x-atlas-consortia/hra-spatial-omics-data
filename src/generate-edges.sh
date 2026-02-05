#!/bin/bash
source constants.sh
set -o pipefail

NODES=$1
EDGES="${NODES%-nodes.csv}-edges.csv"
STUDY=$(basename `dirname $EDGES`)

TARGET_LABEL=`csvgrep -c slug -m $STUDY input-data/studies.csv | csvcut -c anchorCellTypeL3 | tail -n 1`;
CELL_TYPE_COLUMN='Level Three Cell Type';
NODE_OPTIONS='--max-old-space-size=64000';

node ${NODE_OPTIONS} ./src/node-dist-vis-cli.cjs generate-edges ${NODES} -t "${TARGET_LABEL}" -k "Cell Type:${CELL_TYPE_COLUMN}" -o ${EDGES}
