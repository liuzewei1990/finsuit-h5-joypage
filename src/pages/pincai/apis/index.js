import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

// 获取精彩产品
export const getGoodsList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_SELECTED_PRODUCTS_INFO", params, head, false, false)

// 获取精选产品详情入口
export const getGoodsRedirectUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RECOMMEND_PRD_LIST", params, head, false, false)

// 获取活动列表
export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_FIELD_CONFIG", params, head, false, false)

// 查看红包是否配置
export const getShareRedPacket = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_POPUP_INFO", params, head, false, false)

// 投资结果
export const sendbuysuccess = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "INVESTMENT_RESULTS_PAGE", params, head, false, false)

//去发言提交发言
export const handleSubmit = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "ADD_SUGGEST", params, head, false, false)

//购买完成后检查用户是否参与成功
export const checkStatus = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CHECK_MEMBER_INVEST_STATUS", params, head, false, false)


/**
 * 公共接口
 *
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)
// 获取活动code
export const getActiveCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_BY_ID", params, head, false, false)
