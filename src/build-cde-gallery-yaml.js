import { readFileSync, writeFileSync } from 'fs';
import yaml from 'js-yaml';
import { readCsvSync } from './utils/csv.js';

const STUDIES = 'input-data/studies.csv';
const DATASETS = 'output-data/cde-gallery-datasets.json';
const OUTPUT = 'output-data/cde-gallery-data.yaml';

const studies = readCsvSync(STUDIES);
const datasets = JSON.parse(readFileSync(DATASETS, 'utf-8'));

const data = {
  studies: studies.map((study) => {
    study.citations = study.citations.split(/\ \;\ /).map(s => s.trim());
    study.publications = study.publications.split(/\ \;\ /).map(s => s.trim());
    study.thumbnail = study.thumbnail || `thumbnails/${study.slug}.png`;
    study.cellCount = 0;
    study.datasets = datasets.filter((d) => d.study === study.slug);
    study.cellCount = study.datasets.map((d) => d.cellCount).reduce((acc, count) => count + acc, 0);
    delete study.anchorCellTypeL3;
    return study;
  }),
};

writeFileSync(OUTPUT, yaml.dump(data));
