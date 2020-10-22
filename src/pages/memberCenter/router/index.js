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
            meta: { title: '会员中心', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "userScore",
            path: "/userScore",
            component: () => import(/* webpackChunkName: "userScore" */ '../view/userScore/index.vue'),
            meta: { title: '会员积分', requiresAuth: false, keepAlive: true },
        },
        {
            name: "userScoreRule",
            path: "/userScoreRule",
            component: () => import(/* webpackChunkName: "userScoreRule" */ '../view/userScoreRule/index.vue'),
            meta: { title: '积分规则', requiresAuth: false, keepAlive: true },
        },
        {
            name: "userScoreNote",
            path: "/userScoreNote",
            component: () => import(/* webpackChunkName: "userScoreNote" */ '../view/userScoreNote/index.vue'),
            meta: { title: '积分明细', requiresAuth: false, keepAlive: false },
        },
        {
            name: "taskHistory",
            path: "/taskHistory",
            component: () => import(/* webpackChunkName: "taskHistory" */ '../view/taskHistory/index.vue'),
            meta: { title: '历史任务', requiresAuth: false, keepAlive: false },
        },
        {
            name: "taskRule",
            path: "/taskRule",
            component: () => import(/* webpackChunkName: "taskRule" */ '../view/taskRule/index.vue'),
            meta: { title: '任务规则', requiresAuth: false, keepAlive: true },
        },
        {
            name: "userLevel",
            path: "/userLevel",
            component: () => import(/* webpackChunkName: "userLevel" */ '../view/userLevel/index.vue'),
            meta: { title: '会员等级', requiresAuth: false, keepAlive: true },
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
