import { defineConfig } from '@rome/core'

export default defineConfig({
  pluginOptions: {
    stylelint: {
      lintOnSave: process.env.NODE_ENV !== 'production',
    },
  },
})
