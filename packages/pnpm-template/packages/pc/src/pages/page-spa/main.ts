import Vue from 'vue'
import App from './app.vue'
import '@ss/mtd-vue/lib/theme-chalk/index.css'
import Mtd from '@ss/mtd-vue'
Vue.use(Mtd)
import Router from './router/index'
import Store from './store/index'

new Vue({
  router: Router,
  store: Store,
  render: h => h(App),
}).$mount('#app')
