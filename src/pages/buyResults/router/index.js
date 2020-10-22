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
            component: require('@buyResults/view/prs').default,
            meta: {
                title: '存入结果',
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
