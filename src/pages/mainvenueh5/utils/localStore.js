import jsStorage from "js-storage"
// 列表已读记录
export const h5Storage = jsStorage.initNamespaceStorage('@mainvenueh5').localStorage;
/**
 * 封装原生和H5本地储存方法
 * @param {*} type
 * @param {*} data
 * @param {*} callBack
 */
// this.$AppLocalStore("set", {});
// this.$AppLocalStore("get", {}, () => { });

export default function (type = "get", data = {}, callBack = () => { }) {

    const setStore = (dataset) => {
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
            this.$bcBridge.sendFlagValue(dataset, callBack);
        } else if (this.$store.state.APP_FLAG === "BC" && this.$utils.isVersion(this.$store.state.VERSION, "3.2.0")) {
            this.$bcBridge.sendFlagValue(dataset, callBack);
        } else {
            let res = h5Storage.get("H5_LOCAL") || "{}";
            callBack(JSON.parse(res));
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
