import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */


// 更多活动
export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_FIELD_CONFIG", params, head, false, false, "更多活动")

// 获取活动投资列表
export const getActivityInvestment = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false, "获取活动投资列表")


/**
 * 公共接口
 * 
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false)

// 获取产品详情入口
export const getProducdDetailUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RECOMMEND_PRD_LIST", params, head, false, false)

// 以单独订单号获取详情
export const getCampaign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false)
