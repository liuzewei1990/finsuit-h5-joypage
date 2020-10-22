<template>
    <div class="special" :class="empty?'hidden':''" :style="{'background':`${info.PAGE_COLOR} url(${aliyuncHost+info.HEAD_PICTURE}) 0 0 no-repeat`}">
        <div class="contentBox">
            <div class="productBox styleItem" :style="{'background':info.MODULE_COLOR}">
                <div class="title">
                    <img :src="aliyuncHost+info.MODULE_CHART" v-show="info.MODULE_CHART">
                    <div class="text">银行产品</div>
                </div>
                <div class="productItem" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
                    <div class="bankName">{{item.ORG_NAME}}{{item.PRD_NAME?"-"+item.PRD_NAME:''}}</div>
                    <div class="bankDetail">
                        <div class="detailLeft">
                            <div class="detailRate">{{(1*item.PRD_RATE).toFixed(4)}}</div>
                            <div class="detailRateText">{{item.PRD_RATE_TEXT}}</div>
                        </div>
                        <div class="detailRight">
                            <div class="time">{{item.RATE_REMARKS?item.RATE_REMARKS:item.PERIOD}}</div>
                            <div class="tags">
                                <span v-for="(it,ind) in item.SPREAD_TEXT2.split(',')" :key="'label'+ind"
                                         v-if="ind<2">{{it}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="activityBox styleItem" v-show="isShow" :style="{'background':info.MODULE_COLOR}">
                <div class="title">
                    <img :src="aliyuncHost+info.MODULE_CHART" v-show="info.MODULE_CHART">
                    <div class="text">相关活动</div>
                </div>
                <div class="activityItem" v-for="index in 5" :key="index" @click="toActivity(info['BANNER_LINK'+index],index)" v-show="info['BANNER'+index]">
                    <img :src="aliyuncHost+info['BANNER'+index]">
                </div>
            </div>
            <div class="else" v-if="info.COMMON_MODULE">
                <img :src="aliyuncHost+info.COMMON_MODULE">
            </div>
        </div>
        <div class="empty" v-show="empty">
            <img src="./images/empty.png">
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    data () {
        return {
            aliyuncHost:this.$Config.aliyuncHost,
            list:[],
            info:{},
            empty:false,
        }
    },
    computed: {
        ...mapGetters(["isLogin"]),
        isShow(){
            let arr=[]
            for (let index = 1; index <6;index++){
               arr.push(this.info['BANNER'+index])
            }
            return arr.some(item=>item)
        }
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
            let special = this.$route.query.special || ''
            this.$trackEvents.ACB0V001({special});
            let moduleId = this.$route.query.moduleId
            let orgId = this.$route.query.orgId
            let param = {moduleId,orgId}
            let APP_FLAG = this.$store.state.APP_FLAG === "H5" ? this.$store.state.FROM_APP_FLAG : this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG || "BC"
            let type = APP_FLAG=='PC'?'getContentPC':'getContent'
            let data = await this.$api[type](param)
            console.log(data)
            this.info = data.BANK_ACTIVITY_MODULE_INFO || {}
            this.list = data.INVEST_LIST_MAINPAGE
            this.$bcBridge.updateTitle(this.info.THEME_NAME)
            if (this.list.length==0) {
                this.empty = true;
            }
        },
        toDetail (item) {
            let special = this.$route.query.special || ''
            this.$trackEvents.ACB0V002({
                PRD_INDEX_ID:item.PRD_INDEX_ID,//产品id
                ORG_ID: item.ORG_ID,//银行id
                special
            });
            // if (!this.$store.state.TOKEN) {
            //     this.$login()
            //     return
            // }else if (this.activityStatus == 0) {
            //     this.$Toast('活动已结束')
            //     return
            // }else {
            //     // let url =this.$Config.baseUrlHost +"/"+ this.$bcBridge.APP_FLAG+"/#/"+'personal?id=' + item.INVEST_ID + '&type=' + 'alone'+'&hideRightShare=';
            //     // 调原生跳转包装页
            //     // this.$bcBridge.openWebview(url, '产品详情');
            //     this.$h5PrdDetail(item.INVEST_ID,'alone',item)
            // }
            this.$h5PrdDetail(item.INVEST_ID,'alone',item)
        },
        toActivity (url,index) {
            let special = this.$route.query.special || ''
            this.$trackEvents.ACB0V003({index,special});
            this.$openWebview(url)
        }
    },
};
</script>

<style lang='less'>
    .special {
        width:750px;
        padding-top:590px;
        padding-bottom: 66px;
        background-size:100% auto !important;
        .contentBox{
            width:750px;
            box-sizing: border-box;
            padding:0 24px;
            .styleItem {
                width: 702px;
                margin-bottom: 30px;
                box-sizing: border-box;
                min-height: 270px;
                border-radius:10px;
                .title {
                    height: 120px;
                    text-align: center;
                    position: relative;
                    img {
                        display: block;
                        height: 100%;
                        margin:0 auto;
                    }
                    .text {
                        height: 42px;
                        font-size: 30px;
                        font-family: PingFangSC-Semibold, PingFang SC;
                        font-weight: 700;
                        color: #333;
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
            .productBox {
                padding-bottom: 22px;
                .productItem {
                    width: 646px;
                    height: 194px;
                    background: #FFFFFF;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    margin-left:28px;
                    box-sizing: border-box;
                    padding:16px 24px;
                    .bankName {
                        width:100%;
                        height: 44px;
                        font-size: 26px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 700;
                        color: #333333;
                        line-height: 44px;
                        overflow:hidden;//超出一行文字自动隐藏
                        text-overflow:ellipsis;//文字隐藏后添加省略号
                        white-space:nowrap;//强制不换行
                    }
                    .bankDetail {
                        display:flex;
                        .detailLeft {
                            width:280px;
                            height: 110px;
                            border-right: 4px solid #E5E8F0;
                            .detailRate {
                                height: 66px;
                                font-size: 66px;
                                font-family: has_buy;
                                font-weight: bold;
                                color: #E75D22;
                                line-height: 80px;
                                &:after{
                                    content:'%';
                                    font-size: 30px;
                                }
                            }
                            .detailRateText {
                                height: 34px;
                                font-size: 24px;
                                font-family: PingFangSC-Regular, PingFang SC;
                                font-weight: 400;
                                color: #666666;
                                line-height: 34px;
                            }
                        }
                        .detailRight {
                            padding-left: 30px;
                            .time {
                                height: 42px;
                                font-size: 30px;
                                font-family: PingFangSC-Medium, PingFang SC;
                                font-weight: 500;
                                color: #333333;
                                line-height: 42px;
                                margin:10px 0 24px;
                            }
                            .tags {
                                span {
                                    border-radius: 4px;
                                    border: 2px solid #FF801A;
                                    font-size: 20px;
                                    font-family: PingFangSC-Regular, PingFang SC;
                                    font-weight: 400;
                                    color: #FF801A;
                                    line-height: 28px;
                                    padding: 4px 5px;
                                    margin-right:12px;
                                }
                            }
                        }
                    }
                }
            }
            .activityBox {
                padding-bottom: 20px;
                .activityItem {
                    width: 616px;
                    height: 148px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    margin-left:43px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        display:block;
                    }
                }
            }
        }
        .else {
            width: 702px;
            img{
                width: 100%;
            }
        }
        .empty {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            background: #ffffff;
            img {
                margin:auto;
                width:410px;
                height: 346px;
            }
        }
    }
    .hidden {
        position: absolute;
        overflow: hidden;
        top: 0;
        bottom: 0;
    }
</style>
