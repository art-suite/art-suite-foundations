# Art-Monorepo

Art-monorepo is a tool for managing a JavaScript monorepo's dependencies. It is an opinionated tool with one core design principle:

- **All packages in the monorepo should use the same version of any external dependencies.**

Given that principle, it follows that there should only be one `package-lock.json` file and one `node_modules/` folder - in the root of the entire monorepo.

Unlike other monorepo tools, Art-monorepo is flexible about folder structure. It simply scans for `package.json` files in any subfolder, allowing you to organize packages however you want. This makes it easy to group related packages together and selectively run commands on specific package groups based on their paths.

The main usage of art-monorepo is running the `art-monorepo sync-install` command.

Art-monorepo also has handy tools for running commands on all packages such as tests, any npm-script or any shell-command.

## Quick Start Guide

### Add to Existing Repo

You can start adding sub-packages right away to an existing repo without any major refactor. Just be sure to use the `--preserveRootDependencies` option when running `art-monorepo sync`. Here's how:

Install art-monorepo:

```shell
npm install art-monorepo --save-dev
```

Add scripts to your package.json:

```json
{
  "scripts": {
    "monorepo:sync": "npx art-monorepo sync --preserveRootDependencies",
    "monorepo:sync:install": "npx art-monorepo sync-install --preserveRootDependencies",
    "monorepo:sync:reset:install": "npx art-monorepo sync-reset-install --preserveRootDependencies",

    // optional shortcuts to test, build and clean both your core package and all sub-packages
    "monorepo:test": "npm run test && npx art-monorepo test", // test all packages
    "monorepo:build": "npm run build && npx art-monorepo build", // build all packages
    "monorepo:run": "npx art-monorepo run -- ", // npm run XXX on all packages with that script defined
    "monorepo:exec": "npx art-monorepo exec -- " // run shell command XXX on all packages
  }
}
```

### Fresh Mono Repo Quick Start (Recommended)

Although you can use art-monorepo where the root package is also a "code" package. I recommend that the root package should ONLY be fore managing the monorepo. It is generally cleaner and more flexible as it doesn't give one package (the root package) special consideration compared to other, sub-packages.

Install art-monorepo:

```shell
npm install art-monorepo --save-dev
```

Add scripts to your package.json:

```json
{
  "scripts": {
    "sync": "npx art-monorepo sync",
    "sync:install": "npx art-monorepo sync-install",
    "sync:reset:install": "npx art-monorepo sync-reset-install",

    // optional shortcuts to test, build and clean both your core package and all sub-packages
    "test": "npx art-monorepo test", // test all packages
    "build": "npx art-monorepo build", // build all packages
    "monorepo:run": "npx art-monorepo run -- ", // npm run XXX on all packages with that script defined
    "monorepo:exec": "npx art-monorepo exec -- " // run shell command XXX on all packages
  }
}
```

## Running Art-Monorepo

You can run Art-Monorepo anywhere with:

```shell
npx art-monorepo
```

If you install it globally:

```shell
npm install -g art-monorepo
```

You can run it with just:

```shell
art-monorepo
```

## Commands Overview

Extended help is available via the `--help` flag for all commands. Not all options available are listed here, but the command-line help will always be up to date and complete.

### Core Commands

- `art-monorepo sync [--preserveRootDependencies, --quiet]`: Syncs the root package.json with all sub-packages.
- `art-monorepo sync-install [--preserveRootDependencies, --quiet]`: Runs `art-monorepo sync` and then runs `npm install`.
- `art-monorepo sync-reset-install [--preserveRootDependencies, --quiet]`: Full, fresh rebuild of all installed packages in the monorepo.

### Utility Commands

- `art-monorepo build [--folder, --sync, --verbose]`: Runs `npm run build` in every subfolder with a package.json file.
- `art-monorepo test [--folder, --sync, --verbose]`: Runs `npm test` in every subfolder with a package.json file.
- `art-monorepo run X [--folder, --sync, --verbose]`: Runs `npm run X` in all packages.
- `art-monorepo exec X [--folder, --sync, --verbose]`: Run shell command X in every subfolder with a package.json file.
- `art-monorepo versions [--verbose]`: Show all package versions (local and published).
- `art-monorepo check`: Checks that the monorepo is clean (only one package-lock.json and one node_modules folder in the root).
- `art-monorepo clean`: Advanced: Delete all package-lock.json files and node_modules folders in all subfolders.

## Example Usage

### Synchronizing Dependencies

The main use of art-monorepo is to synchronize your monorepo's dependencies. Simply run:

```shell
art-monorepo sync-install
```

Or you can do this in two steps:

```shell
art-monorepo sync
# review how sync updated your package.json files
npm install
```

This ensures all your packages are aligned in terms of dependency versions. It also allows you to develop multiple packages in parallel as any cross-dependencies within the monorepo will be bound to local versions.

#### How Sync Works

