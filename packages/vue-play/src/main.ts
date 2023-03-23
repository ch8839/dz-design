import { isVue2, Vue } from 'vue-demi'
import { createApp as createApp3} from 'vue3'

import App from 'App.vue'
import router from 'router'

import './assets/main.css'

if (isVue2) {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
} else {
  const app = createApp3(App)
  app.use(router)
  app.mount('#app')
}
