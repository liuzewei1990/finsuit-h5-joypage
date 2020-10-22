<template>
    <div class="productTop">
        <div class="productBottom">
            <div class="productTitle">
                <div class="titleh">更多产品</div>
                <div class="explain">需持仓≥30天，如有赎回，即权益金额失效</div>
            </div>
            <div class="productContent">
                <div class="contentList" v-for="(item,i) in data" :key="i" @click="toDetail(item)">
                    <div class="productName">{{item.ORG_NAME}}{{item.ORG_DESCRIPT?"-"+item.ORG_DESCRIPT:''}}</div>
                    <div class="productRate">
                        <div class="itemRate">{{item.PRD_RATE}}</div>
                        <p class="itemTime" v-if="item.PERIOD">{{item.PERIOD+item.PERIOD_UNIT}}</p>
                    </div>
                    <div class="productRates">
                        <div class="itemRates">{{item.PRD_RATE_TEXT}}</div>
                        <p class="itemMoney">{{item.PRD_MIN_AMOUNT}}起投</p>
                    </div>
                    <div class="productFeatures">
                        <div class="featuresList" v-for="it in item.SPREAD_TEXT2.split(',')" :key="it">
                            {{it}}
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props:['data','activityStatus'],
    methods: {
        toDetail (item) {
            console.log(item.PRD_INDEX_ID)
            this.$trackEvents.ACB0Z003({
                ITEM_VALUE:item.PRD_INDEX_ID,//产品id
                orgId: item.ORG_ID,//银行id
            });
            if (!this.$store.state.TOKEN) {
                this.$login()
                return
            }else if (this.activityStatus == 0) {
                return
            }else {
                // let url =this.$Config.baseUrlHost +"/"+ this.$bcBridge.APP_FLAG+"/#/"+'personal?id=' + item.INVEST_ID + '&type=' + 'alone'+'&hideRightShare=';
                // 调原生跳转包装页
                // this.$bcBridge.openWebview(url, '产品详情');
                this.$h5PrdDetail(item.INVEST_ID,'alone',item)
            }
        },
    }
}
</script>

<style lang='less'>
.productTop {
    width:670px;
    min-height: 530px;
    padding-top: 12px;
    background:#458C8C;
    border-radius:30px;
    margin: 0 auto;
    .productBottom {
        width:670px;
        min-height: 508px;
        padding-top: 22px;
        background:linear-gradient(180deg,rgba(152,219,218,1) 0%,rgba(69,140,140,1) 100%);
        border-radius:30px;
        .productTitle {
            width:624px;
            height:154px;
            margin: 0 auto;
            background:url(./images/productTitle.png) no-repeat center bottom;
            background-size: 670px 188px;
            border-radius:18px;
            overflow: hidden;
            margin-bottom: 38px;
            .titleh {
                height:60px;
                font-size:44px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(254,247,241,1);
                line-height:60px;
                text-shadow:0px 2px 4px rgba(0,0,0,0.5);
                text-align: center;
                padding: 22px 0 16px;
            }
            .explain {
                height:42px;
                font-size:26px;
                font-family:PingFangSC-Light,PingFang SC;
                font-weight:300;
                color:rgba(254,247,241,1);
                line-height:42px;
                text-align: center;
            }
        }
        .productContent {
            padding-bottom: 6px;
            width:624px;
            margin: 0 auto;
            .contentList {
                width:624px;
                height:316px;
                background:rgba(255,254,253,1);
                box-shadow:0px 4px 8px 0px rgba(20,103,103,1);
                border-radius:18px;
                margin-bottom: 20px;
                box-sizing: border-box;
                padding-left: 54px;
                .productName {
                    width:624px;
                    height:88px;
                    background:rgba(254,241,229,1);
                    border-radius:18px 18px 0px 0px;
                    font-size:30px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(95,95,95,1);
                    line-height:88px;
                    margin-left:-54px;
                    text-indent: 54px; 
                }
                .productRate {
                    height:70px;
                    padding-top: 26px;
                    display: flex;
                    .itemRate {
                        width:314px;
                        height:70px;
                        font-size:60px;
                        font-family:DINAlternate-Bold,has_buy;
                        font-weight:bold;
                        color:rgba(255,78,0,1);
                        line-height:70px;
                        &::after {
                            content: "%";
                            height:44px;
                            font-size:32px;
                            font-family:PingFangSC-Semibold;
                            font-weight:600;
                            color:rgba(255,78,0,1);
                            line-height:44px;
                        }
                    }
                    .itemTime {
                        width:314px;
                        height:70px;
                        font-size:44px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(95,95,95,1);
                        line-height:70px;
                    }
                }
                .productRates {
                    height:34px;
                    padding-top: 10px;
                    padding-bottom: 20px;
                    display: flex;
                    .itemRates {
                        width:314px;
                        height:34px;
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:34px;
                    }
                    .itemMoney {
                        height:34px;
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:34px;
                    }
                }
                .productFeatures {
                    display: flex;
                    .featuresList {
                        margin-right: 12px;
                        height:36px;
                        background:rgba(214,195,170,1);
                        border-radius:2px;
                        font-size:22px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(250,247,245,1);
                        line-height:36px;
                        padding: 0 8px;
                        width: max-content;
                    }
                }
            }
        }

    } 
}
</style>