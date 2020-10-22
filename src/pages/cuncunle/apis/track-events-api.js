import http from '@common/finsuit-http/index.js'
import config from '@cuncunle/config/config.index.js'


/**
 * @name B000A122 埋点唯一标识ID（自定义）
 * @param {Object} context 当前上下文
 * @param {Object} args 动态参数
 */

// 村村乐-活动首页
export const ACB0K013 = () => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
  FUNCTION_ID: "ACB0K013",
  REMARK_DATA: "村村乐-活动首页"
});

// 村村乐-立即报名
export const ACB0K012 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
  FUNCTION_ID: "ACB0K012",
  REMARK_DATA: "村村乐-立即报名",
  ...params
});

// 站外分享-打开APP领取
export const ACB0K008 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
  FUNCTION_ID: "ACB0K008",
  REMARK_DATA: "站外分享-打开APP领取",
  ...params
});
