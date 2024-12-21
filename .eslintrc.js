module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
  	requireConfigFile: false,
  },
  extends: ['airbnb-base'],
  ignorePatterns: [
  	'dist/',
  	'node_modules',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    indent: 'off',
    'linebreak-style': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    'no-unused-vars': 'warn',
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: true,
      },
    ],
  },
};
