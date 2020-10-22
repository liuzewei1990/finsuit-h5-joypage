import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        {
            name: 'index',
            path: '/',
            component: require('../view/main').default,
            meta: { title: '首投送口罩', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "rule",
            path: "/rule",
            component: () => import(/* webpackChunkName: "rule" */ '../view/rule/index.vue'),
            meta: { title: '活动规则', requiresAuth: false, keepAlive: false },
        },
        {
            name: "address",
            path: "/address",
            component: () => import(/* webpackChunkName: "address" */ '../view/address/index.vue'),
            meta: { title: '提交收货地址', requiresAuth: false, keepAlive: false },
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
