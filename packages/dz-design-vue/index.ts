import Vue from 'vue'
import * as components from './components'
console.log('>>>components', components)
export * from './components'

export function install(vue: typeof Vue) {
  for (const key of Object.keys(components)) {
    vue.use((components as any)[key])
  }
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

export default {
  install
}
