# @art-suite/mock-fs

An extension of https://www.npmjs.com/package/mock-fs with one additional method: `getTree` which returns the current state of the file-system as a hierarchy of objects and strings, exactly the same as the simple format for initializing mock-fs.

```javascript
let mockFs = require("@art-suite/mock-fs");
let fs = require('fs');

mockFs({
  'README.md':  "# My Markdown",
  'empty-dir':  {} // empty directory
});

fs.writeFileSync(".gitignore", "node_modules/");

mockFs.getTree() == {
  'README.md':  "# My Markdown",
  '.gitignore': "node_modules/",
  'empty-dir':  {} // empty directory
}

mockFs.restore()
```