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
            meta: { title: 'finsuit插件包', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'depositResults',
            path: '/depositResults',
            component: require('../view/depositResults/index.vue').default,
            meta: { title: '购买结果', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'rule',
            path: '/rule',
            component: require('../view/rule/index.vue').default,
            meta: { title: '活动规则', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'toSpeak',
            path: '/toSpeak',
            component: require('../view/toSpeak/index.vue').default,
            meta: { title: '建议与反馈', requiresAuth: false, keepAlive: true },
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
