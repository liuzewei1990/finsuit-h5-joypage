import * as api from "@llz/apis/index.js"

export const state = {
    /**
     * 邀请用户总数
     * 字段值如果为false 则不展示
     */
    inviteUserCount: {
        // 以邀请人数
        userInviteNums: "0",
        // 已实名人数
        userAuthNums: "0",
        // 已开户人数
        userBankNums: "0",
        // 已投资人数
        userInvestNums: "0",
        // 红包金额
        money: "0",
        // 券数量
        compon: "0",
        // 爱奇艺数量
        aqiyi: "0"
    },
    // 赚钱攻略
    MARK_MONEY_STRATEGY: "",
    // 新增外层属性集合
    newRootObj: {
        HEAD_PIC_URL: "", // 首页头图
        RECEIVE_DAILY_LIMIT_NUMBER: "", //已领取次数
        DAILY_LIMIT_NUMBER_TOTAL: "", // 领取红包总次数
        EARN_SHARE_REWARD_TURN: "", //  随机红包开关  	0关 1开
    },

    //   邀请门槛 ；0 弹窗；1不弹
    JSON_CONDITIONS: "1",
    /**
     *  本月排名
     */
    THIS_MONTH_LIST: [],
    /**
     *  上月排名
     */
    LAST_MONTH_LIST: [],
    /**
     * 我获得
     */
    meGet: [],

    /**
     * 朋友获得
     */
    INVETED_AWARD: [],
    /**
     * 底部：简单四步立享多重好礼
     */
    stepGetGoodGift: [],
}

export const getters = {

}


export const mutations = {
    // 首頁--获得奖励-和邀请各类好友数量
    ["INVITE_USER_COUNT"](state, data) {
        state.inviteUserCount.userInviteNums = data.INVITED_COUNT;
        state.inviteUserCount.userAuthNums = data.AUTH_COUNT;
        state.inviteUserCount.userBankNums = data.OPEN_ACCOUNT_COUNT;
        state.inviteUserCount.userInvestNums = data.INVESTED_COUNT;
        state.inviteUserCount.money = data.AWARD_TOTAL_AMOUNT;
        state.inviteUserCount.compon = data.GET_COUPON_NUM;
        state.inviteUserCount.aqiyi = data.GET_AQY_NUM;
    },
    // 新增外层数据集合
    ["NEWROOTOBJ"](state, data) {
        state.newRootObj.HEAD_PIC_URL = data.HEAD_PIC_URL; // 首页头图
        state.newRootObj.RECEIVE_DAILY_LIMIT_NUMBER = data.RECEIVE_DAILY_LIMIT_NUMBER; //已领取次数
        state.newRootObj.DAILY_LIMIT_NUMBER_TOTAL = data.DAILY_LIMIT_NUMBER_TOTAL; // 领取红包总次数
        state.newRootObj.EARN_SHARE_REWARD_TURN = data.EARN_SHARE_REWARD_TURN; //  随机红包开关  	0关 1开
    },
    // 分享返回刷新已领取数
    ["RECEIVE_DAILY_LIMIT_NUMBER"](state, data) {
        state.newRootObj.RECEIVE_DAILY_LIMIT_NUMBER = data;
    },
    //   赚钱攻略
    ["MARK_MONEY_STRATEGY"](state, data) {
        state.MARK_MONEY_STRATEGY = data
    },
    //  简单四步立享多重好礼
    ["STEPGETGOODGIFT"](state, data) {
        state.stepGetGoodGift = data
    },
    //  朋友获得
    ["INVETED_AWARD"](state, data) {
        state.INVETED_AWARD = data
    },
    //  我获得
    ["MEGET"](state, data) {
        state.meGet = data
    },
    //  邀请门槛
    ["JSON_CONDITIONS"](state, data) {
        state.JSON_CONDITIONS = data
    },
    //  排行榜
    ["MONTH_LIST"](state, data) {
        state.THIS_MONTH_LIST = [];
        state.LAST_MONTH_LIST = [];
        data.THIS_MONTH_LIST.map((ele) => {
            state.THIS_MONTH_LIST.push({
                "userHeader": ele.HEAD_ING_URL,
                "userPhone": ele.PHONE_NUM,
                "userNums": ele.count
            })
        });
        data.LAST_MONTH_LIST.map((ele) => {
            state.LAST_MONTH_LIST.push({
                "userHeader": ele.HEAD_ING_URL,
                "userPhone": ele.PHONE_NUM,
                "userNums": ele.count
            })
        });
    }
}

export const actions = {
    // 首页接口
    async getMainData(context) {
        let data = await api.getHomeData({
            "APP_PLACE": "3",
            "OTHER_TYPE_CODE": "EARN_SCAN_CODE",
            "ACTITY_CODE": "EARN"
        });
        console.log("首页->", data);
        context.commit("STEPGETGOODGIFT", data.STEP_TEXT);
        context.commit("INVETED_AWARD", data.INVETED_AWARD);
        context.commit("JSON_CONDITIONS", data.JSON_CONDITIONS);
        context.commit("INVITE_USER_COUNT", data.INVITE_FRIENDS);
        context.commit("MARK_MONEY_STRATEGY", data.MARK_MONEY_STRATEGY);
        context.commit("NEWROOTOBJ", data);
    },
    // 我获得接口
    async getMeGetData(context) {
        let data = await api.getMeGetData();
        console.log("我获得->", data);
        context.commit("MEGET", data.GET_REWARDS);
    },
    // 首页排行榜
    async getRANKING_LIST(context) {
        let data = await api.getRANKING_LIST();
        console.log("排行榜->", data);
        context.commit("MONTH_LIST", data.RANKING_LIST);
    },
    async getNewNumber(context, data) {
        context.commit("RECEIVE_DAILY_LIMIT_NUMBER", data);
    }
}
