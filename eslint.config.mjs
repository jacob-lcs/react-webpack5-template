import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "@eslint-react/eslint-plugin";
import reactCompiler from "eslint-plugin-react-compiler";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/**", "node_modules/**", "playwright-report/**", "test-results/**"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: [
      "*.config.{js,cjs,mjs,ts}",
      "webpack*.js",
      "postcss.config.js",
    ],
    languageOptions: { globals: globals.node },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["playwright.config.ts", "tests/**/*.{js,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    ...reactPlugin.configs["recommended-typescript"],
    files: ["src/**/*.{jsx,tsx}"],
  },
  {
    files: ["src/**/*.{jsx,tsx}"],
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^React$" }],
      "react-compiler/react-compiler": "error",
    },
  },
];
