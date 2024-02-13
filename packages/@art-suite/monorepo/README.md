# Art-Monorepo

Art-Monorepo is an opinionated tool designed to streamline the management of JavaScript monorepos by ensuring a unified approach to handling dependencies. It emphasizes simplicity and flexibility in monorepo structure, allowing you to focus on development rather than configuration.

## Core Principle

At the heart of Art-Monorepo is a simple yet powerful principle:

- **Unified Dependency Versions:** Ensure all packages in the monorepo use the same version of any external dependencies, leading to a single `package-lock.json` and one `node_modules/` folder at the root of your monorepo.
-

## Features

- **Dependency Synchronization:** Syncs all package.json files within the monorepo to use identical versions of external dependencies.
- **Simplified Structure:** Operates with any folder structure, automatically detecting package.json files in subfolders.
- **Efficient Commands:** Provides commands for cleaning, synchronizing dependencies, running tests, and executing arbitrary commands across all packages.
- **Automatic Cross-Dependencies:** It allows you to develop multiple packages in parallel as any cross-dependencies within the monorepo will automatically be bound to local versions.

## Installation

To get started with Art-Monorepo, install it globally via npm:

```bash
npm install -g @art-suite/monorepo
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

```bash
art-monorepo sync
npm install
```

This ensures all your packages are aligned in terms of dependency versions. It also allows you to develop multiple packages in parallel as any cross-dependencies within the monorepo will be bound to local versions.

### Updating Dependencies

```bash
npm update # + any additional options
art-monorepo sync
```

After updating NPM, be sure to sync those updates to all your sub-packages.

### Running Tests Across Packages

```bash
art-monorepo test
```

This command executes npm test in every subfolder containing a package.json file.

### Running Arbitrary Commands

```bash
art-monorepo run --command "<your_command_here>" [--path "<sub_path>"] [--verbose]
```

Execute any shell command in all packages of the monorepo. If you provide the path argument, it will only run the command on packages within that subpath. Any options you wish to pass to your command should be within the quoted command itself. E.g.: "ls -la".
By default, the outputs of commands that succeed are not shown. Use verbose to show the outputs of all commands.

## Advanced Usage

`art-monorepo sync` does three unique steps. You can run them individually if you wish:

1. `art-monorepo clean`: Deletes all package-lock.json files and node_modules folders in subfolders.
2. `art-monorepo update-sub-packages`: Update the root package.json file based on all the package.json files in sub-folders.
3. `art-monorepo update-mono-package`: Update all package.json files in sub-folders to match the root package.json file.
