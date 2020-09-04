const grammars = [
  {
    // # comment
    id: 'comment',
    match: '#\\s*.+'
  },
  {
    // block name
    id: 'block',
    match: '\\w+(?=\\s*\\{)'
  },
  {
    // block name "
    id: 'block',
    match: '\\w+(?=\\s*")',
  },
  {
    // =
    id: 'equal',
    match: '=',
  },
  {
    // {
    id: 'left_bracket',
    match: '\\{',
  },
  {
    // }
    id: 'right_bracket',
    match: '\\}'
  },
  {
    // name
    id: 'name',
    match: '\\w+'
  },
  {
    // "${...}"
    id: 'tmpl',
    match: '"\\$\\{.*?\\}"',
    preprocess: v => v.slice(1, v.length - 1)
  },
  {
    // "string"
    id: 'string',
    match: '".*?"',
    preprocess: v => v.slice(1, v.length - 1)
  },
  {
    // 123
    id: 'number',
    match: '\\d+'
  },
  {
    // [
    id: 'array_open',
    match: '\\['
  },
  {
    // ]
    id: 'array_close',
    match: '\\]'
  },
  {
    // ,
    id: 'comma',
    match: ','
  }
]

module.exports = grammars;
