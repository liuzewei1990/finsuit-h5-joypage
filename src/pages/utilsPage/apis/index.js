import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

/**
 * 活动接口
 */

// 获取小程序码
export const CAMPAIGN_SERVICE_HANDLER = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false, "getcode-->")

// 获取图片验证码
export const GETMSGCODE = (params, head) => http.post(config.baseUrlHost, "/finsuit/finsuitSafeCode/outer", "SEND_SMS", params, head, false, false, "SEND_SMS-->")

// 获取手机验证码
export const GETMOBILECODE = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, true, "SEND_SMS-->")
// 登录
export const LOGIN = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "LOGIN", params, head, false, true, "LOGIN-->")
