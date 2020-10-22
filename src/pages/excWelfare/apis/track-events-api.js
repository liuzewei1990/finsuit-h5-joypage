import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 活动首页初始化页面
export const ACB0X001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0X001",
    REMARK_DATA: "活动首页初始化页面" + context.welfare
});

// 首页-活动规则
export const ACB0X002 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0X002",
    REMARK_DATA: "首页-活动规则"
});

// 首页-产品立即购买区域点击	
export const ACB0X003 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0X003",
    REMARK_DATA: "首页-产品立即购买区域点击"+'-'+context.pro,
    ITEM_VALUE: context.ITEM_VALUE,
    ITEM_VALUE1: context.ITEM_VALUE1,
});

// 首页-查看活动投资
export const ACB0X004 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0X004",
    REMARK_DATA: "首页-查看活动投资"
});
