// generated by Neptune Namespaces v4.x.x
// file: test/index.js

(module.exports = require('./namespace'))
.includeInNamespace(require('./test'))
.addModules({
  Index:          require('./index'),
  StandardImport: require('./StandardImport')
});
require('./tests');