import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
 * @name B000A122 埋点唯一标识ID（自定义）
 * @param {Object} context 当前上下文
 * @param {Object} args 动态参数
 */

// 活动首页初始化页面
export const ACB0Y001 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y001",
    REMARK_DATA: "活动首页初始化页面"
});

// 首页-查看活动规则详情
export const ACB0Y002 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y002",
    REMARK_DATA: "首页-查看活动规则详情"
});

// 首页-产品立即购买区域点击
export const ACB0Y003 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y003",
    REMARK_DATA: "活动首页-产品立即购买区域点击规则"
});

// 弹窗-继续购买
export const ACB0Y004 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y004",
    REMARK_DATA: "弹窗-继续购买"
});

// 首页-投资成功领取口罩
export const ACB0Y005 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y005",
    REMARK_DATA: "首页-投资成功领取口罩"
});

// 首页-复制
export const ACB0Y006 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y006",
    REMARK_DATA: "首页-复制"
});

// 弹窗-参与成功去填写/参与失败我知道了
export const ACB0Y007 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y007",
    REMARK_DATA: "弹窗-参与成功去填写/参与失败我知道了"
});

// 提交收货地址页面
export const ACB0Y008 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y008",
    REMARK_DATA: "提交收货地址页面"
});

// 地址填写页-提交地址领取口罩
export const ACB0Y009 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y009",
    REMARK_DATA: "地址填写页-提交地址领取口罩"
});

// 老用户：去看看其他活动
export const ACB0Y010 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y010",
    REMARK_DATA: "老用户：去看看其他活动"
});

// 已参与：去填写地址等待发货吧
export const ACB0Y011 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "ACB0Y011",
    REMARK_DATA: "已参与：去填写地址等待发货吧"
});
