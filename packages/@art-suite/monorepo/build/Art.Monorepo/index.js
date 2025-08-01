// generated by Neptune Namespaces v4.x.x
// file: Art.Monorepo/index.js

(module.exports = require('./namespace'))
.includeInNamespace(require('./Monorepo'))
.addModules({
  Cli:               require('./cli'),
  ColorsLib:         require('./ColorsLib'),
  Commands:          require('./Commands'),
  ExecLib:           require('./ExecLib'),
  Gitignore:         require('./gitignore'),
  Lib:               require('./Lib'),
  NpmApi:            require('./NpmApi'),
  NpmInstall:        require('./npmInstall'),
  StandardImport:    require('./StandardImport'),
  UpdateMonoPackage: require('./UpdateMonoPackage'),
  UpdateSubPackages: require('./UpdateSubPackages'),
  Versions:          require('./versions')
});