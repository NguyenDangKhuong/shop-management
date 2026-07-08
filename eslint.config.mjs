import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "dist/**",
            "build/**",
            "coverage/**",
            "jest.config.ts",
            "jest.setup.ts",
            "chrome-extension/**",
            "cloudflare-video-proxy/**",
            "mobile/**",
            "scripts/**",
            "next.config.js",
        ],
    },
    ...compat.extends("next/core-web-vitals"),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            "unused-imports": unusedImports,
        },

        languageOptions: {
            parser: tsParser,
        },

        rules: {
            "@next/next/no-img-element": "off",
            "react-hooks/exhaustive-deps": "off",
            "react/no-unescaped-entities": "off",
            "unused-imports/no-unused-imports": "error",

            "unused-imports/no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                ignoreRestSiblings: true,
            }],

            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-wrapper-object-types": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "no-var": "off",
        },
    },
];

export default eslintConfig;