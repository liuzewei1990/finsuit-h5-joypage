import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 会员中心落地页
export const B000A467 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A467", REMARK_DATA: "会员中心落地页" });
// 会员中心-签到提醒
export const B000A468 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A468", REMARK_DATA: "会员中心-签到提醒" });
// 会员中心-会员积分
export const B000A469 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A469", REMARK_DATA: "会员中心-会员积分" });
// 会员中心-精选活动-活动点击
export const B000A470 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A470", REMARK_DATA: "会员中心-精选活动-活动点击" });
// 会员中心-精选活动-查看更多活动
export const B000A471 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A471", REMARK_DATA: "会员中心-精选活动-查看更多活动" });
// 会员中心-福利任务-查看历史任务
export const B000A472 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A472", REMARK_DATA: "会员中心-福利任务-查看历史任务" });
// 会员中心-福利任务-任务按钮
export const B000A473 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A473", REMARK_DATA: "会员中心-福利任务-任务按钮" });
// 会员中心-会员积分-积分明细
export const B000A474 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A474", REMARK_DATA: "会员中心-会员积分-积分明细" });
// 会员积分-积分商城
export const B000A475 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A475", REMARK_DATA: "会员积分-积分商城" });
// 会员积分-积分规则
export const B000A476 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A476", REMARK_DATA: "会员积分-积分规则" });
// 会员积分-积分商品点击
export const B000A477 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "B000A477", REMARK_DATA: "会员积分-积分商品点击" });
