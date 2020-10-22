import http from '@common/finsuit-http/index.js'
import config from '@useCoupons/config/config.index.js'
import bcBridge from '@common/finsuit-h5/libs/bcBridge'

let isPC = bcBridge.APP_FLAG == "PC" ? bcBridge.APP_FLAG : "";

/**
 * @name B000A122 埋点唯一标识ID（自定义）
 * @param {Object} context 当前上下文
 * @param {Object} args 动态参数
 */

// 会员权益-卡券-立即使用区域
export const B000A492 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: isPC + "B000A492",
    REMARK_DATA: "会员权益-卡券-立即使用区域",
    ...args
});

// 会员权益-卡券-卡券详情页立即使用
export const B000A493 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: isPC + "B000A493",
    REMARK_DATA: "会员权益-卡券-卡券详情页立即使用",
    ...args
});
// 会员权益-卡券-卡券可适用产品-产品点击
export const B000A494 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: isPC + "B000A494",
    REMARK_DATA: "会员权益-卡券-卡券可适用产品-产品点击",
    ...args
});


// 会员权益-卡券-查看已失效卡券
export const B000A495 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    REMARK_DATA: "会员权益-卡券-查看已失效卡券", //点位名称
    FUNCTION_ID: isPC + "B000A495" //点位
});

// 会员权益-卡券-已失效卡券列表的券点击
export const B000A496 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: isPC + "B000A496",
    REMARK_DATA: "会员权益-卡券-已失效卡券列表的券点击",
    ...args
});
