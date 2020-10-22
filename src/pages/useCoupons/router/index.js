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
            component: require('@useCoupons/view/main').default,
            meta: {
                title: '卡券',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'failure',
            path: '/failure',
            component: () => import( /* webpackChunkName: "failure" */ '@useCoupons/view/main/failure'),
            meta: {
                title: '已失效券',
                requiresAuth: false,
                keepAlive: true
            },
        },
        {
            name: 'detail',
            path: '/detail',
            component: () => import( /* webpackChunkName: "detail" */ '@useCoupons/view/detail'),
            meta: {
                title: '卡券详情',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'canUse',
            path: '/canUse',
            component: () => import( /* webpackChunkName: "detail" */ '@useCoupons/view/canUse'),
            meta: {
                title: '可使用产品',
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
