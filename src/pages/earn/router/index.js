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
            component: require('@earn/view/main').default,
            meta: {
                title: '邀请好友',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'myPrize',
            path: '/myPrize',
            component: () => import( /* webpackChunkName: "myPrize" */ '@earn/view/myPrize'),
            meta: {
                title: '我的权益',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'outSide',
            path: '/outSide',
            component: () => import( /* webpackChunkName: "outSide" */ '@earn/view/outSide'),
            meta: {
                title: '',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'activeRule',
            path: '/activeRule',
            component: () => import( /* webpackChunkName: "activeRule" */ '@earn/view/activeRule'),
            meta: {
                title: '活动规则',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'newUser',
            path: '/newUser',
            component: () => import( /* webpackChunkName: "newUser" */ '@earn/view/newUser'),
            meta: {
                title: '',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'oldUser',
            path: '/oldUser',
            component: () => import( /* webpackChunkName: "oldUser" */ '@earn/view/oldUser'),
            meta: {
                title: '',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'scanInvite',
            path: '/scanInvite',
            component: () => import( /* webpackChunkName: "scanInvite" */ '@earn/view/scanInvite'),
            meta: {
                title: '扫码邀请',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'screenshot',
            path: '/screenshot',
            component: () => import( /* webpackChunkName: "screenshot" */ '@earn/view/screenshot'),
            meta: {
                title: '长按屏幕保存图片',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'mpmscanInvite',
            path: '/mpmscanInvite',
            component: () => import( /* webpackChunkName: "scanInvite" */ '@earn/view/mpmscanInvite'),
            meta: {
                title: '长按屏幕保存图片',
                requiresAuth: false,
                keepAlive: false
            },
        },
        {
            name: 'moneyStrategy',
            path: '/moneyStrategy',
            component: () => import( /* webpackChunkName: "moneyStrategy" */ '@earn/view/moneyStrategy'),
            meta: {
                title: '赚钱攻略',
                requiresAuth: false,
                keepAlive: true
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
