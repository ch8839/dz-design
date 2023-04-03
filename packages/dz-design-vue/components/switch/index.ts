import Switch from './switch'

Switch.install = function (Vue: any) {
  Vue.component(Switch.name, Switch)
}

// export { Switch }
export default Switch
