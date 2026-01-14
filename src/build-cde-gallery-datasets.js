import { existsSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { basename, dirname, join } from 'path';
import sh from 'shelljs';
import { readCsv } from './utils/csv.js';

const CLEAN = process.argv.length === 3 && process.argv[2] === '--clean';
const BASE_URL = 'https://cdn.humanatlas.io';
// const BASE_URL = 'http://localhost:5500';
const INPUT_DATA = 'input-data';
const CSV_FILES = 'image-store/vccf-data-cell-nodes/published/*/*-nodes.csv';
const DATASETS_JSON = 'output-data/cde-gallery-datasets.json';
const NODE_OPTIONS = '--max-old-space-size=64000';
const DIST_ARGS = "-t 'Endothelial' -d 1000";

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
  if (!existsSync(edgesFile) || CLEAN) {
    console.log(`extracting edges for ${nodesFile}`);
    // sh.exec(`node ${NODE_OPTIONS} ../hra-ui/dist/libs/node-dist-vis/cli.js generate-edges ${nodesFile} ${DIST_ARGS} -o ${edgesFile}`);
    sh.exec(
      `node ${NODE_OPTIONS} ./src/node-dist-vis-cli.cjs generate-edges ${nodesFile} ${DIST_ARGS} -o ${edgesFile}`
    );
  }
  const stats = await getSummary(nodesFile);
  datasets.push({
    study: basename(dirname(nodesFile)),
    slug: basename(nodesFile, '-nodes.csv'),
    nodes: nodesFile.replace(INPUT_DATA, BASE_URL),
    edges: edgesFile.replace(INPUT_DATA, BASE_URL),
    'node-target-key': 'Cell Type',
    'node-target-value': 'Endothelial',
    'max-edge-distance': 1000,
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
      node-target-key="Cell Type"
      node-target-value="Endothelial"
      max-edge-distance="1000"
    ></hra-node-dist-vis>
    <script src="https://cdn.humanatlas.io/ui--staging/node-dist-vis-wc/wc.js" type="module"></script>
  </body>
</html>
`;
  writeFileSync(htmlFile, html);
}

writeFileSync(DATASETS_JSON, JSON.stringify(datasets, null, 2));
