import Vue from "vue"
import * as components from './components'
console.log('>>>components', components)

export * from './components'

export function install(vue: typeof Vue) {
    (components as any).map(function (component: any) {
        vue.component(component.name, component)
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export default {
    install,
}