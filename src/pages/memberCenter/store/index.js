// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
import { state, getters, mutations } from '@common/finsuit-store/index.js'
Vue.use(Vuex);

import MainData from "./modules/MainData"

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    modules: { MainData },
    // plugins: [createLogger()]
});