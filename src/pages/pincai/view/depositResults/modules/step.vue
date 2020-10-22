 <template>
    <div class="stepCon">
        <ul class="step">
            <!-- 成功买入 -->
            <li>
                <div class="tipImg">
                    <img src="../../../assets/images/successImg.png" alt />
                    <b class="bar">
                        <b style="display:inline-block;width:100%;height:50%;background:#508CEE"></b>
                    </b>
                </div>
                <div class="content">
                    <p>{{stepList.amountDesc}}</p>
                    <span>{{stepList.succDateDesc}}</span>
                </div>
            </li>
            <!-- 时间 -->
            <li>
                <div class="tipImg">
                    <img src="../../../assets/images/beginImg.png" alt />
                    <b class="bar"></b>
                </div>
                <div class="content">
                    <p>{{stepList.revenueDate}}</p>
                    <span>{{stepList.revenueDesc}}</span>
                </div>
            </li>
            <!-- 支取 -->
            <li>
                <div class="tipImg">
                    <img src="../../../assets/images/drawImg.png" alt />
                </div>
                <div class="content">
                    <p>{{stepList.redeemDate}}</p>
                    <span>{{stepList.redeemDateDesc}}</span>
                </div>
            </li>
        </ul>
        <button class="myMoney" @click="handleGotoAssetPage" v-show="$store.state.APP_FLAG == 'BC' || $store.state.APP_FLAG == 'PC'">查看我的资产</button>
        <button class="finish" @click="finish">完成</button>
    </div>
</template>

<script>
export default {
    props: ["stepList"],
    data () {
        return {
        };
    },
    methods: {
        finish () {
            this.$emit("handleFinish");
        },
        // 去资产页面
        handleGotoAssetPage () {
            // 原生
            if (this.$bcBridge.isApp()) {
                this.$trackEvents.ACB0T002();
                this.$bcBridge.gotoAssetPage();
            }
        }
    }
};
</script>

<style lang="less" scoped>
.stepCon {
    width: 100%;
    background: #fff;
    padding: 48px 30px 24px 30px;
    .step {
        width: 100%;
        li {
            display: flex;
            // padding-top: 26px;
            // align-items: flex-start;
            .tipImg {
                margin-right: 48px;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 40px;
                    height: 40px;
                }
                .bar {
                    width: 4px;
                    height: 100%;
                    background: rgba(204, 204, 204, 1);
                }
            }
            .content {
                margin-bottom: 64px;
                p {
                    font-size: 32px;
                    line-height: 52px;
                }
                span {
                    font-size: 24px;
                    color: rgba(153, 153, 153, 1);
                    line-height: 38px;
                }
            }
            &:last-child {
                .content {
                    margin-bottom: 0;
                }
            }
        }
    }
    .myMoney,
    .finish {
        width: 100%;
        height: 88px;
        border-radius: 4px;
        font-size: 32px;
        line-height: 44px;
        margin-top: 48px;
    }
    .myMoney {
        background: rgba(80, 140, 238, 1);
        color: rgba(255, 255, 255, 1);
    }
    .finish {
        border: 1px solid rgba(80, 140, 238, 1);
        background: #fff;
        color: rgba(80, 140, 238, 1);
    }
}
</style>
