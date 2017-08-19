const babylon = require('babylon');

/**
 * @typedef {Object} Import
 * @property {String} name The name of the imported object
 * @property {String} path The path as specified in the import statement 
 */

/**
  * Accepts a source code String and returns a Babylon AST.
  * @param {String} sourceCode Source Code
  * @return {Object} Babylon AST
  */
const parse = sourceCode => {
  return babylon.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'objectRestSpread'],
  });
};

/**
 * Return all used JSX elements by name found in the AST.
 * @param {Object} ast Babylon AST
 * @return {String[]} List of JSX element names
 */
const getJsxElementNames = ast => {
  return ast.tokens.filter(token => token.type.label === 'jsxName').map(token => token.value);
};

/**
 * Parse an AST and return a list of all imports
 * that may represent JavaScript modules. Filtering is 
 * based on a blacklist of popular web extensions. 
 * It is not possible to determine if a module contains
 * JavaScript code unless the contents of the file are
 * loaded and parsed and that is not the architecture
 * of this project. 
 * As such, this function may return false positives.
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
          name: importName,
          path: node.source.value,
        });
      }

      return accum;
    }, [])
    .filter(jsModuleImport);
};

/**
 * Returns true if the path of the import does
 * not match a set of hardcoded extensions 
 * names prefixed by a dot character.
 * @param {Import} theImport Import descriptor
 */
const jsModuleImport = theImport => {
  return !theImport.path.match(
    /\.(json|xml|css|less|sass|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/i
  );
};

module.exports = {
  parse,
  getImports,
  getJsxElementNames,
};
