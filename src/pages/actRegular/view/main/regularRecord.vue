<template>
    <div class="regularRecord">
        <div class="recordRoute">
            <div class="recordRouteTop">
                <p>已持仓{{holdDay}}天</p>
                <div>权益将在持仓满30天后统一发放</div>
            </div>
            <div class="treasure" :class="dayIndex>=i?'open':'close'"
                 v-for="(it,i) in day" :key="i"
            >
                <div class="bubble" v-if="dayIndex>=i">权益金额{{gearBonus[i]}}元</div>
            </div>
            <div class="modelBox" :style="{width:widthStage,height:heightStage}">
                <div class="model" :style="{width:(0.5+handleData(holdDay)/day[3])*0.96+'rem',height:(0.5+handleData(holdDay)/day[3])*1.13+'rem'}"
                     :class="dayIndex==1 || dayIndex==0?'reverse':''"></div>
            </div>
        </div>
        <div class="recordEmpty" v-if="recordData.length<=0">
            还没有投资过哦～
        </div>
        <div class="recordList" v-else>
            <div class="recordItem" :class="currentIndex==index?'currentItem':''" 
                 @click="changeIndex(index,item.TRADE_FLOW_NO)" 
                 v-for="(item,index) in recordData" :key="index"
            >
                <div class="recordItemName">{{item.ORG_NAME}}{{item.ORG_DESCRIPT?"-"+item.ORG_DESCRIPT:''}}</div>
                <div class="recordItemTime">{{item.CREATE_TIME}}</div>
                <div class="recordItemRates">
                    <div class="recordItemRate">{{item.RATE}}</div>
                    <div class="recordItemstatus" :class="item.status==2?'status1':'status2'">{{item.status==2?'持仓中':item.status==3?'已发放':'已失效'}}</div>
                </div>
                <div class="recordItemMoney">
                    <div class="recordInvestment">投资金额：{{item.TEADE_AMOUNT}}元</div>
                    <div class="recordBonus">累计权益：{{item.totalAmount}}元</div>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <div class="toastMask" v-show="toastControl" @touchmove.prevent>
            <div class="toast">
                <div class="regularGet" v-if="true">
                    <div class="toastTop">奖金{{grantAmount}}元</div>
                    <div class="toastCenter">哇！手气真好！继续持仓有大惊喜哟～<br/>权益将在持仓满30天后统一发放</div>
                    <div class="toastButton" @click="closeToast">知道了</div>
                </div>
                <div class="regularEnd" v-else>
                    <div class="toastTop">活动结束</div>
                    <div class="toastCenter">活动已结束<br/>仅可以查看活动金额及权益哦～</div>
                    <div class="toastButton" @click="closeToast">知道了</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        //500   364    
        //274   448
        //460   600
        //710   700
        //290   840
        return {
            currentIndex:0,//当前下标
            dayIndex:-1,//当前步骤
            holdDay:0,//当前天数
            toastControl:false,//弹窗控制
            recordData:[],//列表
            day:[],//时间节点
            gearBonus:[],//宝箱内金额
            grantAmount:0,//弹窗金额
            throttle:true,//防止频繁请求接口
        }
    },
    mounted () {
        this.getData()
    },
    computed: {
        widthStage () {
            if (this.dayIndex == -1) {
                return (510+this.holdDay/this.day[0]*(254-510))/750*100+'%'
            }else if (this.dayIndex == 0) {
                return (254+(this.holdDay-this.day[0])/(this.day[1]-this.day[0])*(460-254))/750*100+'%'
            }else if (this.dayIndex == 1) {
                return (460+(this.holdDay-this.day[1])/(this.day[2]-this.day[1])*(710-460))/750*100+'%'
            }else if (this.dayIndex == 2) {
                return (710-(this.holdDay-this.day[2])/(this.day[3]-this.day[2])*(710-290))/750*100+'%'
            }else if (this.dayIndex == 3) {
                return (710-(710-290))/750*100+'%'
            }else {
                return (500+0/7*(254-500))/750*100+'%'
            }
        },
        heightStage () {

            if (this.dayIndex == -1) {
                return (376+this.holdDay/this.day[0]*(478-376))/844*100+'%'
            }else if (this.dayIndex == 0) {
                return (478+(this.holdDay-this.day[0])/(this.day[1]-this.day[0])*(580-478))/844*100+'%'
            }else if (this.dayIndex == 1) {
                return (580+(this.holdDay-this.day[1])/(this.day[2]-this.day[1])*(700-590))/844*100+'%'
            }else if (this.dayIndex == 2) {
                return (700+(this.holdDay-this.day[2])/(this.day[3]-this.day[2])*(840-700))/844*100+'%'
            }else if (this.dayIndex == 3) {
                return (700+(840-700))/844*100+'%'
            }else {
                return (366+0/7*(468-366))/844*100+'%'
            }
        }
    },
    methods: {
        async getData () {//页面数据
            let head =  {
                // "TOKEN": "BC-75000d092d7e4d00a814993fda4f959f",
                // "SESSION_ID": "1D435918E30C5D01CD358D40BAA1D1DA",
            }
            let param = {}
            let data = await this.$api.getRecordData(param,head)
            console.log(data)
            this.recordData = data.fixedDepositInfo
            if(data.fixedDepositInfo.length<=0) {
                this.day = [7,14,20,30]
                this.dayIndex = -1
                this.holdDay = 0
                this.gearBonus = [0,0,0,0]
            }else {
                this.day = data.fixedDepositInfo[0].day
                this.dayIndex = data.fixedDepositInfo[0].dayIndex
                this.holdDay = data.fixedDepositInfo[0].holdDay
                this.gearBonus = data.fixedDepositInfo[0].gearBonus
                if (data.fixedDepositPopup.grantAmount>0) {
                    this.grantAmount = data.fixedDepositPopup.grantAmount
                    this.toastControl = true
                }
            }

            
        },
        async changeIndex (i,TRADE_FLOW_NO) {//查看别的
            if (this.currentIndex == i) {
                return
            }
            if (!this.throttle) {
                return
            }
            this.currentIndex = i
            this.throttle = false
            let head =  {
                // "TOKEN": "BC-75000d092d7e4d00a814993fda4f959f",
                // "SESSION_ID": "1D435918E30C5D01CD358D40BAA1D1DA",
            }
            let param = { "TRADE_FLOW_NO": TRADE_FLOW_NO }
            let data = await this.$api.getSwitchData(param,head)
            this.throttle = true
            console.log(data)
            this.day = data.fixedDepositInfo.day
            this.dayIndex = data.fixedDepositInfo.dayIndex
            this.holdDay = data.fixedDepositInfo.holdDay
            this.gearBonus = data.fixedDepositInfo.gearBonus
            if (data.fixedDepositPopup.grantAmount>0) {
                this.grantAmount = data.fixedDepositPopup.grantAmount
                this.toastControl = true
            }
        },
        closeToast () {//关闭弹窗
            this.toastControl = false;
        },
        handleData (v) {//处理模型大小数据
            if (v>31) {
                return 31
            }else {
                return v
            }
        }
    }
}
</script>

