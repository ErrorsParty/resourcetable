// Imports
import type { ResourceValue } from "./types";

/**
 * A resource object that can be used inside of a resource table.
 *
 * Developers can extend this class to create custom resource types
 * and use them from a resource table.
 *
 * ```ts
 * class MyResource extends Resource {
 *   name: string;
 *   greet(format = "Hello, %s!"): void {
 *     console.log(format, this.name);
 *   }
 * }
 * ```
 */
export class Resource implements ResourceValue {
	/**
	 * Check whether or not a given resource value is made of *this*
	 * given resource type.
	 * @param value The resource value to check.
	 */
	public static is(value: Resource) {
		return value instanceof this;
	}

	/**
	 * An optional close method that will be called on
	 * `ResourceTable.close(rid, type?)`.
	 */
	public close?(): Promise<void> | void;

	/**
	 * Check whether or not *this* resource value is made of a given
	 * resource type.
	 * @param resource The resource to check against.
	 */
	public is(resource: typeof Resource) {
		return resource.is(this);
	}
}
