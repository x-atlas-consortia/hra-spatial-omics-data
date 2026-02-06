import { writeFileSync } from 'fs';
import { globSync } from 'glob';
import { basename, dirname, join } from 'path';
import { CELL_TYPE_COLUMN, CL_ID_TYPE_COLUMN, getCellTypeKey, MAX_EDGE_DIST } from './utils/cde-config.js';
import { readCsv } from './utils/csv.js';

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
  const study = basename(dirname(nodesFile));
  const slug = basename(nodesFile, '-nodes.csv');

  datasets.push({
    study,
    slug,
    nodes: nodesFile.replace(INPUT_DATA, BASE_URL),
    edges: edgesFile.replace(INPUT_DATA, BASE_URL),
    'node-target-key': CELL_TYPE_COLUMN,
    'node-target-value': getCellTypeKey(nodesFile),
    'node-cl-id-key': CL_ID_TYPE_COLUMN,
    'max-edge-distance': MAX_EDGE_DIST,
    thumbnail: nodesFile.replace(INPUT_DATA, BASE_URL).replace('-nodes.csv', '-vis.png'),
    ...stats,
  });

  const visHtmlFile = nodesFile.replace('-nodes.csv', '-vis.html');
  const visHtml = `<!doctype html>
<html lang="en">
  <body style="height: 100vh; background-color: black;">
    <hra-node-dist-vis
      nodes="${nodesFile.replace(INPUT_DATA, BASE_URL)}"
      edges="${edgesFile.replace(INPUT_DATA, BASE_URL)}"
      node-target-key="${CELL_TYPE_COLUMN}"
      node-target-value="${getCellTypeKey(nodesFile)}"
      node-cl-id-key="${CL_ID_TYPE_COLUMN}"
      max-edge-distance="${MAX_EDGE_DIST}"
    ></hra-node-dist-vis>
    <script src="https://cdn.humanatlas.io/ui--staging/node-dist-vis-wc/wc.js" type="module"></script>
  </body>
</html>
`;
  writeFileSync(visHtmlFile, visHtml);

  const cdeHtmlFile = nodesFile.replace('-nodes.csv', '-cde.html');
  const cdeHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CDE Visualization - ${study} / ${slug}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="https://cdn.humanatlas.io/ui--staging/cde-visualization-wc/favicon.png" />

    <link href="https://cdn.humanatlas.io/ui--staging/cde-visualization-wc/styles.css" rel="stylesheet" />
    <script src="https://cdn.humanatlas.io/ui--staging/cde-visualization-wc/wc.js" type="module"></script>
  </head>
  <body style="height: 100vh">
    <cde-visualization
      nodes="${nodesFile.replace(INPUT_DATA, BASE_URL)}"
      edges="${edgesFile.replace(INPUT_DATA, BASE_URL)}"
      node-target-key="${CELL_TYPE_COLUMN}"
      node-target-value="${getCellTypeKey(nodesFile)}"
      node-cl-id-key="${CL_ID_TYPE_COLUMN}"
      max-edge-distance="${MAX_EDGE_DIST}"
    ></cde-visualization>
  </body>
</html>
`;
  writeFileSync(cdeHtmlFile, cdeHtml);
}

writeFileSync(DATASETS_JSON, JSON.stringify(datasets, null, 2));
