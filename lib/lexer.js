const grammars = require('./grammars');

function Lexer(data) {
  this.tokens = [];
  this.column = 1;
  this.line = 1;
  this.data = data;
  this.grammar = [
    {
      id: 'newline',
      match: '\\n',
    },
    {
      id: 'whitespace',
      match: '\\s'
    }
  ]
  this.index = 0;
  this.expr = '(\\n)|(\\s)';
  this.regex = undefined;


  this.getRegex = function () {
    if (!this.regex) {
      this.regex = new RegExp(this.expr, "gmu");
    }
    this.regex.lastIndex = this.index;
    return this.regex;
  }

  this.next = () => {
    const regex = this.getRegex();
    const match = regex.exec(this.data);
    if (match) {
      const length = match[0].length;
      const token = this.grammar[match.indexOf(match[0], 1) - 1];
      const id = token.id;

      this.index += length;

      this.tokens.push({
        column: this.column,
        line: this.line,
        value: token.preprocess ? token.preprocess(match[0]) : match[0],
        length,
        id,
      })

      switch (id) {
        case 'whitespace':
          this.column++;
          break;
        case 'newline':
          this.column = 1;
          this.line++;
          break;
        default:
          this.column += length;
          break;
      }

      return this.tokens[this.tokens.length - 1];
    }
  }

  this.run = () => {
    for (let i = 0; i < Infinity; i++) {
      const token = this.next();
      if (!token) break;
    }

    return this.tokens;
  }

  this.addGrammar = def => {
    if (this.expr.length > 0) {
      this.expr += "|";
    }
    this.expr += `(${def.match})`;
    this.regex = undefined;
    this.grammar.push(def);
  }
}

module.exports = data => {
  const lexer = new Lexer(data);
  grammars.forEach(lexer.addGrammar);
  return lexer;
};
