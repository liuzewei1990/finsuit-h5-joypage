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

// 我是demo
export const demo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "DEMO", params, head, false, false, "我是demo")



/**
 * 公共接口
 * 
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false, "获取分享按钮")

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false, "获取微信分享签名")

// 登录接口
export const login = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "LOGIN", params, head, false, false, "登录接口")

// 登录获取验证码接口
export const sendCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, false, "登录获取验证码接口")