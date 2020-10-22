import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        {
            name: 'finsuit',
            path: '/finsuit',
            component: require('../view/main').default,
            meta: { title: 'finsuit插件包', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        // {
        //     name: 'index',
        //     path: '/',
        //     component: require('../view/main/excWelfare').default,
        //     meta: {
        //         title: '专属礼',
        //         requiresAuth: false,
        //         keepAlive: true
        //     },
        //     // redirect: "/",
        // },
        // {
        //     name: 'rule',
        //     path: '/rule',
        //     component: require('../view/main/excWelfareRule').default,
        //     meta: {
        //         title: '活动规则',
        //         requiresAuth: false,
        //         keepAlive: true
        //     },
        //     // redirect: "/",
        // },
        {
            name: 'gift',
            path: '/',
            component: require('../view/excGift/excGift').default,
            meta: {
                title: '专属礼',
                requiresAuth: false,
                keepAlive: true
            },
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
