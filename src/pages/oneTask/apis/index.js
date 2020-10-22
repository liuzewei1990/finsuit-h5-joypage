import http from '@common/finsuit-http/index.js'
import config from '@oneTask/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

// 获取任务列表
const TASK_TYPES = { "1": "AuthTask", "2": "BankTask", "3": "InvestTask" };
const USER_TASK_STATUS = { "1": "BEGIN", "0": "AWAIT", "2": "COMPLETE" };
const REWARD_TYPE = { "1": "MONEY", "2": "COUPON", "3": "LINK" };
export const getTaskList = async (params, head) => {
    try {
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "DAILY_TASK_HOME_INFO", params, head, false, false, "获取任务列表");
        return data.map(item => {
            let newItem = {};
            // 任务ID
            newItem["taskId"] = item.ID;
            // 任务类型
            newItem["taskType"] = TASK_TYPES[item.TASK_TYPE];
            // 任务标题
            newItem["taskTitle"] = item.TASK_TITLE;
            // 任务简介
            newItem["taskDesc"] = item.TASK_DESC;
            // 任务规则
            newItem["taskRule"] = item.TASK_RULE;
            // 任务icon
            newItem["taskIcon"] = item.TASK_PICTURE;
            // 任务状态
            newItem["taskStatus"] = USER_TASK_STATUS[item.USER_TASK_STATUS];
            // 任务已获得的图片，展示用
            newItem["taskRewardImg"] = item.REWARD_PICTURE;
            // 任务外部领取奖励地址
            newItem["taskRewardLink"] = item.REWARD_LINK_URL;
            // 任务奖励领取类型
            newItem["taskRewardType"] = REWARD_TYPE[item.REWARD_TYPE];

            // 实名任务私有数据
            newItem["investTaskData"] = {

            };
            // 开户任务私有数据
            newItem["bankTaskData"] = {
                orgId: item.ORG_ID
            };
            // 投资任务私有数据
            newItem["investTaskData"] = {
                // 产品id
                prdId: item.INVEST_ID,
                // 当前持仓天数 跟剑同约定，如果为null代表未投资，也就是去投资状态
                taskPosition: item.TASK_POSITION,
                // 持仓天数
                taskPositionEnd: item.PRD_PERIOD
            };
            return newItem;
        })
    } catch (error) {
        throw error;
    }
}

// 领取奖励
export const getReward = async (params, head) => {
    try {
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "SEND_DAILY_TASK_REWARD", params, head, false, false, "领取奖励接口");
        return data;
    } catch (error) {
        throw error;
    }
}

// 轮播图
export const getBanner = async (params, head) => {
    try {
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "DAILY_TASK_BANNER_INFO", params, head, false, false, "获取轮播数据");
        return data.map(item => {
            let newItem = {};
            newItem["img"] = item.ACT_IMG_URL;
            newItem["link"] = item.IMG_LINK_URL;
            return newItem;
        });
    } catch (error) {
        throw error;
    }
}

// 获取银行开户所需信息
export const getOpenBankAccountInfo = async (params, head) => {
    try {
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "GET_ORG_EXTEND_INFO", params, head, false, false, "获取银行开户所需信息");
        return {
            orgName: data.ORG_NAME,
            logoUrl: data.LOGO_URL,
            bankDockType: data.BANK_DOCK_TYPE,
            skipPageInfo: data.SKIP_PAGE_INFO
        }
    } catch (error) {
        throw error;
    }
}

// 获取投资进度信息
export const getHoldingAssets = async (params, head) => {
    try {
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "GET_PRD_EXTEND_INFO", params, head, false, false, "获取投资进度信息");
        return {
            // 产品类型id
            prdTypeId: data.PRD_TYPE_ID,
            // 存款类型id
            depositTypeId: data.DEPOSIT_TYPE_ID,
            // 投资记录id
            buyHistoryId: data.BUY_HISTORY_ID
        }
    } catch (error) {
        throw error;
    }
}

// 查询是否已经活体
export const getFaceDiscernStatus = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_AUTH_STATUS_V2", params, head, false, false, "查询是否已经活体")

