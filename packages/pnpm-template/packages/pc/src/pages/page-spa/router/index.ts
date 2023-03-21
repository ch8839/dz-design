import Vue from 'vue'
import Router from 'vue-router'
import { getRoutes } from '@nibfe/vue-cli-plugin-auto-routing/routes'

Vue.use(Router)

// 仅生成约定式路由配置, 其它操作如追加路由守卫等和之前依然是保持一致的
// 需要配置 autoRouting: true: https://sky.sankuai.com/docs/nibfe/rome-doc/plugins/router/introduction.html#_1-1-%E5%BC%80%E9%97%AD%E8%87%AA%E5%8A%A8%E5%8C%96%E8%B7%AF%E7%94%B1%E8%83%BD%E5%8A%9B
const routes = getRoutes()

const router = new Router({
  routes,
})

export default router
