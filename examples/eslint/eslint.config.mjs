import tsParser from "@typescript-eslint/parser";
import antiSlop, { rules as antiSlopRules } from "../../src/index.ts";

export default [
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
		},
		plugins: {
			"anti-slop": antiSlop,
		},
		rules: {
			...antiSlopRules,
		},
	},
];
