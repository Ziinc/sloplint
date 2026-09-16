import tsParser from "@typescript-eslint/parser";
import slopLint, { slopLintRules } from "../../src/index.ts";

export default [
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
		},
		plugins: {
			"anti-slop": slopLint,
		},
		rules: {
			...slopLintRules,
		},
	},
];
