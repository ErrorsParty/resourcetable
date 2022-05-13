// Imports
import type {
	InferResourceValue,
	ResourceConstructor,
	ResourceId,
	ResourceValue,
} from "./types";
import { BadResourceIdError } from "./BadResourceIdError";
import { isValidResourceId } from "./util";

export class ResourceTable {
	/** The resources stored on the table. */
	#resources = new Map<ResourceId, ResourceValue>();
	/**
	 * IDs that has been dropped, this is used to get a resource ID
	 * quicker and use smaller IDs when possible.
	 */
	#dropped = [] as ResourceId[];
	/** The suggested next ID. */
	#next = 0;

	/** Get the next available resource id. */
	#nextId(iterations = 0): ResourceId {
		if (this.#dropped.length) return this.#dropped.shift()!;
		if (iterations === 2 && this.#next === Number.MAX_SAFE_INTEGER) {
			throw new Error("No available resource IDs!");
		}
		if (this.#resources.has(this.#next)) {
			if (this.#next === Number.MAX_SAFE_INTEGER) {
				iterations++;
				this.#next = 0;
			} else this.#next++;
			return this.#nextId(iterations);
		}
		const rid = this.#next;
		if (this.#next === Number.MAX_SAFE_INTEGER) this.#next = 0;
		else this.#next++;
		return rid;
	}

	/**
	 * Delete a resource from the resource table and add the resource
	 * id to the dropped IDs array.
	 */
	#delete(rid: ResourceId) {
		if (this.#resources.delete(rid)) this.#dropped.push(rid);
	}

	/**
	 * Get any resource from the resource table with a given resource
	 * ID.
	 * @param rid The resource ID to get.
	 */
	public get(rid: ResourceId): ResourceValue | null;
	/**
	 * Get a resource from the resource table with a specific resource
	 * type and ID.
	 * @param rid The resource ID to get.
	 * @param type The resource type.
	 */
	public get<T extends ResourceConstructor>(
		rid: ResourceId,
		type: T,
	): InferResourceValue<T> | null;
	/**
	 * Get a resource from the resource table with a specific resource
	 * type and ID.
	 * @param rid The resource ID to get.
	 * @param type The resource type.
	 */
	public get<T extends ResourceConstructor>(
		rid: ResourceId,
		type?: T,
	): InferResourceValue<T> | null;
	public get(
		rid: ResourceId,
		type?: ResourceConstructor,
	): ResourceValue | null {
		if (!isValidResourceId(rid)) throw new BadResourceIdError(rid);
		const r = this.#resources.get(rid);
		if (!r) return null;
		if (type && !r.is(type)) return null;
		return r;
	}

	/**
	 * Remove and close a resource from the resource table.
	 * @param rid The resource ID to close.
	 */
	public async remove(rid: ResourceId): Promise<void>;
	/**
	 * Remove and close a resource from the resource table,
	 * only if the resource is of a given resource type.
	 * @param rid The resource ID to close.
	 * @param type The resource type.
	 */
	public async remove(
		rid: ResourceId,
		type: ResourceConstructor,
	): Promise<void>;
	/**
	 * Remove and close a resource from the resource table. If a
	 * resource type is provided than the resource will only be dropped
	 * if the resource is an instance of the resource type.
	 * @param rid The resource ID to close.
	 * @param type An optional resource type.
	 */
	public async remove(
		rid: ResourceId,
		type?: ResourceConstructor,
	): Promise<void>;
	public async remove(
		rid: ResourceId,
		type?: ResourceConstructor,
	): Promise<void> {
		if (!isValidResourceId(rid)) throw new BadResourceIdError(rid);
		const r = this.get(rid, type);
		if (!r) return;
		this.#delete(rid);
		await r.close?.();
	}

	/**
	 * Get any resource from the resource table with a given resource
	 * ID or throw if the resource cannot be found.
	 * @param rid The resource ID to get.
	 */
	public getOrThrow(rid: ResourceId): ResourceValue;
	/**
	 * Get a resource from the resource table with a specific resource
	 * type and ID or throw if the resource cannot be found or has an
	 * invalid resource type.
	 * @param rid The resource ID to get.
	 * @param type The resource type.
	 */
	public getOrThrow<T extends ResourceConstructor>(
		rid: ResourceId,
		type: T,
	): InferResourceValue<T>;
	/**
	 * Get a resource from the resource table with a specific resource
	 * type and ID or throw if the resource cannot be found or has an
	 * invalid resource type.
	 * @param rid The resource ID to get.
	 * @param type The resource type.
	 */
	public getOrThrow<T extends ResourceConstructor>(
		rid: ResourceId,
		type?: T,
	): InferResourceValue<T>;
	public getOrThrow(
		rid: ResourceId,
		type?: ResourceConstructor,
	): ResourceValue {
		if (!isValidResourceId(rid)) throw new BadResourceIdError(rid);
		const r = this.get(rid, type);
		if (!r) throw new BadResourceIdError(rid);
		return r;
	}

	/**
	 * Add a new resource to the resource table.
	 * @param resource The resource to add.
	 */
	public add(resource: ResourceValue): ResourceId {
		const rid = this.#nextId();
		this.#resources.set(rid, resource);
		return rid;
	}

	/**
	 * Iterate over all resources with a certain type.
	 * @param type The type to iterate over.
	 */
	public *of<T extends ResourceConstructor>(
		type: T,
	): Generator<
		[key: ResourceId, value: InferResourceValue<T>],
		void,
		unknown
	> {
		for (const [rid, resource] of this.#resources) {
			if (!resource.is(type)) {
				continue;
			}
			yield [rid, resource as InferResourceValue<T>];
		}
	}

	/** Iterate over all resources in the resource table. */
	public *[Symbol.iterator]() {
		for (const [rid, resource] of this.#resources) {
			yield [rid, resource as ResourceValue];
		}
	}
}
