#!/bin/bash

pnpm semantic-release -t "@${APP_NAME}@\${version}" --no-ci
