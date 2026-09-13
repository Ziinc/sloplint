import { defineConfig } from "oxlint";
import { rules as antiSlopRules } from "../../src/index.ts";

export default defineConfig({
	jsPlugins: [{ name: "anti-slop", specifier: "../../src/index.ts" }],
	rules: {
		...antiSlopRules,
	},
});
