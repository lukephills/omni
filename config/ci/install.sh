#!/usr/bin/env bash

set -ex -o pipefail

# Install version of npm that we are locked against
npm install -g npm@3
npm -g install karma-cli tslint
# Disable the spinner, it looks bad on Travis
npm config set spin false
npm install
