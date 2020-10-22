<template>
    <div class="detailAgain" :class="lock">
        <swipe></swipe>
        <div class="againBox" :class="bubbeText?'paddingTop':''">
            <div class="notice">很晚了，要注意休息哦～</div>
            <div id="againHeadPos"></div>
            <div class="againHead" :class="headerFixed?'isFixed':'' ">
                <div class="againHeadInfo">
                    <div class="hasDeposit">你目前已攒<span>0</span>元</div>
                    <div class="hasTotal">累计转入20次，共223240.00元。</div>
                    <div class="againHeadPortrait">
                        <img :src="imgLevel[`${gender}${level}`]" @click="goHighlights">
                        <div class="imgTag" @click="goHighlights"></div>
                    </div>
                </div>
                <div class="againHeadBubbe" v-show="bubbeText">{{bubbeText}}</div>
                <div class="againTimeIncome">
                    <div class="againTime">
                        <div class="againTimeIncomeDescription">下个转入时间</div>
                        <div class="againTimeIncomeText">07/20</div>
                    </div>
                    <div class="againIncome">
                        <div class="againTimeIncomeDescription" @click="goAccIncome">累计收入<span>></span></div>
                        <div class="againTimeIncomeText">40.12元</div>
                    </div>
                </div>
            </div>
            <div class="againRecord">
                <div class="againRecordTitle">转入记录</div>
                <div class="againRecordList">
                    <div class="yearItem" v-for="year in 3" :key="'year'+year">
                        <div class="yearText">{{2020-year}}</div>
                        <month v-for="month in 5" :key="'month'+month" :month="month"></month>
                    </div>
                </div>
            </div>
        </div>
        <div class="againFixed">
            <div class="goRules" @click="goRules">攻略</div>
            <div class="goProduct" @click="goProduct">立即存钱</div>
        </div>
        <!-- 弹窗 -->
        <div class="popupMark">
            <div class="popupBox">
                <div class="closePopup" @click="closePopup"></div>
                <img />
            </div>
        </div>
        <!-- 规则 -->
        <rules ref="rules" :callback="callback" :rulesType="rulesType" :rulesTitle="rulesTitle"></rules>
        <!-- 产品模块 -->
        <product ref="product" :callback="callback" :setupAmount="setupAmount" :productTitle="productTitle"></product>

    </div>
</template>

<script>
import Product from "./wagesProduct"
import Swipe from './wagesSwipe'
import Rules from './wagesRules'
import Month from './wagesRecordMonth'

import { mapGetters } from "vuex"
export default {
    data () {
        return {
            setupAmount:1000,
            rulesType:'all',
            rulesTitle:'攻略',
            productTitle:'选择银行产品',
            imgLevel:{
                boy0:require('./images/boy-0.png'),
                boy1:require('./images/boy-1.png'),
                boy2:require('./images/boy-2.png'),
                boy3:require('./images/boy-3.png'),
                boy4:require('./images/boy-4.png'),
                boy5:require('./images/boy-5.png'),
                boy6:require('./images/boy-6.png'),
                girl0:require('./images/girl-0.png'),
                girl1:require('./images/girl-1.png'),
                girl2:require('./images/girl-2.png'),
                girl3:require('./images/girl-3.png'),
                girl4:require('./images/girl-4.png'),
                girl5:require('./images/girl-5.png'),
                girl6:require('./images/girl-6.png'),
            },
            level:0,
            gender:'boy',
            headerFixed:false,
            top:0,
            lock:'',
            bubbeText:'你有没有发现，多存一点，幸福感总会多一点',
            popupIndex:0,
        }
    },
    components: {
        Product,
        Swipe,
        Rules,
        Month
    },
    computed: {
        ...mapGetters(["isLogin"])
    },
    mounted() {
        // handleScroll为页面滚动的监听回调
        window.addEventListener("scroll", this.handleScroll);
        // 购买完成后，返回到领券首页刷新数据
        this.$bus.$on("pageAppear", this.getData);
        this.getData()
    },
    destroyed() {
        //同时在destroyed回调中移除监听：
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        async getData () {

        },
        goRules () {
            this.$refs.rules.rulesFlag = true;
            this.top = window.scrollY
            this.lock = 'lock'
        },
        goProduct () {
            this.$refs.product.productFlag = true
            this.top = window.scrollY
            this.lock = 'lock'
        },
        callback () {
            this.lock = ''
            setTimeout(()=>{
                window.scrollTo(0, this.top)
            })
        },
        goHighlights () {
            this.$router.push({name: 'highlights', params: {}})
        },
        goAccIncome () {
            this.$router.push({name: 'accIncome', params: {}})
        },
        closePopup () {
            this.popupIndex = 0
            this.lock = ''
        },
        handleScroll() {
            // 得到页面滚动的距离
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            let againHead = document.getElementById('againHeadPos')
            let top = againHead.offsetTop
            console.log(againHead.offsetTop,scrollTop)
            //  当滚动超过 180 时，实现吸顶效果
            if (scrollTop > top) {
                this.headerFixed = true;
            } else {
                this.headerFixed = false;
            }
        },
    }
}
</script>

