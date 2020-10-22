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
            component: require('@cuncunle/view/main').default,
            meta: { title: '村村乐', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "uidHelp",
            path: "/uidHelp",
            component: () => import(/* webpackChunkName: "uidHelp" */ '@cuncunle/view/uidHelp/index.vue'),
            meta: { title: '如何获取用户UID', requiresAuth: false, keepAlive: false },
        },
        {
            name: "newUser",
            path: "/newUser",
            component: () => import(/* webpackChunkName: "newUser" */ '@cuncunle/view/newUser/index.vue'),
            meta: { title: '报名成功', requiresAuth: false, keepAlive: false },
        },
        {
            name: "oldUser",
            path: "/oldUser",
            component: () => import(/* webpackChunkName: "oldUser" */ '@cuncunle/view/oldUser/index.vue'),
            meta: { title: '报名成功', requiresAuth: false, keepAlive: false },
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
