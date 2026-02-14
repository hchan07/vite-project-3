import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginQuery from '@tanstack/eslint-plugin-query';


export default defineConfig([
  {
    ignores: ['dist', 'coverage'], 
  },
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: { ...globals.browser, ...globals.node } } ,
    // ADD THIS SETTINGS BLOCK
    settings: {
      react: {
        version: "detect", // Automatically picks the version from package.json
      },
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginQuery.configs['flat/recommended'],
  {
    rules: {
      "semi": ["error", "always"],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
]);
