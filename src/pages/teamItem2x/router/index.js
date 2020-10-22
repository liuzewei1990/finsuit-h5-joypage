import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),

    routes: [{
            name: 'index',
            path: '/',
            component: require('../view/main').default,
            meta: {
                title: '拼团',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: "detail",
            path: "/detail",
            component: () => import( /* webpackChunkName: "detail" */ '../view/detail/index.vue'),
            meta: {
                title: '产品详情',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: "rule",
            path: "/rule",
            component: () => import( /* webpackChunkName: "rule" */ '../view/rule/index.vue'),
            meta: {
                title: '活动规则',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: "list",
            path: "/list",
            component: () => import( /* webpackChunkName: "list" */ '../view/list'),
            meta: {
                title: '金额拼团',
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
