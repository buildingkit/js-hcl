package main

import (
	"encoding/json"
	"github.com/hashicorp/hcl"
	"syscall/js"
)

var c chan bool

func init() {
	c = make(chan bool)
}

func main() {
	// Register functions.
	js.Global().Get("__hcl").Set("parse", js.FuncOf(parse))
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

func cleanup(this js.Value, args []js.Value) interface{} {
	c <- true
	return nil
}
