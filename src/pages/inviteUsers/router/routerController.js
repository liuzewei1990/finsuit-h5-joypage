import router from "@inviteUsers/router"

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})
