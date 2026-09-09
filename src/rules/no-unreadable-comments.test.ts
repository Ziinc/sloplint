import { RuleTester } from "oxlint/plugins-dev";

import { noUnreadableCommentsRule } from "./no-unreadable-comments.ts";

const tester = new RuleTester({ languageOptions: { parserOptions: { lang: "ts" } } });
const error = { messageId: "unreadableComment" };

const clear = "// Cache the result because recomputing it is slow.";
const fairlyDifficult = "// Users must not pass negative numbers.";
const veryConfusing =
	"// Configure the authentication middleware before adding new routes to the server application.";
const pathological =
	"// Instantiate the polymorphic serialization strategy prior to invoking the asynchronous reconciliation procedure.";

tester.run("anti-slop/no-unreadable-comments (default level)", noUnreadableCommentsRule, {
	valid: [
		`${clear}\nconst x = 1;`,
		`${fairlyDifficult}\nconst x = 1;`,
		"// Skip.\nconst x = 1;",
		"// eslint-disable-next-line no-console because logging here is intentional and expected.\nconsole.log(x);",
		"/**\n * Cache the result because recomputing it is slow.\n */\nconst x = 1;",
	],
	invalid: [
		{ code: `${veryConfusing}\nconst x = 1;`, errors: [error] },
		{ code: `${pathological}\nconst x = 1;`, errors: [error] },
		{
			code: "/**\n * Instantiate the polymorphic serialization strategy prior to invoking the asynchronous reconciliation procedure.\n */\nconst x = 1;",
			errors: [error],
		},
	],
});

tester.run("anti-slop/no-unreadable-comments (strict level)", noUnreadableCommentsRule, {
	valid: [{ code: `${clear}\nconst x = 1;`, options: [{ level: "strict" }] }],
	invalid: [
		{ code: `${fairlyDifficult}\nconst x = 1;`, options: [{ level: "strict" }], errors: [error] },
		{ code: `${veryConfusing}\nconst x = 1;`, options: [{ level: "strict" }], errors: [error] },
	],
});

tester.run("anti-slop/no-unreadable-comments (lenient level)", noUnreadableCommentsRule, {
	valid: [
		{ code: `${clear}\nconst x = 1;`, options: [{ level: "lenient" }] },
		{ code: `${fairlyDifficult}\nconst x = 1;`, options: [{ level: "lenient" }] },
		{ code: `${veryConfusing}\nconst x = 1;`, options: [{ level: "lenient" }] },
	],
	invalid: [{ code: `${pathological}\nconst x = 1;`, options: [{ level: "lenient" }], errors: [error] }],
});
