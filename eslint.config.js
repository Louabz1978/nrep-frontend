import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";

export default [
  // First config: Ignore patterns
  {
    ignores: [
      "dist",
      "src/cdn/**/*.js",
      "src/types/server/**/*",
      "src/types/client/**/*",
      "vite.config.ts",
      "production.capacitor.config.ts",
    ],
  },
  // Second config: ESLint recommended rules
  js.configs.recommended,
  // Third config: TypeScript recommended rules
  ...tseslint.configs.recommended,
  // Fourth config: Prettier plugin
  {
    plugins: {
      prettier, // Prettier plugin
    },
    rules: {
      "prettier/prettier": "off", // Enforce Prettier formatting
    },
  },
  // Fifth config: Rules for TypeScript and React files
  {
    files: ["**/*.{ts,tsx}"], // Apply to TypeScript and TypeScript React files
    languageOptions: {
      ecmaVersion: 2020, // Use modern ECMAScript
      globals: {
        ...globals.browser, // Browser globals (e.g., window, document)
      },
      parser: tsParser, // Use the imported parser object
      parserOptions: {
        project: "./tsconfig.app.json", // Point to your tsconfig.json
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Your custom rules from .eslintrc.cjs
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-useless-escape": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      // Additional rules from your preferences
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "off",
    },
  },
];
