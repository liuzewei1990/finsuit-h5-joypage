
/**
 * vue实例挂载方法
 */

import { Base64 } from "js-base64"

export default function () {

    let App = null;
    let query = this.$utils.getQueryStr();

    let actityId = query.ACTITY_ID || this.$store.state.ACTITY_ID;
    if (actityId) this.$store.commit("ACTITY_ID", { ACTITY_ID: actityId });


    let fromAppFlag = query.FROM_APP_FLAG || this.$store.state.FROM_APP_FLAG || "BC";
    this.$store.commit("FROM_APP_FLAG", { FROM_APP_FLAG: fromAppFlag });


    this.$bus.$on("pageAppear:updateStore", () => { this.$sendLoginResult() });


    let queryAppFlag = query.PMP_FLAG;
    if (queryAppFlag) {
        let userInfo = {
            ID: query.MEMBER_ID,
            PHONE_NUM: query.PHONE_NUM,
            TOKEN: query.TOKEN,
            SESSION_ID: query.SESSION_ID,
            DEVICE_ID: query.DEVICE_ID,
            SYSTEM_TYPE: query.SYSTEM_TYPE,
            VERSION: query.VERSION,
            CHANNEL_ID: query.CHANNEL_ID,
            APP_FLAG: queryAppFlag == "1" ? "PMP" : queryAppFlag,
            CHANNEL: query.CHANNEL,
            CT_VER: query.CT_VER,
            MODEL: query.MODEL,
            OPEN_API_CHANNEL_ID: query.OPEN_API_CHANNEL_ID
        }
        this.$store.commit("USER_LOGIN", userInfo);
        App = this.$mount('#app');
        return;
    }

    if (this.$bcBridge.APP_FLAG === "PC" || this.$bcBridge.APP_FLAG === "BC" || query.IS_APP === "1") {
        let _ = (args) => {
            if (App) return;
            const userInfo = JSON.parse(Base64.decode(args));
            this.$store.commit("USER_LOGIN", userInfo);
            setTimeout(() => {
                App = this.$mount('#app');
            }, 1);
        }
        window.loginResult = window.unloginResult = (args) => { _(args) };
        this.$bcBridge.sendLoginResult();
        return;
    }


    App = this.$mount('#app');
}