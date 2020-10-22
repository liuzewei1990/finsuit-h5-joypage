import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),

    routes: [{
            name: 'finsuit',
            path: '/finsuit',
            component: require('../view/main').default,
            meta: {
                title: 'finsuit插件包',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'regular',
            path: '/',
            component: require('../view/main/regular').default,
            meta: {
                title: '招财进宝',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'rule',
            path: '/rule',
            component: require('../view/main/regularRule').default,
            meta: {
                title: '活动规则',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {
            name: 'record',
            path: '/record',
            component: require('../view/main/regularRecord').default,
            meta: {
                title: '投资权益明细',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {//招财进宝2.0
            name: 'iteration',
            path: '/iteration',
            component: require('../view/iteration/iteration').default,
            meta: {
                title: '步步为盈',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
        },
        {//招财进宝2.0
            name: 'iterationRule',
            path: '/iterationRule',
            component: require('../view/iteration/iterationRule').default,
            meta: {
                title: '攻略',
                requiresAuth: false,
                keepAlive: true
            },
            // redirect: "/",
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
