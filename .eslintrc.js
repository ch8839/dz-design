module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/prettier', '@vue/typescript'],
  rules: {
    // 暂时关闭而不是 warn: https://github.com/nuxt/eslint-config/issues/192
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
