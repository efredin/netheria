module.exports = {
  root: true,
  env: {
    'browser': true,
    'amd': true,
    'node': true
  },
  settings: {
    react: {
      pragma: 'React',
      version: '18.2.0'
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    'react/display-name': ['off'],
  }
};
