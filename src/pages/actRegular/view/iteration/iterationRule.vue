<template>
    <div class="iterationRule">
        <p class="ruleContent" v-html="rule">
            
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // rule:`1.活动时间为：2019年8月23日18:00～2019年8月31日23:59
            //     2.参与活动用户仅限在比财投资过的用户(新用户在投资一次后即可成为该类用户)
            //     3.参与活动产品仅限此页面展示的银行产品（即只有在此页面购买的产品才能获得抽奖资格）
            //     4.活动期间每笔复投订单需满足“投资金额≥5000元且投资需持仓时间≥7天，7天内不可有赎回行为”，即可获得1次抽奖机会(如复投2笔订单同时满足条件，即有2次抽奖机会，依此类推)，每人每天最多6次有效抽奖机会，中奖率100%，最低可获得3元，投资额越高，获得高额现金权益或实物奖品的概率越大。
            //     5.权益发放时间：满足权益条件后（投资金额≥5000元且投资需持仓时间≥7天，7天内不可有赎回行为），现金权益将在24小时内发送至您的比财账户中；实物奖品将会有专人客服与您联系；若您提前赎回，则权益作废。
            //     6.活动奖品：现金权益（3元、6元、12元、29元、58元）、优酷会员卡、Mac Air、松下榨汁机、iPhoneXR
            //     7.如需查看抽奖次数，可返回此页面
            //     8.活动结束次日零点，在活动期间所累计的抽奖机会将会清零，请您在活动结束前及时进行抽奖
            //     9.活动最终解释权归比财所有`,
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
    .iterationRule {
        position: absolute;
        left: 0 ;
        right: 0;
        bottom: 0;
        top: 0;
        background:linear-gradient(180deg,rgba(135,198,255,1) 0%,rgba(243,255,248,1) 100%);
        padding: 65px;
        .ruleContent {
            width:620px;
            font-size:24px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(36,36,36,1);
            line-height:28px;
            overflow-y:auto ;
        }
    }
</style>