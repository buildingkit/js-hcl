import hcl from './dist';

describe('hcl', () => {
  it('should parse hcl', () => {
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

  it('should stringify obj', () => {
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
