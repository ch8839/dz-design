import HomeView from '../views/HomeView.vue'

function getModules() {
    const components = import.meta.glob('/node_modules/@my-test/dz-design-vue/components/**/demo/test.vue')
    return components
  }

function getComponentName(path: string) {
    const reg = /@my-test\/dz-design-vue\/components\/(\w+)\/demo\/test\.vue/
    const matchRes = path.match(reg)
    return matchRes && matchRes[1] || ''
}
const getRouted = function(): Array<any> {
    let routes: Array<any> = []
    const modules = getModules() 
    Object.keys(modules).forEach((key: string) => {
        const ComponentName = getComponentName(key)
        if(ComponentName) {
            // moduleList[ComponentName] = modules[key]
            routes.push({
                path: `/${ComponentName}`,
                name: `${ComponentName}-demo`,
                component: modules[key]
            })
        }
    })

    return routes
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    ...getRouted()
]

export { 
    routes
} 