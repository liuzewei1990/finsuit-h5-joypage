// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
// import createPersistedState from 'vuex-persistedstate'
import { state, getters, mutations } from '@common/finsuit-store/index.js'
import MainConfig from "./modules/MainConfig.js"
import MainData from "./modules/MainData.js"

Vue.use(Vuex);

// const persistedstate = createPersistedState({
//     key: "@pchome",
//     storage: window.localStorage,
//     reducer: (state) => ({ MainConfig: state.MainConfig, MainData: state.MainData }),
// });

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    modules: { MainConfig, MainData },
    // plugins: [persistedstate]
});
