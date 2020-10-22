// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
import { state, getters, mutations } from '@common/finsuit-store/index.js'

import createPersistedState from 'vuex-persistedstate'
import MainData from "./modules/MainData.js"
import MainConfig from "./modules/MainConfig.js"
Vue.use(Vuex);

const persistedstate = createPersistedState({
    key: "@kouzhao",
    storage: window.localStorage,
    reducer: (state) => ({ MainData: state.MainData }),
});

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    modules: { MainData, MainConfig },
    // plugins: [persistedstate]
});