

import * as interfaceApi from "../../apis/interfaceApi.js"
export default {
    state: {
        // 活动标题
        activityTitle: "",
        // 活动列表
        activityList: [],
        // 签到模块数据
        signData: interfaceApi.getSignData(),
        // 任务列表
        taskList: [],
        // 会员等级
        userLevel: {}

    },
    mutations: {
        /* 更多活动标题 */
        SET_ACTIVITY_TITLE: (state, activityTitle) => {
            state.activityTitle = activityTitle;
        },
        /* 更多活动列表 */
        SET_ACTIVITY_LIST: (state, activityList) => {
            state.activityList = activityList;
        },
        /* 签到模块数据 */
        SET_SIGN_DATA: (state, signData) => {
            state.signData = signData;
        },
        /* 任务列表 */
        SET_TASK_LIST: (state, taskList) => {
            state.taskList = taskList;
        },
        /* 会员等级 */
        SET_LEVEL_DATA: (state, userLevel) => {
            state.userLevel = userLevel;
        }
    },
    actions: {

    }
}
