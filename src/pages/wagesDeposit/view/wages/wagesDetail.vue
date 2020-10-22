<template>
    <div class="detail">
        <swipe></swipe>
        <div class="wagesRule" @click="goRules('rule','活动规则')">活动规则</div>
        <div class="firstContent">
            <div class="firstContentTop">转入金额（元）</div>
            <div class="setupAmount">
                <input type="number" max="1000000" name="setupAmount" id="setupAmount" v-model="setupAmount" />
            </div>
            <div class="setupTime">
                <div class="wageDayText">工资日</div>
                <div class="wageDayBox" @click="goPicker">
                    <div class="currentTime">每月{{currentTime}}日</div>
                    <div class="description">需您手动转入</div>
                </div>
                <div class="goPicker" @click="goPicker">></div>
            </div>
            <div class="envelopes">
                <div class="envelopesImg"></div>
                <div class="wageDayBox" @click="goRules('envelopes','福利红包')">
                    <div class="currentTime">福利红包</div>
                    <div class="description">连续转入</div>
                </div>
                <div class="goPicker" @click="goRules('envelopes','福利红包')">></div>
            </div>
        </div>
        <div class="firstGoPro" @click="selectProduct">选择产品</div>
        <!-- 时间 -->
        <div class="firstMark" v-show="markFlag">
            <div class="pickerBox">
                <div class="pickerTitle">选择转入周期 <p class="cuo" @click="close"></p></div>
                <div class="pickerContent">
                    <mt-picker :slots="slots" :visibleItemCount="3"
                        @change="onValuesChange"
                        >
                    </mt-picker>
                    <div class="separate"></div>
                </div>
            </div>
        </div>
        <!-- 规则 -->
        <rules ref="rules" :rulesType="rulesType" :rulesTitle="rulesTitle"></rules>
        <!-- 产品模块 -->
        <product ref="product" :setupAmount="setupAmount" :productTitle="productTitle"></product>
    </div>
</template>

<script>
import Product from "./wagesProduct"
import Swipe from './wagesSwipe'
import Rules from './wagesRules'

import { mapGetters } from "vuex"
export default {
    data () {
        return {
            setupAmount:1000,//初始金额
            currentTime:10,//转入日期
            slots:[
                {
                    flex: 1,
                    values: ['每月'],
                    className: 'slot3',
                },{
                    flex: 1,
                    values: [
                        '1日', '2日', '3日', '4日', '5日', '6日','7日', '8日', '9日', '10日',
                        '11日', '12日', '13日', '14日', '15日', '16日','17日', '18日', '19日', '20日',
                        '21日', '22日', '23日', '24日', '25日', '26日','27日', '28日',
                    ],
                    className: 'slot1',
                    defaultIndex:9,
                }
            ],//时间
            markFlag:false,
            pickerFlag:false,
            productTitle:'选择银行产品',
            rulesTitle:'活动规则',
            rulesType:'envelopes',
        }
    },
    components: {
        Product,
        Swipe,
        Rules
    },
    computed: {
        ...mapGetters(["isLogin"])
    },
    watch: {
        setupAmount(n) {
            if(n>1000000) {
                this.setupAmount = 1000000;
            }
        }
    },
    mounted () {
        // 购买完成后，返回到领券首页刷新数据
        this.$bus.$on("pageAppear", this.getData);
        this.getData()
    },
    methods: {
        async getData () {

        },
        goPicker () {
            this.markFlag = true;
        },
        goRules (type,title) {
            this.rulesTitle = title;
            this.rulesType = type;
            this.$refs.rules.rulesFlag = true;
        },
        onValuesChange (picker, values) {
            this.currentTime = parseInt(values[1]);
        },
        close () {
            this.markFlag = false;
            this.pickerFlag = false;
        },
        selectProduct () {
            if(this.setupAmount<1) {
                this.$Toast('请填写正确的金额')
            }else {
                console.log(this.$refs.product)
                this.$refs.product.productFlag = true
            }
        }
    }
}
</script>

<style lang="less">
.detail {
    min-height: 100%;
    position: relative;
    .wagesRule {
        width:150px;
        height:48px;
        background:rgba(255,254,254,1);
        border-radius:200px 0px 0px 200px;
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(64,64,64,1);
        line-height:56px;
        position:absolute;
        top: 34px;
        right: 0;
        text-indent: 18px;
    }
    .firstContent {
        width:678px;
        height:754px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 26px 0px rgba(184,184,184,0.5);
        border-radius:16px;
        position:absolute;
        top:440px;
        left: 36px;
        z-index:1;
        box-sizing: border-box;
        padding-left: 57px;
        .firstContentTop {
            width:224px;
            height:44px;
            font-size:32px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(64,64,64,1);
            line-height:44px;
            margin:42px auto 0;
        }
        .setupAmount {
            width:564px;
            height: 180px;
            border-bottom: 2px solid #E4E4E4;
            padding-top: 60px;
            box-sizing: border-box;
            #setupAmount {
                width:564px;
                font-size:90px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(64,64,64,1);
                border:0;
                text-align: center;
            }
        }
        .setupTime,.envelopes {
            width:564px;
            height: 240px;
            border-bottom: 2px solid #E4E4E4;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .wageDayText {
                width:148px;
                height:44px;
                font-size:32px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(64,64,64,1);
                line-height:44px;
            }
            .envelopesImg {
                width:148px;
                height:112px;
                background:url(./images/wages.png) 0 0 no-repeat;
                background-size:96px 112px;
            }
            .wageDayBox {
                flex: 1;
                .currentTime {
                    height:44px;
                    font-size:32px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:700;
                    color:rgba(64,64,64,1);
                    line-height:44px;
                }
                .description {
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(134,142,158,1);
                    line-height:40px;
                    padding-top: 8px;
                }
            }
            .goPicker {
                width:37px;
                height:33px;
                color:rgba(179,179,179,1);
                font-size:40px;
            }
        }
        .envelopes {
            border-bottom:0;
        }
    }
    .firstGoPro {
        max-width:750px;
        height:100px;
        background:linear-gradient(180deg,rgba(87,146,238,1) 0%,rgba(23,58,138,1) 100%);
        font-size:36px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(252,254,255,1);
        line-height:100px;
        position:fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        text-align: center;
    }
    .firstMark {
        background:rgba(11,11,11,0.8);
        position:absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        .pickerBox {
            width:750px;
            background:rgba(255,255,255,1);
            border-radius:60px 60px 0px 0px;
            position:absolute;
            bottom: 0;
            .pickerTitle {
                width:750px;
                height:100px;
                background:rgba(80,139,239,1);
                border-radius:60px 60px 0px 0px;
                font-size:36px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:600;
                color:rgba(255,253,253,1);
                line-height:100px;
                text-align: center;
                position: relative;
                .cuo {
                    position: absolute;
                    right: 34px;
                    top:36px;
                    width:32px;
                    height:32px;
                    background: url(./images/close.png) 0 0 no-repeat;
                    background-size: 100%;
                }
            }
            .pickerContent {
                height: 570px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
                .picker {
                    width: 100%;
                    .picker-item {
                        font-size:36px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(134,142,158,1);
                    }
                    .picker-selected {
                        font-size:44px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:700;
                        color:rgba(64,64,64,1);
                    }
                    .picker-center-highlight {
                        display:none;
                    }
                }
                .separate {
                    width:4px;
                    height:328px;
                    background:#E1E1E1;
                    position: absolute;
                    top: 124px;
                    left: 372px;
                }
            }
        }
    }
}
</style>
