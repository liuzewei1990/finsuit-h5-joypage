/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);

import WxShare from "@common/finsuit-plugins/wxShare.js"
Vue.prototype["$wxShare"] = new WxShare();

/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;

import localStore from "./utils/localStore.js"
Vue.prototype["$localStore"] = localStore;

import assets from "./config/assets.config.js"
Vue.prototype["$assets"] = assets;

import touchEvent from "./utils/touchEvent.js"
Vue.use(touchEvent);

import getCommonStyle from "./utils/getCommonStyle.js"
Vue.prototype["$CommonStyle"] = getCommonStyle;


/* 注册api接口 */
import * as api from "./apis/index.js"
Vue.prototype["$api"] = api;


/* 注册埋点api接口 */
import * as trackEvents from "./apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;
import VTrack from "v-track"
Vue.use(VTrack, { trackEvents });


/* 引入全局路由钩子守卫 */
import "./router/routerController.js"
import "./assets/css/scene.css"



const app = new Vue({
    router,
    store,
    components: { App },
    template: "<App/>"
});


/* 挂载app */
app.$bootstrap();


// app.$mount("#app")
