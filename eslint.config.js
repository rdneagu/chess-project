import eslint from '@eslint/js';
import globals from 'globals';
import eslintImport from 'eslint-plugin-import';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintReactA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    settings: {
      react: { version: '19.0' },
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.strict, ...tseslint.configs.stylistic, prettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: eslintImport,
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'jsx-a11y': eslintReactA11y,
    },
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...eslintReact.configs['jsx-runtime'].rules,
      ...eslintReactHooks.configs.recommended.rules,
      ...eslintReactA11y.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      curly: 'error',
      'no-console': 'warn',
      'prefer-const': ['error', { destructuring: 'all' }],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] }],
      // Airbnb partial config
      'jsx-quotes': ['error', 'prefer-double'],
      'react/display-name': ['off', { ignoreTranspilerName: false }],
      'react/forbid-dom-props': ['off', { forbid: [] }],
      'react/forbid-prop-types': [
        'error',
        {
          forbid: ['any', 'array', 'object'],
          checkContextTypes: true,
          checkChildContextTypes: true,
        },
      ],
      'react/jsx-boolean-value': ['error', 'never', { always: [] }],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
      // Prfettier
      ...prettier.rules,
    },
  },
);
