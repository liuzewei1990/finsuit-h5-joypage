import http from '@common/finsuit-http/index.js'
import config from '@activityList/config/config.index.js'
import bcBridge from '@common/finsuit-h5/libs/bcBridge'

let isPC = bcBridge.APP_FLAG == "PC" ? bcBridge.APP_FLAG : "";

/**
 * @name B000A122 埋点唯一标识ID（自定义）
 * @param {Object} context 当前上下文
 * @param {Object} args 动态参数
 */

// 活动中心落地页
export const B000A553 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    REMARK_DATA: "活动中心落地页", //点位名称
    FUNCTION_ID: isPC + "B000A553" //点位
});

// 活动中心-活动banner
export const B000A554 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    REMARK_DATA: "活动中心-活动banner", //点位名称
    FUNCTION_ID: isPC + "B000A554", //点位
    ...args
});
