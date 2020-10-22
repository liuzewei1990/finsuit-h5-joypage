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
        {
            name: 'wages',
            path: '/',
            component: require('../view/wages/wages').default,
            meta: {
                title: '月存月富有',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'detail',
            path: '/detail',
            component: require('../view/wages/wagesDetail').default,
            meta: {
                title: '月存月富有',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'detailAgain',
            path: '/detailAgain',
            component: require('../view/wages/wagesDetailAgain').default,
            meta: {
                title: '月存月富有',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'highlights',
            path: '/highlights',
            component: require('../view/wages/wagesHighlights').default,
            meta: {
                title: '我的高光时刻',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'accIncome',
            path: '/accIncome',
            component: require('../view/wages/wagesAccIncome').default,
            meta: {
                title: '累计收益',
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
