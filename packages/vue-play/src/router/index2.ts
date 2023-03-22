import Vue from 'vue2'
import Router from "vue-router2";
import HomeView from '../views/HomeView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      }
  ]
});
