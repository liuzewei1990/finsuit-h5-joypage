import http from '@common/finsuit-http/index.js'
import config from '../config/config.index.js'

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

// 获取页面图片
export const getImg = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_HOME_SHARING", params, head, false, false)
