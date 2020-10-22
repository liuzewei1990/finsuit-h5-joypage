import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 理财节活动主会场打开页
export const ACB0R001 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R001", REMARK_DATA: "理财节活动主会场打开页", ...params });
// 主会场首页-分享
export const ACB0R002 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R002", REMARK_DATA: "主会场首页-分享", ...params });
// 主会场首页-攻略
export const ACB0R003 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R003", REMARK_DATA: "主会场首页-攻略", ...params });
// 主会场-活动banner
export const ACB0R004 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R004", REMARK_DATA: "主会场-活动banner", ...params });
// 主会场-投资记录
export const ACB0R005 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R005", REMARK_DATA: "主会场-投资记录", ...params });
// 主会场-预约用券
export const ACB0R006 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R006", REMARK_DATA: "主会场-预约用券", ...params });
// 主会场-分享弹窗
export const ACB0R007 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R007", REMARK_DATA: "主会场-分享弹窗", ...params });
// 主会场-立即预约
export const ACB0R008 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R008", REMARK_DATA: "主会场-立即预约", ...params });
// 分享渠道
export const ACB0R009 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R009", REMARK_DATA: "分享渠道", ...params });


// 站外主会场打开页
export const ACB0R010 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R010", REMARK_DATA: "站外主会场打开页", ...params });
// 站外主会场-去下载 打不上
export const ACB0R011 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R011", REMARK_DATA: "站外主会场-去下载", ...params });
// 站外主会场-稍后下载 打不上
export const ACB0R012 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R012", REMARK_DATA: "站外主会场-稍后下载", ...params });