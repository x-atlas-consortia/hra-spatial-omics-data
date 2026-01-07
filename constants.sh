INPUT_DIR="./input-data"
OUTPUT_DIR="./output-data"

export PATH=./node_modules/.bin:${PATH}
export NODE_OPTIONS="--max-old-space-size=192000"

export S3_BUCKET=s3://cdn-humanatlas-io/image-store/

if [ -e env.sh ]; then
  source env.sh
fi
