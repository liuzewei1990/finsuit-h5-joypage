<template>
    <div id="page">
        <!-- 步骤 -->
        <step-container :stepList="stepList" @handleFinish="handleFinish"></step-container>
        <!-- 精品推荐 -->
        <div class="goodsup">
            <goods-up :activity_code="activity_code" v-if="activity_code"></goods-up>
        </div>
        <!-- 精彩活动 -->
        <div class="market">
            <module-market :activity_code="activity_code" v-if="activity_code" />
        </div>
        <!-- 分享popup -->
        <SharePopup ref="SharePopup"></SharePopup>
        <!-- 红包小图片 -->
        <div class="share-envelope" v-show="($store.state.APP_FLAG == 'BC' || $store.state.APP_FLAG == 'PC') && showEnvelope">
            <img src="../../assets/images/getRedPacket.png" alt="" v-show="activity_code" @click="getShareRedPacket('clickPoint')">
        </div>
    </div>
</template>

<script>
import StepContainer from "./modules/step";
import SharePopup from "./modules/sharePopup.vue";
import html2canvas from "html2canvas";
import wx from "weixin-js-sdk";
const goodsUp = () =>
    import(/* webpackChunkName: "module-goods-up" */ "./modules/goodsUp");
const ModuleMarket = () =>
    import(/* webpackChunkName: "module-market" */ "./modules/market");
const dialogConfig = {
    // dialog子组件
    componentName: "DialogTip",
    // 是否点击蒙层关闭
    hideOnBlur: false,
    // 是否显示默认底部关闭按钮
    defaultcloseBtnVisible: false,
    // 是否动画效果
    animation: true,
    // 是否显示右上角关闭按钮
    closeVisible: false
};

