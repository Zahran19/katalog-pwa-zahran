import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        Feature: 'readonly',
        Before: 'readonly',
        After: 'readonly',
        Scenario: 'readonly',
        locate: 'readonly',
        within: 'readonly',
        session: 'readonly',
        DataTable: 'readonly',
        xScenario: 'readonly',
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
        webpack: true,
      },
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  daStyle,
  prettierConfig, // Menonaktifkan aturan yang mungkin bentrok dengan Prettier
  {
    plugins: {
      prettier: prettierPlugin, // Menambahkan plugin Prettier
    },
    rules: {
      'prettier/prettier': 'error', // Aturan untuk menampilkan error jika melanggar aturan Prettier
      'space-infix-ops': ['error'], // Pastikan ada spasi di sekitar operator infix
      'brace-style': ['error', '1tbs'], // Gunakan gaya kurung "one true brace style"
      'space-before-blocks': ['error', 'always'], // Pastikan ada spasi sebelum blok
      'linebreak-style': 0, // Matikan aturan tentang gaya baris baru
    },
  },
];