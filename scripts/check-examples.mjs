import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const EXAMPLES = [
	{
		dir: "examples/basic",
		command: ["npx", "oxlint", "--config", "oxlint.config.ts", "src"],
		expected: "anti-slop(no-array-filter-map)",
	},
	{
		dir: "examples/eslint",
		install: true,
		command: ["npx", "eslint", "src"],
		expected: "anti-slop/no-array-filter-map",
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

	if (!output.includes(example.expected)) {
		failed = true;
		console.error(`[check-examples] ${example.dir}: expected output to include "${example.expected}"`);
		console.error(output);
		continue;
	}

	console.log(`[check-examples] ${example.dir}: OK`);
}

if (failed) {
	process.exit(1);
}
