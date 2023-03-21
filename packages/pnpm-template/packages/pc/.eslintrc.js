module.exports = {
  rules: {
    'vue/require-default-prop': 'off',
    // 👉https://github.com/vuejs/vue-eslint-parser/issues/99
    'no-undef': 0,
  },
  root: true,
  extends: ['../../.eslintrc.js'],
  globals: {
    _api: true,
  },
}
