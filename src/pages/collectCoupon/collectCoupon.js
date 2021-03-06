/* eslint-disable no-new */
import Vue from "vue"
// import App from "./App"
// import router from "./router"
// import store from "./store/index"
import Root from "./Root.vue"

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);


/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;


/* 注册api接口 */
import * as api from "./apis/index.js"
Vue.prototype["$api"] = api;

import CommonDialog from "./components/CommonDialog"
Vue.prototype["$CommonDialog"] = CommonDialog;
/* 微信分享 */
import WxShare from "@common/finsuit-plugins/wxShare.js"
Vue.prototype["$wxShare"] = new WxShare();

/* 注册埋点api接口 */
import * as trackEvents from "./apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;
import VTrack from "v-track"
Vue.use(VTrack, { trackEvents });


/* 引入全局路由钩子守卫 */
import "./router/routerController.js"

const app = new Vue(Root);
// const app = new Vue({
//     router,
//     store,
//     components: { App, SharePopup },
//     template: "<div><App/><SharePopup ref='SharePopup' @shareSuccess='shareSuccess'/></div>"
// });


/* 挂载app */
app.$bootstrap();


// app.$mount("#app")