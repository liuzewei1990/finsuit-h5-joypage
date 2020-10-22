/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);


/* 注册配置文件 */
import Config from "@topic/config/config.index.js"
Vue.prototype["$Config"] = Config;


/* 注册api接口 */
import * as api from "@topic/apis"
Vue.prototype["$api"] = api;


/* 注册埋点api接口 */
import * as trackEvents from "@topic/apis/track-events-api.js"
import VTrack from "v-track"
Vue.prototype["$trackEvents"] = trackEvents;
Vue.use(VTrack, { trackEvents });


/* 活体检测弹窗 */
import ConfirmFinsuit from "@topic/components/ConfirmFinsuit/index.js"
Vue.use(ConfirmFinsuit);


import CommonDialog from "@topic/components/CommonDialog"
Vue.prototype["$CommonDialog"] = CommonDialog;


import "@topic/router/routerController.js"
import "@common/finsuit-plugins/vue-lazyload.js"


const app = new Vue({
    router,
    store,
    components: { App },
    template: "<App/>"
});

app.$bootstrap();

