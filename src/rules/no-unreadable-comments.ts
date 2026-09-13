import { defineRule } from "@oxlint/plugins";
import readability from "text-readability";

import type { Comment } from "@oxlint/plugins";

/** Comments shorter than this carry too little text for a sentence-level score to be meaningful. */
const MIN_WORD_COUNT = 6;

/** Leading tokens that mark a comment as a tool directive rather than prose for a human reader. */
const DIRECTIVE_PATTERN =
	/^(eslint-disable|eslint-enable|@ts-ignore|@ts-expect-error|@ts-nocheck|ts-ignore|ts-expect-error|ts-nocheck|prettier-ignore|istanbul ignore|c8 ignore|v8 ignore|webpackChunkName|webpackPreload|webpackPrefetch|region\b|endregion\b)/i;

type Level = "strict" | "medium" | "lenient";

/** Minimum Flesch Reading Ease score a comment must reach at each severity level. */
const MIN_SCORE_BY_LEVEL: Record<Level, number> = {
	strict: 60,
	medium: 30,
	lenient: 0,
};

function configuredLevel(option: unknown): Level {
	if (typeof option !== "object" || option === null || !("level" in option)) return "medium";
	const level = option.level;
	return level === "strict" || level === "medium" || level === "lenient" ? level : "medium";
}

/** Strip comment syntax, leaving the prose a reader would parse. */
function commentText(comment: Comment): string {
	if (comment.type !== "Block") return comment.value.trim();
	return comment.value
		.split("\n")
		.map((line) => line.replace(/^\s*\*\/?\s?/, ""))
		.map((line) => line.replace(/^@\S+\s*/, ""))
		.join(" ")
		.replace(/\s+/g, " ")
		.trim();
}

function wordCount(text: string): number {
	return text.split(/\s+/u).filter((word) => word.length > 0).length;
}

/** Reject inline and block comments whose prose falls below a configurable readability floor. */
export const noUnreadableCommentsRule = defineRule({
	meta: {
		type: "suggestion",
		docs: {
			description:
				"Require comment prose to clear a Flesch Reading Ease floor so comments stay understandable.",
		},
		messages: {
			unreadableComment:
				"This comment scores {{score}} on the Flesch Reading Ease scale, below the `{{level}}` floor of {{threshold}}. Simplify the wording so a reader does not have to decode it.",
		},
		schema: [
			{
				type: "object",
				properties: {
					level: { type: "string", enum: ["strict", "medium", "lenient"] },
				},
				additionalProperties: false,
			},
		],
		defaultOptions: [{ level: "medium" }],
	},
	createOnce(context) {
		return {
			Program(node) {
				const level = configuredLevel(context.options?.[0]);
				const threshold = MIN_SCORE_BY_LEVEL[level];
				for (const comment of node.comments) {
					if (comment.type === "Shebang") continue;
					const text = commentText(comment);
					if (DIRECTIVE_PATTERN.test(text)) continue;
					if (wordCount(text) < MIN_WORD_COUNT) continue;
					const score = readability.fleschReadingEase(text);
					if (score >= threshold) continue;
					context.report({
						node: comment,
						messageId: "unreadableComment",
						data: { score, level, threshold },
					});
				}
			},
		};
	},
});
