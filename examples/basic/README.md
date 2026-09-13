# Basic example

Minimal example of loading the anti-slop plugin into Oxlint via `jsPlugins` in `oxlint.config.ts`.

`oxlint.config.ts` points `jsPlugins` at `../../src/index.ts` (the rule set in this repository) and enables every generic rule. In a real project, point the specifier at your vendored copy instead, for example `./tools/oxlint/anti-slop/index.ts` — see the root [README](../../README.md) for the manual installation steps.

`src/users.ts` contains one intentional violation of `anti-slop/no-array-filter-map`.

Run from this directory:

```bash
npx oxlint --config oxlint.config.ts src
```

Expected output:

```
src/users.ts:13:22: error anti-slop(no-array-filter-map): Avoid consecutive array `filter` and `map` passes. ...
```
