Hcl = require('./main');


const testCode = `provider "upcloud" {}

variable "environment" {
  type    = "string"
  default = "prod"
}

variable "domain" {
  type    = "string"
  default = "jitesoft"
}

variable "tld" {
  type    = "string"
  default = "dns"
}

variable "zone" {
  type    = "string"
  default = "de-fra1"
}

variable "dns_plans" {
  type = "list"

  default = [
    {
      plan = "1xCPU-1GB",
      disk = 25
    },
    {
      plan = "1xCPU-1GB",
      disk = 25
    },
  ]
}

variable "etcd_plans" {
  type = "list"

  default = [
    {
      plan = "1xCPU-1GB"
      disk = 25
    },
    {
      plan = "1xCPU-1GB"
      disk = 25
    },
    {
      plan = "1xCPU-1GB"
      disk = 25
    },
  ]
}

variable "loadbalancer_plans" {
  type = "list"

  default = [
    {
      plan = "2xCPU-4GB"
      disk = 80
    },
  ]
}

variable "node_plans" {
  type = "list"

  default = [
    {
      plan = "2xCPU-4GB"
      disk = 80
    },
    {
      plan = "2xCPU-4GB"
      disk = 80
    },
    {
      plan = "2xCPU-4GB"
      disk = 80
    },
    {
      plan = "2xCPU-4GB"
      disk = 80
    },
  ]
}

variable "master_plans" {
  type = "list"

  default = [
    {
      plan = "1xCPU-1GB"
      disk = 25
    },
    {
      plan = "1xCPU-1GB"
      disk = 25
    },
  ]
}

variable "ssh_keys" {
  type = "list"
}

variable "ssh_key_private" {
  type = "string"
}
`;

Promise.resolve().then(async () => {
    const hcl = new Hcl();
    const result1 = await hcl.parse(testCode);
    console.log(result1);
    const result2 = await hcl.parse(testCode);
    console.log(result2);
    console.log('Cleaning up!');
    hcl.destroy();
    console.log('All done!');
}).catch(console.error);
