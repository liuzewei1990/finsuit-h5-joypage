import http from '@common/finsuit-http/index.js'
import config from '@activityCenter/config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 赚钱-顶部轮播广告位banner
export const PCB000A381 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A381", REMARK_DATA: "赚钱-顶部轮播广告位banner" });
// 赚钱-顶部导航按钮
export const PCB000A399 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A399", REMARK_DATA: "赚钱-顶部导航按钮" });
// 赚钱-内容区域banner
export const PCB000A392 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A392", REMARK_DATA: "赚钱-内容区域banner" });

// 赚钱-活动列表打开落地页
export const PCB000A395 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A395", REMARK_DATA: "赚钱-活动列表打开落地页" });
// 赚钱-活动列表元素点击
export const PCB000A397 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A397", REMARK_DATA: "赚钱-活动列表元素点击" });

// 赚钱-活动详情打开落地页
export const PCB000A396 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A396", REMARK_DATA: "赚钱-活动详情打开落地页" });
// 赚钱-活动详情-直达链接
export const PCB000A398 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A398", REMARK_DATA: "赚钱-活动详情-直达链接" });