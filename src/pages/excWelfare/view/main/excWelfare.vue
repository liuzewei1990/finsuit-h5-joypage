<template>
    <div class="welfare">
        <div class="welfareRule" @click="goRule"></div>
        <div class="welfareFloat"></div>
        <div class="welfareProduct">
            <div class="welfareItem" :class="item.PURCHASE_STATUS==1?'':'already'"
                v-for="(item,index) in investListMainpage" :key="index" @click="toDetail(item)">
                <div class="welfareItemPad"></div>
                <div class="welfareItemContent">
                    <div class="welfareCard">
                        <div class="welfareCardCircular" v-for="(i) in 2" :key="i+'Circular'"></div>
                        <div class="welfareItemPos"></div>
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
                                    <div>{{item.PRD_RATE}}%</div>
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
</template>

<script>
import { mapGetters } from "vuex"

export default {
    data () {
        return {
            investListMainpage:[],//专属福利列表
            fixedDepositRule:'',//活动规则
        }
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
            let welfare = this.$route.query.welfare
            this.$trackEvents.ACB0X001({welfare});

            let param = {}
            let APP_FLAG = this.$store.state.APP_FLAG === "H5" ? this.$store.state.FROM_APP_FLAG : this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG || "BC"
            let type = APP_FLAG=='PC'?'getpcExcWelfareData':'getExcWelfareData'
            let data = await this.$api[type](param)
            console.log(data)
            this.investListMainpage = data.INVEST_LIST_MAINPAGE
            this.fixedDepositRule = data.FIXED_DEPOSIT_RULE
        },
        goRule () {
            // this.$router.push('/rule')
            this.$trackEvents.ACB0X002();
            this.$router.push({name: 'rule', params: {rule: this.fixedDepositRule}})
        },
        toDetail (item) {
            
            this.$trackEvents.ACB0X003({
                ITEM_VALUE:item.PRD_INDEX_ID,//产品id
                orgId: item.ORG_ID,//银行id
            });
            if (!this.$store.state.TOKEN) {
                this.$login()
                return
            }else if (item.PURCHASE_STATUS!=1) {
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

<style lang="less">
    .welfare {
        max-width: 750px;
        box-sizing: border-box;
        padding-top: 827px;
        padding-bottom:40px ;
        background: #ff702e url(./images/welfarebg.png) no-repeat 0 -2px;
        background-size: 100% auto;
        min-height: 100%;
        .welfareFloat {
            width: 750px;
            height:510px;
            position: absolute;
            left: 0;
            top: 342px;
            background: url(./images/welfareFloat.png) no-repeat 0 -4px;
            background-size: 100% auto;
        }
        .welfareRule {
            width:134px;
            height:40px;
            border-radius:20px;
            position: absolute;
            top: 36px;
            right: 8px;
        }
        .welfareProduct {
            padding: 0 25px;
            .welfareItem {
                width:698px;
                margin-bottom: 38px;
                .welfareItemPad {
                    width:698px;
                    height:45px;
                    background: url(./images/welfarePadbg.png) no-repeat center 4px;
                    background-size: 696px 45px;
                }
                .welfareItemContent {
                    width:698px;
                    height:340px;
                    padding-top: 30px;
                    background:rgba(251,85,30,1);
                    box-shadow:0px 3px 10px 0px rgba(255,127,49,0.71);
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
                            background:rgba(251,85,30,1);
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
                            background: url(./images/welfarePosbg.png) no-repeat 0 0;
                            background-size: 156px 156px;
                            position: absolute;
                            top: -10px;
                            left: -10px;
                        }
                        .welfareCardLeft {
                            padding-left: 90px;
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
                                    color:rgba(231,78,23,1);
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
                                line-height:25px;
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
                                        color:rgba(231,78,23,1);
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
                                        border:2px solid rgba(231,78,23,1);
                                        border-radius:10px;
                                        display: inline-block;
                                        height:36px;
                                        font-size:20px;
                                        font-family:Microsoft YaHei;
                                        font-weight:400;
                                        color:rgba(231,78,23,1);
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
                            color:rgba(251,85,30,1);
                            line-height:52px;
                            padding: 59px 37px;
                            border-left: 2px dashed #A5A5A5;
                        }
                    }
                }
            }
            .already {
                .welfareItemContent {
                    .welfareCard {
                        background:#E3E3E3;
                        .welfareItemPos {
                            background: url(./images/already.png) no-repeat 0 0;
                            background-size: 156px 156px;
                        }
                        .welfareCardLeft {
                            .welfareReward {
                                .welfareRewardLeft {
                                    color:#767676;
                                }
                                .welfareRewardRight {
                                    flex: 1;
                                    div {
                                        color:#000000;
                                    }
                                    p {
                                        color:#A5A5A5;
                                    }
                                }
                            }
                            .welfareBank {
                                color:#282828;
                            }
                            .welfareLabel {
                                .welfareLabelLeft {
                                    div {
                                        color:#767676;
                                    }
                                    p {
                                        color:#999999;
                                    }
                                }
                                .welfareLabelRight {
                                    .welfareLabelItem {
                                        border:2px solid #767676;
                                        color:#767676;
                                    }
                                }
                            }
                        }
                        .welfareCardRight {
                            color:#767676;
                        }
                    }
                }
            }
        }

    }
</style>