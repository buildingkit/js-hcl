#!/bin/bash

if [[ -z "${CI}" ]]; then
  go get golang.org/dl/go1.12.16
  go1.12.16 download
  export GOPHERJS_GOROOT="$(go1.12.16 env GOROOT)"
else
  export GOPHERJS_GOROOT="$(go env GOROOT)"
  export PATH=${PATH}:`go env GOPATH`/bin
  echo $PATH
fi

# build using gopherjs
go mod vendor
ls /opt/hostedtoolcache/go/1.12.16/x64/bin
gopherjs build ./src -o dist/index.js -m

# minify using uglifyjs
$(npm bin)/uglifyjs --compress --mangle -o dist/index.js -- dist/index.js
