/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"


/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);



/* 注册配置文件 */
import config from "@activityCenter/config/config.index.js"
Vue.prototype["$Config"] = config;

/* 注册api接口 */
import * as api from "@activityCenter/apis/index.js"
Vue.prototype["$api"] = api;

/* 公共逻辑方法 */
import toLinkType from "./utils/toLinkType.js"
Vue.prototype["$toLinkType"] = toLinkType;

/* 注册埋点api接口 */
import * as trackEvents from "@activityCenter/apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;

/* 埋点插件 */
import VTrack from "v-track"
Vue.use(VTrack, { trackEvents });


/* 引入全局路由钩子守卫 */
import "@activityCenter/router/routerController.js"
import "@common/finsuit-plugins/vue-lazyload.js"



const app = new Vue({
    router,
    store,
    components: { App },
    template: "<App/>"
});


/* 挂载app */
app.$bootstrap();


// app.$mount("#app")