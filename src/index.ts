/**
 * Greet someone.
 * @param name The name of the person to greet.
 * @returns The greet string.
 */
export function greet(name: string) {
	return `Hello, ${name}!`;
}

/**
 * A function that runs if this is the main file.
 */
async function main(args: string[]) {
	for (const name of args) {
		console.log(greet(name));
	}
}

// Run main if this is the main file.
if (require?.main?.filename === __filename) {
	main(process.argv.slice(2)).catch(console.error);
}
