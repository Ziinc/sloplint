# ESLint example

Minimal example of loading the anti-slop plugin into ESLint via a flat config (`eslint.config.mjs`).

Every rule is defined with `defineRule`'s `createOnce` API and the plugin is wrapped with `@oxlint/plugins`' `eslintCompatPlugin` (see `src/index.ts`), which adds an ESLint-compatible `create` method to each rule. That makes the exact same rule implementations usable from plain ESLint — no separate port or reimplementation needed.

`eslint.config.mjs` points the `anti-slop` plugin at `../../src/index.ts` (the rule set in this repository) and enables every generic rule. In a real project, point the import at your vendored copy instead, for example `./tools/eslint/anti-slop/index.ts` — see the root [README](../../README.md) for the manual installation steps.

`src/rules/` contains one file per generic rule, each with one intentional violation of that rule's own `anti-slop/<rule-id>`. `scripts/check-examples.mjs` lints this directory and asserts every rule id in `slopLintRules` shows up in the output, so this example doubles as a regression test that the whole rule set still fires correctly under plain ESLint (not just Oxlint).

Run from this directory:

```bash
npm install
npm run lint
```

Expected output: one error per rule, 18 rule ids total, for example:

```
/path/to/examples/eslint/src/rules/no-array-filter-map.ts
  3:1  error  Avoid consecutive array `filter` and `map` passes. ...  anti-slop/no-array-filter-map
```
