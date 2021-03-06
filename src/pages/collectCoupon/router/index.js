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
            meta: { title: '预约领券', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "activityRule",
            path: "/activityRule",
            component: () => import(/* webpackChunkName: "activityRule" */ '../view/activityRule/index.vue'),
            meta: { title: '活动规则', requiresAuth: false, keepAlive: true },
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
