/**
 * 任务的公共领取奖励接口
 * dataset.taskId : 任务id
 * dataset.taskRewardType : 奖励类型
 * dataset.taskRewardImg : 奖励图片
 * dataset.taskRewardLink : 奖励外部领取链接
 * dataset.updateList : 刷新任务列表数据
 */

import bus from "@common/finsuit-h5/libs/bus.js"

export default async function (dataset) {

    switch (dataset.taskRewardType) {
        // 领取红包类型
        case "MONEY":
            await getMoneyReward.call(this, dataset);
            break;
        // 领取现金券类型
        case "COUPON":
            await getCouponReward.call(this, dataset);
            break;
        // 外链领取奖励类型
        case "LINK":
            await toRewardUrl.call(this, dataset);
            break;
        default:
            this.$Toast("奖励领取异常,请联系客服");
            break;
    }

}

/**
 * 领取红包奖励
 */

async function getMoneyReward (dataset) {
    try {
        let params = { ID: dataset.taskId };
        let data = await this.$api.getReward(params);
        dataset.updateList();

        // 显示弹窗
        let CommonDialog = this.$CommonDialog({
            componentName: "Dialog-LotteryImg",
            defaultcloseBtnVisible: false,
            showLoading: true,
            appendElement: this.$root.$el.querySelector("#page"),
            lotteryCoverImg: "",
            clickCallback: () => {
                CommonDialog.close();
            }
        });

        // 图片加载
        loadImg(dataset.taskRewardImg, () => {
            CommonDialog.propsData.lotteryCoverImg = dataset.taskRewardImg;
            CommonDialog.propsData.showLoading = false;
        }, err => {
            CommonDialog.close();
            this.$Toast("奖品信息加载出错,请以奖励实际到账为准");
        });

        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * 领取现金券奖励
 */

async function getCouponReward (dataset) {
    try {
        let params = { ID: dataset.taskId };
        let data = await this.$api.getReward(params);
        dataset.updateList();

        // 显示弹窗
        let CommonDialog = this.$CommonDialog({
            componentName: "Dialog-LotteryImg",
            defaultcloseBtnVisible: false,
            showLoading: true,
            appendElement: this.$root.$el.querySelector("#page"),
            lotteryCoverImg: "",
            clickCallback: () => {
                CommonDialog.close();
            }
        });

        // 图片加载
        loadImg(dataset.taskRewardImg, () => {
            CommonDialog.propsData.lotteryCoverImg = dataset.taskRewardImg;
            CommonDialog.propsData.showLoading = false;
        }, err => {
            CommonDialog.close();
            this.$Toast("奖品信息加载出错,请以奖励实际到账为准");
        });

        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * 打开外部领取奖励链接
 */

async function toRewardUrl (dataset) {
    if (dataset.taskRewardLink.indexOf("http") !== 0) {
        this.$Toast("请检查跳转链接");
        return;
    }
    let params = { ID: dataset.taskId };
    let data = await this.$api.getReward(params);
    // dataset.updateList(); 这里不需要刷新数据，有通用的pageAppear返回刷新事件

    this.$bcBridge.openWebview(dataset.taskRewardLink);
    // 只有此时打开的webview返回时触发
    bus.$once("pageAppear", () => {

        // 显示弹窗
        let CommonDialog = this.$CommonDialog({
            componentName: "Dialog-LotteryImg",
            defaultcloseBtnVisible: false,
            showLoading: true,
            appendElement: this.$root.$el.querySelector("#page"),
            lotteryCoverImg: "",
            clickCallback: () => {
                CommonDialog.close();
            }
        });

        // 图片加载
        loadImg(dataset.taskRewardImg, () => {
            CommonDialog.propsData.lotteryCoverImg = dataset.taskRewardImg;
            CommonDialog.propsData.showLoading = false;
        }, err => {
            CommonDialog.close();
            this.$Toast("奖品信息加载出错,请以奖励实际到账为准");
        });

    });
    return data;
}


/**
 * 奖励图片预加载
 * @param {*} src 
 * @param {*} callBack 
 */
function loadImg (src, callBack, errorCallBack) {
    var img = new Image();
    // if (img.complete) {
    //     callBack();
    //     return;
    // }
    img.onload = function () {
        callBack();
    }
    img.onerror = function (err) {
        errorCallBack(err);
    }
    img.src = src;
}