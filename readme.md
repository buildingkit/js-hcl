# hcl

Parse and stringify HCL v1 with JavaScript

## example

```js
import hcl from "@buildingkit/hcl";

async () => {
  const obj = await hcl.parse(`service {
        key = "value"
    }`);

  console.log(obj.service[0].key);
};
```
