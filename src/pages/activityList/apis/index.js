import http from '@common/finsuit-http/index.js'
import config from '@activityList/config/config.index.js'

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
// 获取活动列表
export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "CAMPAIGN_SERVICE_HANDLER", params, head, false, false, "列表")
