import { InlineConfig } from 'vite'
import glob from 'fast-glob'
import path from 'path'

const indexFiles = glob.sync('components/**/style/index.ts', {
  cwd: process.cwd(),
})

const rollupInput = indexFiles.reduce((pre, cur) => {
  pre[cur.slice(11, -3)] = cur
  return pre
}, {} as any)

console.log('>>>rollupInput', rollupInput)

const styleConfig: InlineConfig = {
  build: {
    outDir: path.resolve(process.cwd(), 'dist/style'),
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(process.cwd(), 'components/theme.ts'),
      fileName: 'my-lib',
    },

    rollupOptions: {
      output: [
        {
          format: 'es',
          // dir: 'cssLib',
          // entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
        },
      ],
    },
    // outDir:  path.resolve(process.cwd(), "cssLib")
  },
}

const styleConfig2: InlineConfig = {
  build: {
    outDir: path.resolve(process.cwd(), 'dist/style'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(process.cwd(), 'components/theme.ts'),
      formats: ['es'],
      fileName: 'my-lib',
    },
    rollupOptions: {
      output: [
        {
          assetFileNames: 'index.css',
        },
      ],
    },
  },
}

const themeConfig: InlineConfig = {
  mode: 'production',
  build: {
    target: 'modules',
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      external: /scss$/,
      output: [
        {
          format: 'es',
          dir: 'es',
          preserveModules: true,
          // preserveModulesRoot: __dirname,
          entryFileNames: '[name].js',
        },
        {
          format: 'commonjs',
          dir: 'lib',
          preserveModules: true,
          // preserveModulesRoot: __dirname,
          entryFileNames: '[name].js',
        },
      ],
      // treeshake: false
    },
    lib: {
      entry: rollupInput,
      formats: ['es', 'cjs'],
    },
  },
}

export { styleConfig, styleConfig2, themeConfig }
