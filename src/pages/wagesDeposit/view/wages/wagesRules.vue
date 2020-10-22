<template>
    <div class="wagesRules" v-show="rulesFlag">
        <div class="rulesBox">
            <div class="rulesTitle">{{rulesTitle}}</div>
            <div class="closeRules" @click="close"></div>
            <div class="rulesContent">
                <div v-show="rulesType!='envelopes'">
                    1、计划存多少，每月什么时候存，选心怡的银行产品；
                    2、每月主动按计划存钱，每次存入都可选择合意的银行产品；
                    3、攒钱记录一目了然，灵活支取，周转无忧。
                </div>
                <br v-show="rulesType=='all'">
                <div v-show="rulesType!='rule'">
                    1、月存月富有权益仅限在本活动页内购买产品享受，其他页面内的同款银行产品不共同享受。通过拼团或新手专享等活动购买同款银行产品，权益不叠加；
                    2、活动加息权益按月度记录连续不间断存入时间，重新存入也记入连续。且仅限前三个月的首笔存入订单；
                    3、当月首单加息权益仅限一次，需满足投资金额≥2000元且持仓时间≥20天。若未满足投资金额或持仓条件，则权益失效且无法再次享受当月权益；
                    3、系统将根据单笔购买订单的状态和额度自动绑定对应权益，若单笔投资订单未达到活动权益的金额条件和持仓期限要求，则该笔订单无法获得权益；
                    4、满足权益规则的订单，请在【资产-活动投资】内了解持仓进度及权益发放状态；
                    5、成功购买本银行理财产品并持仓达到相应期限即可享受本次权益，现金权益将于T+1天发至【资产-会员权益-红包】，到账可查看或支取；
                    6、同一个比财/拼财账号、手机号、身份证、手机终端，符合以上任一条件，均视为同一用户。
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['rulesTitle','rulesType','callback'],
    data () {
        return {
            rulesFlag:false,
        }
    },
    methods: {
        close () {
            this.rulesFlag=false
            if(this.callback) {
                this.callback()
            }
        }
    }
}
</script>

<style lang="less">
.wagesRules {
    background:rgba(11,11,11,0.8);
    position:absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .rulesBox {
        width:750px;
        height:906px;
        background:rgba(255,255,255,1);
        border-radius:60px 60px 0px 0px;
        position: absolute;
        bottom:0;
        .rulesTitle {
            width:750px;
            height:100px;
            background:rgba(80,139,239,1);
            border-radius:60px 60px 0px 0px;
            font-size:36px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:600;
            color:rgba(255,253,253,1);
            line-height:100px;
            text-align: center;
            position: relative;
        }
        .closeRules {
            position: absolute;
            right: 34px;
            top:36px;
            width:32px;
            height:32px;
            background: url(./images/close.png) 0 0 no-repeat;
            background-size: 100%;
        }
        .rulesContent {
            height: 804px;
            box-sizing: border-box;
            padding:48px 28px;
        }
    }
}
</style>
