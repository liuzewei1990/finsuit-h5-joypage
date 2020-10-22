<template>
    <div class="simple">
        <div class="productBox">
            <div class="productItem" v-for="(item, index) in list" :key="index" @click="toDetail(item)"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    data () {
        // prdCurrencyFund 货币基金
        // prdCurrentDeposit  活期存款
        // prdFixedTermDeposit 定期存款
        // prdInsuranceMoney 保险理财
        // prdIntelligentDeposit 智能存款
        // prdInvestmentFinancing 投融资
        // prdLargeDeposits 大额存款
        // prdManageMoney  理财产品
        // prdPuredebtFund  纯债基金
        // prdStructuredDeposits 结构性存款
        return {
            list:[],
            defaultList: [
                {
                    type: "prdFixedTermDeposit",
                    ID:36688,
                    PRD_INDEX_ID:36688,
                    ORG_ID:340,
                    RATE_ID:119430,
                },
                {
                    type: "prdFixedTermDeposit",
                    ID:36687,
                    PRD_INDEX_ID:36687,
                    ORG_ID:340,
                    RATE_ID:119429,
                }
            ],
            testList: [
                {
                    type: "prdFixedTermDeposit",
                    ID:1000001204,
                    PRD_INDEX_ID:1000001204,
                    ORG_ID:174,
                    RATE_ID:731002014,
                },
                {
                    type: "prdFixedTermDeposit",
                    ID:1000000175,
                    PRD_INDEX_ID:1000000175,
                    ORG_ID:243,
                    RATE_ID:30305,
                }
            ],
            flag:true,
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
        this.flag = /finsuit/.test(location.host) || /graytest/.test(location.host)
        this.list = this.flag?this.defaultList:this.testList
    },
    methods: {
        async getData () {
            let simple = this.$route.query.simple || ''
            this.$trackEvents.ACB0V001({simple});
            console.log(simple,this.$trackEvents.ACB0V001({simple}));
        },
        toDetail (item) {
            // console.log(item.PRD_INDEX_ID)
            this.$trackEvents.ACB0V002({
                PRD_INDEX_ID:item.PRD_INDEX_ID,//产品id
                ORG_ID: item.ORG_ID,//银行id
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
            let url = `${this.$Config.baseUrlHost}/products/#/${item.type}?ID=${item.ID}&PRD_INDEX_ID=${item.PRD_INDEX_ID}&ORG_ID=${item.ORG_ID}&RATE_ID=${item.RATE_ID}&h5HandleRightItems&MEN_COUPON_ID`
            // let url = `http://app-test6.bicai365.com/products/#/${item.type}?ID=${item.ID}&PRD_INDEX_ID=${item.PRD_INDEX_ID}&ORG_ID=${item.ORG_ID}&RATE_ID=${item.RATE_ID}&h5HandleRightItems&MEN_COUPON_ID`
            this.$bcBridge.gotoPrdDetailH5Page({'H5_URL':url})
        }
    },
    filters: {

    }
};
</script>

<style lang='less'>
    .simple {
        width:750px;
        height: 2580px;
        background:url(./images/simple.png) 0 0 no-repeat;
        background-size: 750px 2580px;
        .productBox {
            width: 646px;
            padding-top: 710px;
            margin:0 auto;
            .productItem {
                width: 646px;
                height: 194px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
        }
    }
</style>
