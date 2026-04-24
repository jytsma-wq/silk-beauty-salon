import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // Error level
    "react-hooks/exhaustive-deps": "error",
    "no-unreachable": "error",
    "no-redeclare": "error",

    // Warn level
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "prefer-const": "warn",
    "no-console": ["warn", { allow: ["error", "warn"] }],
    "@next/next/no-img-element": "warn",

    // Off (kept as is)
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
    "react-compiler/react-compiler": "off",
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills"]
}];

export default eslintConfig;
