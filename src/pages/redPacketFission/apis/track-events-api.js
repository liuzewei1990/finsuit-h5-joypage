import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 站外首页
export const ACB0S001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0S001", REMARK_DATA: "站外首页" });

// 站外首页-登录并领取
export const ACB0S002 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0S002", REMARK_DATA: "站外首页-登录并领取" });

// 站外首页-活动规则
export const ACB0S003 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0S003", REMARK_DATA: "站外首页-活动规则" });

// 站外首页-卡券上的立即使用
export const ACB0S004 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0S004", REMARK_DATA: "站外首页-卡券上的立即使用" });

// 站外首页-卡券上的点击领取
export const ACB0S005 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0S005", REMARK_DATA: "站外首页-卡券上的点击领取" });

// 站外首页-看看其他活动
export const ACB0S006 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0S006", REMARK_DATA: "站外首页-看看其他活动" });

// 站外首页-立即使用
export const ACB0S007 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0S007", REMARK_DATA: "站外首页-立即使用" });
