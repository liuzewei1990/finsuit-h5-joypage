import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 活动首页初始化页面
export const ACB0V001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {FUNCTION_ID: "ACB0V001",REMARK_DATA: "活动首页初始化页面" + context.special});

// 首页-产品区域点击
export const ACB0V002 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {FUNCTION_ID: "ACB0V002",REMARK_DATA: "银行产品点击"+ context.special,ITEM_VALUE: context.PRD_INDEX_ID,ITEM_VALUE1: context.ORG_ID,});

// 首页-活动Banner点击
export const ACB0V003 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {FUNCTION_ID: "ACB0V003",REMARK_DATA: "首页-活动Banner点击"+ context.special+context.index,});


