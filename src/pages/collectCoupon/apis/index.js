import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

// 获取优惠券列表
export const getCouponList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_DRAW_COUPON_LIST", params, head, false, false, "获取优惠券列表")
// 用户领取优惠券
export const postUserCoupon = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_MEM_COUPON_FOR_DRAW", params, head, false, false, "用户领取优惠券")
// 活动规则
export const getAvctiveRule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_DRAW_COUPON_RULE", params, head, false, false, "活动规则")
// 分享领红包
export const getShareLottery = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "COLLAGE_CLUB_GET_REWARD", params, head, false, false, "分享领红包")
// 获取MEM_COUPON_ID
export const getMemCouponId = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_MEM_COUPON_ID", params, head, false, false, "获取MEM_COUPON_ID")

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
