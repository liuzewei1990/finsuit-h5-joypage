const user = {
    state: {
        // 产品列表
        prdList: [],
        // 首次投资≥100元，并持仓7天即可获得口罩奖励 文案
        investInfo: "",
        // 用户是否新手 1-新手 0-不是新手
        memberNoviceStatus: "",
        // 用户参与状态
        userStatus: {}
    },
    mutations: {
        SET_PRD_LIST: (state, list) => {
            state.prdList = list;
        },
        SET_INVEST_INFO: (state, investInfo) => {
            state.investInfo = investInfo;
        },
        SET_NEW_USER_STATUS: (state, memberNoviceStatus) => {
            state.memberNoviceStatus = memberNoviceStatus;
        },
        SET_USER_STATUS: (state, userStatus) => {
            state.userStatus = userStatus;
        },

    },
    actions: {
        setPermissions ({ commit, dispatch, state, rootState }, data) {

        }
    }
}

export default user;