#!/bin/bash

# build using gopherjs
go get golang.org/dl/go1.12.16
go1.12.16 download
export GOPHERJS_GOROOT="$(go1.12.16 env GOROOT)"
go mod vendor
PATH=${PATH}:`go env GOPATH`/bin gopherjs build ./src -o dist/index.js -m

# minify using uglifyjs
$(npm bin)/uglifyjs --compress --mangle -o dist/index.js -- dist/index.js
