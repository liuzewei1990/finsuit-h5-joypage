import http from '@common/finsuit-http/index.js'
import config from '@inviteUsers/config/config.index.js'

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
// 获取数据
export const getData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false, "获取首页数据")






// 获取滚动消息
export const getMsgScrollList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_SHUFFLING_LIST", params, head, false, false)

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)

// 发送短信验证码
export const getMsgCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, true)

// 立即报名
export const postUser = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "LOGIN", params, head, false, false)
