export default {
  rules: {
    // @override: Enforce strictness for all types of lines
    // Specify curly brace conventions for all control statements
    // https://eslint.org/docs/rules/curly
    curly: ['error'],

    // Require switch-case statements to be exhaustive
    // https://typescript-eslint.io/rules/switch-exhaustiveness-check/
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    // Enforce a convention in the order of require() / import statements.
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] }],

    // @override: Turned off because of the way vite handles imports from public directory
    // Forbid import of modules using absolute paths
    // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
    'import/no-absolute-path': 'off',
  },
};
