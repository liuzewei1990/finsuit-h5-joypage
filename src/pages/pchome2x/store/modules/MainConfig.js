
import * as api from "../../apis/index.js"



const user = {
    state: {
        // 首页数据加载是否完毕
        onLoad: false,
        // 头部额外收益配置
        headerMoneyConfig: {},
        // 总资产
        allAssetData: {},
        // 昨日收益
        indexYsdData: {},
        // 头部按钮配置
        headerMenuConfig: [],
        // banner轮播数据
        banner: {},
        // 公告列表 - 适用滚动轮播形式
        noticeList: [],
        // tab配置
        tabs: [{
            CREATE_ID: 39,
            CREATE_TIME: "2019-09-26 23:13:12",
            DELETE_FLAG: "0",
            ID: 1,
            MODULE_CODE: "COLLAGEF_TEAM",
            MODULE_SORT: null,
            MODULE_TITLE: "拼金额",
            UPDATE_TIME: "2019-09-26 23:13:11",
            UPD_ID: null
        }, {
            CREATE_ID: 39,
            CREATE_TIME: "2019-09-26 23:13:20",
            DELETE_FLAG: "0",
            ID: 2,
            MODULE_CODE: "ASSEMBLE_PERSON",
            MODULE_SORT: null,
            MODULE_TITLE: "拼人数",
            UPDATE_TIME: "2019-09-26 23:13:19",
            UPD_ID: null
        }],

        // 底部、合作银行、发言数据
        aboutData: {
            title: "",
            titleUrl: "",
            icons: []
        },

        bankData: {},

        commentData: {
            OPEN: 1,
            TITLE: "",
            SUB_TITLE: "",
            CUSTOMER_COMMENT_REFRESH_TITLE_BC: "",
            COMMENT_LIST: []
        },

        footerData: {},

        // 拼人数分享配置
        prsShareJson: [],
        // 拼团分享配置
        teamShareJson: [],

        // url配置信息
        URLConfig: {
            // 是否显示head头部banner
            isHead: 1,
            // 是否显示banner
            isBanner: 1,
            // 是否显示底部银行信息
            isBottom: 1
        }

    },
    getters: {
        tabsChange (state) {

        }
    },
    mutations: {
        SET_ON_LOAD: (state, onLoad) => {
            state.onLoad = onLoad;
        },
        SET_MAIN_TABS: (state, tabs) => {
            state.tabs = tabs;
        },
        SET_HEADER_MONEY_CONFIG: (state, data) => {
            state.headerMoneyConfig = data;
        },
        GET_ALL_ASSET: (state, data) => {
            state.allAssetData = data;
        },
        GET_INDEX_YSD_INCOME: (state, data) => {
            state.indexYsdData = data;
        },
        SET_HEADER_MENU_CONFIG: (state, menus) => {
            state.headerMenuConfig = menus;
        },
        SET_BANNER_DATA: (state, banner) => {
            state.banner = banner;
        },
        SET_NOTICE_LIST: (state, noticeList) => {
            state.noticeList = noticeList;
        },
        SET_ABOUT_DATA: (state, data) => {
            state.aboutData = data;
        },
        SET_BANK_DATA: (state, data) => {
            state.bankData = data;
        },
        SET_COMMENT_DATA: (state, data) => {
            state.commentData = data;
        },
        SET_COMMENT_LIST: (state, commentList) => {
            let list = state.commentData.COMMENT_LIST.concat(commentList);
            state.commentData.COMMENT_LIST = list;
        },
        SET_FOOTER_DATA: (state, data) => {
            state.footerData = data;
        },
        SET_PRS_SHARE_DATA: (state, shareJson) => {
            state.prsShareJson = shareJson;
        },
        SET_TEAM_SHARE_DATA: (state, shareJson) => {
            state.teamShareJson = shareJson;
        },
        SET_URL_CONFIG: (state, URLQuery) => {
            let URLConfig = {};
            URLConfig.isHead = Number(URLQuery.isHead || 1);
            URLConfig.isBanner = Number(URLQuery.isBanner || 1);
            URLConfig.isBottom = Number(URLQuery.isBottom || 1);
            state.URLConfig = URLConfig;
        },
    },
    actions: {

        async initMainTabs ({ commit, dispatch, state, rootState }, params = {}) {
            let data = await api.getTabsConfig({ ...params });
            commit("SET_MAIN_TABS", data);
        },
        async initHeaderConfig ({ commit, dispatch, state, rootState }, params = {}) {


            // let headerMenuConfigData = await api.getHeaderRightData({ BTN_TYPE: 1 });

            // commit("SET_MAIN_TABS", data);
        },
        // 放入缓存
        saveStateCache ({ commit, dispatch, state, rootState }, params = {}) {
            localStorage.setItem("state", state);
        }
    }
}

export default user;