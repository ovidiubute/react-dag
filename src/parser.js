const babylon = require('babylon');

const parse = sourceCode => {
  return babylon.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties'],
  });
};

const getImports = ast => {
  return ast.program.body.filter(node => node.type === 'ImportDeclaration');
};

module.exports = {
  parse,
  getImports,
};
