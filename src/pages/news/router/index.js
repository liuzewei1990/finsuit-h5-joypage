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
            component: require('@news/view/main').default,
            meta: { title: '资讯', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "detail",
            path: "/detail",
            component: () => import(/* webpackChunkName: "detail" */ '@news/view/detail/index.vue'),
            meta: { title: '知道', requiresAuth: false, keepAlive: true },
        },
        {
            name: "comment",
            path: "/comment",
            component: () => import(/* webpackChunkName: "detail" */ '@news/view/comment/index.vue'),
            meta: { title: '评论', requiresAuth: false, keepAlive: false },
        },
        {
            name: "iframe",
            path: "/iframe",
            component: () => import(/* webpackChunkName: "iframe" */ '@news/view/iframe/index.vue'),
            meta: { title: '评论', requiresAuth: false, keepAlive: false },
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
