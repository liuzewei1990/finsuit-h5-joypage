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
                title: '活动投资',
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
                title: '活动记录详情',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: "detail2",
            path: "/newDetail",
            component: () => import( /* webpackChunkName: "newDetail" */ '../view/detail/index.detail.vue'),
            meta: {
                title: '活动记录详情',
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
