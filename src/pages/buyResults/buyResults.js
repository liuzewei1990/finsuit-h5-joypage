/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);


/* 注册配置文件 */
import config from "@buyResults/config/config.index.js"
Vue.prototype["$Config"] = config;

/* 注册api接口 */
import * as api from "@buyResults/apis/index.js"
Vue.prototype["$api"] = api;


/* 注册埋点api接口 */
import * as trackEvents from "@buyResults/apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;
import VTrack from "v-track"
Vue.use(VTrack, {
    trackEvents
});

/* 注册公共弹窗 */
// import CommonDialog from "@buyResults/components/CommonDialog"
// Vue.prototype["$CommonDialog"] = CommonDialog;

/* 引入全局路由钩子守卫 */
import "@buyResults/router/routerController.js"



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
