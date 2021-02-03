module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'prettier/prettier': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
