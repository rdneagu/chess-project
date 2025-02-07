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
    extends: [eslint.configs.recommended, ...tseslint.configs.strict, ...tseslint.configs.stylistic],
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
      ...prettier.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] }],
    },
  },
  prettier,
);
