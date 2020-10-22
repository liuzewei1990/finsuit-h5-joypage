
import router from "@oneTask/router"
import bcBridge from "@common/finsuit-h5/libs/bcBridge.js"

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        bcBridge.updateTitle(to.meta.title);
    }
    next();
})