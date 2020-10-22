import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

// 获取首页配置信息
export const getCouponList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "REWARD_FISSION_MAIN_PAGE", params, head, false, false, "获取优惠券列表")

// 获取 红包裂变 排行榜
export const getLuckList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "REWARD_FISSION_GET_RECORD", params, head, false, false, "获取 红包裂变 排行榜")

// 领券接口
export const getVoucher = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "REWARD_FISSION_GET_COUPON", params, head, false, false)

/**
 * 公共接口
 *
 */
// 获取验证码
export const getCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, true)

// 登陆
export const goLogin = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "LOGIN", params, head, false, true)

// 获取活动规则
export const getRuleMsg = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEL_RULE_BY_CODE", params, head, false, false)

//获取个人信息
export const getUserInfo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "REWARD_FISSION_SHARE_PAGE", params, head, false, true)


