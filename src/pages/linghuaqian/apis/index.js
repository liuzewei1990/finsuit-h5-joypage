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

// 获取零花钱数据
export const getPocketMoney = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "QUERY_ACTIVTY_CENTERS", params, head, false, false, "获取零花钱数据")

// 获取零花钱数据
export const getInfoUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RESOLVED_URL_INFO", params, head, false, false, "图片点击")
