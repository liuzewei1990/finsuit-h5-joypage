import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'


/**
 * @name B000A122 埋点唯一标识ID（自定义）
 * @param {Object} context 当前上下文
 * @param {Object} args 动态参数
 */

// 下载比财按钮点击、下载拼财按钮点击 ：公用
export const B000A064 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
    ...params,
    FUNCTION_ID: "B000A064",
    REMARK_DATA: "首页分享下载按钮"
});
// 下载拼财按钮点击
// export const B000A064 = (params) => http.postPoint(config.baseUrlHost, config.baseUrlPath, {
//     ...params,
//     FUNCTION_ID: "B000A064",
//     REMARK_DATA: "首页分享下载按钮"
// });
