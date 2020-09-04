let data = `service "name" "food" = {
  foo = "bar"
  boo = "foo"

  tag {
    foo = "bar2"
  }
}`

data = `resource "linode_instance" "example_linode" {
  image = "linode/ubuntu18.04"
  label = "example-linode"
  region = "\${var.region}"
  type = "g6-standard-1"
  authorized_keys = [ "my-key" ]
  root_pass = "example-password"
}`

console.log(data);

const lexer = require('./lib/lexer')(data)

const tokens = lexer.run();
console.log(tokens);
