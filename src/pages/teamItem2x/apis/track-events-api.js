import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 活动首页-拼金额Tab键
export const ACB0P002 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0P002", REMARK_DATA: "活动首页-拼金额Tab键" });
// 活动首页-拼人数Tab键
export const ACB0P003 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0P003", REMARK_DATA: "活动首页-拼人数Tab键" });
// 活动首页-（拼人数）卡片点击
export const ACB0P004 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0P004", REMARK_DATA: "活动首页-（拼人数）卡片点击" });
// 活动首页-今日拼团-团时间点击
export const ACB0G053 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0G053", REMARK_DATA: "活动首页-今日拼团-团时间点击" });
// 拼财-活动首页初始化页面
export const ACB0G027 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0G027", REMARK_DATA: "拼财-活动首页初始化页面" });
// 拼团-分享送红包
export const ACB0G002 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0G002", REMARK_DATA: "拼团-分享送红包" });
// 拼财-查看红包
export const ACB0G023 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0G023", REMARK_DATA: "拼财-查看红包" });
// 拼财-再次分享
export const ACB0G024 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0G024", REMARK_DATA: "拼财-再次分享" });
// 拼团-分享渠道
export const ACB0G022 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0G022", REMARK_DATA: "拼团-分享渠道" });
//  拼团-我的投资底部
export const ACB0G011 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "ACB0G011", REMARK_DATA: "拼团-我的投资底部" });

// 拼财-查看产品
export const PCB000A255 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A255", REMARK_DATA: "拼财-查看产品" });
// 拼财-立即预约
export const PCB000A254 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A254", REMARK_DATA: "拼财-立即预约" });
// 拼财-立即拼团
export const PCB000A253 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000A253", REMARK_DATA: "拼财-立即拼团" });

// 首页-一分钟了解比财数据科技-点击
export const PCB000S003 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S003", REMARK_DATA: "首页-一分钟了解比财数据科技-点击" });
// 首页-全面-区域点击
export const PCB000S004 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S004", REMARK_DATA: "首页-全面-区域点击" });
// 首页-安全-区域点击
export const PCB000S005 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S005", REMARK_DATA: "首页-安全-区域点击" });
// 首页-可靠-区域点击
export const PCB000S006 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S006", REMARK_DATA: "首页-可靠-区域点击" });
// 首页-看看大家怎么说-换一批
export const PCB000S008 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S008", REMARK_DATA: "首页-看看大家怎么说-换一批" });
// 首页-看看大家怎么说-去发言
export const PCB000S009 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S009", REMARK_DATA: "首页-看看大家怎么说-去发言" });
// 首页-客服电话点击
export const PCB000S010 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S010", REMARK_DATA: "首页-客服电话点击" });
// 客服电话-呼叫 没法打
// export const PCB000S011 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { ...params, FUNCTION_ID: "PCB000S006", REMARK_DATA: "首页-‘可靠’区域点击" });
