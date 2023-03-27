import path from 'path'
import { InlineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

const entry = path.resolve(process.cwd(), 'index.ts')
console.log('>>>input', entry)


const config: InlineConfig = {
	build: {
		target: 'modules',
		// emptyOutDir: false,
		minify: false,
		// minify: 'esbuild',
		sourcemap: true,
		lib: {
			entry: entry,
			formats: ['es', 'umd'],
			name: 'dz-design-vue'
		},
		rollupOptions: {
			external: ["vue", "vue-demi"],
			output: [
				{
					format: 'es',
					dir: 'es',
					entryFileNames: '[name].js',
					preserveModules: true,
					preserveModulesRoot: 'components',
				},
				{
					format: 'umd',
					dir: 'lib',
					name:'dz-design-vue',
					entryFileNames: '[name].js',
					globals: {
						vue: 'Vue',
						'vue-demi': 'vueDemi'
					},
					// preserveModules: true,
					// preserveModulesRoot: 'components',
				},
			],

		},

	},
	// @ts-ignore vite内部类型错误
	plugins: [createVuePlugin({ jsx: true })],
}

export { config }