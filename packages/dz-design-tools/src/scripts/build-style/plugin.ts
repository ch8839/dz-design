import type { Plugin } from 'vite'

export default function cssjsPlugin(): Plugin {
  const sourceThemeChalk = ''
  return {
    name: 'dz-style-alias-plugin',
    resolveId(id) {
      if (id.startsWith('../style/theme/theme.scss')) {
        return {
          id: id.replace('../style/theme/theme.scss', '../../../dist/style/theme.scss'),
          external: 'absolute',
        }
      }

      if (id.startsWith('../style/theme/theme.scss')) {
        return {
          id: id.replace(/@\/style\/(.+).scss$/, 'vexip-ui/style/$1.scss'),
          external: 'absolute',
        }
      }
    },
  }
}
