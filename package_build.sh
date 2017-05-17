#!/bin/bash

# Ensure that the shell script fails if any of the command has a non-zero exit code.
set -e

export HOME=/home/bamboo
export GEM_HOME=$HOME/.gem/ruby

echo "Installing Node Packages"
npm install

echo "Grunt build package..."
grunt build
