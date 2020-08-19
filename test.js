import hcl from './dist';

describe('hcl', () => {
  test('parse hcl', () => {
    hcl
      .parse(
        `service {
        key = "value"
    }`
      )
      .then((obj) => {
        expect(obj.service).toEqual([{ key: 'value' }]);
      });
  });

  test('stringify obj', () => {
    hcl
      .stringify({
        service: {
          key: 'value',
        },
      })
      .then((obj) => {
        expect(obj.replace(/\s/g, '')).toEqual(`"service"={"key"="value"}`);
      });
  });
});
