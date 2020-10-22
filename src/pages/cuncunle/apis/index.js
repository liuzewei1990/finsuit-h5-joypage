import http from '@common/finsuit-http/index.js'
import config from '@cuncunle/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

// 获取首页数据
export const getHomeData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "EARN_CCL_OUTSIDE_SHARE_PAGE", params, head, false, false)

// 获取滚动消息
export const getMsgScrollList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_SHUFFLING_LIST", params, head, false, false)

// 发送短信验证码
export const getMsgCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, true)

// 立即报名
export const postUser = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "LOGIN", params, head, false, false)

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

// 获取下载app帮助页面图片地址
export const getDowloadAppHelpData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GUIDE_PAGE_PIC", params, head, false, false)
