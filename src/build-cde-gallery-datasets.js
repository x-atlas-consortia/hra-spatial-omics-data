import { writeFileSync } from 'fs';
import { globSync } from 'glob';
import { basename, dirname, join } from 'path';
import { readCsv } from './utils/csv.js';
import { CELL_TYPE_COLUMN, getCellTypeKey, MAX_EDGE_DIST } from './utils/cde-config.js';

const BASE_URL = 'https://cdn.humanatlas.io';
// const BASE_URL = 'http://localhost:5500';
const INPUT_DATA = 'input-data';
const CSV_FILES = 'image-store/vccf-data-cell-nodes/published/*/*-nodes.csv';
const DATASETS_JSON = 'output-data/cde-gallery-datasets.json';

const CT_MAP = {
  'Cell Type': 'originalCellTypesCount',
  'Level Three Cell Type': 'level3CellTypesCount',
  'Level Two Cell Type': 'level2CellTypesCount',
  'Level One Cell Type': 'level1CellTypesCount',
};

async function getSummary(nodesFile) {
  const summary = Object.fromEntries(Object.entries(CT_MAP).map(([_column, field]) => [field, new Set()]));
  let cellCount = 0;
  for await (const row of readCsv(nodesFile)) {
    cellCount++;
    for (const [column, field] of Object.entries(CT_MAP)) {
      if (row[column]) {
        summary[field].add(row[column].trim());
      }
    }
  }
  return {
    cellCount,
    ...Object.fromEntries(Object.entries(summary).map(([field, set]) => [field, set.size])),
  };
}

const datasets = [];
for (const nodesFile of globSync(join(INPUT_DATA, CSV_FILES)).sort()) {
  const edgesFile = nodesFile.replace('-nodes.csv', '-edges.csv');
  const stats = await getSummary(nodesFile);
  datasets.push({
    study: basename(dirname(nodesFile)),
    slug: basename(nodesFile, '-nodes.csv'),
    nodes: nodesFile.replace(INPUT_DATA, BASE_URL),
    edges: edgesFile.replace(INPUT_DATA, BASE_URL),
    'node-target-key': CELL_TYPE_COLUMN,
    'node-target-value': getCellTypeKey(nodesFile),
    'max-edge-distance': MAX_EDGE_DIST,
    thumbnail: nodesFile.replace(INPUT_DATA, BASE_URL).replace('-nodes.csv', '-vis.png'),
    ...stats,
  });

  const htmlFile = nodesFile.replace('-nodes.csv', '-vis.html');

  const html = `<!doctype html>
<html lang="en">
  <body style="height: 100vh; background-color: black;">
    <hra-node-dist-vis
      nodes="${nodesFile.replace(INPUT_DATA, BASE_URL)}"
      edges="${edgesFile.replace(INPUT_DATA, BASE_URL)}"
      node-target-key="${CELL_TYPE_COLUMN}"
      node-target-value="${getCellTypeKey(nodesFile)}"
      max-edge-distance="${MAX_EDGE_DIST}"
    ></hra-node-dist-vis>
    <script src="https://cdn.humanatlas.io/ui--staging/node-dist-vis-wc/wc.js" type="module"></script>
  </body>
</html>
`;
  writeFileSync(htmlFile, html);
}

writeFileSync(DATASETS_JSON, JSON.stringify(datasets, null, 2));
