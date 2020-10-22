import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),

    routes: [{
            name: 'finsuit',
            path: '/finsuit',
            component: require('../view/main').default,
            meta: {
                title: 'finsuit插件包',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'special',
            path: '/',
            component: require('../view/main/special').default,
            meta: {
                title: '',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'simple',
            path: '/simple',
            component: require('../view/main/simple').default,
            meta: {
                title: '齐商村镇银行',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        // {
        //     name: 'error',
        //     path: '/error',
        //     component: ErrorPage,
        //     meta: { title: '错误' }
        // },
        // {
        //     path: '*',
        //     redirect: "/error",
        //     meta: { title: '404' }
        // },
    ]
})
