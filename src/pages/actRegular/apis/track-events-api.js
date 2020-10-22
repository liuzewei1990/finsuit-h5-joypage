import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 活动首页初始化页面
export const ACB0Z001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {FUNCTION_ID: "ACB0Z001",REMARK_DATA: "活动首页初始化页面" + context.regular});

// 首页-活动规则
export const ACB0Z002 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {FUNCTION_ID: "ACB0Z002",REMARK_DATA: "首页-活动规则"});

// 首页-产品区域点击
export const ACB0Z003 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {FUNCTION_ID: "ACB0Z003",REMARK_DATA: "首页-产品区域点击",ITEM_VALUE: context.PRD_INDEX_ID,ORG_ID: context.ORG_ID,});

//首页-投资权益明细
export const ACB0Z004 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {FUNCTION_ID: "ACB0Z004",REMARK_DATA: "首页-投资权益明细",});