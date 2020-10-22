import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        {
            name: 'main',
            path: '/',
            component: require('@activityCenter/view/main').default,
            meta: { title: '', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "list",
            path: "/list",
            component: () => import(/* webpackChunkName: "list" */ '@activityCenter/view/list/index.vue'),
            meta: { title: '', requiresAuth: false, keepAlive: false },
        },
        {
            name: "detail",
            path: "/detail",
            component: () => import(/* webpackChunkName: "detail" */ '@activityCenter/view/detail/index.vue'),
            meta: { title: '活动详情', requiresAuth: false, keepAlive: false },
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
