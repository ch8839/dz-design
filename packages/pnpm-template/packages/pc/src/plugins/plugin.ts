import Vue from 'vue'

const Plugin = {
  install(_Vue) {
    // plugin
    _Vue.$pluginName = 'plugin'
  },
}

Vue.use(Plugin)

export default Plugin
