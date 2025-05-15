import js from "@eslint/js"
import vitestPlugin from "@vitest/eslint-plugin"
import prettierConfig from "eslint-config-prettier/flat"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import globals from "globals"
import { config, configs } from "typescript-eslint"
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const eslintConfig = config(
  {
    name: "global-ignores",
    ignores: [
      "**/*.snap",
      "**/dist/",
      "**/.yalc/",
      "**/build/",
      "**/temp/",
      "**/.temp/",
      "**/.tmp/",
      "**/.yarn/",
      "**/coverage/",
      "**/node_modules",
      "**/eslint.config.js",
      "*.js",
      "*.jsx",
      "**/.vscode",
      "**/.idea",
      "**/.gitignore",
      "**/.prettierrc",
      "**/.prettierignore",
      "**/.commitlintrc.json",
      "**/.stylelintrc.json",
      "**/package.json",
      "**/package-lock.json",
      "**/tsconfig.app.json",
      "**/tsconfig.node.json",
      "**/.husky",
      "**/tsconfig.json",
      "**/vite.config.ts",
      "**/vitest.config.ts",
      "**/vitest.setup.ts",
      "**/README.md",
    ],
  },
  {
    name: `${js.meta.name}/recommended`,
    ...js.configs.recommended,
  },
  configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  vitestPlugin.configs.recommended,
  {
    name: "eslint-plugin-react/jsx-runtime",
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  reactHooksPlugin.configs["recommended-latest"],
  eslintPluginPrettierRecommended,
  eslintPluginUnicorn.configs.recommended,
  {
    name: "main",
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: 2,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      vitest: {
        typecheck: true,
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      "no-unused-expressions": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        2,
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: true,
        },
      ],
      "no-restricted-imports": [
        2,
        {
          paths: [
            {
              name: "react-redux",
              importNames: ["useSelector", "useStore", "useDispatch"],
              message:
                "Please use pre-typed versions from `src/app/hooks.ts` instead.",
            },
          ],
        },
      ],

      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { "assertionStyle": "never" }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { "accessibility": "explicit", "overrides": { "constructors": "off" } }
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error",
      "unicorn/better-regex": "warn",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      'unicorn/filename-case': "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-spread": "off",
      "unicorn/number-literal-case": "off",
      "unicorn/numeric-separators-style": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          "allowList": {
            "acc": true,
            "env": true,
            "i": true,
            "j": true,
            "props": true,
            "Props": true
          }
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "no-undef": "off",
      "max-lines-per-function": ["off", 60],
      "@typescript-eslint/no-unused-vars": "warn",

      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "unicorn/no-thenable": "off",
    },
  },

  prettierConfig,
)

export default eslintConfig
