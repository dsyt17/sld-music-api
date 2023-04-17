module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': [
            'error',
            {
                'endOfLine': 'auto',
            }
        ]
    },
    overrides: [
        {
            "files": ["**/*.ts?(x)"],
            "rules": {
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "import/order": [
                    "warn",
                    {
                        "groups": ["builtin", "external", "internal", "index"],
                        "pathGroups": [
                            {
                                "pattern": "react",
                                "group": "external",
                                "position": "before"
                            }
                        ],
                        "pathGroupsExcludedImportTypes": ["builtin"],
                        "newlines-between": "always-and-inside-groups",
                        "alphabetize": {
                            "order": "asc",
                            "caseInsensitive": true
                        }
                    }
                ]
            }
        }
    ]
};
