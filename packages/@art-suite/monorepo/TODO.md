# New Feature Ideas

- [ ] Add `art-monorepo install` command that you can run anywhere in the monorepo, and specifically if you run it inside a sub-package, it'll take that context into account. It should work like `npm install` but "do the right thing" for monorepos. In particular:

  - `install package-name` should:
    - [ ] Check if the package is already installed in the root of the monorepo, if not, install it in the root of the monorepo. Note, if the package in question is one of the packages IN the monorepo itself, it is already "installed" and we proceed to the next step.
    - [ ] Once the package is installed, add the correct reference to the new package to the current package.json file.
  - `install` out options should:
    - [ ] in the root of the monorepo, run art-monorepo sync, then run `npm install` (this handles the case if we manually added a package to any package.json file in the monorepo).

- [ ] Make cross-monorepo dependencies not patch-specific. I.e. they should look like this: `"@art-suite/core": "^1.5"`, not `"@art-suite/core": "1.5.3"`
