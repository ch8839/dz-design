import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import vue from '@vitejs/plugin-vue'
import * as compiler from '@vue/compiler-sfc'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { isVue2 } from 'vue-demi'

const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: isVue2 ? [createVuePlugin({ jsx: true })] : [vue({ compiler: compiler }), vueJsx()],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      vue: isVue2 ? resolve('./node_modules/vue2') : resolve('./node_modules/vue3'),
      '@vue/composition-api': resolve('./node_modules/@vue/composition-api'),
      'App.vue': isVue2 ? resolve('./src/App2.vue') : resolve('./src/App.vue'),
      'router': isVue2 ? resolve('./src/router/index2.ts') : resolve('./src/router/index.ts'),
    }
  }
})
