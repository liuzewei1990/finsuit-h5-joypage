import http from '@common/finsuit-http/index.js'
import config from '@activityCenter/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */


// 首页banner
export const getHomeBanner = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_HOME_PAGE_INFO", params, head, false, false, "首页数据")

// 活动列表
export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_LIST", params, head, false, false, "活动列表数据")

// 活动详情
export const getActivityDetail = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_DETAIL_PAGE", params, head, false, false, "活动详情数据")

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
