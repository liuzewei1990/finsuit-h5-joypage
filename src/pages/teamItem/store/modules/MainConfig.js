

export default {
    state: {
        // 首页数据加载是否完毕
        onLoad: false,

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

    },
    actions: {

    }
}