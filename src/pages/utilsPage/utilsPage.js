/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"
/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);


/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;

/* 注册util */
import tool from "./utils"
Vue.prototype["$tool"] = tool;
/* 注册api接口 */
import * as api from "./apis/index.js"
Vue.prototype["$api"] = api;




/* 引入全局路由钩子守卫 */
import "./router/routerController.js"



const app = new Vue({
    router,
    store,
    components: {
        App
    },
    template: "<App/>"
});


/* 挂载app */
app.$bootstrap();


// app.$mount("#app")
