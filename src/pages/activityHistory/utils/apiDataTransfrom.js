/**
 * 接口数据转换层：订单按月分组、
 * 
 * @param {*} list 
 */
import bcIcon from "@common/finsuit-assets/images/bicai.png"
import unit from "../json/unit.json"

export default function (list) {

    if (!(list instanceof Array)) return;


    // 获取年月 例如：2019-08-01 12：11：00 => 2019-08
    let getYearMonth = (timeStr) => {
        timeStr = timeStr ? (timeStr + '').replace(/\-/g, "/") : new Date();
        let dateTimeStamp = new Date(timeStr).getTime();
        return this.$utils.formatTime(dateTimeStamp / 1000, "Y-M");
    }

    // 按月过滤分组
    let transformGrupMonth = (list, index) => {
        let month = "";
        let currTime = getYearMonth(list[index].investTimeText);
        if (index === 0) {
            month = currTime;
        } else {
            let perTime = getYearMonth(list[index - 1].investTimeText);
            if (currTime === perTime) month = "";
            else month = currTime;
        }
        return month;
    }

    // 处理额外加息单位 返回 3.22元 或者 3.22% 或者 3.22
    let handleUnit = (additionalIncome, couponType) => {
        if (!additionalIncome) return false;
        return additionalIncome + (couponType ? unit[couponType] : "");
    }

    //接口数据转换
    return list.map((item, index) => {
        let newItem = {};
        newItem["month"] = transformGrupMonth(list, index);
        // newItem["orderId"] = item; 没有id
        // 活动icon
        newItem["activityImg"] = item.activityImg ? this.$transfromAliyunUrl(item.activityImg) : bcIcon;
        // 活动名称
        newItem["activityName"] = item.activityName;
        // 银行名称
        newItem["orgName"] = item.orgName;
        // 产品名称
        newItem["prdName"] = item.prdName;
        // 订单状态
        newItem["orderStatus"] = item.status;
        // 状态失败或未发放原因
        newItem["orderStatusReason"] = item.invalidCause;
        // 订单金额
        newItem["teadeAmount"] = this.$utils.moneyFormatCN(item.tradeAmount, true); // true代表元 false代表分
        // 活动投资时间 到日
        // newItem["orderTime"] = item.flowCreateDate;
        // 活动投资时间 到分
        newItem["flowCreateTime"] = item.investTimeText;
        // 订单号
        newItem["tradeFlowNo"] = item.tradeFlowNo;

        // 计息金额
        newItem["amountToLimit"] = this.$utils.moneyFormatCN(item.amountToLimit, true); // true代表元 false代表分
        // 预计收益金额
        newItem["incomeAmount"] = item.incomeAmount;
        // 加息天数
        newItem["ratePeriod"] = Number(item.ratePeriod) || 0;
        // 助力天数
        newItem["assistanceDay"] = Number(item.assistanceDay) || 0;
        // 预计收益到账时间
        newItem["realTime"] = item.realTime;
        // 计息时间
        newItem["reckonReteTime"] = item.reckonReteTime;
        // 提前支取时间
        newItem["redemTime"] = item.redemTime;
        // 活动额外收益
        newItem["additionalIncome"] = handleUnit(item.additionalIncome, item.couponType);
        // 奖品名称
        newItem["prizeName"] = item.prize;
        // 奖品序列号
        newItem["prizeSerialNum"] = item.prizeSerialNum;
        // 人数拼团活动特定字段 
        newItem["totalNumbers"] = item.totalNumbers;
        // 小贴士
        newItem["tips"] = item.tips;

        return newItem;
    })
}
