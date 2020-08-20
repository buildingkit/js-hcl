#!/bin/bash

go get golang.org/dl/go1.12.16
go1.12.16 download
export GOPHERJS_GOROOT="$(go1.12.16 env GOROOT)"
go mod vendor
npm run build