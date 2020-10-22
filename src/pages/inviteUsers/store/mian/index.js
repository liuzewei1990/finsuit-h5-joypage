import * as api from "@inviteUsers/apis/index.js"

export const state = {
    mainData: {},
}

export const getters = {

}


export const mutations = {
    // 首頁--获得奖励-和邀请各类好友数量
    ["GETMAINDAtA"](state, data) {
        state.mainData = data;
    },
}

export const actions = {
    // 首页接口
    async getMainData(context) {
        let data = await api.getData({
            "routeKey": "invitationInterFace-queryInvitationMainPage"
        });
        console.log("首页->", data.data);
        context.commit("GETMAINDAtA", data.data);
    },

}
