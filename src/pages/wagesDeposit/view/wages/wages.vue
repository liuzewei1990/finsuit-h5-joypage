<template>
    <div class="wages">
        <div class="wagesArticle mb40">
            <div class="articleBox">
                <div class="articleItem" v-for="article in 3" :key="article">
                    <div class="articleContent">
                        <div class="articleTitle">
                            01.每日理财子产品推荐
                        </div>
                    </div>
                    <img src="./images/wages.png">
                </div>
            </div>
        </div>
        <div class="scene"></div>
        <div class="wagesbottom"></div>
        <div class="wagesFixed" @click="goDetail">马上存一笔</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    data() {
        return {

        }
    },
    mounted () {
        // 购买完成后，返回到领券首页刷新数据
        this.$bus.$on("pageAppear", this.getData);
        this.getData()
    },
    computed: {
        ...mapGetters(["isLogin"])
    },
    methods: {
        async getData () {
            // let welfare = this.$route.query.welfare
            // this.$trackEvents.ACB0X001({welfare});
        },
        goDetail () {

            this.$router.push({name: 'detail', params: {}})
        },
        goKnow () {
            let APP_FLAG = this.$store.state.APP_FLAG === "H5" ? this.$store.state.FROM_APP_FLAG : this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG || "BC"
            let type = APP_FLAG=='PC'?'pincai':'besharp'
            let url = `${type}://finsuit/applink?pjsonkey=Base64({"LINK_TO":"KNOW_DETAIL", "id": "知道ID"})`
            this.$openWebview(url)
        },
    }
}
</script>

<style lang="less">
.wages {
    box-sizing: border-box;
    min-height: 100%;
    background: #071E71 url(./images/wages.png) 0 0 no-repeat;
    background-size: 100% auto;
    position: relative;
    padding:702px 29px 96px;
    .mb40 {
        margin-bottom: 40px;
    }
    .wagesArticle {
        box-sizing: border-box;
        width:692px;
        height:392px;
        background:rgba(0,17,81,1);
        border-radius:26px;
        display: flex;
        .articleBox {
            width:648px;
            height:348px;
            background:rgba(255,255,255,1);
            border-radius:26px;
            overflow-y: scroll;
            margin:auto;
            box-sizing: border-box;
            padding:0 40px 0;
            .articleItem {
                height:110px;
                padding: 20px 0;
                display:flex;
                border-bottom: 2px solid #E2E2E2;
                .articleContent {
                    height: 118px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding-right: 20px;
                    .articleTitle {
                        max-height: 110px;
                        font-size:26px;
                        font-family:PingFangSC-Semibold,PingFang SC;
                        font-weight:600;
                        color:rgba(0,0,0,1);
                        line-height:36px;
                    }
                }
                img {
                    width:178px;
                    height:110px;
                }
            }
        }
    }
    .scene {
        width:692px;
        height:4098px;
        background: url(./images/scene.png) 0 0 no-repeat;
        background-size: 100% auto;
        border-radius:26px;
    }
    .wagesbottom {
        height: 270px;
        background: url(./images/wagesbottom.png) center center no-repeat;
        background-size:620px 174px;
    }
    .wagesFixed {
        max-width: 750px;
        height:96px;
        background:linear-gradient(360deg,rgba(0,19,89,1) 0%,rgba(76,153,255,1) 100%);
        position:fixed;
        bottom: 0;
        left: 0;
        right: 0;
        font-size:36px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:96px;
        text-align:center;
    }
}
</style>
