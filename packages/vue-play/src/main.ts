import { isVue2, Vue } from 'vue-demi'
import { createApp as createApp3} from 'vue3'
import VueCompositionApi from '@vue/composition-api'

import App from './App.vue'
import router from 'router'

import './assets/main.css'
import '@my-test/dz-design-vue/dist/theme/index.css'

if (isVue2) {
  Vue.use(VueCompositionApi)
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
} else {
  const app = createApp3(App)
  app.use(router)
  app.mount('#app')
}
