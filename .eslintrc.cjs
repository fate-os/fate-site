module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'perfectionist', 'unused-imports', 'prettier'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['src', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  /**
   * 0 ~ 'off'
   * 1 ~ 'warn'
   * 2 ~ 'error'
   */
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-alert': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-exports': 'off',
    'no-promise-executor-return': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': ['warn', { object: true, array: false }],
    // react
    'react/prop-types': 'off',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-duplicate-props': ['warn', { ignoreCase: false }],
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    // jsx-a11y
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    // unused imports
    'unused-imports/no-unused-imports': 'warn',
    // perfectionist
    'perfectionist/sort-exports': ['warn', { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-imports': ['warn', { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-exports': ['warn', { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-imports': [
      'error',
      {
        order: 'asc',
        type: 'line-length',
        'newlines-between': 'always',
        groups: [
          'style',
          'type',
          ['builtin', 'external'],
          'custom-mui',
          'custom-routes',
          'custom-hooks',
          'custom-utils',
          'internal',
          'custom-components',
          'custom-sections',
          'custom-auth',
          'custom-types',
          ['parent', 'sibling', 'index'],
          ['parent-type', 'sibling-type', 'index-type'],
          'object',
          'unknown',
        ],
        customGroups: {
          'custom-mui': ['@mui/**'],
          'custom-auth': ['src/auth/**'],
          'custom-hooks': ['src/hooks/**'],
          'custom-utils': ['src/utils/**'],
          'custom-types': ['src/types/**'],
          'custom-routes': ['src/routes/**'],
          'custom-sections': ['src/sections/**'],
          'custom-components': ['src/components/**'],
        },
      },
    ],
  },
};
