/* eslint-disable no-new */
import Vue from "vue"
import App from "./pchome.vue"
import store from "./store/index"
import bus from "@common/finsuit-h5/libs/bus.js"

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);

/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;

/* 注册api接口 */
import * as api from "./apis/index.js"
Vue.prototype["$api"] = api;

/* 注册api接口 */
import * as interfaceApi from "./apis/interfaceApi.js"
Vue.prototype["$interfaceApi"] = interfaceApi;

import CommonDialog from "./components/CommonDialog"
Vue.prototype["$CommonDialog"] = CommonDialog;

/* 注册埋点api接口 */
import * as trackEvents from "./apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;

/* 注册alert弹窗 */
import FinsuitConfirm from "./components/FinsuitConfirm/index.js"
Vue.use(FinsuitConfirm);

/* 兼容App和H5的本地储存功能 */
import * as localStore from "./utils/localStore.js"
Vue.prototype["$localStore"] = localStore.default;


const app = new Vue({
    store,
    components: { App },
    template: "<App ref='App'/>"
});

// 全局登陆过期时触发
bus.$once("TOKEN_EXPIRE", () => {
    app.$Toast("登录过期，请重新登录");
    // console.log('登录过期，请重新登录');
    setTimeout(() => {
        this.$login();
    }, 1000);
})

// 返回页面时 - 检测用户是否登出 或 登陆，更新用户信息
bus.$on("pinCaiPageDidAppear", () => {
    // console.log("pinCaiPageDidAppear");

    // app.$sendLoginResult();
})


/* 挂载app */
app.$bootstrap();


// app.$mount("#app")
