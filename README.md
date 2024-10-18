# Art-Suite-Foundations

[![Actions Status](https://github.com/art-suite/art-suite-foundations/actions/workflows/test.yml/badge.svg)](https://github.com/art-suite/art-suite-foundations/actions)

This is the foundational Mono-Repo for the Art-Suite. It contains core libraries used to in the `art-suite-applications` packages as well as `caffeine-script`.

For a list of packages included in this repo:

- [packages](packages) for a list of all the legacy packages in this repo.
- [packages/@art-suite](packages/@art-suite) for a list of the packages migrated into the NPM art-suite namespace so far.

The art-suite was originally created before NPM supported namespaces. Now that NPM has namespaces, I am slowly migrating everything into the [@art-suite](packages/@art-suite) NPM namespace. This has the added advantage that I can break each of these packages up into smaller packages making it much easier to require exactly what you need and nothing more.