<style lang="less">
.detailAgain {
    position: relative;
    height: 100%;
    .againBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        padding:792px 50px 120px;
        box-sizing: border-box;
        .notice {
        position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background:rgba(21,21,21,0.17) url(./images/notice.png) 30px center no-repeat;
            background-size:36px 32px;
            font-size:26px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,254,254,1);
            padding:21px 88px;
        }
        #againHeadPos{
            width:650px;
            height:1px;
            position: absolute;
            left: 50px;
            top: 422px;
        }
        .againHead {
            width:650px;
            background:rgba(255,255,255,1);
            box-shadow:0px 4px 16px 0px rgba(238,221,218,0.58);
            border-radius:16px;
            margin-bottom: 24px;
            position: absolute;
            left: 50px;
            top: 422px;
            .againHeadInfo {
                height: 212px;
                box-sizing: border-box;
                padding:42px 0 0 236px;
                position: relative;
                .hasDeposit {
                    height:72px;
                    font-size:32px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:700;
                    color:rgba(16,16,16,1);
                    display: flex;
                    align-items: center;
                    span{
                        font-size:50px;
                        font-family:PingFangSC-Semibold,PingFang SC;
                        font-weight:700;
                        color:rgba(16,16,16,1);
                        padding:0 25px;
                    }
                }
                .hasTotal {
                    width:370px;
                    font-size:28px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(134,142,158,1);
                    line-height:40px;
                }
                .againHeadPortrait {
                    width:150px ;
                    height:154px;
                    position: absolute;
                    right: 454px;
                    bottom:20px;
                    img {
                        height: 100%;
                    }
                    .imgTag {
                        width:32px;
                        height:32px;
                        background: url(./images/imgTag.png) 0 0 no-repeat;
                        background-size: 100%;
                        position: absolute;
                        bottom: 4px;
                        right: 10px;
                    }
                }
            }
            .againHeadBubbe {
                box-sizing: border-box;
                height: 70px;
                background:rgba(255,255,255,1);
                border:2px solid rgba(21,21,21,1);
                border-radius:10px;
                margin-left: 48px;
                margin-bottom: 36px;
                margin-right: 40px;
                box-shadow:8px 10px 0px 0px #4579D2;
                font-size:26px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                line-height:36px;
                color:rgba(16,16,16,1);
                padding:0 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                &::before {
                    content: '';
                    width:26px;
                    height: 12px;
                    background: #fff url(./images/againHeadBubbe.png) 0 0 no-repeat;
                    background-size:26px 12px;
                    position: absolute;
                    top: -12px;
                    left: 60px;
                }
            }
            .againTimeIncome {
                height: 100px;
                display:flex;
                margin-bottom: 36px;
                .againTime {
                    width:326px;
                    height: 100px;
                    box-sizing: border-box;
                    border-right:2px solid #E4E4E4;
                    padding-left: 48px;
                }
                .againIncome {
                    width:324px;
                    height: 100px;
                    box-sizing: border-box;
                    padding-right: 48px;
                    padding-left: 130px;
                }
                .againTimeIncomeDescription {
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(134,142,158,1);
                    line-height:40px;
                    overflow: hidden;
                    padding: 10px 0 4px;
                    span {
                        float: right;
                    }
                }
                .againTimeIncomeText {
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(16,16,16,1);
                    line-height:40px;
                }
            }
        }
        .isFixed {
            position: fixed ;
            top: 0 ;
            z-index: 99;
        }
        .againRecord {
            width:650px;
            background:rgba(255,255,255,1);
            box-shadow:2px 0px 16px 0px rgba(238,221,218,0.58);
            border-radius:16px;
            overflow: hidden;
            .againRecordTitle {
                height:96px;
                font-size:32px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(16,16,16,1);
                line-height:96px;
                text-indent: 48px;
            }
            .againRecordList {

                .yearItem {

                    .yearText {
                        width:650px;
                        height:40px;
                        background:rgba(233,238,255,1);
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(64,64,64,1);
                        line-height:40px;
                        text-indent: 48px;
                    }
                }
            }
        }
    }
    .paddingTop {
        padding-top: 892px;
    }
    .againFixed {
        width:750px;
        height:100px;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        text-align: center;
        .goRules {
            width:176px;
            height:100px;
            background:rgba(255,255,255,1);
            font-size:32px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(16,16,16,1);
            line-height:100px;
        }
        .goProduct {
            width:574px;
            height:100px;
            background:linear-gradient(180deg,rgba(87,145,237,1) 0%,rgba(24,60,139,1) 100%);
            font-size:36px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(248,248,248,1);
            line-height:100px;
        }
    }
    .popupMark {
        background:rgba(11,11,11,0.8);
        position:absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        .popupBox {
            width:580px;
            height:428px;
            background:rgba(44,60,143,1);
            border-radius:34px;
            margin:292px auto 0;
            position: relative;
            img {
                width:100%;
            }
            .closePopup {
                width:72px;
                height:72px;
                background: url(./images/closePopup.png) 0 0 no-repeat;
                background-size: 72px 72px;
                position: absolute;
                left: 254px;
                bottom:-110px;
            }
        }
    }
}
.lock {
    height: 100%;
    overflow: hidden;
}
</style>
