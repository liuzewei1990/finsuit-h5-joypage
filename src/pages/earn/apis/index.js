import http from '@common/finsuit-http/index.js'
import config from '@earn/config/config.index.js'

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
// 获取首页数据
export const getHomeData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_EARN_MAIN_PAGE_DATA", params, head, false, false, "获取首页数据")
//  首页--转盘
export const getRockRewards = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_EARN_ROCK_REWARDS", params, head, false, false)
//  首页-活动规则
export const getAvctiveRule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_EARN_RULE_LIST", params, head, false, false)
// 我获得--
export const getMeGetData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_EARN_INVITEE_REWARDS", params, head, false, false, "获取我获得数据")
// 获取滚动消息
export const getMsgScrollList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_SHUFFLING_LIST", params, head, false, false)
// 获取邀请朋友列表
export const getInviteList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_EARN_INVITED_LIST", params, head, false, false)
// 点击提醒好友---首投或者实名
export const getRemindFriend = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "EARN_REMIND_INVITED", params, head, false, false)
// 点击领取奖励
export const getReward = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "EARN_ACCEPT_REWARD", params, head, false, false)
// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)

// 发送短信验证码
export const getMsgCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, true)

// 立即报名
export const postUser = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "LOGIN", params, head, false, false)

//  站外--活动规则
export const getoutSideAvctiveRule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "EARN_OUTSIDE_SHARE_PAGE", params, head, false, false)
//  我的奖品
export const getMyPrizeList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "EARN_OBTAIN_PRIZE_PAGE", params, head, false, false)
// 扫码邀请页面&&站外注册页面-- 主标题--副标题
export const getAllTitle = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "EARN_OUTSIDE_SHARE_TEXT", params, head, false, false)

// 获取下载app帮助页面图片地址
export const getDowloadAppHelpData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GUIDE_PAGE_PIC", params, head, false, false)

// 获取首页--新抽离出的 排行榜接口
export const getRANKING_LIST = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RANKING_LIST", params, head, false, false, "获取排行榜")

// 分享返回 获取随机红包
export const getRGET_REWARD = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false, "分享返回得红包")


// 新用户背景图
export const getUSER_BACKGROUND = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false, "用户背景图")
