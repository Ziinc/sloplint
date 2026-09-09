declare module "text-readability" {
	interface Readability {
		fleschReadingEase(text: string): number;
		fleschKincaidGrade(text: string): number;
		lexiconCount(text: string, removePunctuation?: boolean): number;
		sentenceCount(text: string): number;
	}

	const readability: Readability;
	export default readability;
}
