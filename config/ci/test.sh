#!/usr/bin/env bash

set -ex -o pipefail

if [ $TRAVIS_OS_NAME == "linux" ]; then
  # used by xvfb that is used by Chrome
  export CXX="g++-4.9" CC="gcc-4.9" DISPLAY=:99.0;
  # Used by karma and karma-chrome-launcher
  export CHROME_BIN=/usr/bin/google-chrome
  sh -e /etc/init.d/xvfb start;
  sleep 3;
fi

# This need to be here else Chrome will not run on Linux
npm test
