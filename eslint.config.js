import eslint from '@eslint/js';
import globals from 'globals';
import eslintImport from 'eslint-plugin-import';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintReactA11y from 'eslint-plugin-jsx-a11y';
import eslintPrettier from 'eslint-config-prettier';
import eslintStylistic from '@stylistic/eslint-plugin';
import eslintAirbnb from './eslint/airbnb-config.js';
import tseslint from 'typescript-eslint';

export default tseslint.config({ ignores: ['eslint', 'dist'] }, eslint.configs.recommended, {
  extends: [...tseslint.configs.strict, ...tseslint.configs.stylistic, ...eslintAirbnb],
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
    '@stylistic': eslintStylistic,
    import: eslintImport,
    react: eslintReact,
    'react-hooks': eslintReactHooks,
    'react-refresh': eslintReactRefresh,
    'jsx-a11y': eslintReactA11y,
  },
  rules: {
    ...eslintReact.configs['jsx-runtime'].rules,
    ...eslintReactRefresh.configs.vite.rules,
    curly: 'error',
    'no-console': 'warn',
    'prefer-const': ['error', { destructuring: 'all' }],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] }],
    ...eslintPrettier.rules,
  },
});
