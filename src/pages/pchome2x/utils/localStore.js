import jsStorage from "js-storage"
// 列表已读记录
export const h5Storage = jsStorage.initNamespaceStorage('@pchome').localStorage;
/**
 * 封装原生和H5本地储存方法
 * @param {*} type 
 * @param {*} data 
 * @param {*} callBack 
 */
// 储存示例：this.$localStore("set", {key:xxx,value:'{a:1}'});
// 获取示例：this.$localStore("get", {key:xxx}, (res) => { });

export default function (type = "get", data = {}, callBack = () => { }) {

    /**
     * 设置本地储存数据
     * @param {*} dataset {key:xxx,value:str} 
     */
    const setStore = (dataset) => {

        // 如果拼财1.0.8版本
        if (this.$store.state.APP_FLAG === "PC" && this.$utils.isVersion(this.$store.state.VERSION, "1.2.0")) {
            this.$bcBridge.storeFlag(dataset);
        } else if (this.$store.state.APP_FLAG === "BC" && this.$utils.isVersion(this.$store.state.VERSION, "3.2.0")) {
            this.$bcBridge.storeFlag(dataset);
        } else {
            h5Storage.set(dataset.key, JSON.stringify(dataset));
        }
    }

    /**
     * 获取本地储存数据
     * @param {*} dataset {key:xxx}
     */
    const getStore = (dataset) => {
        if (this.$store.state.APP_FLAG === "PC" && this.$utils.isVersion(this.$store.state.VERSION, "1.2.0")) {
            this.$bcBridge.sendFlagValue(dataset, res => {
                callBack(res);
            });
        } else if (this.$store.state.APP_FLAG === "BC" && this.$utils.isVersion(this.$store.state.VERSION, "3.2.0")) {
            this.$bcBridge.sendFlagValue(dataset, res => {
                callBack(res);
            });
        } else {
            let res = h5Storage.get(dataset.key) || "{}";
            res = JSON.parse(res);
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
