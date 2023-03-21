import Vue from 'vue'
import '@ss/mtd-vue/lib/theme-chalk/index.css'
import Mtd from '@ss/mtd-vue'
Vue.use(Mtd)

import App from './app.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
