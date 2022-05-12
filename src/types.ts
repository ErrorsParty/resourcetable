/** Get the resource value type of a resource constructor. */
export type InferResourceValue<T extends ResourceConstructor> =
	T extends { new (...args: any): infer R } ? R : never;

/**
 * A resource ID an integer that points to a resource in the resource
 * table. The resource table cannot have decimals and must not be
 * less than `0`. The maximum ID varies based on the implementation
 * of the `ResourceTable`.
 */
export type ResourceId = number;

export interface ResourceValue {
	/**
	 * An optional close method that will be called on
	 * `ResourceTable.close(rid, type?)`.
	 */
	close?(): Promise<void> | void;

	/**
	 * Check whether or not *this* resource value is made of a given
	 * resource type.
	 * @param resource The resource to check against.
	 */
	is(resource: ResourceConstructor): boolean;
}

export interface ResourceConstructor {
	is(value: ResourceValue): boolean;
	new (...args: any[]): ResourceValue;
}
