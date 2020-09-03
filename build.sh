#!/bin/bash

if [[ -z "${CI}" ]]; then
  go get golang.org/dl/go1.12.16
  go1.12.16 download
  export GOPHERJS_GOROOT="$(go1.12.16 env GOROOT)"
else
  export GOPHERJS_GOROOT="$(go env GOROOT)"
  export PATH=${PATH}:`go env GOPATH`/bin
  export GO111MODULE="on"
fi

GO111MODULE=off go get -u github.com/gopherjs/gopherjs
go mod vendor
gopherjs build ./src -o dist/index.js -m

npm install
$(npm bin)/uglifyjs --compress --mangle -o dist/index.js -- dist/index.js
