/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"

import bus from "@common/finsuit-h5/libs/bus.js"
/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);


/* 注册配置文件 */
import config from "@oneTask/config/config.index.js"
Vue.prototype["$Config"] = config;


/* 注册api接口 */
import * as api from "@oneTask/apis/index.js"
Vue.prototype["$api"] = api;


/* 注册埋点api接口 */
import * as trackEvents from "@oneTask/apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;
import VTrack from "v-track"
Vue.use(VTrack, { trackEvents });


/* 注册公共弹窗 */
import CommonDialog from "@oneTask/components/CommonDialog"
Vue.prototype["$CommonDialog"] = CommonDialog;

/* 注册领取奖励接口 */
import commonGetRewardApi from "@oneTask/utils/commonGetRewardApi.js"
Vue.prototype["$commonGetRewardApi"] = commonGetRewardApi;

import FinsuitConfirm from "@oneTask/components/FinsuitConfirm"
Vue.use(FinsuitConfirm);


/* 引入全局路由钩子守卫 */
import "@oneTask/router/routerController.js"
import "@common/finsuit-plugins/vue-lazyload.js"

/* 监听app返回触发事件到bus实例 */
window.pageAppear = () => {
    bus.$emit("pageAppear");
}

const app = new Vue({
    router,
    store,
    components: { App },
    template: "<App/>"
});


/* 挂载app */
app.$bootstrap();


// app.$mount("#app")