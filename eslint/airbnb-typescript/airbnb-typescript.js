import baseBestPractices from '../airbnb-base/best-practices.js';
import baseErrors from '../airbnb-base/errors.js';
import baseES6 from '../airbnb-base/es6.js';
import baseImports from '../airbnb-base/imports.js';
import baseStyle from '../airbnb-base/style.js';
import baseVariables from '../airbnb-base/variables.js';
import tseslint from 'typescript-eslint';
import eslintImport from 'eslint-plugin-import';
import eslintStylistic from '@stylistic/eslint-plugin';
import eslintReact from 'eslint-plugin-react';

const { rules: baseBestPracticesRules } = baseBestPractices;
const { rules: baseErrorsRules } = baseErrors;
const { rules: baseES6Rules } = baseES6;
const { rules: baseImportsRules } = baseImports;
const { rules: baseStyleRules } = baseStyle;
const { rules: baseVariablesRules } = baseVariables;

export default tseslint.config(
  {
    plugins: {
      react: eslintReact,
      import: eslintImport,
      '@stylistic': eslintStylistic,
    },
    settings: {
      // Apply special parsing for TypeScript files
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },
      // Append 'ts' extensions to Airbnb 'import/resolver' setting
      // Original: ['.mjs', '.js', '.json']
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
        },
      },
      // Append 'ts' extensions to Airbnb 'import/extensions' setting
      // Original: ['.js', '.mjs', '.jsx']
      'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
      // Resolve type definition packages
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    },
    rules: {
      // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
      // Original: ['.jsx']
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

      // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
      'brace-style': 'off',
      '@stylistic/brace-style': baseStyleRules['brace-style'],

      // Replace Airbnb 'camelcase' rule with '@typescript-eslint/naming-convention'
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
      camelcase: 'off',
      // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
      '@typescript-eslint/naming-convention': [
        'error',
        // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // Allow camelCase functions (23.2), and PascalCase functions (23.8)
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
      // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
      'comma-dangle': 'off',
      '@stylistic/comma-dangle': [
        baseStyleRules['comma-dangle'][0],
        {
          ...baseStyleRules['comma-dangle'][1],
          enums: baseStyleRules['comma-dangle'][1].arrays,
          generics: baseStyleRules['comma-dangle'][1].arrays,
          tuples: baseStyleRules['comma-dangle'][1].arrays,
        },
      ],

      // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
      'comma-spacing': 'off',
      '@stylistic/comma-spacing': baseStyleRules['comma-spacing'],

      // Replace Airbnb 'default-param-last' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': baseBestPracticesRules['default-param-last'],

      // Replace Airbnb 'dot-notation' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': baseBestPracticesRules['dot-notation'],

      // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
      'func-call-spacing': 'off',
      '@stylistic/func-call-spacing': baseStyleRules['func-call-spacing'],

      // Replace Airbnb 'indent' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
      indent: 'off',
      '@stylistic/indent': baseStyleRules.indent,

      // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
      'keyword-spacing': 'off',
      '@stylistic/keyword-spacing': baseStyleRules['keyword-spacing'],

      // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
      'lines-between-class-members': 'off',
      '@stylistic/lines-between-class-members': baseStyleRules['lines-between-class-members'],

      // Replace Airbnb 'no-array-constructor' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': baseStyleRules['no-array-constructor'],

      // Replace Airbnb 'no-dupe-class-members' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': baseES6Rules['no-dupe-class-members'],

      // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': baseBestPracticesRules['no-empty-function'],

      // Replace Airbnb 'no-extra-parens' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
      'no-extra-parens': 'off',
      '@typescript-eslint/no-extra-parens': baseErrorsRules['no-extra-parens'],

      // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
      'no-extra-semi': 'off',
      '@stylistic/no-extra-semi': baseErrorsRules['no-extra-semi'],

      // Replace Airbnb 'no-implied-eval' and 'no-new-func' rules with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
      'no-implied-eval': 'off',
      'no-new-func': 'off',
      '@typescript-eslint/no-implied-eval': baseBestPracticesRules['no-implied-eval'],

      // Replace Airbnb 'no-loss-of-precision' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
      'no-loss-of-precision': 'off',
      '@typescript-eslint/no-loss-of-precision': baseErrorsRules['no-loss-of-precision'],

      // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': baseBestPracticesRules['no-loop-func'],

      // Replace Airbnb 'no-magic-numbers' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': baseBestPracticesRules['no-magic-numbers'],

      // Replace Airbnb 'no-redeclare' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': baseBestPracticesRules['no-redeclare'],

      // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': baseVariablesRules['no-shadow'],

      // Replace Airbnb 'space-before-blocks' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-blocks.md
      'space-before-blocks': 'off',
      '@stylistic/space-before-blocks': baseStyleRules['space-before-blocks'],

      // Replace Airbnb 'no-unused-expressions' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': baseBestPracticesRules['no-unused-expressions'],

      // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': baseVariablesRules['no-unused-vars'],

      // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': baseVariablesRules['no-use-before-define'],

      // Replace Airbnb 'no-useless-constructor' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': baseES6Rules['no-useless-constructor'],

      // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
      quotes: 'off',
      '@stylistic/quotes': baseStyleRules.quotes,

      // Replace Airbnb 'semi' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
      semi: 'off',
      '@stylistic/semi': baseStyleRules.semi,

      // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
      'space-before-function-paren': 'off',
      '@stylistic/space-before-function-paren': baseStyleRules['space-before-function-paren'],

      // Replace Airbnb 'require-await' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
      'require-await': 'off',
      '@typescript-eslint/require-await': baseBestPracticesRules['require-await'],

      // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
      'no-return-await': 'off',
      '@typescript-eslint/return-await': [baseBestPracticesRules['no-return-await'], 'in-try-catch'],

      // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
      'space-infix-ops': 'off',
      '@stylistic/space-infix-ops': baseStyleRules['space-infix-ops'],

      // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
      'object-curly-spacing': 'off',
      '@stylistic/object-curly-spacing': baseStyleRules['object-curly-spacing'],

      // Append 'ts' and 'tsx' to Airbnb 'import/extensions' rule
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
      'import/extensions': [
        baseImportsRules['import/extensions'][0],
        baseImportsRules['import/extensions'][1],
        {
          ...baseImportsRules['import/extensions'][2],
          '': 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
      'import/no-extraneous-dependencies': [
        baseImportsRules['import/no-extraneous-dependencies'][0],
        {
          ...baseImportsRules['import/no-extraneous-dependencies'][1],
          devDependencies: baseImportsRules['import/no-extraneous-dependencies'][1].devDependencies.reduce((result, devDep) => {
            const toAppend = [devDep];
            const devDepWithTs = devDep.replace(/\bjs(x?)\b/g, 'ts$1');
            if (devDepWithTs !== devDep) {
              toAppend.push(devDepWithTs);
            }
            return [...result, ...toAppend];
          }, []),
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
      // Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
      // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
      'constructor-super': 'off',
      'getter-return': 'off',
      'no-const-assign': 'off',
      'no-dupe-args': 'off',
      'no-dupe-class-members': 'off',
      'no-dupe-keys': 'off',
      'no-func-assign': 'off',
      'no-import-assign': 'off',
      'no-new-symbol': 'off',
      'no-obj-calls': 'off',
      'no-redeclare': 'off',
      'no-setter-return': 'off',
      'no-this-before-super': 'off',
      'no-undef': 'off',
      'no-unreachable': 'off',
      'no-unsafe-negation': 'off',
      'valid-typeof': 'off',
      // The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
      // See: https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import
      'import/named': 'off',
      'import/no-named-as-default-member': 'off',
      // Disable `import/no-unresolved`, see README.md for details
      'import/no-unresolved': 'off',
    },
  },
);
