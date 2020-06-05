#!/usr/local/bin/node
const glob = require("glob-promise");
const {log} = require('art-standard-lib');
const {readJson, execShellCommand} = require('./lib');

let packages = [];

glob("!(node_modules)/*/**/package.json").then((result) => {
  result.forEach(file => {
    const [package, __] = file.split(/\/package.json$/);
    const { scripts } = readJson(file);
    if (scripts && scripts.test) {
      packages.push(file.split('/package.json')[0])
    }
  });
}).then(() => {

  let testPackage = (package) => {
    log({TEST: package});
    return execShellCommand(`cd ${package};npm test`).then(
      () => log({PASS: package}),
      () => log.error({FAIL: package})
      )
  }

  Promise.all(packages.map(testPackage))
})