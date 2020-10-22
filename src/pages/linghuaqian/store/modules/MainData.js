const mainData = {
    state: {
        // 背景色
        backgroundColor: "",
        // banner头图
        bannerUrl: "",
        // 活动列表
        activityList: []
    },
    mutations: {
        SET_BACKGROUND_COLOR: (state, backgroundColor) => {
            state.backgroundColor = backgroundColor;
        },
        SET_BANNER_IMG: (state, bannerUrl) => {
            state.bannerUrl = bannerUrl;
        },
        SET_ACTIVITY_LIST: (state, activityList) => {
            state.activityList = activityList;
        }
    }
}

export default mainData;