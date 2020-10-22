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
            meta: { title: '攻略', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'ddf',
            path: '/ddf',
            component: require('../view/ddf').default,
            meta: { title: '单单赚介绍', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'nay',
            path: '/nay',
            component: require('../view/nay').default,
            meta: { title: '拼团介绍', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'nps',
            path: '/nps',
            component: require('../view/nps').default,
            meta: { title: '新手福利介绍', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        // {
        //     name: "shareLink",
        //     path: "/shareLink",
        //     component: () => import(/* webpackChunkName: "shareLink" */ '../view/shareLink/index.vue'),
        //     meta: { title: '每日一题', requiresAuth: false, keepAlive: false },
        // },

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
