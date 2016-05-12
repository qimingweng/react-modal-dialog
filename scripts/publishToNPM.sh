#!/bin/bash

# index.js takes precedence over package.json's main
echo "module.exports = require('./lib/index.js');" > index.js

babel src --out-dir lib
