import http from '@common/finsuit-http/index.js'
import config from '@oneTask/config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/


// 每日任务活动首页
export const ACB0Q001 = (data) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0Q001", REMARK_DATA: "每日任务活动首页", ...data });

// 任务内容区域-规则弹出
export const ACB0Q002 = (data) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0Q002", REMARK_DATA: "任务内容区域-规则弹出", ...data });

// 任务执行/领取奖励
export const ACB0Q003 = (data) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0Q003", REMARK_DATA: "任务执行/领取奖励", ...data });

// 分享渠道--------暂时没有需求
// export const ACB0Q004 = (data) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0Q004", REMARK_DATA: "分享渠道", ...data });