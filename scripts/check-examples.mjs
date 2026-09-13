import { spawnSync } from "node:child_process";

const EXAMPLES = [
	{
		dir: "examples/basic",
		expected: "anti-slop(no-array-filter-map)",
	},
];

let failed = false;

for (const example of EXAMPLES) {
	const result = spawnSync("npx", ["oxlint", "--config", "oxlint.config.ts", "src"], {
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
