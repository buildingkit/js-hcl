const Hcl = require('./main');
const hcl = new Hcl();

const testConfig = `
service {
    key = "value"
}`;

describe('hcl', () => {
    test('parse hcl', async () => {
        const result = await hcl.parse(testConfig)
        expect(result.service).toEqual([{ key: 'value' }]);
    });
});