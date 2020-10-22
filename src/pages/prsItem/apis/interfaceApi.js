
/**
 * 拼团api转换
 * @param {*} data 
 */

export const createTeamUiData = function (data = {}) {
    return data.map(item => {
        item.uiData = {};
        // teamId
        item.uiData.teamId = item.TEAM_ID;
        // 团状态
        item.uiData.teamStatus = item.START_STATUS;
        // 提醒
        item.uiData.isRemind = item.IS_REMIND;
        // 银行名称
        item.uiData.orgName = item.ORG_NAME;
        // 产品名称
        item.uiData.prdName = item.PRD_NAME;
        // 利率
        item.uiData.prdRate = item.PRD_RATE;
        // 加息类型
        item.uiData.couponType = item.REWARD_TYPE;
        // 加息值
        item.uiData.couponValue = item.REWARD;
        // 利率描述
        item.uiData.prdRateText = item.RATE_BABEL_TEXT;
        // 标签
        item.uiData.tags = item.HOME_PAGE_LABEL && (item.HOME_PAGE_LABEL + "").split(/,|，/);
        // 团进度
        item.uiData.teamSchedule = item.TEAM_SCHEDULE;
        // 剩余金额
        item.uiData.collagedAmount = item.COLLAGED_AMOUNT;
        // 总金额
        item.uiData.totalAmount = item.TEAM_TOTAL_AMOUNT;
        return item;
    });
}



/**
 * 拼人数api转换
 * @param {*} data 
 */

export const createPersonUiData = function (data = {}) {
    return data.map(item => {
        item.uiData = {};
        // 团类型 1：超级团 2：普通团
        item.uiData.teamType = item.ASSEMBLE_TYPE;
        // 银行名称
        item.uiData.orgName = item.ORG_NAME;
        // 产品名称
        item.uiData.prdName = item.PRD_NAME;
        // 利率
        item.uiData.prdRate = item.PRD_RATE;
        // 加息
        // item.uiData.couponRate = item.STANDARDS_RATE; //111
        // 加息类型
        item.uiData.couponType = item.REWARD_TYPE_SHOW;
        // 加息值
        item.uiData.couponValue = item.REWARD;
        // 利率描述
        item.uiData.prdRateText = item.REWARD_DESC;
        // 标签
        item.uiData.tags = item.DEFINE_LABEL_SUFFIX && (item.DEFINE_LABEL_SUFFIX + "").split(/,|，/);
        // 标签描述
        item.uiData.tagText = item.aaaa;
        // 已参团人数
        item.uiData.personNum = Number(item.ASSEMBLE_ACTUAL_NUMBERS) || 0;
        // 团人数
        item.uiData.personTotalNum = Number(item.ASSEMBLE_TOTAL_NUMBERS) || 0;
        // 团标签
        item.uiData.labelText = item.SUPER_ASSEMBLE_TYPE || "超级团";

        return item;
    });
}

/**
 * 拼人数api转换
 * @param {*} data 
 */

export const createAloneUiData = function (data = {}) {
    return data.map(item => {
        item.uiData = {};
        // 银行名称
        item.uiData.orgName = item.ORG_NAME;
        // 产品名称
        item.uiData.prdName = item.PRD_NAME;
        // 利率
        item.uiData.prdRate = item.PRD_RATE;
        // 加息类型
        item.uiData.couponType = item.COUPON_TYPE;
        // 加息券
        item.uiData.couponRate = item.COUPON_RATE;
        // 加息现金券
        item.uiData.couponAmount = item.COUPON_AMOUNT;
        // 利率描述
        item.uiData.prdRateText = item.PRD_RATE_NAME;
        // 标签
        item.uiData.tags = item.LABEL_DESCRIPTS || [];
        // 标签描述
        item.uiData.tagText = item.aaaa;
        // 团标签
        item.uiData.labelText = "银行首投奖励";

        return item;
    });
}


