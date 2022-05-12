# TypeScript Package Starter

This is a quick template to get started developing on typescript projects on
Node.js

It contains configurations for the following:

- Visual Studio Code
- ESLint
- Prettier
- TypeScript

## Getting Started

### 1. Fork this repository.

### 2. Download the repository.

```sh
git clone git@github.com:user/repository.git my-project
```

### 3. Navigate into the directory.

```sh
cd my-project
```

### 4. Install dependencies.

```sh
npm install
```

### 5. Change the properties in `package.json`.

> **Note!** Do not change the version property!

#### A) Change the `name` property.

Change the `name` property to wherever you want the package released to on NPM.

#### B) Change the `description` property.

Change the `description` property. This will be shown on NPM.

#### C) Change the `author` property.

Change the `author` property. This will be shown on NPM.

#### D) Change the `contributors` property.

Change the `contributors` property. This will be shown on NPM.

### 5. Change this `README.md` file.

Make your own `README.md` file that explains your project and how to use it.

### 6. Commit your changes.

```sh
git commit -m "Initiated project."
```

### 7. Update your changelog and commit.

Firstly copy the commit hash.

```md
## [Unreleased]

- docs(init): Initiated the project. #commit by @contributor
```

```sh
git commit CHANGELOG.md
```

### 8. Start coding.

```diff
- 	return `Hello, ${name}!`;
+ 	return `¡Hola, ${name}!`;
```

### 9. Commit your changes.

```sh
git commit src/index.ts
```

### 10. Update your changelog and commit.

Firstly copy the commit hash.

```md
## Unreleased

- chore(greet): Greet in Spanish. #commit2 by @contributor
- docs(init): Initiated the project. #commit1 by @contributor
```

```sh
git commit CHANGELOG.md
```

### 11. Make a new release.

```sh
git commit --allow-empty -m "Release #patch"
```

The commit message can include `#pre`, `#patch`, `#minor` or `#major` to update
the version and release.

The lifecycle for the CI is the following:

1. update version (only on release)
   1. Fetch current version
   2. Apply version update on current version
2. update changelog and package.json (only on release)
3. prepare
4. fmt check
5. lint check
6. build
7. gzip `dist` (only on release)
8. `git tag` and create release draft (only on release)
9. publish (only on release)
