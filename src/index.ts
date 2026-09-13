import { eslintCompatPlugin } from "@oxlint/plugins";

import { noArrayFilterMapRule } from "./rules/no-array-filter-map.ts";
import { noReduceAccumulatorCopyRule } from "./rules/no-reduce-accumulator-copy.ts";
import { noChainedTypeAssertionsRule } from "./rules/no-chained-type-assertions.ts";
import { noConditionalEmptyObjectSpreadRule } from "./rules/no-conditional-empty-object-spread.ts";
import { noKnownValueWideningRule } from "./rules/no-known-value-widening.ts";
import { noModuleMockingRule } from "./rules/no-module-mocking.ts";
import { noObjectParametersRule } from "./rules/no-object-parameters.ts";
import { noReflectApplyRule } from "./rules/no-reflect-apply.ts";
import { noReflectGetRule } from "./rules/no-reflect-get.ts";
import { noRuntimeTypeofRule } from "./rules/no-runtime-typeof.ts";
import { noForbiddenTermInSymbolNamesRule } from "./rules/no-shape-in-symbol-names.ts";
import { noUnknownParametersRule } from "./rules/no-unknown-parameters.ts";
import { noUnknownReturnsRule } from "./rules/no-unknown-returns.ts";
import { noUnknownTypeAliasesRule } from "./rules/no-unknown-type-aliases.ts";
import { noUnreadableCommentsRule } from "./rules/no-unreadable-comments.ts";
import { noUnsafeDictionaryTypeRule } from "./rules/no-unsafe-dictionary-type.ts";
import { noWidenThenAssertRule } from "./rules/no-widen-then-assert.ts";
import { requireSafetyCommentForTypeAssertionRule } from "./rules/require-safety-comment-for-type-assertion.ts";

const ruleImplementations = {
	"no-array-filter-map": noArrayFilterMapRule,
	"no-reduce-accumulator-copy": noReduceAccumulatorCopyRule,
	"no-chained-type-assertions": noChainedTypeAssertionsRule,
	"no-conditional-empty-object-spread": noConditionalEmptyObjectSpreadRule,
	"no-known-value-widening": noKnownValueWideningRule,
	"no-module-mocking": noModuleMockingRule,
	"no-object-parameters": noObjectParametersRule,
	"no-reflect-apply": noReflectApplyRule,
	"no-reflect-get": noReflectGetRule,
	"no-runtime-typeof": noRuntimeTypeofRule,
	"no-unsafe-dictionary-type": noUnsafeDictionaryTypeRule,
	"no-shape-in-symbol-names": noForbiddenTermInSymbolNamesRule,
	"no-unknown-parameters": noUnknownParametersRule,
	"no-unknown-returns": noUnknownReturnsRule,
	"no-unknown-type-aliases": noUnknownTypeAliasesRule,
	"no-unreadable-comments": noUnreadableCommentsRule,
	"no-widen-then-assert": noWidenThenAssertRule,
	"require-safety-comment-for-type-assertion": requireSafetyCommentForTypeAssertionRule,
};

/** Generic Oxlint rules that reject low-evidence and low-signal implementation patterns. */
const antiSlopPlugin = eslintCompatPlugin({
	meta: { name: "anti-slop" },
	rules: ruleImplementations,
});

export default antiSlopPlugin;

/**
 * Every generic rule enabled at `"error"`, keyed by its `anti-slop/` rule id.
 * Spread into an Oxlint config's `rules` object alongside the plugin registration.
 */
export const rules: Record<string, "error"> = Object.fromEntries(
	Object.keys(ruleImplementations).map((name) => [`anti-slop/${name}`, "error"]),
);
