import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 购买完成结果落地页
export const ACB0T001 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0T001", REMARK_DATA: "购买完成结果落地页" });

// 购买完成页-查看我的资产
export const ACB0T002 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0T002", REMARK_DATA: "购买完成页-查看我的资产" });

// 购买完成页-完成
export const ACB0T003 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0T003", REMARK_DATA: "购买完成页-完成" });

// 购买完成页弹窗-发红包
export const ACB0T004 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0T004", REMARK_DATA: "购买完成页弹窗-发红包" });

// 购买完成页弹窗-取消
export const ACB0T005 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0T005", REMARK_DATA: "购买完成页弹窗-取消" });

// 购买完成页-精选产品点击
export const ACB0T006 = (context, item) => {
    // 银行ID
    let ITEM_VALUE = item.ORG_ID;
    // 产品ID
    let ITEM_VALUE1 = item.PROD_ID;
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0T006", REMARK_DATA: "购买完成页-精选产品点击", ITEM_VALUE, ITEM_VALUE1 });
}

// 购买完成页-精选活动banner点击
export const ACB0T007 = (context, item) => {
    // 活动ID
    let ITEM_VALUE = item.ACTITY_ID;
    let ITEM_VALUE1 = item.ID;
    let ITEM_VALUE2 = item.IMG_DESCRIBE;
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0T007", REMARK_DATA: "购买完成页-精选活动banner点击", ITEM_VALUE, ITEM_VALUE1, ITEM_VALUE2 });
}

// 购买完成页 - 得红包
export const ACB0T008 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0T008", REMARK_DATA: "购买完成页 - 得红包" });

// 分享渠道
export const ACB0T009 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0T009", REMARK_DATA: "知道-详情页-分享渠道", ...params });

// 弹窗-参与成功去填写/参与失败我知道了
export const ACB0Y007 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0Y007", REMARK_DATA: "弹窗-参与成功去填写/参与失败我知道了", ...params });

