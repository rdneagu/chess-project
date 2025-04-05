export default {
  rules: {
    // @override: Enforce strictness for all types of lines
    // Specify curly brace conventions for all control statements
    // https://eslint.org/docs/rules/curly
    curly: ['error'],

    // Enforce a convention in the order of require() / import statements.
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] }],

    // @override: Turned off because of the way vite handles imports from public directory
    // Forbid import of modules using absolute paths
    // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
    'import/no-absolute-path': 'off',

    // @override: Types should not require default exports
    // In exporting files, this rule checks if there is default export or not
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // Require switch-case statements to be exhaustive
    // https://typescript-eslint.io/rules/switch-exhaustiveness-check/
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    // @override: Prefer type to interface due to flexibility
    // Enforce type definitions to consistently use either interface or type
    // https://typescript-eslint.io/rules/consistent-type-definitions/
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    // @override: Makes it more confusing when using TypeScript
    // This rule aims to ensure that any non-required PropType declaration of a component has a corresponding defaultProps value
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/require-default-props.md
    'react/require-default-props': 'off',

    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-plusplus': 'off',
    'no-cond-assign': ['error', 'except-parens'],
    'no-param-reassign': 'off',
    'no-continue': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@stylistic/lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
