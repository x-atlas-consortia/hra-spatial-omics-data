import { basename, dirname, join } from 'path';
import { readCsvSync } from './csv.js';

export const INPUT_DATA = 'input-data';
export const CELL_TYPE_COLUMN = 'Level Three Cell Type';
export const CL_ID_TYPE_COLUMN = 'Level Three CL ID';
export const MAX_EDGE_DIST = 200;

export const STUDIES = readCsvSync(join(INPUT_DATA, 'studies.csv')).map((acc, rows) => {
  acc[rows.study] = rows;
  return acc;
}, {});

export function getCellTypeKey(nodesFile) {
  const study = basename(dirname(nodesFile));
  return STUDIES[study]?.anchorCellTypeL3 ?? 'endothelial cell';
}
