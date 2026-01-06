#!/bin/bash
source constants.sh
set -ev

aws s3 sync $S3_BUCKET $INPUT_DIR/image-store/