export default {
    components: { StepContainer, goodsUp, ModuleMarket, SharePopup },
    data() {
        return {
            redPacketImg: require("@pincai/assets/images/redPacket.png"),
            stepList: "",
            queryData: `?
            stepList={
                "amountDesc":"成功存入1,000.00元",
                "succDateDesc":"今天",
                "revenueDate":"2019-08-09%20星期五",
                "revenueDesc":"预计产生收益",
                "redeemDate":"可随时支取，按提前支取利率计息",
                "redeemDateDesc":"到账时间一般在24小时以内，实际到账时间以银行最终处理为准"}
            &prdType=4
            &prdTypeName=定期存款
            &depositTypeId=4
            &bankData={
                "orgId":"203",
                "custServiceHotLine":["400-616-1888"],
                "custServiceTime":"周一至周五9:00-12:00 13:30:17:30",
                "orgName":"金城银行",
                "orgLogo":"open_api_bank/admin/org/message/203/1564127833899bankLogo.jpg"
            }
            &buyParams={"amount":"1000000","teamId":"519","investId":"","activityId":"","couponId":"","couponDetailId":""}
            &proId=123
            &amount=''`, //参数示例, //参数示例
            PAGE_Config: {
                showFooter: "1"
            },
            shareImg: "",
            activity_url: "", //活动首页链接
            activity_code: "", //红包裂变 + 活动code
            code: "", //活动code
            buyParams: {},
            Loading: this.$Loading(),
            showEnvelope: false, //是否配置了弹框
            prsData: {} //拼人数完成跳转链接需要参数
        };
    },
    created() {
        console.log("路由里面所有的参数", this.$route.query);
        this.stepList = JSON.parse(this.$route.query.stepList);
        this.buyParams = JSON.parse(this.$route.query.buyParams);
        // 判断是否在小程序环境
        this.checkPMP();
        // 判断是否在安卓环境
        this.judgeAndroidReturn();
    },
    mounted() {
        // 获取活动code
        this.getActiveCode();
        // 拼人数成团需要
        if (this.buyParams.BUY_PARAM_KEY) {
            this.sendbuysuccess();
        }
        this.$createShareImage(base64 => {});
    },
    methods: {
        // 打点
        point() {
            let params = {
                ITEM_VALUE: this.activity_code,
                ITEM_VALUE1: this.$route.query.proId
                    ? this.$route.query.proId.trim()
                    : ""
            };
            this.$trackEvents.ACB0T001(params);
        },
        // 适配安卓返回按钮
        judgeAndroidReturn() {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            if (
                this.$store.state.APP_FLAG == "BC" ||
                this.$store.state.APP_FLAG == "PC"
            ) {
                if (isAndroid && window.android) {
                    window.android.isSecondaryH5Page();
                }
            }
        },
        // 判断是否在小程序环境
        checkPMP() {
            if (
                !(
                    this.$store.state.APP_FLAG == "BC" ||
                    this.$store.state.APP_FLAG == "PC"
                )
            ) {
                let userInfo = {
                    ID: sessionStorage.getItem("MEMBER_ID"),
                    TOKEN: (
                        sessionStorage.getItem("_MX_BICAI_TOKEN") + ""
                    ).replace(/["']/g, ""),
                    APP_FLAG: sessionStorage.getItem("APP_FLAGS") || "PMP"
                };
                this.$store.commit("USER_LOGIN", userInfo);
            }
        },
        // 点击完成返回活动首页
        handleFinish() {
            this.$trackEvents.ACB0T003();
            if (
                this.$store.state.APP_FLAG == "BC" ||
                this.$store.state.APP_FLAG == "PC"
            ) {
                if (this.activity_url) {
                    if (
                        this.$store.state.APP_FLAG == "PC" &&
                        this.code == "PC_SFACT"
                    ) {
                        this.$bcBridge.gotoMainPage();
                        return;
                    }
                    //判断是不是拼人数活动
                    if (this.code == "ASSEMBLE_PERSON_ACTIVITY") {
                        this.activity_url = "";
                        this.activity_url += this.$Config.baseUrlHost;
                        this.activity_url += "/prs/#/prs_enter_group";
                        this.activity_url +=
                            "?ASSEMBLE_TYPE=" + this.prsData.ASSEMBLE_TYPE;
                        this.activity_url += "&TEAM_ID=" + this.prsData.TEAM_ID;
                        this.activity_url += "&INFO_ID=" + this.prsData.INFO_ID;
                    }
                    //兼容原生返回按钮链接加参数
                    if (this.activity_url.indexOf("?") != -1) {
                        this.activity_url +=
                            "&closeAllSecondPagecloseOpenAPIPage=1";
                    } else {
                        this.activity_url +=
                            "?closeAllSecondPagecloseOpenAPIPage=1";
                    }
                    console.log("当前地址", this.activity_url);
                    this.$bcBridge.openWebview(this.activity_url);
                } else {
                    this.$Toast("未取到活动地址");
                }
            } else {
                if (this.activity_url) {
                    // //判断是不是拼人数活动
                    if (this.code == "ASSEMBLE_PERSON_ACTIVITY") {
                        this.activity_url = "";
                        this.activity_url += this.$Config.baseUrlHost;
                        this.activity_url += "/mpprs/#/prs_enter_group";
                        this.activity_url +=
                            "?ASSEMBLE_TYPE=" + this.prsData.ASSEMBLE_TYPE;
                        this.activity_url += "&TEAM_ID=" + this.prsData.TEAM_ID;
                        this.activity_url += "&INFO_ID=" + this.prsData.INFO_ID;
                        window.location.href = this.activity_url;
                    } else {
                        wx.miniProgram.switchTab({ url: "/pages/index/index" });
                    }
                    console.log("当前地址", this.activity_url);
                } else {
                    this.$Toast("未取到活动地址");
                }
            }
        },
        // 分享红包
        handleClickGetRedPacket(data) {
            let _this = this;
            let CommonDialog = this.$CommonDialog({
                // 弹窗子组件名称
                componentName: "DialogRedPacket",
                // 是否显示默认close按钮
                defaultcloseBtnVisible: false,
                // 该弹窗dom插入到哪个父级dom
                appendElement: this.$root.$el.querySelector("#page"),
                // 弹窗自定义内容
                icon: this.redPacketImg,
                title: data.POPUP_TITLE || "【快来拼手气】",
                content: data.POPUP_DESC || "快来分享给好友看看大家的运气",
                btnList: ["取消", data.POPUP_BUTTON_TEXT || "发红包"],
                btnCallback: index => {
                    CommonDialog.close(); // 关闭弹框
                    if (index == "1") {
                        this.$trackEvents.ACB0T004({
                            ITEM_VALUE: this.activity_code
                        });
                        // 分享方式，1：链接，2：图片
                        if (data.POPUP_TYPE == 1) {
                            if (
                                this.$store.state.APP_FLAG == "BC" ||
                                this.$store.state.APP_FLAG == "PC"
                            ) {
                                this.$bcBridge.openWebview(data.POPUP_LINK_URL);
                            } else {
                                setTimeout(() => {
                                    window.location.href = data.POPUP_LINK_URL;
                                }, 500);
                            }
                        } else {
                            if (
                                this.$store.state.APP_FLAG == "BC" ||
                                this.$store.state.APP_FLAG == "PC"
                            ) {
                                this.Loading.show();
                                //在点击完成页的红包确定按钮的时候 首先要保证 该环境下红包裂变的包也已经上传了
                                this.$createShareImage(base64 => {
                                    this.shareImg = base64;
                                    this.Loading.close();
                                    this.popupShare();
                                });
                            }
                        }
                    } else if (index == "0") {
                        this.$trackEvents.ACB0T005();
                    }
                }
            });
        },
        // 生成红包裂变url
        getresPacketUrl() {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var date = myDate.getDate();
            var nowtime = year + "-" + month + "-" + date;
            let url = this.$Config.resPacketServerHost;
            url += "#/";
            url += `?FROM_APP_FLAG=${this.$store.state.APP_FLAG}`;
            url += `&ACTITY_ID=${this.$store.state.ACTITY_ID}`;
            url += `&SHARE_MEMBER_ID=${this.$store.state.ID}`;
            url += `&SHARE_DATE=${nowtime}`;
            console.log("红包裂变链接", url);
            return url;
        },
        // 获取活动code
        async getActiveCode() {
            try {
                let params = {
                    TEAM_ID: this.buyParams.teamId, //542
                    INVEST_ID: this.buyParams.investId,
                    PEOPLE_KEY: this.buyParams.BUY_PARAM_KEY
                };
                let data = await this.$api.getActiveCode(params);
                console.log("获取活动code：", data);
                if (!data.ACTIVITY_CODE) {
                    this.$Toast("未取到活动vode");
                    return;
                }
                this.activity_code = data.ACTIVITY_CODE;
                this.code = data.CODE;
                this.prsData = data.PERSON_TEAM_INFO;
                this.$store.commit("ACTITY_ID", {
                    ACTITY_ID: data.ID
                });
                this.point();
                this.getShareRedPacket();
            } catch (error) {
                console.error("获取活动code：", error);
            }
        },
        // 查看红包是否配置
        async getShareRedPacket(data) {
            if (data == "clickPoint") {
                this.$trackEvents.ACB0T008({ ITEM_VALUE: this.activity_code });
            }
            try {
                let params = {
                    ACTIVITY_CODE: this.activity_code
                };
                // 兼容小程序的APP_FLAG
                let head = {
                    APP_FLAG: this.$store.state.APP_FLAG
                };
                let data = await this.$api.getShareRedPacket(params, head);
                console.log("查看红包是否配置：", data);
                this.activity_url = data.ACTIVITY_URL;
                //如果是口罩活动来的 弹口罩活动的弹窗
                if (this.code == "MASK_ACTIVITY") {
                    //购买完成后检查用户是否参与成功
                    this.checkStatus();
                } else {
                    if (data.ID) {
                        this.showEnvelope = true;
                        this.handleClickGetRedPacket(data);
                    }
                }
            } catch (error) {
                console.error("查看红包是否配置：", error);
            }
        },
        // 弹窗分享
        async popupShare() {
            let params = {
                APP_PLACE: "2",
                ACTITY_CODE: this.activity_code
            };
            let data = await this.$api.getShareBtn(params);
            console.log("分享数据：", data);
            if (data.length === 0) {
                this.$Toast("请配置分享按钮");
                return;
            }
            let shareJson = this.getShareJson(data); // 分享需要传递的方式和相应参数
            this.$refs["SharePopup"].open(shareJson); // 调用子组件的open方法传递分享相关配置
        },
        // 分享所需配置项
        getShareJson(data) {
            return data.map(item => {
                // 分享方式 0:图片   1:链接  2: 小程序
                item["SHARE_TYPE"] = item.SHARE_TYPE;
                // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
                item["SHARE_PLACE"] = item.SHARE_PLACE;

                // 分享标题
                item["SHARE_TITLE"] = item.SHARE_TITLE || "每天都有红包雨";
                // 分享描述
                item["SHARE_DESC"] =
                    item.SHARE_CONTENT || "最高35元，快来拼手气～";
                // 分享链接
                item["SHARE_URL"] = item.SHARE_URL || this.getresPacketUrl();
                // 分享图片
                item["SHARE_IMAGE"] = item.SHARE_URL || this.shareImg;
                return item;
            });
        },
        //拼人数购买成功
        async sendbuysuccess() {
            let params = { BUY_PARAM_KEY: this.buyParams.BUY_PARAM_KEY };
            let sendbuysuccess = await this.$api.sendbuysuccess(params);
            if (!this.$utils.isObject(sendbuysuccess)) {
                this.$Toast("sendbuysuccess data error");
            } else {
                console.log("购买成功send");
            }
        },
        //购买完成后检查用户是否参与成功
        async checkStatus() {
            try {
                let params = {
                    amount: this.$route.query.amount
                };
                console.log("购买金额：", this.$route.query.amount);
                let data = await this.$api.checkStatus(params);
                console.log("购买完成后检查用户是否参与成功：", data);
                if (data.investSuccess == 0 || data.investSuccess == 2) {
                    let dialog = this.$CommonDialog({
                        ...dialogConfig,
                        // 该弹窗dom插入到哪个父级dom
                        appendElement: this.$root.$el.querySelector("#page"),
                        // 弹窗自定义内容
                        title: "参与成功",
                        desc:
                            "恭喜您，您已购买并成功参与送口罩活动，再持仓5天口罩就会发货啦，快去填写快递地址吧",
                        btnText: "去填写",
                        btnClick: () => {
                            this.$trackEvents.ACB0Y007({
                                ITEM_VALUE: "去填写"
                            });
                            dialog.close(); // 关闭弹框
                            this.toAddress(); //去填写地址
                        }
                    });
                } else if (data.investSuccess == 1) {
                    let dialog = this.$CommonDialog({
                        ...dialogConfig,
                        // 该弹窗dom插入到哪个父级dom
                        appendElement: this.$root.$el.querySelector("#page"),
                        // 弹窗自定义内容
                        title: "参与失败",
                        desc:
                            "很抱歉，因操作时间过长您所在地区的口罩已赠完，感谢您的参与",
                        btnText: "我知道了",
                        btnClick: () => {
                            this.$trackEvents.ACB0Y007({
                                ITEM_VALUE: "我知道了"
                            });
                            dialog.close(); // 关闭弹框
                        }
                    });
                } else if (data.investSuccess == 3) {
                    let dialog = this.$CommonDialog({
                        ...dialogConfig,
                        // 该弹窗dom插入到哪个父级dom
                        appendElement: this.$root.$el.querySelector("#page"),
                        // 弹窗自定义内容
                        title: "参与失败",
                        desc:
                            "很抱歉，您购买的金额未达到领取口罩的标准，感谢您的参与",
                        btnText: "我知道了",
                        btnClick: () => {
                            this.$trackEvents.ACB0Y007({
                                ITEM_VALUE: "我知道了"
                            });
                            dialog.close(); // 关闭弹框
                        }
                    });
                }
            } catch (error) {
                console.error("购买完成后检查用户是否参与成功：", error);
            }
        },
        // 购买成功去填写地址
        toAddress() {
            let url = this.$Config.kouzhaoHost; // https://finsuit.bicai365.com/activity/kouzhao/index.html
            url += `#/address`;
            url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
            url += `&fromCode=pincai`; // 来源页面code
            this.$bcBridge.openWebview(url);
        }
    }
};
</script>

<style lang="less" scoped>
.goodsup,
.market {
    margin-top: 24px;
}
#page {
    position: relative;
    .share-envelope {
        position: absolute;
        top: 48px;
        right: 12px;
        img {
            width: 88px;
            height: 76px;
        }
    }
}
</style>
