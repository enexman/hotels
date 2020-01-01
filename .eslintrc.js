module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-new': 'off',
    'no-underscore-dangle': 'off',
    "consistent-return": [1],
    "space-before-blocks": ["error", "always"],
  }
};