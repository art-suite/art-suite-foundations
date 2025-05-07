# Art-Monorepo

Art-Monorepo is an opinionated tool designed to streamline the management of JavaScript monorepos by ensuring a unified approach to handling dependencies. It emphasizes simplicity and flexibility in monorepo structure, allowing you to focus on development rather than configuration.

## Core Principle

At the heart of Art-Monorepo is a simple yet powerful principle:

- **Unified Dependency Versions:** Ensure all packages in the monorepo use the same version of any external dependencies, leading to a single `package-lock.json` and one `node_modules/` folder at the root of your monorepo.

## Features

- **Dependency Synchronization:** Syncs all package.json files within the monorepo to use identical versions of external dependencies.
- **Simplified Structure:** Operates with any folder structure, automatically detecting package.json files in sub-folders.
- **Efficient Commands:** Provides commands for cleaning, synchronizing dependencies, running tests, and executing arbitrary commands across all packages.
- **Automatic Cross-Dependencies:** It allows you to develop multiple packages in parallel as any cross-dependencies within the monorepo will automatically be bound to local versions.

## Quick Start Guide

You can start adding sub-packages right away to an existing repo w/o any major refactor. Just be sure to use the `--preserveRootDependencies` option when running `art-monorepo sync`. Here's how:

Install art-monorepo:

```shell
npm install @art-suite/monorepo --save-dev
```

Add scripts to your package.json:

```json
{
  "scripts": {
    "monorepo:sync": "npx @art-suite/monorepo sync --preserveRootDependencies",
    "monorepo:sync:install": "npm run monorepo:sync && npm install",

    // optional shortcuts to test, build and clean both your core package and all sub-packages
    "monorepo:test": "npm run test && npx @art-suite/monorepo test",
    "monorepo:build": "npm run build && npx @art-suite/monorepo build",
    "monorepo:clean": "npm run clean && npx @art-suite/monorepo clean"
  }
}
```

## Running Art-Monorepo

You can run Art-Monorepo anywhere with:

```shell
npx @art-suite/monorepo
```

If you install it globally:

```shell
npm install -g @art-suite/monorepo
```

You can run it with just:

```shell
art-monorepo
```

## Commands Overview

- `art-monorepo sync`: Synchronizes all package.json files with the root package.json.
- `art-monorepo test`: Runs tests across all packages.
- `art-monorepo versions`: Displays local and published versions of all packages, highlighting any discrepancies.
- `art-monorepo run`: Runs a specified command in every package.

## Example Usage

Extended help is available via the --help flag for all commands. Not all options available are listed here, but the command-line help will always be up to date and complete.

### Synchronizing Dependencies

The main use of art-monorepo is to synchronize your monorepo's dependencies. Simply run:

```shell
art-monorepo sync
npm install
```

This ensures all your packages are aligned in terms of dependency versions. It also allows you to develop multiple packages in parallel as any cross-dependencies within the monorepo will be bound to local versions.

> NOTE: Occasionally you might need to run sync again after an `npm install`.

### Running Tests Across all Sub Packages

```shell
art-monorepo test
```

This command executes npm test in every subfolder containing a package.json file.

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
art-monorepo run --command "<your_command_here>" [--path "<sub_path>"] [--verbose]
```

Execute any shell command in all packages of the monorepo. If you provide the path argument, it will only run the command on packages within that subpath. Any options you wish to pass to your command should be within the quoted command itself. E.g.: "ls -la".
By default, the outputs of commands that succeed are not shown. Use verbose to show the outputs of all commands.

## Common Activities

### Add a Dependency to a Sub-Package

1. `cd packages/foo` into the sub-package's folder
2. `npm install xyz` your dependency - this will create a temporary node_modules/ and package-lock.json, but that's OK
3. `cd ../..` back to the root
4. `art-monorepo sync; npm install`
   - syncs the dependency into the root package.json
   - removes the temporary sub-package's node_modules/ and package-lock.json
   - installs the new dependency in the root node_modules/ and package-lock.json

### Add a new Sub-Package

1. Create a new folder and create files following the pattern of one of the other sub-packages.
2. In the root: `art-monorepo sync; npm install`
