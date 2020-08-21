const Hcl = require('./bin/main.js');
const hcl = new Hcl();

const testConfig = `
service {
    key = "value"
}`;
const testObj = {
    service: {
        key: 'value'
    }
};

describe('hcl', () => {
    test('parse hcl', async () => {
        const result = await hcl.parse(testConfig)
        expect(result.service).toEqual([{ key: 'value' }]);
    });

    test('stringify obj', async () => {
        const result = await hcl.stringify(testObj);
         expect(result.replace(/\s/g, '')).toEqual(`"service"={"key"="value"}`);
    });
});