import jsStorage from "js-storage"
// 列表已读记录
export const h5Storage = jsStorage.initNamespaceStorage('@mainvenue_isRead').localStorage;
/**
 * 封装原生和H5本地储存方法
 * @param {*} type 
 * @param {*} data 
 * @param {*} callBack 
 */
// this.$AppLocalStore("set", {});
// this.$AppLocalStore("get", {}, () => { });

export default function (type = "get", data = {}, callBack = () => { }) {

    // 根据日期处理每天开启一次动画
    const checkDate = (res) => {
        try {
            let newDate = this.$utils.formatTime(new Date().getTime() / 1000, "Y-M-D");
            let value = JSON.parse(res.value);

            let oldDate = value.date;
            if (newDate === oldDate) {
                return res;
            } else {
                value["isRead"] = "0";
                res["value"] = JSON.stringify(value);
                return res;
            }
        } catch (error) {
            return res;
        }
    }

    const setStore = (dataset) => {
        // 记录当前日期 2019-12-02
        let value = JSON.parse(dataset["value"]);
        value["date"] = this.$utils.formatTime(new Date().getTime() / 1000, "Y-M-D");
        dataset["value"] = JSON.stringify(value);

        // 如果拼财1.0.8版本
        if (this.$store.state.APP_FLAG === "PC" && this.$utils.isVersion(this.$store.state.VERSION, "1.2.0")) {
            this.$bcBridge.storeFlag(dataset);
        } else if (this.$store.state.APP_FLAG === "BC" && this.$utils.isVersion(this.$store.state.VERSION, "3.2.0")) {
            this.$bcBridge.storeFlag(dataset);
        } else {
            h5Storage.set("H5_LOCAL", JSON.stringify(dataset));
        }
    }

    const getStore = (dataset) => {
        if (this.$store.state.APP_FLAG === "PC" && this.$utils.isVersion(this.$store.state.VERSION, "1.2.0")) {
            this.$bcBridge.sendFlagValue(dataset, res => {
                res = checkDate(res);
                callBack(res);
            });
        } else if (this.$store.state.APP_FLAG === "BC" && this.$utils.isVersion(this.$store.state.VERSION, "3.2.0")) {
            this.$bcBridge.sendFlagValue(dataset, res => {
                res = checkDate(res);
                callBack(res);
            });
        } else {
            let res = h5Storage.get("H5_LOCAL") || "{}";
            res = JSON.parse(res);
            res = checkDate(res);
            callBack(res);
        }
    }


    switch (type) {
        case "set":
            setStore(data);
            break;
        case "get":
            getStore(data);
            break;
        default:
            console.error("未知type类型");
            break;
    }



}
