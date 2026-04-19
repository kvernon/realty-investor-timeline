import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';
export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'jest.config.cts',
      'commitlint.config.cjs',
      'wallaby*.*js',
      'release.config.js',
      'lint-staged.config.mjs',
    ],
  },
  js.configs.recommended,
  tsPlugin.configs['flat/eslint-recommended'],
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      semi: 'off',
      '@typescript-eslint/semi': ['error'],
      quotes: [2, 'single'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  prettier,
  {
    files: ['tests/**/*.ts', 'tests_*/**/*.ts'],
    ...jestPlugin.configs['flat/recommended'],
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      '@typescript-eslint/no-var-requires': 0,
    },
  },
  {
    files: ['tests_bench/**/*.ts'],
    rules: {
      'jest/no-done-callback': 'off',
    },
  },
  {
    files: ['jest*.config*.cts'],
    rules: {
      ['@typescript-eslint/no-require-imports']: 'off',
      'jest/no-done-callback': 'off',
    },
  },
];
