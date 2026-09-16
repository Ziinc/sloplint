import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

import { slopLintRules } from "../src/index.ts";

const EXAMPLES = [
	{
		dir: "examples/basic",
		command: ["npx", "oxlint", "--config", "oxlint.config.ts", "src"],
		expected: ["anti-slop(no-array-filter-map)"],
	},
	{
		dir: "examples/eslint",
		install: true,
		command: ["npx", "eslint", "src"],
		expected: Object.keys(slopLintRules),
	},
];

let failed = false;

for (const example of EXAMPLES) {
	if (example.install && !existsSync(`${example.dir}/node_modules`)) {
		const install = spawnSync("npm", ["install"], { cwd: example.dir, encoding: "utf8" });
		if (install.status !== 0) {
			failed = true;
			console.error(`[check-examples] ${example.dir}: npm install failed`);
			console.error(`${install.stdout}${install.stderr}`);
			continue;
		}
	}

	const result = spawnSync(example.command[0], example.command.slice(1), {
		cwd: example.dir,
		encoding: "utf8",
	});

	const output = `${result.stdout}${result.stderr}`;
	const missing = example.expected.filter((expected) => !output.includes(expected));

	if (missing.length > 0) {
		failed = true;
		console.error(`[check-examples] ${example.dir}: expected output to include ${missing.join(", ")}`);
		console.error(output);
		continue;
	}

	console.log(`[check-examples] ${example.dir}: OK (${example.expected.length} rule id(s) verified)`);
}

if (failed) {
	process.exit(1);
}
