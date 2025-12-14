module.exports = {
  env: { browser: true, es2020: true },
  ignorePatterns: ['**/*.gen.ts', 'dist/**', '**/dist/**', 'node_modules/**'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': 'warn',

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    semi: ['error', 'always'],
    'no-empty': ['error', { allowEmptyCatch: false }],
    'max-depth': ['error', 5],
    'no-useless-catch': 'error',
    'no-useless-escape': 'error',
    'prefer-const': 'error',

    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-empty-object-type': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unsafe-function-type': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',

    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-misused-new': 'error',

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      { selector: 'typeAlias', format: ['PascalCase'] },
      { selector: 'class', format: ['PascalCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'classMethod', format: ['camelCase'] },
      { selector: 'classProperty', format: ['camelCase', 'UPPER_CASE'] },
      { selector: 'enum', format: ['PascalCase'] },
      { selector: 'enumMember', format: ['PascalCase'] },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },
      { selector: 'interface', format: ['PascalCase'] },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**/*.ts',
        '**/__tests__/**/*.tsx',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
