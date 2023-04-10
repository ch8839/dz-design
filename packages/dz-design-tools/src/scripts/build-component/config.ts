import path from 'path'
import { InlineConfig, mergeConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

const baseConfig: InlineConfig = {
  build: {
    target: 'modules',
    // emptyOutDir: false,
    minify: false,
    // minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      external: ['vue', 'vue-demi', '@ss/mtd-vue2', '@vue/composition-api'],
    },
  },
  plugins: [createVuePlugin({ jsx: true })],
}

const name = 'dz-design-vue'

const esEntry = path.resolve(process.cwd(), 'components/index.ts')
const esConfig: InlineConfig = mergeConfig(baseConfig, {
  build: {
    lib: {
      entry: esEntry,
      formats: ['es', 'cjs'],
      name: name,
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
        {
          format: 'cjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
      ],
    },
  },
})

const umdEntry = path.resolve(process.cwd(), 'index.ts')
const umdConfig: InlineConfig = mergeConfig(baseConfig, {
  build: {
    lib: {
      entry: umdEntry,
      formats: ['umd'],
      name: name,
    },
    rollupOptions: {
      output: [
        {
          format: 'umd',
          dir: 'dist',
          name: name,
          entryFileNames: '[name].js',
          globals: {
            vue: 'Vue',
            'vue-demi': 'vueDemi',
            '@ss/mtd-vue2': 'mtdVue2',
          },
          // preserveModules: true,
          // preserveModulesRoot: 'components',
        },
      ],
    },
  },
})

const themeConfig = {
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(process.cwd(), "components/theme.ts"),
      name: "MyCssLib",
      fileName: 'my-lib',
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: 'cssLib',
          // entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        }]
    },
    // outDir:  path.resolve(process.cwd(), "cssLib")
  },
}
const themeConfig2 = {
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(process.cwd(), "components/theme.ts"),
      formats: ['es'],
      fileName: 'my-lib',
    },
    rollupOptions: {
      output: [
        {
         
        
          assetFileNames: 'index.css',
        
        }]
    },
    outDir:  path.resolve(process.cwd(), "cssLib")
  },
}

export { esConfig, umdConfig, themeConfig, themeConfig2 }
