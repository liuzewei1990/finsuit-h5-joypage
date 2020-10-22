import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'
import interRes from "./interceptorsResponse.js"
/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */


/**
 * 活动接口
 * @param {*} params 
 * @param {*} head 
 */

// 获取签到信息
export const getSignData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "signinService-isAppSignin", ...params }, head, false, false, "获取签到信息").then(interRes)

// 开始签到
export const sign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "signinService-signinCreate", ...params }, head, false, false, "开始签到").then(interRes)

// 签到提醒
export const postSignRemind = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "signinService-updRemindStatus", ...params }, head, false, false, "签到提醒").then(interRes)

// 热门兑换商品列表
export const getScoreGoodsList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "integralMallService-getGoodsList", ...params }, head, false, false, "热门兑换商品列表")

// 获取用户积分卡片
export const getUserScoreCard = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "signinService-getIntegralByMember", ...params }, head, false, false, "获取用户积分卡片").then(interRes)

// 获取用户积分明细
export const getUserScoreNote = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "signinService-getIntegralForPage", ...params }, head, false, false, "获取用户积分明细").then(interRes)

// 获取任务列表
export const getTaskList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "activityTaskService-getHomeTaskInfo", ...params }, head, false, false, "获取任务列表").then(interRes)

// 领取任务
export const getTask = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "activityTaskService-taskDraw", ...params }, head, false, false, "领取任务").then(interRes)

// 领取任务奖励
export const getReward = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "activityTaskService-taskAwardDraw", ...params }, head, false, false, "领取任务奖励").then(interRes)

// 任务完成接口
export const taskComplete = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "activityTaskService-completeCheck", ...params }, head, false, false, "任务完成接口").then(interRes)

// 获取任务历史
export const getTaskHistory = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "activityTaskService-taskHistoryInfo", ...params }, head, false, false, "获取任务历史").then(interRes)

// 获取活动列表
// export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_FIELD_CONFIG", params, head, false, false, "获取活动列表")
export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "ActivityAppService-getAppActivityInfo", ...params }, head, false, false, "获取活动列表").then(interRes)

// 获取会员等级信息
export const getUserLevelInfo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", { routeKey: "memberExperience-queryMemberLevelDetailInfoByUser", ...params }, head, false, false, "获取会员等级信息").then(interRes)

// 通用活动规则接口
export const getRule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEL_RULE_BY_CODE", params, head, false, false, "活动规则")

/**
 * 任务所需接口
 * @param {*} params 
 * @param {*} head 
 */

// 查询是否已经活体
export const getFaceDiscernStatus = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_AUTH_STATUS_V2", params, head, false, false, "查询是否已经活体")

// 获取银行开户所需信息
export const getOpenBankAccountInfo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ORG_EXTEND_INFO", params, head, false, false, "获取银行开户所需信息")

// 获取投资进度信息
export const getHoldingAssets = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_PRD_EXTEND_INFO", params, head, false, false, "获取投资进度信息")



/**
 * 公共接口
 * @param {*} params 
 * @param {*} head 
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false, "获取分享按钮")

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false, "获取微信分享签名")

// 登录接口
export const login = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "LOGIN", params, head, false, false, "登录接口")

// 登录获取验证码接口
export const sendCode = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SEND_SMS", params, head, false, false, "登录获取验证码接口")