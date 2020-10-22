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
            component: require('@inviteUsers/view/main').default,
            meta: {
                title: '邀新有礼',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'myPrize',
            path: '/myPrize',
            component: () => import( /* webpackChunkName: "myPrize" */ '@inviteUsers/view/myPrize'),
            meta: {
                title: '邀新有礼',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'outSide',
            path: '/outSide',
            component: () => import( /* webpackChunkName: "outSide" */ '@inviteUsers/view/outSide'),
            meta: {
                title: '',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'newUser',
            path: '/newUser',
            component: () => import( /* webpackChunkName: "newUser" */ '@inviteUsers/view/newUser'),
            meta: {
                title: '',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'screenshot',
            path: '/screenshot',
            component: () => import( /* webpackChunkName: "screenshot" */ '@inviteUsers/view/screenshot'),
            meta: {
                title: '长按屏幕保存图片',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'mpmscanInvite',
            path: '/mpmscanInvite',
            component: () => import( /* webpackChunkName: "scanInvite" */ '@inviteUsers/view/mpmscanInvite'),
            meta: {
                title: '长按屏幕保存图片',
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
