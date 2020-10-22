<template>
    <div class="product" v-show="productFlag">
        <div class="productBox">
            <div class="productTitle">{{productTitle}}</div>
            <div class="closeProduct" @click="close"></div>
            <div class="productContent">
                <div class="productItem" v-for="product in 5" :key="product">
                    <div class="preProduct"></div>
                    <div class="productItemName">哈密市商业银行-鑫燕存C款-比财版</div>
                    <div class="productItemContent">
                        <div class="productItemLeft">
                            <div class="productItemRate">3.8500%</div>
                            <div class="productItemDescription">利率</div>
                        </div>
                        <div>
                            <div class="productItemTime">3年</div>
                            <div class="productItemTags">50元起  随时支取</div>
                        </div>
                    </div>
                    <div class="productProfit">若存入{{setupAmount}}元  一年收益约152.80元</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "product",
    props:['productTitle','setupAmount','callback'],
    data () {
        return {
            productFlag:false,
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData () {
            let param = {}
            let APP_FLAG = this.$store.state.APP_FLAG === "H5" ? this.$store.state.FROM_APP_FLAG : this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG || "BC"
            let type = APP_FLAG=='PC'?'getPCProduct':'getProduct'
            // let data = await this.$api[type](param)
            // console.log(data)
        },
        toDetail (item) {
            // this.$trackEvents.ACB0Z003({
            //     ITEM_VALUE:item.PRD_INDEX_ID,//产品id
            //     ITEM_VALUE1: item.ORG_ID,//银行id
            // });
            if (!this.$store.state.TOKEN) {
                this.$login()
                return
            }
            // else if (this.activityStatus == 0) {
            //     this.$Toast('活动已结束')
            //     return
            // }
            else {
                // let url =this.$Config.baseUrlHost +"/"+ this.$bcBridge.APP_FLAG+"/#/"+'personal?id=' + item.INVEST_ID + '&type=' + 'alone'+'&hideRightShare=';
                // 调原生跳转包装页
                // this.$bcBridge.openWebview(url, '产品详情');
                this.$h5PrdDetail(item.INVEST_ID,'alone',item)
            }
        },
        close () {
            this.productFlag=false
            if(this.callback) {
                this.callback()
            }
        }
    }
}
</script>

<style lang="less">
.product {
    background:rgba(11,11,11,0.8);
    position:absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .productBox {
        width:750px;
        height:1018px;
        background:rgba(255,255,255,1);
        border-radius:60px 60px 0px 0px;
        position:absolute;
        bottom: 0;
        left: 0;
        .productTitle {
            height:100px;
            font-size:36px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:600;
            color:#ffffff;
            background:rgba(80,139,239,1);
            border-radius:60px 60px 0px 0px;
            line-height:100px;
            text-align: center;
        }
        .closeProduct {
            position: absolute;
            right: 34px;
            top:36px;
            width:32px;
            height:32px;
            background: url(./images/close.png) 0 0 no-repeat;
            background-size: 100%;
        }
        .productContent {
            height: 918px;
            box-sizing: border-box;
            padding-top: 10px;
            overflow-y: scroll;
            .productItem {
                width:694px;
                height:264px;
                background:rgba(255,255,255,1);
                box-shadow:0px 4px 16px 0px rgba(238,221,218,0.59);
                border-radius:16px;
                margin:0 auto 14px;
                box-sizing: border-box;
                position: relative;
                padding: 34px 60px 0;
                .preProduct {
                    width:100px;
                    height:36px;
                    background: url(./images/preProduct.png) 0 0 no-repeat;
                    background-size: 100px 36px;
                    border-radius:0 16px 0 0;
                    position:absolute;
                    right: 0;
                    top:0;
                }
                .productItemName {
                    height:44px;
                    font-size:32px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(64,64,64,1);
                    line-height:44px;
                    padding-bottom: 8px;
                }
                .productItemContent {
                    display: flex;
                    padding-bottom: 20px;
                    .productItemLeft {
                        width:178px
                    }
                    .productItemRate {
                        height:52px;
                        font-size:44px;
                        font-family:has_buy;
                        font-weight:bold;
                        color:rgba(253,93,86,1);
                        line-height:52px;
                        padding-top: 8px;
                    }
                    .productItemDescription{
                        height:34px;
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(134,142,158,1);
                        line-height:34px;
                    }
                    .productItemTime {
                        height:52px;
                        font-size:32px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(64,64,64,1);
                        line-height:52px;
                        padding-bottom: 8px;
                    }
                    .productItemTags {
                        height:34px;
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(134,142,158,1);
                        line-height:34px;
                    }
                }
                .productProfit {
                    width:384px;
                    height:34px;
                    font-size:24px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(233,172,39,1);
                    line-height:34px;
                    padding: 4px 16px;
                    background:rgba(255,249,235,1);
                }
            }
        }
    }
}
</style>
