#!/bin/bash

go get -u github.com/gopherjs/gopherjs

if [[ -z "${CI}" ]]; then
  go get golang.org/dl/go1.12.16
  go1.12.16 download
  export GOPHERJS_GOROOT="$(go1.12.16 env GOROOT)"
  go1.12.16 mod vendor
else
  export GOPHERJS_GOROOT="$(go env GOROOT)"
  export PATH=${PATH}:`go env GOPATH`/bin
  go mod vendor
fi

cd vendor && ln -s . src && cd ..
GOPATH=vendor/ gopherjs build ./src -o dist/index.js

$(npm bin)/uglifyjs --compress --mangle -o dist/index.js -- dist/index.js
