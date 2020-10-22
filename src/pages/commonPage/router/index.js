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
                title: 'finsuit插件包',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: "dowloadHelp",
            path: "/dowloadHelp",
            component: () => import( /* webpackChunkName: "dowloadHelp" */ '../view/dowloadHelp/index.vue'),
            meta: {
                title: '下载帮助',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: "activityOver",
            path: "/activityOver",
            component: () => import( /* webpackChunkName: "activityOver" */ '../view/activityOver/index.vue'),
            meta: {
                title: '活动已结束',
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
