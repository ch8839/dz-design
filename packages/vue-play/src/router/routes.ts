import HomeView from '../views/HomeView.vue'

function getModules() {
    const components = import.meta.glob('/node_modules/@my-test/dz-design-vue/components/**/demo/*.vue')
    return components
}

function getComponentName(path: string) {
    const reg = /@my-test\/dz-design-vue\/components\/(\w+)\/demo\/(\w+)\.vue/
    const matchRes = path.match(reg)
    return matchRes && { componentName: matchRes[1], demoName: matchRes[2] } || {}
}
function getRouted(): Array<any> {
    let routes: Array<any> = []
    const modules = getModules()
    
    Object.keys(modules).forEach((key: string) => {
        const { componentName, demoName }= getComponentName(key)
        if (componentName && demoName) {
            // moduleList[ComponentName] = modules[key]
            routes.push({
                path: `/${componentName}/${demoName}`,
                name: `${componentName}-${demoName}`,
                component: modules[key]
            })
        }
    })

    return routes
}

const componentRoutes = getRouted()

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
    ...componentRoutes
]

export {
    routes,
    componentRoutes
} 