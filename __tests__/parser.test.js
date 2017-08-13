const parser = require('../src/parser');
const fs = require('fs');
const path = require('path');

const resources = fs.readdirSync(path.resolve('__tests__', 'resources'));
const sources = resources.reduce((accum, testFilename) => {
  const sourceCode = fs.readFileSync(path.resolve('__tests__', 'resources', testFilename), {
    encoding: 'utf8',
  });
  accum[testFilename] = sourceCode;

  return accum;
}, {});

describe('parser', () => {
  describe('.parse', () => {
    Object.keys(sources).forEach(testFilename => {
      it(`should match resources/${testFilename} snapshot`, () => {
        expect(parser.parse(sources[testFilename])).toMatchSnapshot();
      });
    });
  });

  describe('.getImports', () => {
    Object.keys(sources).forEach(testFilename => {
      it(`should match resources/${testFilename} snapshot`, () => {
        const ast = parser.parse(sources[testFilename]);
        expect(parser.getImports(ast)).toMatchSnapshot();
      });
    });
  });
});
