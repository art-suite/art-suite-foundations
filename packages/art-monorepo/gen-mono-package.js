#!/usr/local/bin/node
const glob = require("glob-promise");
const fs = require('fs-extra');
const {readJson} = require('./lib');

const currentPackage = readJson("package.json");
currentPackage.dependencies = {};
let previousSubPackages = {}

const eachFromObject = (obj, f) => {
  let last;
  if (obj) {
    for (k in obj) {
      last = f(obj[k], k)
    }
  }
  return last;
}

const addDep = (type, name, version, subPackage) => {
  // console.log({addDep:{type, name, version, subPackage}})
  const into = currentPackage[type];

  const existingDep = into[name];
  const alreadyHaveDep = !!existingDep;
  const alreadyFileDep = alreadyHaveDep && /^file:/.test(existingDep);
  const settingFileDep = /^file:/.test(version);
  const conflict = alreadyHaveDep && existingDep != version && alreadyFileDep == settingFileDep;

  if (conflict) {
    const previousSubPackage = previousSubPackages[type][name]
    const previousVersion = into[name]
    // console.log({into, type, name, version, subPackage, existingDep, previousSubPackages})
    console.log('CONFLICTING PACKAGE VERSIONS:')
    console.log(`  ${subPackage}: {'${name}': '${version}'}`);
    console.log(`  ${previousSubPackage}: {'${name}': '${previousVersion}'}`);
    throw new Error(`could not add ${type}: {'${name}': '${version}'} from ${subPackage} because it's already '${into[name]}' from ${previousSubPackages[type][name]}`)
  } else if (!alreadyFileDep) {
    // console.log(`set ${type}[${name}] to '${version}'`)
    into[name] = version;
  }
  previousSubPackages[type] = previousSubPackages[type] || {}
  previousSubPackages[type][name] = subPackage;
}

glob("!(node_modules)/*/**/package.json").then((result) => {
  result.forEach(file => {
    const [package, __] = file.split(/\/package.json$/);
    const { name, dependencies, devDependencies } = readJson(file);
    eachFromObject(dependencies, (v, k) => addDep("dependencies", k, v, package));
    eachFromObject(devDependencies, (v, k) => addDep("dependencies", k, v, package));
    addDep("dependencies", name, `file:${package}`);
  });
  fs.writeFileSync("package.json", JSON.stringify(currentPackage, null, '  '));
});