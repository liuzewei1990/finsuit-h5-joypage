import http from '@common/finsuit-http/index.js'
import config from '@topic/config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/
// 调接口获取打点需要的活动id 储存起来
// http.post(config.baseUrlHost, config.baseUrlPath, "SEL_ACTIVITY_ID_BY_CODE", { ACTIVITY_CODE: config.actityCode }, {}, false, false).then(data => {
//     sessionStorage.setItem("ACTITY_ID", data.ACTITY_ID)
// })

// 活动规则
export const ACB0I001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I001", REMARK_DATA: "活动规则" });

// 分享按钮
export const ACB0I002 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I002", REMARK_DATA: "分享按钮" });

// 提交得红包按钮
export const ACB0I003 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I003", REMARK_DATA: "提交得红包按钮" });

// 分享给好友按钮
export const ACB0I004 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I004", REMARK_DATA: "分享给好友按钮" });

// 提交页面-前往钱包
export const ACB0I005 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I005", REMARK_DATA: "提交页面-前往钱包" });

// 提交页面-立即使用 ------------------------------------------>二期版本已经废弃
export const ACB0I006 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I006", REMARK_DATA: "提交页面-立即使用" });

// 答案解析页面-查看详情
export const ACB0I007 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I007", REMARK_DATA: "答案解析页面-查看详情" });

// 分享渠道
export const ACB0I010 = (context, args) => {
    let ITEM_VALUE = context.currClickShareBtn.SHARE_PLACE;
    let ITEM_VALUE1 = context.currClickShareBtn.SHARE_TYPE;
    let SOURCE_ID = ITEM_VALUE;
    let FUNCTION_STATUS = 1;
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I010", REMARK_DATA: "分享渠道", ITEM_VALUE, ITEM_VALUE1, SOURCE_ID, FUNCTION_STATUS });
}

// 站外-分享落地页面
export const ACB0I011 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I011", REMARK_DATA: "站外-分享落地页面" });

// 分享落地页面-按钮点击 --------------------------------------> 那个按钮点击？？？？？？？？？？
export const ACB0I012 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I012", REMARK_DATA: "分享落地页面-按钮点击" });

// 站外-分享落地页面-下载参与
export const ACB0I013 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I013", REMARK_DATA: "站外-分享落地页面-下载参与" });

/* 二期新增 */

// 每日一题题目页面打开
export const ACB0I014 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I014", REMARK_DATA: "每日一题题目页面" });

// 开户有奖-立即开户
export const ACB0I015 = (context, item) => {
    // 银行ID
    let ITEM_VALUE = item.ORG_ID;
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I015", REMARK_DATA: "开户有奖-立即开户", ITEM_VALUE });
}

// 精选产品-产品点击
export const ACB0I016 = (context, item) => {
    // 银行ID
    let ITEM_VALUE = item.ORG_ID;
    // 产品ID
    let ITEM_VALUE1 = item.PROD_ID;
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I016", REMARK_DATA: "精选产品-产品点击", ITEM_VALUE, ITEM_VALUE1 });
}

// 精选活动-活动点击
export const ACB0I017 = (context, item) => {
    // 活动ID
    let ITEM_VALUE = item.ID;
    let ITEM_VALUE1 = item.IMG_DESCRIBE;
    let ITEM_VALUE2 = item.ACTITY_ID;
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I017", REMARK_DATA: "精选活动-活动点击", ITEM_VALUE, ITEM_VALUE1, ITEM_VALUE2 });
}

// 回答错误-去分享
export const ACB0I018 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I018", REMARK_DATA: "回答错误-去分享" });

// 回答正确-领取奖励
export const ACB0I019 = (context, getType, couponItem) => {
    // 奖励领取类型
    let ITEM_VALUE = getType;
    let ITEM_VALUE1 = couponItem.couponTitle;
    let ITEM_VALUE2 = couponItem.couponType;
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0I019", REMARK_DATA: "回答正确-领取奖励", ITEM_VALUE, ITEM_VALUE1, ITEM_VALUE2 });
}