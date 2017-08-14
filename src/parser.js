const babylon = require('babylon');

/**
 * @typedef {Object} Import
 * @property {String} name The name of the imported object
 * @property {String} path The path as specified in the import statement 
 */

const parse = sourceCode => {
  return babylon.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties'],
  });
};

/**
 * Parse an AST and return a list of all the imports.
 * @param {Object} ast AST as obtained from Babylon
 * @return {Import[]} List of imports
 */
const getImports = ast => {
  return ast.program.body
    .filter(node => node.type === 'ImportDeclaration')
    .reduce((accum, node) => {
      for (let specifier of node.specifiers) {
        // Check for aliased imports
        let importName = specifier.local.name;
        if (specifier.imported) {
          importName = specifier.imported.name;
        }

        accum.push({
          importName,
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
