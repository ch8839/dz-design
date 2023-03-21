import { defineConfig } from '@rome/core'

export default defineConfig({
  pluginOptions: {
    stylelint: {
      lintOnSave: process.env.NODE_ENV !== 'production',
    },
    autoRouting: true,
    // 关闭本地开发环境的按需编译
    lazyCompile: {
      status: false,
    },
  },
})
