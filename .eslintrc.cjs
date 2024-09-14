module.exports = {
  "root": true,
  "ignorePatterns": ["dist/", "dist-electron/", "release/", "workspaces/", "node_modules/"],
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "no-unreachable": "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "eol-last": ["error", "always"],
    "no-async-promise-executor": "off",
    "no-cond-assign": "off",
    indent: ["error", 2, {
      ignoredNodes: ["VariableDeclaration[declarations.length=0]"],
    }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["warn", {
      vars: "local",
      ignoreRestSiblings: true,
      args: "after-used",
      argsIgnorePattern: "^_",
    }],
    "no-unused-vars": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": false,
        },
        extendDefaults: true,
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-expressions": ["error", {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    }],
    "comma-dangle": ["error", "only-multiline"],
    "no-misleading-character-class": "off",
  },
  "plugins": ["@typescript-eslint"],
  "overrides": [{ "files": ["*.ts", "*.tsx"] }]
};
