import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default [
  js.configs.recommended,
  prettier,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules'],
    languageOptions: {
      parser: typescriptEslintParser,
      sourceType: 'module',
      globals: {
        ...globals.browser, // Incluye variables globales del navegador
        React: 'readonly', // Marca React como global readonly
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: eslintPluginReact,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn', // Mantén la regla para otras variables
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
