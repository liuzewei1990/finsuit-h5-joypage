import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

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


//比财月存月富有 活动首页信息
export const getWagesDepositHome = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "WAGES_DEPOSIT_HOME", params, head, false, false)

// 比财月存月富有 活动产品信息
export const getProduct = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "WAGES_DEPOSIT", params, head, false, false)

// 拼财月存月富有 活动产品信息
export const getPCProduct = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "PC_WAGES_DEPOSIT", params, head, false, false)

// 月存月富有用户信息添加
export const addWagesDepositInfo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "ADD_WAGES_DEPOSIT_INFO", params, head, false, false)

// 月存月富有用户交易信息
export const getWagesDepositInfo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "WAGES_DEPOSIT_INFO：", params, head, false, false)

// 月存月富有用户高光时刻信息
export const getWagesDepositHighlight = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "WAGES_DEPOSIT_HIGHLIGHT", params, head, false, false)

//月存月富有用户累计收益信息
export const getWagesDepositIncome = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "WAGES_DEPOSIT_CUMULATIVE_INCOME", params, head, false, false)
