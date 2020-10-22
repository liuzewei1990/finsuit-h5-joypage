<template>
    <div class="regular">
        <div class="regularRule" @click="goRule"></div>
        <Product :data="investListMainpage" :activityStatus="activityStatus" /> 
        <div class="regularIntroduce">
            <div class="introduceTitle">快速玩转</div>
            <img src="./images/introduce.png" />
        </div>
        <div class="regularFixed" @click="goRecord">
            投资权益明细 >
        </div>
        <!-- 弹窗 -->
        <div class="regularEndToast" v-show="regularEndControl" @touchmove.prevent>
            <div class="regularEnd">
                <div class="toastTop">活动结束</div>
                <div class="toastCenter">活动已结束<br/>仅可以查看活动金额及权益哦～</div>
                <div class="toastButton" @click="closeEndToast">知道了</div>
            </div>
        </div>
    </div>
</template>

<script>
import Product from "./regularProduct.vue"
import { mapGetters } from "vuex"

export default {
    data () {
        return {
            regularEndControl:false,//活动结束弹窗
            investListMainpage:[],//产品列表
            activityStatus:1,//活动状态
            fixedDepositRule:'',//活动规则
        }
    },
    components: {
        Product 
    },
    computed: {
        ...mapGetters(["isLogin"])
    },
    watch: {
        isLogin () {
            this.getData()
        }
    },
    mounted () {
        // 购买完成后，返回到领券首页刷新数据
        this.$bus.$on("pageAppear", this.getData);
        this.getData()
    },
    methods: {
        async getData () {
            let regular = this.$route.query.regular
            this.$trackEvents.ACB0Z001({regular});

            let param = {}
            let data = await this.$api.getRegularData(param)
            console.log(data)
            this.activityStatus = data.ACTITY_STATUS
            if (data.ACTITY_STATUS==0) {
                this.regularEndControl = true
            }
            this.investListMainpage = data.INVEST_LIST_MAINPAGE
            this.fixedDepositRule = data.FIXED_DEPOSIT_RULE
        },
        goRule () {
            // this.$router.push('/rule')
            this.$trackEvents.ACB0Z002();
            this.$router.push({name: 'rule', params: {rule: this.fixedDepositRule}})
        },
        goRecord () {
            this.$trackEvents.ACB0Z004();
            if (!this.$store.state.TOKEN) {
                this.$login()
                return
            }else {
                this.$router.push('/record')
            }
        },
        closeEndToast () {
            this.regularEndControl = false
        }
    },
    filters: {

    }
};
</script>

<style lang='less'>
    .regular {
        max-width: 750px;
        box-sizing: border-box;
        padding-top: 724px;
        padding-bottom: 128px;
        background: #74B2AF url(./images/regularbg.png) no-repeat 0 -2px;
        background-size: 100% auto;
        .regularRule {
            width:142px;
            height:44px;
            border-radius:22px;
            opacity:0.74;
            position: absolute;
            top: 24px;
            right: 16px;
        }

        .regularIntroduce {
            width:670px;
            min-height: 200px;
            background:rgba(255,255,255,1);
            border-radius:30px;
            position: relative;
            margin: 110px auto 68px;
            .introduceTitle {
                width:402px;
                height:88px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: -44px;
                font-size:44px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(254,247,241,1);
                line-height:88px;
                background: url(./images/introduceTitle.png) no-repeat 0 0;
                background-size: 402px 88px;
                text-align: center;
            }
            img {
                width: 100%;
                display: block;
            }
        }

        .regularFixed {
            height:128px;
            background:rgba(255,251,251,1);
            box-shadow:0px -2px 14px 0px rgba(0,119,100,0.46);
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            font-size:36px;
            font-family:SourceHanSansCN-Regular,SourceHanSansCN;
            font-weight:400;
            color:rgba(60,133,133,1);
            line-height:128px;
            text-align: center;
        }

        .regularEndToast {
            position: fixed;
            top: 0;
            left: 0;
            bottom:0;
            right: 0;
            background:rgba(0,0,0,.4);
            z-index: 101;
            .regularEnd {
                width: 570px;
                height: 686px;
                box-sizing: border-box;
                padding-top: 344px;
                margin: 290px auto;
                background: url(./images/endbg.png) no-repeat 0 0;
                background-size: 100% ;
                .toastTop {
                    height:48px;
                    font-size:64px;
                    font-family:SourceHanSansCN-Medium,SourceHanSansCN;
                    font-weight:500;
                    color:rgba(255,108,0,1);
                    line-height:48px;
                    text-align: center;
                }
                .toastCenter {
                    width:442px;
                    height:144px;
                    font-size:26px;
                    font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                    font-weight:400;
                    color:rgba(201,178,143,1);
                    line-height:36px;
                    text-align: center;
                    margin: 20px auto 0;
                }
                .toastButton {
                    width:416px;
                    height:68px;
                    background:rgba(253,212,94,1);
                    box-shadow:0px 6px 4px 0px rgba(221,93,15,0.37);
                    border-radius:200px;
                    margin: 0 auto ;
                    font-size:36px;
                    font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                    font-weight:400;
                    color:rgba(172,88,0,1);
                    line-height:68px;
                    text-align: center;
                }
            }
        }
    }
</style>
