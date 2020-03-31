import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var keepAlive_Router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('./views/keep-alive/index.vue'),
            meta: {
                deepth: 0.5
            }
        },
        {
            path: '/list',
            name: 'list',
            component: () => import('./views/keep-alive/list.vue'),
            meta: {
                deepth: 1,
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('./views/keep-alive/detail.vue'),
            meta: {
                deepth: 2,
                transitionType: 'flip'
            }
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import('./views/keep-alive/demo.vue'),
            meta: {
                deepth: 1
            }
        },
        {
            path: '/demo1',
            name: 'demo1',
            component: () => import('./views/keep-alive/demo-1.vue'),
            meta: {
                deepth: 2
            }
        },
    ]
})

keepAlive_Router.beforeEach((to, from, next) => {
    console.log('beforeEach');
    next();
})
keepAlive_Router.afterEach(() => {
    console.log('afterEach');
})

export default keepAlive_Router;