/**
 * @type {import("eslint/lib/shared/types").ConfigData}
 */
module.exports = {
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier"
  ],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: "./"
  },
  ignorePatterns: [
    "**/.eslintrc.js"
  ],
  rules: {
    quotes: ["error", "double"],
    "object-curly-newline": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "no-plusplus": 0,
    "no-underscore-dangle": 0,
    "prettier/prettier": "warn",
    // TODO: REVISIT THIS
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "no-restricted-syntax": 0,
    "global-require": 0,
    "import/no-dynamic-require": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "Function": false // we use class decorators. sue me
        },
        "extendDefaults": true,
      }
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: [
          "./tsconfig.json"
        ]
      },
      node: {
      },
    }
  }
};
