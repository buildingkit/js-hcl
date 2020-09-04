const lexer = require('../lib/lexer')

describe('lexer', () => {
  it('should contain block name token', () => {
    const data = `service {}`;
    const tokens = lexer(data).run();

    expect(tokens[0].value).toBe('service');
    expect(tokens[2].value).toBe('{');
    expect(tokens[3].value).toBe('}');
  });

  it('should cointain dynamic block name token', () => {
    const data = `service "group" {}`;
    const tokens = lexer(data).run();

    expect(tokens[0].value).toBe('service');
    expect(tokens[2].value).toBe('group');
    expect(tokens[4].value).toBe('{');
    expect(tokens[5].value).toBe('}');
  });

  it('should contain block name with equal token', () => {
    const data = `service = {}`;
    const tokens = lexer(data).run();

    expect(tokens[0].value).toBe('service');
    expect(tokens[2].value).toBe('=');
    expect(tokens[4].value).toBe('{');
    expect(tokens[5].value).toBe('}');
  })

  it('should scan docker input', () => {
    const data = `group "default" {
      targets = ["db", "webapp-dev"]
    }
    target "webapp-dev" {
      dockerfile = "Dockerfile.webapp"
      tags = ["docker.io/username/webapp"]
    }
    target "webapp-release" {
      inherits = ["webapp-dev"]
      platforms = ["linux/amd64", "linux/arm64"]
    }
    target "db" {
      dockerfile = "Dockerfile.db"
      tags = ["docker.io/username/db"]
    }`
    const tokens = lexer(data).run();
    expect(tokens).toMatchSnapshot();
  })
})
