import { existsSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { basename, dirname, join } from 'path';
import sh from 'shelljs';

const CLEAN = process.argv.length === 3 && process.argv[2] === '--clean';
const BASE_URL = 'https://cdn.humanatlas.io';
// const BASE_URL = 'http://localhost:5500';
const INPUT_DATA = 'input-data';
const CSV_FILES = 'image-store/vccf-data-cell-nodes/published/*/*-nodes.csv';
const DATASETS_JSON = 'output-data/cde-gallery-datasets.json';
const NODE_OPTIONS = '--max-old-space-size=64000';
const DIST_ARGS = "-t 'Endothelial' -d 1000";

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
  const numNodes = parseInt(sh.exec(`wc -l ${nodesFile} | cut -d ' ' -f 1`, { silent: true }).toString()) - 1;
  datasets.push({
    study: basename(dirname(nodesFile)),
    slug: basename(nodesFile, '-nodes.csv'),
    nodeCount: numNodes,
    nodes: `${nodesFile.replace(INPUT_DATA, BASE_URL)}`,
    edges: `${edgesFile.replace(INPUT_DATA, BASE_URL)}`,
    'node-target-key': 'Cell Type',
    'node-target-value': 'Endothelial',
    'max-edge-distance': '1000',
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
    <script src="https://cdn.humanatlas.io/ui/node-dist-vis-wc/wc.js" type="module"></script>
  </body>
</html>
`;
  writeFileSync(htmlFile, html);
}

writeFileSync(DATASETS_JSON, JSON.stringify(datasets, null, 2));
