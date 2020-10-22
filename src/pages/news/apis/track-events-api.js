import http from '@common/finsuit-http/index.js'
import config from '@news/config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/
// 知道-详情页-评论框
export const PCB000A024 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "PCB000A024", REMARK_DATA: "知道-详情页-评论框", ...params });
// 知道-详情页-分享
export const PCB000A026 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "PCB000A026", REMARK_DATA: "知道-详情页-分享", ...params });
// 知道-详情页-分享渠道
export const PCB000A027 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "PCB000A027", REMARK_DATA: "知道-详情页-分享渠道", ...params });
// 知道-详情页-点赞
export const PCB000A028 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "PCB000A028", REMARK_DATA: "知道-详情页-点赞", ...params });
// 知道-详情页-不喜欢
export const PCB000A029 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "PCB000A029", REMARK_DATA: "知道-详情页-不喜欢", ...params });
// 知道-详情页-查看详情
export const PCB000A058 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "PCB000A058", REMARK_DATA: "知道-详情页-查看详情", ...params });