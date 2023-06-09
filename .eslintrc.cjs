// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    // {
    //   extends: [
    //     "plugin:@typescript-eslint/recommended-requiring-type-checking",
    //   ],
    //   files: ["*.ts", "*.tsx"],
    //   parserOptions: {
    //     project: path.join(__dirname, "tsconfig.json"),
    //   },
    // },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  ignorePatterns: [],
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "ccs", "ccs/typescript", "ccs/prettier"],
  rules: {
    "no-void": 0,
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      "warn",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/no-floating-promises": ["warn", { ignoreIIFE: true }],
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-return": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-argument": 0,
  },
};

module.exports = config;
