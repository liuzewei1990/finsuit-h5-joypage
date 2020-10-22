import taskTypes from "../json/taskTypes.json"
/**
 * 获取签到信息字段接口
 * @param {*} data 
 */

export const getSignData = function (data = {}) {

    return {
        // 用户头像
        userHeader: data.userHeader,
        // 用户昵称
        userName: data.userName || "",
        // 用户积分
        userScore: Number(data.currentIntegral || 0),
        // 积分说明
        scoreInfoText: data.scoreInfoText || "做任务赚积分，热门奖品等你来兑",
        // 连续签到天数
        signDayNum: data.addSigninNum,
        // 签到提醒开关
        signRemind: data.isRemind,
        // 今日是否已签到
        currDaySign: data.redDot,
        /**
         * 签到日历
         * item.dateTime 日期
         * item.dateScore 奖励积分
         * item.isSign 是否已签
         */
        signDateList: (data.signDateList || []).map(item => {
            let newItem = {};
            newItem["dateTime"] = item.dateTime;
            newItem["dateScore"] = item.integral;
            newItem["isSign"] = item.isSignin;
            return newItem;
        })
    }
}

/**
 * 获取用户积分明细
 * @param {*} data 
 */
export const getUserScoreNote = function (data) {
    // 获取积分明细
    return {
        // 总订单数
        totalCount: data.totalCount,

        data: (data.dataList || []).map(item => {
            return {
                orderID: item.orderID,
                // 订单交易类型 1：收入 2：支出 3：过期
                orserType: item.INTEGRAL_TYPE,
                // 订单积分
                orderScore: item.REWARD_INTEGRAL_COUNT,
                // 订单交易时间
                orderTime: item.REWARD_TIME,
                // 订单交易渠道
                orderCp: item.TITLE
            }
        }),
    }
}

/**
 * 获取任务历史
 * @param {*} data 
 */
export const getTaskHistory = function (data) {
    return {
        // 总订单数
        totalCount: data.totalCount,

        data: data.retList.map(item => {
            return {
                // 任务ID
                taskId: item.taskId,
                // 记录ID
                recordId: item.recordId,
                // 任务类型
                taskType: item.taskType,
                // 任务名称
                taskName: item.taskName,
                // 任务描述
                taskDesc: item.awardDesc,
                // 任务icon
                taskIcon: item.taskImgUrl,
                // 任务状态
                taskStatus: item.taskStep,
            }
        }),
    }
}

/**
 * 转换任务列表数据
 * @param {*} data 
 */
export const getTaskList = function (data) {

    return data.map((item) => {
        return {
            // 记录ID
            flowId: item.flowId,
            // 任务id
            taskId: item.taskId,
            // 任务类型1：签到；2：答题；3：分享 4：浏览;5：完善个人信息 6：实名认证 7：开通电子账户 8：产品投资
            taskType: item.taskType,
            // 任务组件
            taskComponent: taskTypes[item.taskType],
            // 任务图标
            taskIcon: item.taskImgUrl,
            // 任务标题
            taskTitle: item.taskName,
            // 任务描述
            taskDesc: item.taskDesc,
            // 任务状态 0未领取任务 1 未完成 2待领取
            taskStatus: item.recordStatus,
            // 任务规则
            taskRule: item.taskRule,
            // 任务私有数据
            dataset: {
                // 完成天数
                completedDay: item.completedDay,
                // 总共天数
                allDay: item.allDay,
                // 产品ID
                prdId: item.prdId,
                // 机构ID
                orgId: item.orgId,
                // 奖励连接
                linkUrl: item.linkUrl,
                // 浏览地址
                clickurl: item.clickurl,
                // 分享内容
                shareContent: item.shareContent,
                // 产品ID
                prdIndexId: item.extendMap && item.extendMap.prdIndexId,
                // 利率ID
                rateId: item.extendMap && item.extendMap.rateId,
                // 产品机构ID
                prdOrgId: item.extendMap && item.extendMap.prdOrgId,
                // 产品类型ID
                prdTypeId: item.extendMap && item.extendMap.prdTypeId,
                // 产品类型子ID
                depositTypeId: item.extendMap && item.extendMap.depositTypeId,
            }
        }
    })
}

export const getUserScoreCard = function (data) {

    return {
        // 用户总积分
        userScore: data.allIntegral,
        // 用户即将过期积分
        userExpireScore: data.overdueIntegral,
        // 用户积分即将过期时间
        userExpireScoreDate: data.overdueDate,
    }
}
