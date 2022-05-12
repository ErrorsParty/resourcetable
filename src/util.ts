// Imports
import type { ResourceId } from "./types";

/**
 * Check whether or not a resource ID is valid.
 */
export function isValidResourceId(rid: ResourceId) {
	return (
		Math.floor(rid) === rid &&
		rid > -1 &&
		rid <= Number.MAX_SAFE_INTEGER
	);
}
