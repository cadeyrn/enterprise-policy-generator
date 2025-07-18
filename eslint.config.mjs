import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';
import json from '@eslint/json';
import sortRequires from 'eslint-plugin-sort-requires';
import stylistic from '@stylistic/eslint-plugin'
import xss from 'eslint-plugin-xss';

export default [
  {
    plugins: {
      '@stylistic': stylistic,
      jsdoc,
      'sort-requires': sortRequires,
      xss
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        Promise: true,
        require: true
      },
      ecmaVersion: 'latest',
      sourceType: 'script'
    },
    files: ['**/*.js'],
    rules: {
      '@stylistic/array-bracket-newline': ['error', { multiline: true }],
      '@stylistic/array-bracket-spacing': 'error',
      '@stylistic/array-element-newline': 'off',
      '@stylistic/arrow-parens': 'error',
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/block-spacing': 'error',
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/comma-dangle': 'error',
      '@stylistic/comma-spacing': 'error',
      '@stylistic/comma-style': 'error',
      '@stylistic/computed-property-spacing': 'error',
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': 'error',
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-paren-newline': 'off',
      '@stylistic/generator-star-spacing': 'error',
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/indent': ['error', 2, { 'SwitchCase': 1 }],
      '@stylistic/jsx-quotes': 'error',
      '@stylistic/key-spacing': ['error', { 'beforeColon': true }],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/line-comment-position': 'error',
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/lines-around-comment': ['error', { 'beforeBlockComment': false }],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/max-len': ['off'],
      '@stylistic/max-statements-per-line': 'error',
      '@stylistic/multiline-comment-style': 'off',
      '@stylistic/multiline-ternary': ['error', 'never'],
      '@stylistic/new-parens': 'error',
      '@stylistic/newline-per-chained-call': 'off',
      '@stylistic/no-confusing-arrow': 'error',
      '@stylistic/no-extra-parens': ['error', 'all', { 'nestedBinaryExpressions': false }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1,  'maxBOF': 0 }],
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/nonblock-statement-body-position': ['error', 'below'],
      '@stylistic/object-curly-newline': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
      '@stylistic/one-var-declaration-per-line': ['error', 'always'],
      '@stylistic/operator-linebreak': 'error',
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
        { 'blankLine': 'always', 'prev': 'directive', 'next': '*' },
        { 'blankLine': 'any', 'prev': 'directive', 'next': 'directive' }
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/rest-spread-spacing': 'error',
      '@stylistic/semi': 'error',
      '@stylistic/semi-spacing': 'error',
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-before-function-paren': 'error',
      '@stylistic/space-in-parens': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': 'error',
      '@stylistic/spaced-comment': 'error',
      '@stylistic/switch-colon-spacing': ['error', { 'after': true, 'before': false }],
      '@stylistic/template-curly-spacing': 'error',
      '@stylistic/template-tag-spacing': ['error', 'always'],
      '@stylistic/wrap-iife': 'error',
      '@stylistic/wrap-regex': 'error',
      '@stylistic/yield-star-spacing': 'error',
      'accessor-pairs': 'error',
      'array-callback-return': 'error',
      'arrow-body-style': 'error',
      'block-scoped-var': 'error',
      'camelcase': 'off',
      'capitalized-comments': 'off',
      'class-methods-use-this': 'error',
      'complexity': ['error', { max: 30 }],
      'consistent-return': 'error',
      'consistent-this': ['error', 'self'],
      'constructor-super': 'error',
      'curly': 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'off',
      'eqeqeq': 'error',
      'for-direction': 'error',
      'func-name-matching': 'error',
      'func-names': 'off',
      'func-style': 'error',
      'getter-return': 'error',
      'grouped-accessor-pairs': 'error',
      'guard-for-in': 'error',
      'id-denylist': 'error',
      'id-length': ['error', { 'max': 80, 'exceptions': ['a', 'b', 'e', 'i', 'p'] }],
      'id-match': 'error',
      'init-declarations': 'error',
      'jsdoc/check-access': 'warn',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-examples': 'off',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-line-alignment': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/check-syntax': 'warn',
      'jsdoc/check-tag-names': 'warn',
      'jsdoc/check-template-names': 'error',
      'jsdoc/check-types': 'warn',
      'jsdoc/check-values': 'warn',
      'jsdoc/convert-to-jsdoc-comments': 'off',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/imports-as-dependencies': 'warn',
      'jsdoc/informative-docs': 'off',
      'jsdoc/lines-before-block': 'off',
      'jsdoc/match-description': 'off',
      'jsdoc/match-name': 'off',
      'jsdoc/multiline-blocks': 'warn',
      'jsdoc/no-bad-blocks': 'off',
      'jsdoc/no-blank-block-descriptions': 'warn',
      'jsdoc/no-blank-blocks': 'warn',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/no-missing-syntax': 'off',
      'jsdoc/no-multi-asterisks': 'warn',
      'jsdoc/no-restricted-syntax': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-asterisk-prefix': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/require-description-complete-sentence': 'off',
      'jsdoc/require-example': 'off',
      'jsdoc/require-file-overview': 'off',
      'jsdoc/require-hyphen-before-param-description': 'warn',
      'jsdoc/require-jsdoc': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-param-type': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-property-type': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-check': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-returns-type': 'warn',
      'jsdoc/require-template': 'error',
      'jsdoc/require-throws': 'warn',
      'jsdoc/require-yields': 'warn',
      'jsdoc/require-yields-check': 'warn',
      'jsdoc/sort-tags': 'off',
      'jsdoc/tag-lines': 'off',
      'jsdoc/text-escaping': 'off',
      'jsdoc/valid-types': 'warn',
      'logical-assignment-operators': ['error', 'never'],
      'max-classes-per-file': 'off',
      'max-depth': ['error', { 'max': 5 }],
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': ['error', 4],
      'max-params': ['error', 7],
      'max-statements': 'off',
      'new-cap': 'error',
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'off',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-console': 'error',
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'error',
      'no-constructor-return': 'error',
      'no-continue': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-div-regex': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-empty-function': 'error',
      'no-empty-pattern': 'error',
      'no-empty-static-block': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-label': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-import-assign': 'error',
      'no-inline-comments': 'error',
      'no-inner-declarations': ['error', 'both'],
      'no-invalid-regexp': 'error',
      'no-invalid-this': 'error',
      'no-irregular-whitespace': ['error', { 'skipStrings': false }],
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-loss-of-precision': 'error',
      'no-magic-numbers': ['error', { 'enforceConst': true, 'ignore': [-1, 0, 1, 2, 5, 36], 'ignoreArrayIndexes': true }],
      'no-misleading-character-class': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-negated-condition': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-object-constructor': 'error',
      'no-octal-escape': 'error',
      'no-octal': 'error',
      'no-param-reassign': 'error',
      'no-plusplus': 'off',
      'no-promise-executor-return': 'error',
      'no-proto': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': ['error', { 'builtinGlobals': true }],
      'no-regex-spaces': 'error',
      'no-restricted-exports': 'error',
      'no-restricted-globals': 'error',
      'no-restricted-imports': 'error',
      'no-restricted-properties': 'error',
      'no-restricted-syntax': 'error',
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-self-assign': ['error', { 'props': true }],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-setter-return': 'error',
      'no-shadow': 'off',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-ternary': 'off',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-unassigned-vars': 'error',
      'no-undef-init': 'error',
      'no-undef': ['error', { 'typeof': true }],
      'no-undefined': 'error',
      'no-underscore-dangle': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': 'error',
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-expressions': ['error', { 'allowTernary': true }],
      'no-unused-labels': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': ['error', { 'vars': 'local' }],
      'no-use-before-define': 'error',
      'no-useless-assignment': 'off',
      'no-useless-backreference': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'off',
      'no-warning-comments': 'error',
      'no-with': 'error',
      'object-shorthand': ['error', 'methods'],
      'one-var': ['error', 'never'],
      'operator-assignment': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': ['error', { 'array': false, 'object': true }],
      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'off',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'off',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'off',
      'radix': ['error', 'as-needed'],
      'require-atomic-updates': 'error',
      'require-await': 'error',
      'require-unicode-regexp': 'off',
      'require-yield': 'error',
      'sort-imports': 'error',
      'sort-keys': 'off',
      'sort-requires/sort-requires': 'error',
      'sort-vars': 'error',
      'strict': ['error', 'global'],
      'symbol-description': 'error',
      'unicode-bom': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'vars-on-top': 'error',
      'xss/no-location-href-assign': 'error',
      'xss/no-mixed-html': 'off',
      'yoda': 'error'
    }
  },
  {
    plugins: {
      json
    },
    files: ['**/*.json'],
    language: 'json/json',
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
      'json/no-unsafe-values': 'error',
      'json/no-unnormalized-keys': 'error',
      'json/sort-keys': ['error', 'asc', { 'caseSensitive': false }],
      'json/top-level-interop': 'error'
    },
  }
];
