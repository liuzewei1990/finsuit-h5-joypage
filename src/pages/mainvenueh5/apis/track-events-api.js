import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 攻略-新人福利介绍
export const ACB0R018 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R018", REMARK_DATA: "攻略-新人福利介绍", ...params });

// 攻略-拼团介绍
export const ACB0R019 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R019", REMARK_DATA: "攻略-拼团介绍", ...params });

// 攻略-单单返活动介绍
export const ACB0R020 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R020", REMARK_DATA: "攻略-单单返活动介绍", ...params });

// 攻略-回看
export const ACB0R021 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R021", REMARK_DATA: "攻略-回看", ...params });

// 攻略-邀请好友
export const ACB0R022 = (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R022", REMARK_DATA: "攻略-邀请好友", ...params });

// 攻略-参与活动
export const ACB0R023= (params = {}) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0R023", REMARK_DATA: "攻略-参与活动", ...params });
