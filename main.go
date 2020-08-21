package main

import (
	"bytes"
	"encoding/json"
	"github.com/hashicorp/hcl"
	"github.com/hashicorp/hcl/hcl/printer"
	"syscall/js"
)

var c chan bool

func init() {
	c = make(chan bool)
}

func main() {
	// Register functions.
	js.Global().Get("__hcl").Set("parse", js.FuncOf(parse))
	js.Global().Get("__hcl").Set("stringify", js.FuncOf(stringify))
	js.Global().Get("__hcl").Set("cleanup", js.FuncOf(cleanup))
	<- c
}

func parse(this js.Value, args []js.Value) interface{} {
	var ast interface{}
	callback := args[len(args) -1:][0]
	err := hcl.Unmarshal([]byte(args[0].String()), &ast)
	if err != nil {
		callback.Invoke(err.Error(), js.Null())
		return nil
	}
	output, err := json.Marshal(ast)
	if err != nil {
		callback.Invoke(err.Error(), js.Null())
	}
	callback.Invoke(js.Null(), string(output))
	return nil
}

func stringify(this js.Value, args []js.Value) interface{} {

	callback := args[len(args) -1:][0]
	ast, err := hcl.ParseBytes([]byte(args[0].String()))
	if err != nil {
		callback.Invoke(err.Error(), js.Null())
		return nil
	}

	var buf bytes.Buffer

	err = printer.Fprint(&buf, ast.Node)
	if err != nil {
		callback.Invoke(err.Error(), js.Null())
		return nil
	}

	callback.Invoke(js.Null(), buf.String())
	return nil
}

func cleanup(this js.Value, args []js.Value) interface{} {
	c <- true
	return nil
}
