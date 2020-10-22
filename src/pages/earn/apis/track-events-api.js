import http from '@common/finsuit-http/index.js'
import config from '@earn/config/config.index.js'


/**
 * @name B000A122 埋点唯一标识ID（自定义）
 * @param {Object} context 当前上下文
 * @param {Object} args 动态参数
 */

// 活动首页
export const ACB0K001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K001",
    REMARK_DATA: "活动首页"
});

// 活动规则
export const ACB0K003 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K003",
    REMARK_DATA: "活动首页-活动规则"
});
// 提醒好友
export const ACB0K004 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K004",
    REMARK_DATA: "活动首页-提醒好友"
});
// 活动首页-立即邀请赚钱
export const ACB0K006 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K006",
    REMARK_DATA: "活动首页-立即邀请赚钱"
});

// 扫码邀请页面
export const ACB0K011 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K011",
    REMARK_DATA: "分享页面-扫码邀请-发微信给他"
});

// 站外分享-打开APP领取
export const ACB0K008 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K008",
    REMARK_DATA: "站外分享-打开APP领取",
    ...params
});
// 站外登录
export const ACB0K007 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K007",
    REMARK_DATA: "站外分享-立即领取",
    ...args
});
// 分享渠道
export const ACB0K009 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K009",
    REMARK_DATA: "分享渠道",
    ...args
});
// 活动首页-点击领取
export const ACB0K015 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K015",
    REMARK_DATA: "活动首页-点击领取"
});
// 活动首页-立即抽奖
export const ACB0K016 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K016",
    REMARK_DATA: "活动首页-立即抽奖"
});
// 活动首页-我的奖励
export const ACB0K017 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K017",
    REMARK_DATA: "活动首页-我的奖励"
});
// 活动首页-我的奖品
export const ACB0K018 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K018",
    REMARK_DATA: "活动首页-我的奖品"
});
// 活动首页-赚钱攻略
export const ACB0K019 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K019",
    REMARK_DATA: "活动首页-赚钱攻略"
});
// 活动首页-弹窗去实名
export const ACB0K020 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K020",
    REMARK_DATA: "活动首页-弹窗去实名"
});
// 我的奖品-点击查看
export const ACB0K021 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K021",
    REMARK_DATA: "我的奖品-点击查看"
});
// 爱奇艺卡-复制
export const ACB0K022 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    FUNCTION_ID: "ACB0K022",
    REMARK_DATA: "爱奇艺卡-复制"
});
// 站外初始化
export const ACB0K014 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    REMARK_DATA: "站外分享-分享领取首页", //点位名称
    FUNCTION_ID: "ACB0K014", //点位
    ...args
});
