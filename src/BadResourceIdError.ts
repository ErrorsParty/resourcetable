// Imports
import type { ResourceId } from "./types";

/**
 * An error that indicates a provided resource ID is invalid,
 * missing or of an invalid resource type.
 */
export class BadResourceIdError extends Error {
	public constructor(public readonly rid: ResourceId) {
		super(`Invalid resource ID '${rid}'`);
	}
}
BadResourceIdError.prototype.name = "BadResourceId";
