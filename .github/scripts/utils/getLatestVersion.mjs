// Imports
import semver from "semver";

export default async function getLatestVersion(origin) {
	const { stdout: tagsStr } =
		await $`git ls-remote -q --tags ${origin}`;
	console.log(tagsStr);
	if (!tagsStr) return null;
	return semver
		.sort(
			tagsStr
				.trim()
				.split(/[\r\n]+/g)
				.map((str) => str.substring(41))
				.filter((str) => str.substring(0, 10) === "refs/tags/")
				.map((str) => str.substring(10))
				.filter((str) => semver.valid(str) !== null)
				.map((str) =>
					semver.parse(str, {
						loose: false,
						includePrerelease: true,
					}),
				),
			{ includePrerelease: true, loose: false },
		)
		.pop().version;
}

const inc = semver.inc;
const valid = semver.valid;
const parse = semver.parse;

export { inc, valid, parse };
