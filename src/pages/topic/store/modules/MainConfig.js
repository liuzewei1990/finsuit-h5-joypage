
import * as api from "../../apis/index.js"



const user = {
    state: {
        // 分享配置
        shareJson: [],
    },
    mutations: {
        SET_SHARE_DATA: (state, shareJson) => {
            state.shareJson = shareJson;
        }
    },
    actions: {

    }
}

export default user;