import { eslintCompatPlugin } from "@oxlint/plugins";

import { noServiceConstructorImportsRule } from "./rules/no-service-constructor-imports.ts";

const ruleImplementations = {
	"no-service-constructor-imports": noServiceConstructorImportsRule,
};

/** Opt-in Oxlint rules for Effect service and Layer architecture. */
const antiSlopEffectPlugin = eslintCompatPlugin({
	meta: { name: "anti-slop-effect" },
	rules: ruleImplementations,
});

export default antiSlopEffectPlugin;

/**
 * Every Effect rule enabled at `"error"`, keyed by its `anti-slop-effect/` rule id.
 * Spread into an Oxlint config's `rules` object alongside the plugin registration.
 */
export const rules: Record<string, "error"> = Object.fromEntries(
	Object.keys(ruleImplementations).map((name) => [`anti-slop-effect/${name}`, "error"]),
);
