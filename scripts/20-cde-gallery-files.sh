#!/bin/bash
source constants.sh
set -ev

node src/build-cde-gallery-datasets.js
node src/build-cde-gallery-yaml.js
