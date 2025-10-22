#!/bin/bash

pnpm semantic-release -t "@${TAG_PREFIX}/${APP_NAME}@\${version}" --no-ci
