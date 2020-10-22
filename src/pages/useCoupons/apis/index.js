import http from '@common/finsuit-http/index.js'
import config from '@useCoupons/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

/**
 * 公共接口
 *
 */
// 获取可用卡券列表
export const getcanuselist = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_DRAW_COUPON_LIST", params, head, false, false, "获取可用卡券列表")


//  获取失效卡券列表
export const getnouselist = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false, "获取失效卡券列表")


// 获取可用产品列表
export const getcanuseProduct = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_COUPON_PRD_REL_INFO", params, head, false, false, "获取可用产品列表")
