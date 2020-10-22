import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

//  获取头部额外收益信息
export const getHeaderLeftData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "OTHER_INCOME", params, head, false, false, "获取头部额外收益")
//  总资产+昨日收益
export const getAsset = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_MEMBER_ASSET_MONEY", params, head, false, false, "总资产+昨日收益")
//  总资产接口
export const getAllAsset = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ALL_ASSET", params, head, false, false, "总资产接口")
//  昨日收益接口
export const getIndexYsdIncome = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_INDEX_YSD_INCOME", params, head, false, false, "昨日收益接口")

// 获取头部menu按钮信息
export const getHeaderRightData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "INDEX_OPERATION_MENU", params, head, false, false, "获取头部menu按钮信息")

// 获取banner轮播
export const getHeaderBanner = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_HOME_PAGE_INFO", params, head, false, false, "获取banner轮播")

// 底部评论换一换
export const getFooterComment = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "HOME_PAGE_CUSTOMER_COMMENT", params, head, false, false, "底部评论换一换")

// 获取底部、合作银行、发言数据
export const getFooterData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "BOTTOM_PICTURE_CONFIG", params, head, false, false, "获取底部、合作银行、发言数据")

//  获取拼团列表数据
export const getTeamList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_PC_TEAM_INFO_BY_TIMEPERIOD", params, head, false, false, "获取拼团列表数据")

// 获取拼财首页拼团列表
export const getHomeTeamList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_PC_TEAM_HOME_PAGE_INFO", params, head, false, false, "获取拼财首页拼团列表")

// 获取首页tabs配置
export const getTabsConfig = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_MAIN_PAGE_MODULE_PRIORITY", params, head, false, false, "获取首页tabs配置")

// 获取拼人数列表
export const getPersonData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ASSEMBLE_PERSON_MAIN_PAGE", params, head, false, false, "获取拼人数列表")

// 获取个投列表
export const getAloneList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "PC_COLLAGE_INVEST_FOR_MAINPAGE_NEW", params, head, false, false, "获取个投列表")

// 分享返回得红包
export const postShareRedPacket = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "COLLAGE_SHARE_RED_PACKET", params, head, false, false, "分享返回得红包")

// 检查是否可以拼团
export const postCheckTeamStatus = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "PC_COLLAGE_CHECK_TEAM_IS_NORMAL", params, head, false, false, "检查是否可以拼团")

// 用户预约拼团-比财
export const BC_PostTeamOpenRemind = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "COLLAGE_CHANGE_REMIND_SWITCH", params, head, false, false, "用户预约拼团-比财")

// 用户预约拼团-拼财
export const PC_PostTeamOpenRemind = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "PC_COLLAGE_CHANGE_REMIND_SWITCH", params, head, false, false, "用户预约拼团-拼财")

// 首页公告列表
export const getNotice = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_NOTICE", params, head, false, false, "首页公告列表")
/**
 * 公共接口
 * 
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false, "获取分享按钮")

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false)

// 获取产品详情入口
export const getProducdDetailUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RECOMMEND_PRD_LIST", params, head, false, false)

// 获取下载app帮助页面图片地址
export const getDowloadAppHelpData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GUIDE_PAGE_PIC", params, head, false, false)
