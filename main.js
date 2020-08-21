const fs = require('fs').promises;
require('./wasm_exec.js');

class Hcl {
    _initialized = false;

    constructor() {
        if (!global.__hcl) {
            global.__hcl = {};
        }
    }

    async _initialize() {
        const go = new Go();
        const buffer = await fs.readFile('./hcl.wasm');
        if (!go) {
            throw Error('Failed to load the HCL parser.');
        }
        const lib = await WebAssembly.instantiate(buffer, go.importObject);
        if (!lib) {
            throw Error('Failed to initialize the HCL parser.');
        }
        go.run(lib.instance)
        this._initialized = true;
    }

    async parseFile(path) {
        const file = await fs.readFile(path);
        return this.parse(file);
    }

    destroy() {
        global.__hcl.cleanup();
    }

    async _innerParse (str) {
        return new Promise((resolve, reject) => {
           global.__hcl.parse(str, (error, data) => {
              if (error != null && error.length > 0) {
                  return reject(error);
              }
              return resolve(data);
           });
        });
    }

    async parse(str) {
        if (!this._initialized) {
            await this._initialize();
        }
        return this._innerParse(str);
    }

}

module.exports = Hcl;