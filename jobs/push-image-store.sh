#!/bin/bash
source constants.sh
set -ev

aws s3 sync $INPUT_DIR/image-store/ $S3_BUCKET
