import { defineConfig } from "oxlint";
import { slopLintRules } from "../../src/index.ts";

export default defineConfig({
	jsPlugins: [{ name: "anti-slop", specifier: "../../src/index.ts" }],
	rules: {
		...slopLintRules,
	},
});
