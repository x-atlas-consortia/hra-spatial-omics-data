import { writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';
import sh from 'shelljs';
import { CELL_TYPE_COLUMN, getCellTypeKey, MAX_EDGE_DIST } from './utils/cde-config.js';

const BASE_URL = 'https://cdn.humanatlas.io';
// const BASE_URL = 'http://localhost:5500';
const INPUT_DATA = 'input-data';
const CSV_FILES = 'image-store/vccf-data-cell-nodes/published/*/*-nodes.csv';
const DATASETS_JSON = 'output-data/datasets.json';

const datasets = [];
for (const nodesFile of globSync(join(INPUT_DATA, CSV_FILES)).sort()) {
  const edgesFile = nodesFile.replace('-nodes.csv', '-edges.csv');
  const numNodes = parseInt(sh.exec(`wc -l ${nodesFile} | cut -d ' ' -f 1`, { silent: true }).toString()) - 1;
  const nodesLabel = nodesFile.split('/').slice(-2).join(' / ').replace('-nodes.csv', '');

  datasets.push({
    label: `${nodesLabel} (${numNodes.toLocaleString()} cells)`,
    nodes: nodesFile.replace(INPUT_DATA, BASE_URL),
    edges: edgesFile.replace(INPUT_DATA, BASE_URL),
    'node-target-key': CELL_TYPE_COLUMN,
    'node-target-value': getCellTypeKey(nodesFile),
    'max-edge-distance': MAX_EDGE_DIST,
  });
}

writeFileSync(DATASETS_JSON, JSON.stringify(datasets, null, 2));
