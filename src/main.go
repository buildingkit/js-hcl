package main

import (
	"bytes"
	"encoding/json"

	"github.com/gopherjs/gopherjs/js"
	"github.com/hashicorp/hcl"
	"github.com/hashicorp/hcl/hcl/printer"
	"github.com/miratronix/jopher"
)

// Parse HCL input.
func Parse(input string) (interface{}, error) {
	var ast interface{}
	err := hcl.Unmarshal([]byte(input), &ast)
	if err != nil {
		return nil, err
	}

	return ast, nil
}

// Stringify interface into HCL output.
func Stringify(input interface{}) (string, error) {
	jbuf, err := json.Marshal(input)
	if err != nil {
		return "", err
	}

	ast, err := hcl.ParseBytes(jbuf)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer

	err = printer.Fprint(&buf, ast.Node)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}

func main() {
	js.Module.Get("exports").Set("parse", jopher.Promisify(Parse))
	js.Module.Get("exports").Set("stringify", jopher.Promisify(Stringify))
}
