
import router from "./index.js"
import store from "../store/index"

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.path === '/login' && store.getters.isLogin) {
        next({ path: '/', query:to.query})
        return;
    }

    if (to.matched.some(m => m.meta.requiresAuth)) {
        //判断是否登录
        if (store.getters.isLogin) {
            next()
        } else {
            next({ path: '/login', query: to.query })
        }
    } else {
        next()
    }
})
