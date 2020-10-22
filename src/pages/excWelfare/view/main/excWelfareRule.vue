<template>
    <div class="regularRule">
        <div class="ruleContent">
            <div class="ruleTitle">· · · 活动规则 · · ·</div>
            <p v-html="rule">
                <!-- 1.活动时间为：2019年8月23日18:00～2019年8月31日23:59
                2.参与活动用户仅限在比财投资过的用户(新用户在投资一次后即可成为该类用户)
                3.参与活动产品仅限此页面展示的银行产品（即只有在此页面购买的产品才能获得抽奖资格）
                4.活动期间每笔复投订单需满足“投资金额≥5000元且投资需持仓时间≥7天，7天内不可有赎回行为”，即可获得1次抽奖机会(如复投2笔订单同时满足条件，即有2次抽奖机会，依此类推)，每人每天最多6次有效抽奖机会，中奖率100%，最低可获得3元，投资额越高，获得高额现金奖励或实物奖品的概率越大。
                5.奖励发放时间：满足奖励条件后（投资金额≥5000元且投资需持仓时间≥7天，7天内不可有赎回行为），现金奖励将在24小时内发送至您的比财账户中；实物奖品将会有专人客服与您联系；若您提前赎回，则奖励作废。
                6.活动奖品：现金奖励（3元、6元、12元、29元、58元）、优酷会员卡、Mac Air、松下榨汁机、iPhoneXR
                7.如需查看抽奖次数，可返回此页面
                8.活动结束次日零点，在活动期间所累计的抽奖机会将会清零，请您在活动结束前及时进行抽奖
                9.活动最终解释权归比财所有 -->
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            rule:'',
        }
    },
    mounted () {
        console.log(this.$route.params.rule)
        this.rule = this.$route.params.rule
    }
}
</script>

<style lang="less" scoped>
    .regularRule {
        background: #ff702e;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: 0 auto;
        max-width: 750px;
        .ruleContent {
            position: absolute;
            top: 40px;
            right: 40px;
            left: 40px;
            bottom: 40px;
            background:#FBECD9;
            border-radius:30px;
            .ruleTitle {
                height:42px;
                font-size:30px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(78,78,78,1);
                line-height:42px;
                text-align: center;
                padding: 52px 0 54px;
            }
            p {
                width:560px;
                position: absolute;
                top: 148px;
                bottom: 76px;
                left: 55px;
                right: 55px;
                font-size:23px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(78,78,78,1);
                line-height:37px;
                margin: 0 auto;
                overflow-y: scroll;
            }
        }
    }
</style>