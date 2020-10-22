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

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false)

// 获取页面内容比财
export const getContent = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "BANK_ACTIVITY_MODULE_INFO", params, head, false, false)

// 获取页面内容拼财
export const getContentPC = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "PC_BANK_ACTIVITY_MODULE_INFO", params, head, false, false)





