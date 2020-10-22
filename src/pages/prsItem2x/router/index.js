import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),

    routes: [
        // {
        //     name: 'index',
        //     path: '/',
        //     component: require('../view/main').default,
        //     meta: { title: 'finsuit插件包', requiresAuth: false, keepAlive: true },
        // },
        {
            name: "list",
            path: "/list",
            component: () => import( /* webpackChunkName: "list" */ '../view/list'),
            meta: {
                title: '人数拼团',
                requiresAuth: false,
                keepAlive: false
            },
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