<style lang="less">
.regularRecord {
    max-width: 750px;
    .recordRoute {
        max-width: 750px;
        margin: 0 auto;
        height: 844px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        background: url(./images/recordRoute.png) no-repeat 0 0;
        background-size: 100% auto;
        .recordRouteTop {
            height:54px;
            display: flex;
            p {
                width: 370px;
                height:54px;
                font-size:24px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(249,249,249,1);
                line-height:54px;
                text-indent: 34px;
                display: flex;
            }
            div {
                height:54px;
                font-size:24px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(249,249,249,1);
                line-height:54px;
            }
        }
        .open {
            background: url(./images/open.png) no-repeat 0 0;
            background-size: 100% ;
        }
        .close {
            background: url(./images/close.png) no-repeat 0 0;
            background-size: 100% ;
        }
        .treasure {
            position: absolute;
            z-index: 1;
            &:nth-of-type(2) {
                width: 120px;
                height: 108px;
                left: 160px;
                top: 410px;
            }
            &:nth-of-type(3) {
                width: 146px;
                height: 132px;
                left: 340px;
                top: 500px;
            }
            &:nth-of-type(4) {
                width: 162px;
                height: 142px;
                left: 574px;
                top: 608px;
            }
            &:nth-of-type(5) {
                width: 276px;
                height: 240px;
                left: 88px;
                top: 656px;
            }
            .bubble {
                width:108px;
                height:108px;
                background: url(./images/bubble.png) no-repeat 0 0 ;
                background-size: 100%;
                font-size:20px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(10,143,121,1);
                line-height:24px;
                box-sizing: border-box;
                padding: 32px 12px 0;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: -122px;
            }
        }
        .modelBox {
            position: absolute;
            left: 0;
            top: 0;
            .model {
                position: absolute;
                background: url(./images/model.png) no-repeat 0 0;
                background-size: 100% ;
                z-index: 11;
                bottom: 0;
                right: 0;
            }
            .reverse {
                transform: rotateY(180deg);
            }
        }
    }
    .recordEmpty {
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:34px;
        padding-top: 336px;
        position: absolute;
        left: 0;
        right: 0;
        top: 844px;
        bottom: 0;
        background:rgba(247,247,247,1) url(./images/empty.png) no-repeat 182px 62px;
        background-size: 348px 216px;
        overflow-y: scroll;
        text-align: center;
        z-index: 10;
    }
    .recordList {
        z-index: 10;
        position: absolute;
        left: 0;
        right: 0;
        top: 844px;
        bottom: 0;
        background:rgba(247,247,247,1);
        padding-top: 30px;
        overflow-y: scroll;
        .recordItem {
            width:624px;
            height:216px;
            background:rgba(255,255,255,1);
            border-radius:20px;
            margin: 0 auto 18px;
            .recordItemName {
                height:68px;
                font-size:32px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(95,95,95,1);
                line-height:68px;
                border-bottom: 2px solid #F4F4F4;
                text-indent: 30px
            }
            .recordItemTime {
                height:26px;
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(143,143,143,1);
                line-height:26px;
                margin-top: 8px;
                margin-left: 432px;
            }
            .recordItemRates {
                height:50px;
                display: flex;
                padding-left: 30px;
                .recordItemRate {
                    height:50px;
                    font-size:42px;
                    font-family:has_buy;
                    font-weight:bold;
                    color:rgba(255,78,0,1);
                    line-height:52px;
                    margin-right: 54px;
                    &::after {
                        content: "%";
                        width:22px;
                        height:32px;
                        font-size:22px;
                        font-family:PingFangSC-Semibold,PingFang SC;
                        font-weight:600;
                        color:rgba(255,78,0,1);
                        line-height:32px;
                    }
                }
                .recordItemstatus {
                    width:100px;
                    height:32px;
                    border-radius:16px 0px 16px 0px;
                    font-size:20px;
                    font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                    font-weight:400;
                    line-height:32px;
                    text-align: center;
                    margin-top: 0px;
                }
                .status1 {
                    color:rgba(255,255,255,1);
                    background:rgba(255,78,0,1);
                }
                .status2 {
                    color:#fff;
                    background:#CFCFCF;
                }
            }
            .recordItemMoney {
                height:58px;
                display: flex;
                padding-left: 30px;
                div {
                    width:260px;
                    height:58px;
                    font-size:22px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(95,95,95,1);
                    line-height:58px;
                }
            }
        }
        .currentItem {
            transition: all .3s linear;
            transform: scaleX(1.09) scaleY(1.05);
            box-shadow:0px 0px 22px 0px rgba(226,226,226,1);
        }
    }

    .toastMask {
        position: fixed;
        top: 0;
        left: 0;
        bottom:0;
        right: 0;
        background:rgba(0,0,0,.4);
        z-index: 101;
        .toast {
            width: 570px;
            height: 686px;
            // background: url(./images/toastBg.png) no-repeat 0 0;
            // background-size: 100%;
            margin: 290px auto;
            .regularEnd, .regularGet {
                height: 686px;
                box-sizing: border-box;
                padding-top: 344px;
                .toastTop {
                    height:48px;
                    font-size:64px;
                    font-family:SourceHanSansCN-Medium,SourceHanSansCN;
                    font-weight:500;
                    color:rgba(255,108,0,1);
                    line-height:48px;
                    text-align: center;
                }
                .toastCenter {
                    width:442px;
                    height:144px;
                    font-size:26px;
                    font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                    font-weight:400;
                    color:rgba(201,178,143,1);
                    line-height:36px;
                    text-align: center;
                    margin: 20px auto 0;
                }
                .toastButton {
                    width:416px;
                    height:68px;
                    background:rgba(253,212,94,1);
                    box-shadow:0px 6px 4px 0px rgba(221,93,15,0.37);
                    border-radius:200px;
                    margin: 0 auto ;
                    font-size:36px;
                    font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                    font-weight:400;
                    color:rgba(172,88,0,1);
                    line-height:68px;
                    text-align: center;
                }
            }
            .regularEnd {
                background: url(./images/endbg.png) no-repeat 0 0;
                background-size: 100% ;
            }
            .regularGet {
                background: url(./images/getbg.png) no-repeat 0 0;
                background-size: 100% ;
            }
        }
    }
}
</style>