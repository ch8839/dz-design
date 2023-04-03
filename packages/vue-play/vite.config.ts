import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import vue from '@vitejs/plugin-vue'
import * as compiler from '@vue/compiler-sfc'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { isVue2 } from 'vue-demi'

const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}

// const env = import.meta.env
// console.log('>>>env', env)
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('>>>env', env, mode)
  const dynamicAlias =
    mode == 'development'
      ? {
          '@component': '@my-test/dz-design-vue/components',
          '@my-test/dz-design-vue/dist/theme/index.css': '@my-test/dz-design-vue/components/index.scss',
        }
      : {
          '@component': '@my-test/dz-design-vue/es',
        }

  return {
    plugins: isVue2 ? [createVuePlugin({ jsx: true })] : [vue({ compiler: compiler }), vueJsx()],
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    resolve: {
      alias: Object.assign(
        {
          '@': resolve('./src'),
          vue: isVue2 ? resolve('./node_modules/vue2') : resolve('./node_modules/vue3'),
          '@vue/composition-api': resolve('./node_modules/@vue/composition-api'),
          'vue-router': isVue2 ? 'vue-router2' : 'vue-router3',
          router: isVue2 ? resolve('./src/router/index.ts') : resolve('./src/router/index3.ts'),
          // 'vue-demi': resolve('./node_modules/@my-test/dz-design-vue/node_modules/vue-demi')
        },
        dynamicAlias
      ),
    },
  }
})
