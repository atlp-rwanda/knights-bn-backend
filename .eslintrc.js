module.exports = {
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true
  },
  root: true,
  'extends': 'airbnb-base',
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-throw-literal': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'treatUndefinedAsUnspecified': 0,
    'import/extensions': ['off', 'never'],
    'no-unused-expressions': [2, { allowTernary: true }],
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0
  }
};
