module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-fallthrough': 'off',
    'prefer-rest-params': 'off',
    'no-regex-spaces': 'off',
    'no-unexpected-multiline': 'off',
    'no-case-declarations': 'off',
    'no-multiple-empty-lines': 'off', // ['error', { max: 1, maxEOF: 0 }]
    'no-trailing-spaces': ['error'],
    'no-misleading-character-class': 'off',
    '@typescript-eslint/no-loss-of-precision': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/semi': ['error'],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  parserOptions: {
    project: './tsconfig.lint.json',
  },
  ignorePatterns: [
    '*.js',
    'public/',
    'dev/inherit/',
    'tmp/',
    'bin/',
    'node_modules',
    'coverage/',
    'storage/',
    'build/',
    'doc/',
  ],
};