const babylon = require('babylon');

const parse = sourceCode => {
  return babylon.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties'],
  });
};

const getImports = ast => {
  return ast.program.body
    .filter(node => node.type === 'ImportDeclaration')
    .reduce((accum, node) => {
      for (let specifier of node.specifiers) {
        accum.push({
          localIdentifier: specifier.local.name,
          importPath: node.source.value,
        });
      }

      return accum;
    }, []);
};

module.exports = {
  parse,
  getImports,
};
