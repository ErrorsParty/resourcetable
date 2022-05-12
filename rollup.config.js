// Imports
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

// Configuration

export default {
	input: "./src/index.ts",
	output: [
		{
			dir: "dist/",
			format: "cjs",
			sourcemap: true,
		},
	],
	plugins: [json(), typescript(), resolve(), commonjs(), terser()],
};
