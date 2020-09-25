let mockFs = require("mock-fs");
let Path = require('path')
let fs = require('fs');
let isDirectory = (file) => fs.statSync(file).isDirectory();

let readFsTree = (path = '') => {
  let out = {}
  fs.readdirSync(path).forEach((fileName) => {
    let pathedFilename = Path.join(path, fileName);
    out[fileName] = isDirectory(pathedFilename) ?
      readFsTree(pathedFilename) :
      fs.readFileSync(pathedFilename).toString()
  });
  return out;
}

mockFs.getTree = readFsTree;
module.exports = mockFs;