Sync ensures:

- All sub-packages use the same version of each external dependency.
- All internal cross-package references are updated to the latest version and linked to use the local packages instead of published npm versions.
- The root package.json includes all external dependencies used in all sub-packages.

Sync is done in three steps:

1. **Clean**: Removes all package-lock.json files and node_modules folders in sub-packages. The root should be the only place with a lockfile and installed modules.
2. **Update sub-packages**: Aligns all sub-package dependency versions with each other and the root. Version resolution:
   - If the package is already present in the root package.json file, that version is used.
   - If the package exists in multiple sub-packages and the versions are different, an error is reported.
3. **Update root**: Merges in any new or updated dependencies from sub-packages and ensures all cross-package dependencies use the "file:..." npm protocol (i.e. all packages are linked to use the local packages instead of published npm versions).

#### About the preserveRootDependencies Option

By default, the root package.json is treated as a monorepo manager only—not an active code package. Its dependencies field is fully regenerated to represent the union of all sub-package dependencies and devDependencies. Its devDependencies field is untouched (reserved for monorepo tools like art-monorepo). Any root dependency not used in a sub-package will be removed.

If the root is also used for coding, use the `--preserveRootDependencies` option. This prevents pruning of root dependencies. Instead, the tool merges sub-package dependencies into the root. You are responsible for removing obsolete dependencies manually.

## Batch Commands

Art-monorepo provide several tools for batch running commands on all your packages. For each of these tools, you can optionally run them on only packages within a given sub-folder (with `--folder XYZ`) and you can optionally run them synchronously, one at a time (with `--sync`). By default they will all run in parallel.

By default, the outputs of commands that succeed are not shown. Use `--verbose` to show the outputs of all commands.

### Running Tests Across all Sub Packages

```shell
art-monorepo test
```

This command executes `npm run test` in every subfolder containing a package.json file.

### Running Scripts on all Sub Packages

```shell
art-monorepo run script-name
```

If a package doesn't have a script with the matching name, it'll just be skipped.

```shell
> art-monorepo run foobar
FOOBARING: 36 packages
SKIPPED: packages/neptune-namespaces-runtime (package.json does not have a 'foobar' script)
SKIPPED: packages/neptune-namespaces (package.json does not have a 'foobar' script)

RESULTS:
  succeeded: 0
  skipped: 2
```

### Running Arbitrary Commands

```shell
art-monorepo exec "ls -la" [--folder, --sync, --verbose]
```

Execute any shell command in all packages of the monorepo. If you provide the `--folder` argument, it will only run the command on packages within that subpath. Any options you wish to pass to your command should be within the quoted command itself. E.g.: `"ls -la"`.

## Full Reset and Rebuild

If you encounter issues with npm creating multiple package-lock.json files or node_modules folders, you can perform a complete reset:

```shell
art-monorepo sync-reset-install
```

This command:

1. **Synchronizes**: all package.json files in the monorepo
2. **Resets**: removes all `./package-lock.json` and `./node_modules/` in the monorepo, including the root
3. **Installs**: Runs `npm install` in the root
4. **Checks**: that the monorepo is now clean (only one package-lock.json and one node_modules folder in the root)

> **NOTE 1**: This rebuilds the root `./package-lock.json`, so some dependencies may be updated.
> **NOTE 2**: This triggers a fresh install of all packages in the monorepo, so it may be slow if you have a lot of packages.

## Common Activities

### Add a Dependency to a Sub-Package

1. `cd packages/foo` into the sub-package's folder
2. `npm install xyz` your dependency - this will create a temporary node_modules/ and package-lock.json, but that's OK
3. `cd ../..` back to the root
4. `art-monorepo sync-install`
   - syncs the dependency into the root package.json
   - removes the temporary sub-package's node_modules/ and package-lock.json
   - installs the new dependency in the root node_modules/ and package-lock.json

### Add a new Sub-Package

1. Create a new folder and create files following the pattern of one of the other sub-packages. Most importantly, the `name` in the package.json file must be unique and the name you plan to use to import/require that package elsewhere.
2. In the root: `art-monorepo sync-install`

### Check Monorepo Health

```shell
art-monorepo check
```

This verifies that your monorepo follows the core principle - only one package-lock.json and one node_modules folder in the root.

### View Package Versions

```shell
art-monorepo versions
```

This shows all local and published versions of all packages, and if they are out of sync, a brief status on what is different. This is a powerful tool if you are publishing many packages and are trying to keep them all in sync.

## Tricks

### Publish all Packages in Sync

Sometimes I just want a quick way to publish all of my packages up to date and in sync with each other. This short script does that fairly well and works in most cases.

```shell
art-monorepo exec `npm version patch` # version bump everything - just in case
art-monorepo sync                     # sync all cross-dependencies to use the latest version
art-monorepo exec `npm publish`       # publish!
git commit . -m 'patched, synced and published all packages'
```
