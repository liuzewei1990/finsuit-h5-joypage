/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);

import "./assets/css/index.css"

/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;


/* 注册api接口 */
import * as api from "./apis/index.js"
Vue.prototype["$api"] = api;

/* 注册api接口 */
import * as interfaceApi from "./apis/interfaceApi.js"
Vue.prototype["$interfaceApi"] = interfaceApi;


/* 注册埋点api接口 */
import * as trackEvents from "./apis/track-events-api.js"
Vue.prototype["$trackEvents"] = trackEvents;


/* 引入全局路由钩子守卫 */
import "./router/routerController.js"
import "@common/finsuit-plugins/vue-lazyload.js"


/* 比财活体提示弹窗 */
import FinsuitConfirm from "@oneTask/components/FinsuitConfirm"
Vue.use(FinsuitConfirm);


/* 注册公共弹窗 */
import CommonDialog from "./components/CommonDialog"
Vue.prototype["$CommonDialog"] = CommonDialog;


/* 组件抛出器 */
import ThrowComponent from "@common/finsuit-plugins/throwComponent"
Vue.prototype["$throwComponent"] = new ThrowComponent();


/* 引入任务模板 */
import TaskTemplate from "./components/TaskTemplate"
Vue.component("TaskTemplate", TaskTemplate);
import MinButton from "./components/MinButton"
Vue.component("MinButton", MinButton);

const app = new Vue({
    router,
    store,
    components: { App },
    template: "<App/>"
});


/* 挂载app */
app.$bootstrap();


// app.$mount("#app")