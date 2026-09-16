# ESLint example

Minimal example of loading the anti-slop plugin into ESLint via a flat config (`eslint.config.mjs`).

Every rule is defined with `defineRule`'s `createOnce` API and the plugin is wrapped with `@oxlint/plugins`' `eslintCompatPlugin` (see `src/index.ts`), which adds an ESLint-compatible `create` method to each rule. That makes the exact same rule implementations usable from plain ESLint — no separate port or reimplementation needed.

`eslint.config.mjs` points the `anti-slop` plugin at `../../src/index.ts` (the rule set in this repository) and enables every generic rule. In a real project, point the import at your vendored copy instead, for example `./tools/eslint/anti-slop/index.ts` — see the root [README](../../README.md) for the manual installation steps.

`src/users.ts` contains one intentional violation of `anti-slop/no-array-filter-map`.

Run from this directory:

```bash
npm install
npm run lint
```

Expected output:

```
/path/to/examples/eslint/src/users.ts
  13:22  error  Avoid consecutive array `filter` and `map` passes. ...  anti-slop/no-array-filter-map
```
