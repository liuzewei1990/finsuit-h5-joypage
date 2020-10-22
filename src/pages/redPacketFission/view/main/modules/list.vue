<template>
    <div>
        <!-- 还有券 -->
        <ul class="contianer" v-if="listData.SHARE_LIMIT_FLAG == 1 && listData.DRAW_LIMIT_FLAG == 1">
            <!-- 主券 新用户 -->
            <li class="newItem" v-if="listData.MAIN_COUPON_TYPE == 0">
                <div class="headerItem">
                    <span class="moneyCon">
                        ￥
                        <b>{{listData.MONEY}}</b>
                    </span>
                    <span class="vertical-line">|</span>
                    <span class="title">新人专享礼包</span>
                    <button class="new-btn" @click="handleClickCoupon()">立即使用</button>
                </div>
            </li>
            <!-- 主券 老用户 -->
            <li class="mainItem" v-if="listData.MAIN_COUPON_TYPE == 1">
                <div class="headerItem">
                    <div class="nameCon">
                        <span class="title">{{listData.MAIN_COUPON.NAME}}</span>
                        <span class="beginMoney">{{listData.MAIN_COUPON.AMOUNT_REST}}</span>
                    </div>
                    <div class="moneyCon">
                        ￥
                        <b>{{listData.MAIN_COUPON.AMOUNT}}</b>
                    </div>
                </div>
                <div class="timeItem">
                    <span class="tiem">{{listData.MAIN_COUPON.VALID_DAY_TEXT}}</span>
                    <button @click="handleClickCoupon()">立即使用</button>
                </div>
            </li>
            <li class="titleBar">
                <span class="bar"></span>
                <span class="other">其他神券</span>
                <span class="bar"></span>
            </li>
            <!-- 副券 -->
            <li class="listItem">
                <div class="headerItem">
                    <div class="nameCon">
                        <span class="title">{{listData.VICE_COUPON.NAME}}</span>
                        <span class="beginMoney">{{listData.VICE_COUPON.AMOUNT_REST}}</span>
                    </div>
                    <div class="moneyCon" v-if="listData.VICE_COUPON.TYPE==1">
                        ￥
                        <b>{{listData.VICE_COUPON.AMOUNT}}</b>
                    </div>
                    <div class="moneyCon" v-if="listData.VICE_COUPON.TYPE==2">
                        <b>{{listData.VICE_COUPON.RATE}}</b>%
                    </div>
                </div>
                <div class="timeItem">
                    <span class="tiem">{{listData.VICE_COUPON.VALID_DAY_TEXT}}</span>
                    <button @click="handleClickGet()" v-if="viceFlag">点击领取</button>
                    <button @click="handleClickCoupon('VICE_COUPON')" v-else>立即使用</button>
                </div>
            </li>
        </ul>
        <!-- 券已领完 -->
        <div class="mainItem mainItemNo" v-else>
            <div>
                <span class="bar" v-if="listData.SHARE_LIMIT_FLAG == 0"></span>
                <span class="tipName">{{voucherTxt}}</span>
                <span class="bar" v-if="listData.SHARE_LIMIT_FLAG == 0"></span>
            </div>
        </div>
        <div class="tip">领券手机号:{{listData.HIDE_PHONE_NUM}}</div>
        <button class="use" @click="handleClickCoupon('MAIN')">{{activeBtnTxt}}</button>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            hasData: true,
            voucherTxt: "今日领取数量已达上限",
            activeBtnTxt: "立即使用",
            listData: {},
            viceFlag: false //判断副券是否已经领取
        };
    },
    created() {
        this.getCouponList();
    },
    methods: {
        // 获取首页配置数据
        async getCouponList() {
            let params = {
                SHARE_MEMBER_ID: this.$localStore.get("SHARE_MEMBER_ID") || "",
                SHARE_DATE: this.$localStore.get("SHARE_DATE") || "",
                APP_FLAG:this.$store.state.FROM_APP_FLAG
            };
            let data = await this.$api.getCouponList(params);
            this.listData = data;
            console.log("首页配置数据：", this.listData);
            // 查看领取状态
            if (this.listData.DRAW_LIMIT_FLAG == 0) {
                this.voucherTxt = "今日领取数量已达上限";
                this.activeBtnTxt = "查看其他活动";
            } else {
                this.isCheck();
            }
            if (this.listData.SHARE_LIMIT_FLAG == 0) {
                this.voucherTxt = "领完啦";
                this.activeBtnTxt = "查看其他活动";
            } else {
                this.isCheck();
            }
            if (this.listData.VICE_COUPON.GET_COUPON_FLAG == 0) {
                this.viceFlag = true;
            } else {
                this.viceFlag = false;
            }
        },
        // 是否弹提示
        isCheck() {
            if (this.listData.COME_IN_FLAG == 1) {
                this.$Toast("你已经抢过这个红包啦");
            } else if (this.listData.COME_IN_FLAG == 0) {
                this.$Toast("领取成功");
            }
        },
        // 点击领券
        async handleClickGet() {
            this.viceFlag = false;
            let params = {
                SHARE_MEMBER_ID: this.$localStore.get("SHARE_MEMBER_ID") || "",
                SEND_CONFIG_ID: this.listData.VICE_COUPON.SEND_COUPON_ID,
                COUPON_ID: this.listData.VICE_COUPON.COUPON_ID,
                SHARE_DATE: this.$localStore.get("SHARE_DATE") || "",
                APP_FLAG:this.$store.state.FROM_APP_FLAG
            };
            let data = await this.$api.getVoucher(params);
            this.listData.VICE_COUPON.VALID_DAY_TEXT = data.VALID_DAY_TEXT;
            this.$trackEvents.ACB0S005({
                ITEM_VALUE: this.listData.VICE_COUPON.COUPON_ID
            });
        },
        toPoint(src) {
            if (src == "VICE_COUPON") {
                this.$trackEvents.ACB0S004();
            } else if (src == "MAIN") {
                if (this.activeBtnTxt == "查看其他活动") {
                    this.$trackEvents.ACB0S006();
                } else {
                    this.$trackEvents.ACB0S007();
                }
            } else {
                this.$trackEvents.ACB0S004();
            }
        },
        //立即使用
        handleClickCoupon(src) {
            let u = navigator.userAgent;
            let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            let base = "";
            console.log(isAndroid,isIOS)
            //副券 (打点)
            this.toPoint(src);
            // 用户今日领取数量已达上限 || 用户已经领完了
            if (this.listData.DRAW_LIMIT_FLAG == 0 || this.listData.SHARE_LIMIT_FLAG == 0) {
                window.location.href = 'besharp://finsuit/applink';
                setTimeout(() => {
                    window.location.href = 'https://finsuit.bicai365.com/finsuit/static/finsuit/vue/?from=singlemessage#/mine/shareApp?SOURCE=OTHERS';
                }, 1000);
                return;
            }

            // 新用户
            if(this.listData.MAIN_COUPON_TYPE == 0) {
                let data = {
                    LINK_TO: "WEB_H5",
                    H5_URL: this.$Config.baseUrlHost + "/nps/index.html#/?__with_login__=1&hideRightShare=",
                };
                if(isAndroid) {
                    base = Base64.encode(encodeURIComponent(JSON.stringify(data)));
                }else if(isIOS) {
                    base = Base64.encode(JSON.stringify(data));
                }
                let url = "besharp://finsuit/applink?pjsonkey=" + base;
                console.log(url);
                window.location.href = url;
                setTimeout(() => {
                    window.location.href = 'https://finsuit.bicai365.com/finsuit/static/finsuit/vue/?from=singlemessage#/mine/shareApp?SOURCE=OTHERS';
                }, 1000);
            }else if(this.listData.MAIN_COUPON_TYPE == 1) {
                let data = {
                    LINK_TO: "WEB_H5",
                    H5_URL: "",
                };
                if(isAndroid) {
                    data.H5_URL = this.$Config.baseUrlHost + "/tcc/#/coupons_index?hideRightShare=&nouse=nouse";
                    base = Base64.encode(encodeURIComponent(JSON.stringify(data)));
                }else if(isIOS) {
                    data.H5_URL = this.$Config.baseUrlHost + "/tcc/#/coupons_index?hideRightShare=&nouse=nouse&NEED_LOGIN=1";
                    base = Base64.encode(JSON.stringify(data));
                }
                let url = "besharp://finsuit/applink?pjsonkey=" + base;
                console.log(url);
                window.location.href = url;
                setTimeout(() => {
                    window.location.href = 'https://finsuit.bicai365.com/finsuit/static/finsuit/vue/?from=singlemessage#/mine/shareApp?SOURCE=OTHERS';
                }, 1000);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.tip {
    font-size: 26px;
    color: rgba(255, 255, 255, 1);
    line-height: 36px;
    text-align: center;
    // margin-top: -10px;
    margin-bottom: 16px;
}
.use {
    width: 100%;
    height: 96px;
    background: linear-gradient(
        180deg,
        rgba(255, 197, 0, 1) 0%,
        rgba(255, 161, 0, 1) 100%
    );
    border-radius: 8px;
    font-size: 36px;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    margin-bottom: 22px;
}
.titleBar {
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0 18px 0;
    .other {
        font-size: 32px;
        color: rgba(255, 255, 255, 1);
        line-height: 44px;
        padding: 0 20px;
    }
    .bar {
        flex: 1;
        height: 2px;
        background: #fff;
    }
}
.listItem,
.mainItem {
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 30px 30px 20px 42px;
    margin-bottom: 36px;
    position: relative;
    margin-bottom: 0;
    .headerItem {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        .nameCon {
            flex: 1;
            display: inline-flex;
            flex-direction: column;
            .title {
                font-size: 36px;
                color: rgba(245, 80, 65, 1);
                line-height: 50px;
            }
            .beginMoney {
                font-size: 29px;
                color: rgba(114, 114, 114, 1);
                line-height: 40px;
                padding-top: 6px;
            }
        }
        .moneyCon {
            flex: 1;
            text-align: right;
            font-size: 34px;
            font-weight: 600;
            color: rgba(245, 80, 65, 1);
            line-height: 48px;
            b {
                font-size: 72px;
                font-weight: 600;
                color: rgba(245, 80, 65, 1);
                line-height: 100px;
                letter-spacing: 2px;
            }
        }
    }
    .timeItem {
        border-top: 1px dotted #f0f0f0;
        padding-top: 20px;
        display: flex;
        .tiem {
            flex: 1;
            font-size: 24px;
            color: rgba(186, 186, 186, 1);
            line-height: 34px;
        }
        button {
            text-align: right;
            background: rgba(245, 80, 65, 1);
            border-radius: 6px;
            font-size: 23px;
            color: rgba(255, 255, 255, 1);
            line-height: 32px;
            padding: 6px 8px;
        }
    }
    &::after {
        content: "●";
        font-size: 60px;
        width: 60px;
        height: 100%;
        color: #d83800;
        position: absolute;
        right: -30px;
        top: 0;
        display: flex;
        align-items: center;
    }
    &::before {
        content: "●";
        font-size: 60px;
        width: 60px;
        height: 100%;
        color: #d83800;
        position: absolute;
        left: -30px;
        top: 0;
        display: flex;
        align-items: center;
    }
    &:last-child {
        margin-bottom: 26px;
    }
}
.mainItemNo {
    padding: 54px 0;
    background: rgba(237, 237, 237, 1);
    margin-bottom: 20px;
    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        .bar {
            height: 4px;
            background: #bbb;
            width: 84px;
        }
        .tipName {
            white-space: nowrap;
            font-size: 46px;
            font-weight: 500;
            color: rgba(187, 187, 187, 1);
            line-height: 104px;
            padding: 0 48px;
        }
    }
}
.newItem {
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 30px 30px 20px 42px;
    margin-bottom: 36px;
    position: relative;
    margin-bottom: 0;
    .headerItem {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        .moneyCon {
            text-align: right;
            font-size: 34px;
            font-weight: 600;
            color: rgba(245, 80, 65, 1);
            line-height: 48px;
            b {
                font-size: 72px;
                font-weight: 600;
                color: rgba(245, 80, 65, 1);
                line-height: 100px;
                letter-spacing: 2px;
            }
        }
        .vertical-line {
            width: 4px;
            height: 45px;
            display: block;
            margin-left: 20px;
            background: #f55041;
            color: #f55041;
        }
        .title {
            margin-left: 16px;
            font-size: 32px;
            font-weight: 600;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #f55041;
        }
        .new-btn {
            padding: 6px 8px;
            margin-left: 60px;
            line-height: 32px;
            text-align: right;
            font-size: 23px;
            background: rgba(245, 80, 65, 1);
            border-radius: 6px;
            color: #fff;
        }
    }
    &::after {
        content: "●";
        font-size: 60px;
        width: 60px;
        height: 100%;
        color: #d83800;
        position: absolute;
        right: -30px;
        top: 0;
        display: flex;
        align-items: center;
    }
    &::before {
        content: "●";
        font-size: 60px;
        width: 60px;
        height: 100%;
        color: #d83800;
        position: absolute;
        left: -30px;
        top: 0;
        display: flex;
        align-items: center;
    }
}
</style>
