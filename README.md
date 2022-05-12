# errorsparty-resources

This package lets you create a resource table of which you can add or remove
resources from. The resources can be used across your project and other packages
if the resource table is shared with them.

## Usage

1. Create a resource table.

```ts
const myResourceTable = new ResourceTable();
```

2. Create a new resource type.

```ts
class PersonResource extends Resource {
  public constructor(public readonly name: string) {
    super();
  }

  public greet(format = "Hello, %s!") {
    console.log(format, this.name);
  }
}
```

3. Add a resource to the resource table.

```ts
const rid = myResourceTable.add(new PersonResource("John"));
```

4. An eternity later ... use the resource.

```ts
const resource = myResourceTable.getOrThrow(rid, PersonResource);
resource.greet();
// Hello, John!
```

5. Remove the resource when it is no longer needed.

```ts
await myResourceTable.remove(rid, PersonResource);
```
