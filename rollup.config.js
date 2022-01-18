import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
	},
	// plugins: [json(), typescript(), commonjs(), nodeResolve()],
	plugins: [json(), typescript(), nodeResolve()],
};
