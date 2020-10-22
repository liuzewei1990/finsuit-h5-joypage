import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 预约领券打开页
export const ACB0R013 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R013", REMARK_DATA: "预约领券打开页", ...params });
// 预约领券-规则
export const ACB0R014 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R014", REMARK_DATA: "预约领券-规则", ...params });
// 预约领券-分享
export const ACB0R015 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R015", REMARK_DATA: "预约领券-分享", ...params });
// 预约领券-领券/使用
export const ACB0R016 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R016", REMARK_DATA: "预约领券-领券/使用", ...params });
// 预约领券-查看我的卡券
export const ACB0R017 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R017", REMARK_DATA: "预约领券-查看我的卡券", ...params });