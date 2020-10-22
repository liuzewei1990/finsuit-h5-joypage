

export default function (dataset = {}) {

    // 检查DEFINE_URL字段 是否是正常的链接地址
    const IS_DEFINE_URL = dataset.DEFINE_URL && (dataset.DEFINE_URL + "").indexOf("http") === 0 || (dataset.DEFINE_URL + "").indexOf("www") === 0;

    // 之前的需求，银行自有产品页
    if (IS_DEFINE_URL) {
        this.$openWebview(dataset.DEFINE_URL);
        return;
    }

    // App内跳转
    else if (this.$store.state.APP_FLAG === "BC" || this.$store.state.APP_FLAG === "PC") {
        let ots = {};
        ots["LINK_TO"] = "PRD_DETAIL";
        // 产品类型ID
        ots["PRD_TYPE"] = dataset.PRD_TYPE_ID;
        // 产品ID
        ots["PRD_ID"] = dataset.ID;
        // 非必填
        // o["RATEID"] = dataset.RATEID;
        // 非正常传参，问一下神操作人员吧
        ots["RATEID"] = dataset.PRD_INDEX_ID;
        // 非必填
        ots["COUPON_ID"] = dataset.COUPON_ID;
        // 非必填
        ots["MEM_COUPON_ID"] = dataset.MEM_COUPON_ID;
        // 非必填，1代表从追加投资过来的
        ots["isAddBuy"] = "";

        ots = JSON.parse(JSON.stringify(ots));
        this.$bcBridge.toAppPage(ots);
    }
    // 小程序内跳转
    else if (this.$store.state.APP_FLAG === "PMP") {
        // 小程序给的用户信息带到详情页
        let ots = {};
        /**
         * 使用小程序webview打开会自动携带用户信息参数，不是href跳转，所以无需传递用户信息参数
         */
        // ots["PMP_FLAG"] = "1";
        // ots["TOKEN"] = this.$store.state.TOKEN;
        // ots["MEMBER_ID"] = this.$store.state.MEMBER_ID;
        // ots["SYSTEM_TYPE"] = this.$store.state.SYSTEM_TYPE || this.$browser.OS;
        // ots["OPEN_API_CHANNEL_ID"] = this.$store.state.OPEN_API_CHANNEL_ID;

        // 产品基本信息
        ots["ID"] = dataset.ID;
        ots["ORG_ID"] = dataset.ORG_ID;
        ots["RATE_ID"] = dataset.RATE_ID;
        ots["MEM_COUPON_ID"] = dataset.MEM_COUPON_ID;
        ots["COUPON_ID"] = dataset.COUPON_ID;

        // 活动信息
        ots["extendInfo"] = dataset.PRD_INDEX_ID;
        ots["infoId"] = dataset.INFO_ID;
        ots["superOrCommon"] = dataset.ASSEMBLE_TYPE;
        ots["teamId"] = dataset.TEAM_ID;

        //自定义参数 1:拼团 0：拼人数
        ots["activityType"] = dataset.activityType;


        ots = JSON.parse(JSON.stringify(ots));
        this.$h5Detail(this.$h5Detail.handelPrdType(dataset.PRD_TYPE_ID, dataset.DEPOSIT_TYPE_ID), ots);
    }
    // 站外、及其他跳转
    else {
        this.$showTips("暂不支持的环境");
        // this.$openWebview();
    }
}