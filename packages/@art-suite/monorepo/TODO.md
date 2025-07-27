# Non-order-changing package.json read/write tool

Some parts of package.json - ORDER MATTERS - OMG, WTF? That's non-standard JSON but it is what it is.

```
 "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
```

# "safety"

`art-monorepo sync` should refuse to run if it's not in a folder with a package.json (and maybe a .git)

# art-monorepo.config.js

We are going to start needing a config:

- set preserveRootDependencies always on
- set packages to ignore

# New Feature Ideas

- [ ] Add `art-monorepo install` command that you can run anywhere in the monorepo, and specifically if you run it inside a sub-package, it'll take that context into account. It should work like `npm install` but "do the right thing" for monorepos. In particular:

  - `install package-name` should:
    - [ ] Check if the package is already installed in the root of the monorepo, if not, install it in the root of the monorepo. Note, if the package in question is one of the packages IN the monorepo itself, it is already "installed" and we proceed to the next step.
    - [ ] Once the package is installed, add the correct reference to the new package to the current package.json file.
  - `install` out options should:
    - [ ] in the root of the monorepo, run art-monorepo sync, then run `npm install` (this handles the case if we manually added a package to any package.json file in the monorepo).

- [ ] Make cross-monorepo dependencies not patch-specific. I.e. they should look like this: `"@art-suite/core": "^1.5"`, not `"@art-suite/core": "1.5.3"`

# Fix - Preserve Package.Json order

ChatGPT suggests:

The main problem is the exports prop - order matters to npm:

```json
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
```

```javascript
const fs = require("fs");
const { parse, stringify } = require("comment-json");
const sortPackageJson = require("sort-package-json");

const packageJsonPath = "package.json";
const raw = fs.readFileSync(packageJsonPath, "utf8");
const parsed = parse(raw);

// ✅ Safe edits
parsed.repository = {
  type: "git",
  url: "https://github.com/your-org/your-repo.git",
};

parsed.dependencies = parsed.dependencies || {};
parsed.dependencies["your-package"] = "^1.2.3";

parsed.devDependencies = parsed.devDependencies || {};
parsed.devDependencies["vitest"] = "^3.1.0";

// ✅ Sort using npm's preferred order
const sorted = sortPackageJson(parsed);

// ✅ Write back with preserved formatting
fs.writeFileSync(packageJsonPath, stringify(sorted, null, 2) + "\n");
```
