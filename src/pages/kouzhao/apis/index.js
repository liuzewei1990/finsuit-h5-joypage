import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */


// 提交收货地址
export const submitAddress = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SAVE_MEMBER_ADDRESS", params, head, false, false, "提交收货地址")

// 获取产品列表
export const getList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_MASK_HOME_PAGE", params, head, false, false, "获取产品列表")

// 查询剩余时间
export const checkTime = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SAVE_MEMBER_CLICK_TIME", params, head, false, false, "获取产品列表")


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
