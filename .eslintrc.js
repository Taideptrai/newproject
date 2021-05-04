const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
    },

    env: {
        browser: true,
        jest: true,
    },
    extends: ['airbnb-typescript', 'prettier', 'prettier/react'], // if you're using typescript
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', prettierOptions],
        'react/jsx-props-no-spreading': 'off',

        'no-console': [
            'warn',
            {
                allow: ['warn', 'error'],
            },
        ],
        'import/first': 0,
        'func-names': 0,
        'object-curly-newline': 0,
        'max-len': 0,
        'class-methods-use-this': 0,
        '@typescript-eslint/naming-convention': [
            'error',
            {
                leadingUnderscore: 'allow',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                selector: [
                    'variable',
                    'function',
                    'parameter',
                    'parameterProperty',
                    'method',
                ],
            },
        ],

        'consistent-return': 0,
        'no-tabs': 0,
        'no-underscore-dangle': 0,
        eqeqeq: 0,
        'no-await-in-loop': 1,
        'no-restricted-syntax': 0,
        'default-case': 0,
        'import/prefer-default-export': 0,
        'no-continue': 0,
        'no-param-reassign': 0,
        'prefer-const': 1,
        'no-empty': 0,
        'no-restricted-globals': ['error', 'event', 'fdescribe'],
        '@typescript-eslint/no-useless-constructor': 0,
        'lines-between-class-members': [
            'error',
            'always',
            {exceptAfterSingleLine: true},
        ],
        'prefer-destructuring': 0,
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        curly: 0,
        'nonblock-statement-body-position': ['error', 'below'],
        'keyword-spacing': 'error',
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/member-delimiter-style': 'error', // require semicolon at the end of member of interface
        indent: 0, // disable base rule and override by below rule
        '@typescript-eslint/indent': ['error', 4],
        'arrow-body-style': 0,
        'no-shadow': 0,
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-empty-interface': 0,
    },
    overrides: [
        {
            files: ['**/*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
    ],
    ignorePatterns: ['.eslintrc.js', 'craco.config.js'],
};
