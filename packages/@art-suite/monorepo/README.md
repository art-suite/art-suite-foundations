# @art-suite/monorepo

An opinionated, yet simple way to manage monorepos of JavaScript projects which use package.json.

1. All dependencies are synced across all packages to be the same version.
1. Only one package-lock.json file is checked in - the one in the root that lists all dependencies of all packages.
1. Only one node_modules/ folder is needed - again, in the root.
1. Sub-packages can exist anywhere in the tree. Organize them as you like.

# Commands

- `art-monorepo sync` - update the root package.json and package-lock.json
  from all sub-packages
  - Runs all three sub commands: `clean`, `update-sub-packages`, and `update-mono-package` in that order
- `art-monorepo clean` - clean up any dangling `node_modules/` and `package-lock.json` files in sub-folders.
- `art-monorepo test` - run `npm test` in every sub-project in parallel
- `art-monorepo run --command foo` - run `npm run foo` in every sub-project in parallel
