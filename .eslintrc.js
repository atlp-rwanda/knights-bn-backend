module.exports = {
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
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-throw-literal': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'treatUndefinedAsUnspecified': 0,
    'import/extensions': ['off', 'never']
  }
};
