<template>
    <div class="gift">
        <div class="giftRule" @click="goRule"></div>
        <div class="giftProduct">
            <div class="navBox" v-show="productBenefits.length>0">
                <div class="nav" :class="currentNav?'currentNav':'uncurrentNav'" @click="changeNav(true)">
                    银行权益
                    <div class="currentSign" v-show="currentNav"></div>
                </div>
                <div class="nav" :class="!currentNav?'currentNav':'uncurrentNav'" @click="changeNav(false)">
                    产品权益
                    <div class="currentSign" v-show="!currentNav"></div>
                </div>
            </div>
            <div class="listBox">
                <div class="bankList" v-show="currentNav">
                    <bank v-for="(item,index) in investListMainpage" :key="index" :data="item" :toDetail="toDetail" />
                </div>
                <div class="proList" v-show="!currentNav">
                    <div class="welfareItem" 
                        v-for="(item,index) in productBenefits" :key="index" @click="toDetail(item,true)">
                        <div class="welfareItemContent">
                            <div class="welfareCard">
                                <div class="welfareCardCircular" v-for="(i) in 2" :key="i+'Circular'"></div>
                                <!-- <div class="welfareItemPos"></div> -->
                                <div class="welfareCardLeft">
                                    <div class="welfareReward">
                                        <div class="welfareRewardLeft">{{item.REWARD_AMOUNT}}</div>
                                        <div class="welfareRewardRight">
                                            <div>{{item.STAGING_INSTRUCTION}}</div>
                                            <p>{{item.REWARD_INSTRUCTION}}</p>
                                        </div>
                                    </div>
                                    <div class="welfareBank">{{item.ORG_NAME}}{{item.PRD_NAME?"-"+item.PRD_NAME:''}}</div>
                                    <div class="welfareLabel">
                                        <div class="welfareLabelLeft">
                                            <div>{{(item.PRD_RATE*1).toFixed(4)}}%</div>
                                            <p>{{item.PRD_RATE_TEXT}}</p>
                                        </div>
                                        <div class="welfareLabelRight">
                                            <div class="welfareLabelItem" v-for="(it,ind) in item.SPREAD_TEXT2.split(',')" :key="'label'+ind" 
                                                v-if="ind<2"
                                            >{{it}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="welfareCardRight">
                                    立即购买
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="goInvestment" @click="goInvestment">查看活动投资</div>
        <div class="giftRuleMark" v-show="giftRuleMark">
            <div class="giftRuleBox" >
                <div class="giftRuleTitle"></div>
                <div class="giftRuleContent" v-html="fixedDepositRule"></div>
                <div class="closeImg" @click="giftRuleMark =false"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

import Bank from './excGiftBank'

export default {
    data () {
        return {
            investListMainpage:[],//银行列表
            productBenefits:[],//产品列表
            fixedDepositRule:'',//活动规则
            currentNav:true,//模块切换
            giftRuleMark:false,//
            top:0,
        }
    },
    computed: {
        ...mapGetters(["isLogin"])
    },
    watch: {
        isLogin () {
            this.getData()
        },
        giftRuleMark(n) {
            let bodyEl = document.getElementsByClassName('gift')[0]
            if(n) {
                this.top = window.scrollY
                bodyEl.style.position = 'fixed'
                bodyEl.style.top = -this.top + 'px'
                bodyEl.style.left = 0 + 'px'
                bodyEl.style.right = 0 + 'px'
            }else {
                bodyEl.style.position = ''
                bodyEl.style.top = ''

                window.scrollTo(0, this.top) // 回到原先的top
            }
        }
    },
    mounted () {
        // 购买完成后，返回到领券首页刷新数据
        this.$bus.$on("pageAppear", this.getData);
        this.getData()
    },
    components:{Bank},
    methods: {
        async getData () {
            let welfare = this.$route.query.welfare
            this.$trackEvents.ACB0X001({welfare});

            let param = {}
            let APP_FLAG = this.$store.state.APP_FLAG === "H5" ? this.$store.state.FROM_APP_FLAG : this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG || "BC"
            let type = APP_FLAG=='PC'?'getpcExcWelfareData':'getExcWelfareData'
            let data = await this.$api[type](param)
            console.log(data)
            this.investListMainpage = data.INVEST_LIST_MAINPAGE
            this.fixedDepositRule = data.FIXED_DEPOSIT_RULE
            this.productBenefits = data.PRODUCT_BENEFITS
            if(this.productBenefits.length==0) {
                this.currentNav = true
            }
            if(data.EXCLUSIVE_BENEFITS_POPUP ==0) {
                this.giftRuleMark = true
            }
        },
        goRule () {
            // this.$router.push('/rule')
            this.$trackEvents.ACB0X002();
            this.giftRuleMark = true;
            // this.$router.push({name: 'rule', params: {rule: this.fixedDepositRule}})
        },
        toDetail (item,flag) {
            let pro = flag?'产品权益':'银行权益'
            this.$trackEvents.ACB0X003({
                ITEM_VALUE:item.PRD_INDEX_ID,//产品id
                ITEM_VALUE1: item.ORG_ID,//银行id
                pro:pro,
            });
            if (!this.$store.state.TOKEN) {
                this.$login()
                return
            }else if (item.PURCHASE_STATUS!=1 && flag!=true) {
                return    
            }else {
                // let url =this.$Config.baseUrlHost +"/"+ this.$bcBridge.APP_FLAG+"/#/"+'personal?id=' + item.INVEST_ID + '&type=' + 'alone'+'&hideRightShare=';
                // 调原生跳转包装页
                // this.$bcBridge.openWebview(url, '产品详情');
                this.$h5PrdDetail(item.INVEST_ID,'alone',item)
            }
        },
        changeNav (boolean) {
            this.currentNav = boolean
        },
        goInvestment () {
            this.$trackEvents.ACB0X004();
            let url = this.$Config.baseUrlHost+'/activity/activityHistory/index.html#/?ACTITY_ID=1026&__with_login__=1&hideRightShare=&needLogin=1'
            this.$openWebview(url)
        },
    }
}
</script>

<style lang="less">
    .gift {
        max-width: 750px;
        box-sizing: border-box;
        padding-top: 753px;
        padding-bottom:144px ;
        background: #f7ab4e url(./images/gift.png) no-repeat 0 0px;
        // background: #f7ab4e ;
        background-size: 100% auto;
        min-height: 100%;
        .giftRule {
            width:120px;
            height:155px;
            background:rgba(252,215,69,1);
            border:0px solid rgba(3,0,0,1);
            position: fixed;
            top: 0;
            right: 10px;
            background: url(./images/giftRule.png) no-repeat 0 0;
            background-size:120px 155px;
            z-index: 99;
        }
        .giftProduct {
            width:698px;
            margin: 0 auto;
            .navBox {
                height:106px;
                display: flex;
                align-items: flex-end;
                .nav {
                    width:351px;
                    position: relative;
                    text-align: center;
                    .currentSign {
                        position: absolute;
                        bottom: 12px;
                        left: 143px;
                        width:65px;
                        height:4px;
                        background:rgba(255,255,255,1);
                    }
                }
                .currentNav {
                    height:106px;
                    background:rgba(254,145,11,1);
                    box-shadow:0px -5px 10px 0px rgba(228,114,3,0.4);
                    border-radius:10px 7px 0px 0px;
                    font-size:42px;
                    font-family:MicrosoftYaHei;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                    line-height:106px;
                }
                .uncurrentNav {
                    height:73px;
                    background:rgba(255,188,107,1);
                    box-shadow:0px -5px 10px 0px rgba(228,114,3,0.4);
                    border-radius:7px 10px 0px 0px;
                    font-size:33px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:73px;
                }
            }
            .listBox {
                background:linear-gradient(0deg,rgba(254,136,53,1) 0%,rgba(254,145,11,1) 99%);
                box-shadow:0px 3px 10px 0px rgba(255,127,49,0.71);
                border-radius:0px 0px 10px 10px;
                padding-top: 22px;
                padding-bottom: 1px;
                .bankList {
                    position: relative;
                }
                .proList {
                    // padding-top: 20px;
                    .welfareItem {
                        width:698px;
                        margin-bottom: 38px;
                        .welfareItemContent {
                            width:698px;
                            height:340px;
                            border-radius:3px 3px 10px 10px;
                            position: relative;
                            .welfareCard {
                                width:654px;
                                height:311px;
                                background:rgba(251,236,217,1);
                                border-radius:14px;
                                margin-left: 20px;
                                display: flex;
                                position: relative;
                                .welfareCardCircular {
                                    width:21px;
                                    height:21px;
                                    background:#FD910B;
                                    border-radius:50%;
                                    position: absolute;
                                    left: 533px;
                                    &:nth-child(1) {
                                        top: -11px;
                                    }
                                    &:nth-child(2) {
                                        bottom: -11px;
                                    }
                                }
                                .welfareItemPos {
                                    width:156px;
                                    height:156px;
                                    background: url(./images/buySign.png) no-repeat 0 0;
                                    background-size: 156px 156px;
                                    position: absolute;
                                    top: -10px;
                                    left: -10px;
                                }
                                .welfareCardLeft {
                                    padding-left: 50px;
                                    flex: 1;
                                    .welfareReward {
                                        padding-top: 44px;
                                        padding-bottom: 24px;
                                        display: flex;
                                        .welfareRewardLeft {
                                            width:178px;
                                            height:71px;
                                            font-size:90px;
                                            font-family:SFProDisplay;
                                            font-weight:bold;
                                            color: #FF712F;
                                            line-height:71px;
                                            &::before {
                                                content: "￥";
                                                font-size: 40px;
                                                margin-right: -5px;
                                                font-family:has_buy;
                                            }
                                        }
                                        .welfareRewardRight {
                                            flex: 1;
                                            div {
                                                height:28px;
                                                font-size:28px;
                                                font-family:Microsoft YaHei;
                                                font-weight:bold;
                                                color:rgba(0,0,0,1);
                                                line-height:32px;
                                                margin-bottom: 10px;
                                            }
                                            p {
                                                height:25px;
                                                font-size:24px;
                                                font-family:Microsoft YaHei;
                                                font-weight:400;
                                                color:rgba(165,165,165,1);
                                                line-height:32px;
                                            }
                                        }
                                    }
                                    .welfareBank {
                                        max-width: 422px;
                                        height:25px;
                                        font-size:24px;
                                        font-family:Microsoft YaHei;
                                        font-weight:400;
                                        color:rgba(40,40,40,1);
                                        padding-bottom: 24px;
                                        overflow:hidden;//超出一行文字自动隐藏
                                        text-overflow:ellipsis;//文字隐藏后添加省略号
                                        white-space:nowrap;//强制不换行
                                    }
                                    .welfareLabel {
                                        display: flex;
                                        .welfareLabelLeft {
                                            width:178px;
                                            div {
                                                height:30px;
                                                font-size:40px;
                                                font-family:SFProDisplay;
                                                font-weight:bold;
                                                color:#FF712F;
                                                line-height:40px;
                                            }
                                            p {
                                                padding-top: 26px;
                                                height:25px;
                                                font-size:24px;
                                                font-family:Microsoft YaHei;
                                                font-weight:400;
                                                color:rgba(153,153,153,1);
                                                line-height:24px;
                                            }
                                        }
                                        .welfareLabelRight {
                                            flex: 1;
                                            overflow: hidden;
                                            padding-right: 32px;
                                            .welfareLabelItem {
                                                padding: 0 20px;
                                                border:2px solid #FF712F;
                                                border-radius:10px;
                                                display: inline-block;
                                                height:36px;
                                                font-size:20px;
                                                font-family:Microsoft YaHei;
                                                font-weight:400;
                                                color:#FF712F;
                                                line-height:36px;
                                                float: right;
                                                clear: both;
                                                margin-bottom: 10px;
                                            }
                                        }
                                    }
                                }
                                .welfareCardRight {
                                    width: 111px;
                                    box-sizing: border-box;
                                    font-size:36px;
                                    font-family:Microsoft YaHei;
                                    font-weight:bolder;
                                    color:#FF712F;
                                    line-height:52px;
                                    padding: 59px 37px;
                                    border-left: 2px dashed #A5A5A5;
                                }
                            }
                        }
                    }
                }
            }
        }
        .goInvestment {
            max-width:750px;
            height:96px;
            background:linear-gradient(182deg,rgba(255,196,127,1),rgba(241,103,39,1));
            font-size:33px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:96px;
            text-align: center;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .giftRuleMark {
            position: fixed;
            top: 0;
            left: 0;
            bottom:0;
            right: 0;
            background:rgba(0,0,0,.6);
            z-index: 100;
            .giftRuleBox {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-60%);
                width:560px;
                height:650px;
                background:rgba(255,255,255,1);
                border-radius:22px;
                box-sizing: border-box;
                padding: 80px 55px 40px;
                .giftRuleTitle {
                    width: 381px;
                    height: 85px;
                    background: url(./images/giftRuleTitle.png) no-repeat 0 0;
                    background-size: 381px 85px;
                    position: absolute;
                    left: 50%;
                    top: -43px;
                    transform: translateX(-50%);
                }
                .giftRuleContent{
                    height: 100%;
                    overflow: auto;
                }
                .closeImg {
                    width: 56px;
                    height: 56px;
                    background: url(./images/closeImg.png) no-repeat 0 0;
                    background-size: 56px 56px;
                    position: absolute;
                    left: 50%;
                    bottom: -76px;
                    transform: translateX(-50%);
                }
            }
        }
    }
</style>