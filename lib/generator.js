
function Generator(tokens) {
  this.tokens = tokens;
  this.output = {};
  this.add = (output, tokens) => {
    let lastBlock = '';
    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = tokens[i];
      switch (token.id) {
        case 'name':
          output[token.value] = {};
          lastBlock = token.value;
          break;
        case 'string':
          output[lastBlock] = token.value;
          break;
        default:
          break;
      }
    }
    return output;
  }
  this.run = () => {
    let lastBlock = '';
    for (let i = 0, l = this.tokens.length; i < l; i++) {
      const token = this.tokens[i];
      let output = this.output;
      switch (token.id) {
        case 'assignment_block':
        case 'block':
          this.output[token.value] = {};
          lastBlock = token.value;
          break;
        case 'name':
          const nextTokens = this.tokens.slice(i);
          this.output[lastBlock] = this.add(this.output[lastBlock]||{}, nextTokens)
        default:
          break;
      }
    }
    return this.output;
  }
}

const gen = new Generator(tokens);
