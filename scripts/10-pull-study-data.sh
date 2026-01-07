#!/bin/bash
source constants.sh
set -ev

GSHEET="https://docs.google.com/spreadsheets/d/1nP807-mh-DvtC5pSYB74YBtKsVIW-ZMwtTIzj_MKKJ0/export?format=csv"
curl -o input-data/studies.csv -L $GSHEET
