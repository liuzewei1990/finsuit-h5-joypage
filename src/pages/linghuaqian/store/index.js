// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import { state, getters, mutations } from '@common/finsuit-store/index.js'

import MainData from "./modules/MainData.js"

Vue.use(Vuex);

const persistedstate = createPersistedState({
    key: "@linghuaqian",
    storage: window.localStorage,
    reducer: (state) => ({ MainData: state.MainData }),
});

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    modules: { MainData },
    plugins: [persistedstate]
});