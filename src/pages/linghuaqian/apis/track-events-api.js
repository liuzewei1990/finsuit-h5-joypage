import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 活动中心-活动banner(拼财)
export const PCB000A265 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A265", REMARK_DATA: "活动中心-活动banner" });

// 活动中心-活动banner(比财)
export const B000A249 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A249", REMARK_DATA: "活动中心-活动banner" });
