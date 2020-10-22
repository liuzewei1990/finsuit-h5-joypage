<template>
    <div class="iteration">
        <!-- 背景层 -->
        <div class="iterationbg"> 
            <!-- 浮层元素 -->
            <div class="iterCeil" v-show="guideShow">
                <div class="guide" :style="{'background-size':currentHeight<666?'100% auto':'auto 100%'}" :class="'guide'+(index-1)" v-for="index in 5" :key="index" v-show="step==index-1">
                    <div class="guideTitle" v-if="index==1"></div>
                    <div class="nextStep" @click="changeStep(index-1)"></div>
                    <div class="closeGuide" v-show="index!=1 && isGuide==1" @click="changeStep(4)">跳过</div>
                </div>
            </div>
            <!-- 地面元素 -->
            <div class="iterFloor" v-show="!guideShow">
                <!-- 攻略 -->
                <div class="introduction" @click="goRule"></div>
                <div class="detailInfo">
                    <div class="titlePlate" :class="status>2?'status'+status:'status2'">
                        <p :class="'sign'+status" v-show="status==2">权益将在持仓满30天后发放</p>
                        <p :class="'sign'+status" v-show="status==3">权益已发放</p>
                        <p :class="'sign'+status" v-show="status==4">权益已失效</p>
                        <p class="process" v-show="fixedDepositInfo.length>0 && status==2">{{status==2?'持仓中':status==3?'已发放':'已失效'}}({{holdDay>30?30:holdDay}}/30)</p>
                    </div>
                    <div class="infoSty name" v-show="fixedDepositInfo.length>0">{{bankinfo}}</div>
                    <div class="infoSty money" v-show="fixedDepositInfo.length>0">投资金额：{{teadeAmount}}元</div>
                </div>
                <!-- 地图板块 -->
                <div class="map">
                    <div class="destination" :class="'item'+(i-1)" v-for="i in 4" :key="i">
                        <div class="tarTime" v-show="holdDay<day[i-1] && fixedDepositInfo.length>0">{{dateList.length>0?Number(dateList[i-1].slice(5,7)):0}}月{{dateList.length>0?Number(dateList[i-1].slice(8)):0}}日</div>
                        <div class="coin" v-show="holdDay<=day[i-1]"></div>
                        <p class="money" v-show="holdDay>day[i-1]" v-if="i!=4">¥{{cacul(gearBonus[i-1])}}</p>
                    </div>
                    <div class="model" :style="modelPos[current]">
                        <div class="cumulative" :class="holdDay<=day[1]?'leftTips':'rightTips'" v-show="holdDay>=day[0] && status!=4">
                            <div class="cumulativeContent">累计金额</div>
                            <div class="cumulativeContent">{{cacul(totalAmount)}}</div>
                        </div>
                    </div>
                </div>
                <div class="bottomButton"></div>
                <div class="btnBox">
                    <div class="btnItem" @click="buttonChange('product')">活动产品</div>
                    <div class="btnItem" @click="buttonChange('order')">我的订单</div>
                </div>

                <!-- 产品和订单弹窗 -->
                <div class="mark buttonShow" v-show="buttonShow.flag">
                    <transition name="slide">
                        <div class="contentBox" v-show="buttonShow.flag">
                            <div class="buttonFlag" @click="buttonShow.flag=false"></div>
                            <div class="contentTitle">
                                <div class="titleName">{{buttonShow.current=='product'?'活动产品':'我的订单'}}</div>
                                <div class="titleTips">{{buttonShow.current=='product'?'单笔满'+amountRest+'元且持仓30天无支取即可参与活动':'点击订单可切换查看对应持仓进度地图'}}</div>
                            </div>
                            <section>
                                <!-- 产品列表 -->
                                <div class="sectionProduct" v-show="buttonShow.current == 'product'">
                                    <div class="proItem" v-for="(item,index) in investListMainpage" :key="'product'+index" @click="toDetail(item)">
                                        <div class="orgName">{{item.ORG_NAME}}-{{item.PRD_NAME}}</div>
                                        <div class="itemBox">
                                            <div class="interestRate">
                                                <p class="rate">{{ (item.PRD_RATE*1).toFixed(4) }}%</p>
                                                <p class="rateText">{{item.PRD_RATE_TEXT}}</p>
                                            </div>
                                            <div class="introduce">
                                                <p class="introduceText">{{item.PERIOD}}</p>
                                                <div class="tags">
                                                    <p v-for="(tag,i) in item.SPREAD_TEXT2.split(',')" :key="tag" v-if="i<2">{{tag}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 我的订单 -->
                                <div class="myOrder" v-show="buttonShow.current == 'order'">
                                    <div class="orderStatus" v-show="showStatus.status2">
                                        <div class="express">持仓中</div>
                                        <div class="orderItem" v-for="(item,index) in fixedDepositInfo" :key="index" v-if="item.status==2" @click="changeIndex(index,item.TRADE_FLOW_NO,item.ORG_NAME,item.PRD_NAME)">
                                            <div class="orderName">{{item.ORG_NAME}}-{{item.PRD_NAME}}</div>
                                            <div class="identical amount">投资金额：<span>{{item.TEADE_AMOUNT}}元</span></div>
                                            <div class="identical reward">累计奖励：<span>{{cacul(item.totalAmount)}}元</span></div>
                                            <div class="currentOrder" v-show="currentIndex==index">当前订单</div>
                                            <div class="keepDay">已持仓：<span>{{item.holdDay}}天</span></div>
                                            <div class="buyTime">{{item.INVEST_BUY_TIME}}</div>
                                        </div>
                                    </div>
                                    <div class="orderStatus" v-show="showStatus.status3">
                                        <div class="express">已发放</div>
                                        <div class="orderItem" v-for="(item,index) in fixedDepositInfo" :key="index" v-if="item.status==3" @click="changeIndex(index,item.TRADE_FLOW_NO,item.ORG_NAME,item.PRD_NAME)">
                                            <div class="orderName">{{item.ORG_NAME}}-{{item.PRD_NAME}}</div>
                                            <div class="identical amount">投资金额：<span>{{item.TEADE_AMOUNT}}元</span></div>
                                            <div class="identical reward">累计奖励：<span>{{cacul(item.totalAmount)}}元</span></div>
                                            <div class="currentOrder" v-show="currentIndex==index">当前订单</div>
                                            <div class="keepDay">已持仓：<span>{{item.holdDay}}天</span></div>
                                            <div class="buyTime">{{item.INVEST_BUY_TIME}}</div>
                                        </div>
                                    </div>
                                    <div class="orderStatus" v-show="showStatus.status4">
                                        <div class="express">已失效</div>
                                        <div class="orderItem" v-for="(item,index) in fixedDepositInfo" :key="index" v-if="item.status==4" @click="changeIndex(index,item.TRADE_FLOW_NO,item.ORG_NAME,item.PRD_NAME)">
                                            <div class="orderName">{{item.ORG_NAME}}-{{item.PRD_NAME}}</div>
                                            <div class="identical amount">投资金额：<span>{{item.TEADE_AMOUNT}}元</span></div>
                                            <div class="identical reward">累计奖励：<span>{{cacul(item.totalAmount)}}元</span></div>
                                            <div class="currentOrder" v-show="currentIndex==index">当前订单</div>
                                            <div class="keepDay">已持仓：<span>{{item.holdDay}}天</span></div>
                                            <div class="buyTime">{{item.INVEST_BUY_TIME}}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </transition>
                </div>

                <!-- 活动结束弹窗 -->
                <div class="mark activityEnd" v-show="closeEnd">
                    <div class="endTips">
                        <div class="closeEnd" @click="closeEnd=false"></div>
                        <div class="closeEndNow" @click="closeEnd=false"></div>
                    </div>
                </div>

                <!-- 活动奖励弹窗 -->
                <div class="mark activityReward" v-show="activityReward">
                    <transition name="next">
                        <div class="unactivation" v-show="activation" @click="changeActivation"></div>
                    </transition>
                    <transition name="scale">
                        <div class="activation" v-show="!activation">
                            <div class="closeReward" @click="resetReward"></div>
                            <div class="rewardMoney">¥ {{cacul(grantAmount)}}</div>
                            <!-- {{rewardInfo?'哇！手气真好！继续持仓仍有惊喜哦～':'继续持仓仍有惊喜哦～'}} -->
                            <p class="rewardInfo">{{status==3?'奖励已发放':rewardInfo?'哇！手气真好！继续持仓仍有惊喜哦～':'继续持仓仍有惊喜哦～'}}</p>
                            <p class="rewardInfo">累计现金权益将在持仓满30天后发放</p>
                            <div class="rewardKnow" @click="resetReward"></div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex"

export default {
    data() {
        //96 136
        return {
            modelPos:[
                {left:`${362/75}rem`,top:`${756/75}rem`},
                {left:`${466/75}rem`,top:`${682/75}rem`},
                {left:`${570/75}rem`,top:`${610/75}rem`},
                {left:`${668/75}rem`,top:`${538/75}rem`},
                {left:`${570/75}rem`,top:`${466/75}rem`},
                {left:`${470/75}rem`,top:`${396/75}rem`},
                {left:`${374/75}rem`,top:`${472/75}rem`},
                {left:`${280/75}rem`,top:`${542/75}rem`},
                {left:`${172/75}rem`,top:`${472/75}rem`},
                {left:`${60/75}rem` ,top:`${402/75}rem`},
                {left:`${160/75}rem`,top:`${332/75}rem`},
                {left:`${260/75}rem`,top:`${260/75}rem`},
                {left:`${366/75}rem`,top:`${178/75}rem`},
            ],
            currentIndex:0,//当前下标
            dayIndex:-1,//当前步骤
            holdDay:0,//当前天数
            day:[],//时间节点
            gearBonus:[],//宝箱内金额
            grantAmount:0,//弹窗金额
            throttle:true,//防止频繁请求接口
            buttonShow: {
                flag:false,
                current:'',
            },//产品和订单窗口控制
            closeEnd:false,//活动结束弹窗控制
            activityReward:false,//活动奖励弹窗控制
            activation:true,//奖励弹窗切换控制
            rewardInfo:false,//奖励文本切换
            step:0,//引导页步骤
            guideShow:false,//是否显示引导页
            currentHeight:0,//浏览器高度
            investListMainpage:[],//产品列表
            isGuide:0,//是否第一次访问0表示第一次
            fixedDepositRule:'',//活动规则
            fixedDepositInfo:[],//订单列表
            activityStatus:1,//活动状态
            showStatus:{},//状态显示
            teadeAmount:0,//投资金额
            bankinfo:'',//产品信息     
            totalAmount:0,//累计金额  
            dateList:[],//时间列表   
            amountRest:0,//起投金额  
            status:2,//当前状态
        }
    },
    computed :{
        current () {
            if(this.holdDay == 0) {
                return 0 
            }else if (this.holdDay>0 && this.holdDay<=this.day[0] ) {
                return Math.floor(this.holdDay/this.day[0]*2) +1
            }else if (this.holdDay>this.day[0] && this.holdDay<=this.day[1] ) {
                return Math.floor((this.holdDay-this.day[0])/(this.day[1]-this.day[0])*2) +4
            }else if (this.holdDay>this.day[1] && this.holdDay<=this.day[2] ) {
                return Math.floor((this.holdDay-this.day[1])/(this.day[2]-this.day[1])*2) +7
            }else if (this.holdDay>this.day[2] && this.holdDay<=this.day[3] ) {
                return Math.floor((this.holdDay-this.day[2])/(this.day[3]-this.day[2])*2) +10
            }else {
                return 12
            }
        },
        ...mapGetters(["isLogin"])
    },
    watch: {
        isLogin () {
            this.getData()
        }
    },
    mounted () {
        this.currentHeight = (document.documentElement.clientHeight == 0) ? document.body.clientHeight : document.documentElement.clientHeight
        
        // 购买完成后，返回到领券首页刷新数据
        this.$bus.$on("pageAppear", this.getData);
        this.getData()
    },
    methods: {
        async getData () {
            let regular = this.$route.query.regular
            this.$trackEvents.ACB0Z001({regular});

            let head =  {
                // "SESSION_ID":"E9E98EDFFBF6761559A1883AD9D426F0",
                // "TOKEN":"BC-cd19cdb248434ae097a04832f5acefcb",
            }
            let param = {
                TYPE : 2,
                // currentIndex:this.currentIndex
            }
            let data = await this.$api.getRegularData(param,head)
            console.log(data)
            this.activityStatus = data.ACTITY_STATUS
            if (data.ACTITY_STATUS==0) {
                this.closeEnd = true
            }
            this.investListMainpage = data.INVEST_LIST_MAINPAGE
            this.fixedDepositRule = data.FIXED_DEPOSIT_RULE
            this.isGuide = data.TYPE
            this.amountRest = data.amountRest
            this.fixedDepositInfo = data.fixedDepositInfo
            this.guideShow = this.fixedDepositInfo.length?false:true
            if(sessionStorage.getItem('guideShow')) this.guideShow = false
            this.showStatus = this.isShowStatus()
            if(data.fixedDepositInfo.length<=0) {
                this.day = [7,14,20,30]
                this.dayIndex = -1
                this.holdDay = 0
                this.gearBonus = [0,0,0,0]
            }else {
                this.currentIndex = sessionStorage.getItem('currentIndex') || 0
                this.day = data.fixedDepositInfo[this.currentIndex].day
                this.dayIndex = data.fixedDepositInfo[this.currentIndex].dayIndex
                this.holdDay = data.fixedDepositInfo[this.currentIndex].holdDay
                this.gearBonus = data.fixedDepositInfo[this.currentIndex].gearBonus
                this.bankinfo = data.fixedDepositInfo[this.currentIndex].ORG_NAME+'-'+data.fixedDepositInfo[this.currentIndex].PRD_NAME
                this.teadeAmount = data.fixedDepositInfo[this.currentIndex].TEADE_AMOUNT
                this.totalAmount = data.fixedDepositInfo[this.currentIndex].totalAmount 
                this.status = data.fixedDepositInfo[this.currentIndex].status
                this.dateList = data.fixedDepositInfo[this.currentIndex].dateList
                if (data.fixedDepositPopup.grantAmount>0) {
                    let holdDay = this.holdDay
                    let flag = await this.day.some(function(item) {return item == holdDay})
                    if (!flag) {
                        this.activation = false
                    }
                    this.grantAmount = data.fixedDepositPopup.grantAmount
                    this.activityReward = true
                }
            }
        },
        async changeIndex (i,TRADE_FLOW_NO,ORG_NAME,PRD_NAME) {//查看别的
            if (this.currentIndex == i) {
                this.buttonShow = false
                return
            }
            if (!this.throttle) {
                return
            }
            sessionStorage.setItem('currentIndex',i)
            this.currentIndex = i
            this.throttle = false
            let head =  {
                // "SESSION_ID":"E9E98EDFFBF6761559A1883AD9D426F0",
                // "TOKEN":"BC-cd19cdb248434ae097a04832f5acefcb",
            }
            let param = { "TRADE_FLOW_NO": TRADE_FLOW_NO , TYPE : 1 }
            let data = await this.$api.getSwitchData(param,head)
            this.throttle = true
            console.log(data)
            this.day = data.fixedDepositInfo.day
            this.dayIndex = data.fixedDepositInfo.dayIndex
            this.holdDay = data.fixedDepositInfo.holdDay
            this.gearBonus = data.fixedDepositInfo.gearBonus
            this.bankinfo = ORG_NAME+'-'+PRD_NAME
            this.teadeAmount = data.fixedDepositInfo.TEADE_AMOUNT
            this.totalAmount = data.fixedDepositInfo.totalAmount 
            this.status = data.fixedDepositInfo.status
            this.dateList = data.fixedDepositInfo.dateList
            if (data.fixedDepositPopup.grantAmount>0) {
                let holdDay = this.holdDay
                let flag = await this.day.some(function(item) {return item == holdDay})
                if (!flag) {
                    this.activation = false
                }
                this.grantAmount = data.fixedDepositPopup.grantAmount
                this.activityReward = true
            }
            this.buttonShow = false
        },
        toDetail (item) {
            // console.log(item.PRD_INDEX_ID)
            this.$trackEvents.ACB0Z003({
                ITEM_VALUE:item.PRD_INDEX_ID,//产品id
                orgId: item.ORG_ID,//银行id
            });
            if (!this.$store.state.TOKEN) {
                this.$login()
                return
            }else if (this.activityStatus == 0) {
                this.$Toast('活动已结束')
                return
            }else {
                // let url =this.$Config.baseUrlHost +"/"+ this.$bcBridge.APP_FLAG+"/#/"+'personal?id=' + item.INVEST_ID + '&type=' + 'alone'+'&hideRightShare=';
                // 调原生跳转包装页
                // this.$bcBridge.openWebview(url, '产品详情');
                this.$h5PrdDetail(item.INVEST_ID,'alone',item)
            }
        },
        changeStep (index) {
            if (!this.$store.state.TOKEN)  {
                this.$login()
                return
            }
            if (index == 4) {
                sessionStorage.setItem('guideShow',1)
                this.guideShow = false
            }else {
                this.step = index+1
            }
        },
        buttonChange (current) {
            if(current=='order') {
                this.$trackEvents.ACB0Z004();
            }
            this.buttonShow = {
                flag:true,
                current,
            }
        },
        changeActivation () {
            this.rewardInfo = true;
            this.activation = false;
        },
        resetReward () {
            this.activityReward=false
            this.activation = true;
        },
        goRule () {
            // this.$router.push('/iterationRule')
            this.$trackEvents.ACB0Z002();
            this.$router.push({name: 'iterationRule', params: {rule: this.fixedDepositRule}})
        },
        isShowStatus () {
            let obj = {
                status2 :this.fixedDepositInfo.some(function (item) {return item.status==2}),
                status3 :this.fixedDepositInfo.some(function (item) {return item.status==3}),
                status4 :this.fixedDepositInfo.some(function (item) {return item.status==4}),
            }
            return obj
        },
        cacul (v) {
            return Math.floor(v*10)/10
        },
    }, 
}
</script>

<style lang='less'>
.iteration {
    position: absolute;
    left: 0 ;
    right: 0;
    bottom: 0;
    top: 0;
    background:linear-gradient(180deg,rgba(135,198,255,1) 0%,rgba(243,255,248,1) 100%);
    .iterationbg {
        height: 100%;
        position: relative;
        .iterCeil {
            position: absolute;
            z-index: 50;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            .guide {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                .closeGuide {
                    width:66px;
                    height:60px;
                    font-size:32px;
                    font-family:STYuanti-SC-Regular,STYuanti-SC;
                    font-weight:400;
                    color:rgba(255,252,252,1);
                    line-height:60px;
                    position:absolute;
                    right:40px;
                    top:40px;
                }
            }
            .guide0 {
                z-index: 55;
                background: url(./images/guide0.png) no-repeat center center;
                background-size: auto 100%;
                .guideTitle {
                    width: 624px;
                    height: 360px;
                    background: url(./images/guideTitle.png) no-repeat 0 0;
                    background-size: 100%;
                    margin: 120px auto 0;
                }
                .nextStep {
                    width:312px;
                    height:312px;
                    background: url(./images/start.png) no-repeat 0 0;
                    background-size: 100%;
                    position: absolute;
                    bottom: 131px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
            .guide1 {
                z-index: 54;
                background:rgba(11,11,11,0.8) url(./images/guide1.png) no-repeat center center;
                background-size: auto 100%;
                .nextStep {
                    width:232px;
                    height:80px;
                    position: absolute;
                    left:256px;
                    top:382px;
                    transform:scale(1.5,3);
                }
            }
            .guide2 {
                z-index: 53;
                background:rgba(11,11,11,0.8) url(./images/guide2.png) no-repeat center center;
                background-size: auto 100%;
                .nextStep {
                    width:232px;
                    height:80px;
                    position: absolute;
                    left:256px;
                    top:382px;
                    transform:scale(1.5,3);
                }
            }
            .guide3 {
                z-index: 52;
                background:rgba(11,11,11,0.8) url(./images/guide3.png) no-repeat center center;
                background-size: auto 100%;
                .nextStep {
                    width:232px;
                    height:80px;
                    position: absolute;
                    left:260px;
                    top:764px;
                    transform:scale(1.5,3);
                }
            }
            .guide4 {
                z-index: 51;
                background:rgba(11,11,11,0.8) url(./images/guide4.png) no-repeat center center;
                background-size: auto 100%;
                .nextStep {
                    width:232px;
                    height:80px;
                    position: absolute;
                    left:260px;
                    top:764px;
                    transform:scale(1.5,3);
                }
            }

        }
        .iterFloor {
            position: relative;
            height: 100%;
            overflow: hidden;
            .introduction {
                width: 96px;
                height: 72px;
                background: url(./images/introduction.png) no-repeat 0 0;
                background-size: auto 100%;
                position: absolute;
                top: 148px;
                right: 0;
                z-index: 12;
            }
            .detailInfo {
                position: absolute;
                top: 0;
                z-index: 9;
                width: 750px;
                height: 494px;
                background: url(./images/balloon.png) no-repeat 28px 72px;
                background-size: 722px 422px;
                .titlePlate {
                    width: 434px;
                    height: 124px;
                    box-sizing: border-box;
                    padding-top: 34px;
                    padding-bottom: 22px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    .sign2 {
                        height:34px;
                        font-size:24px;
                        font-family:STYuanti-SC-Bold,STYuanti-SC;
                        font-weight:bolder;
                        color:rgba(180,110,35,1);
                        line-height:34px;
                    }
                    .sign3 {
                        height:48px;
                        font-size:34px;
                        font-family:STYuanti-SC-Bold,STYuanti-SC;
                        font-weight:bolder;
                        color:rgba(255,255,252,1);
                        line-height:48px;
                        letter-spacing:1px;
                    }
                    .sign4 {
                        height:48px;
                        font-size:34px;
                        font-family:STYuanti-SC-Bold,STYuanti-SC;
                        font-weight:bolder;
                        color:rgba(255,252,252,1);
                        line-height:48px;
                        letter-spacing:1px;
                    }
                    .process {
                        height:26px;
                        font-size:18px;
                        font-family:STYuanti-SC-Bold,STYuanti-SC;
                        font-weight:bolder;
                        color:rgba(180,110,35,1);
                        line-height:26px;
                    }
                }
                .status2 {
                    background: url(./images/status2.png) no-repeat 0 -20px;
                    background-size: 100% auto;
                }
                .status3 {
                    background: url(./images/status3.png) no-repeat 0 -20px;
                    background-size: 100% auto;
                    .process {
                        color: #FFFFFC !important;
                    }
                }
                .status4 {
                    background: url(./images/status0.png) no-repeat 0 -20px;
                    background-size: 100% auto;
                    .process {
                        color: #FFFCFC !important;
                    }
                }
                .infoSty {
                    height:46px;
                    background:linear-gradient(90deg,rgba(81,80,80,0.56) 0%,rgba(60,60,60,0.73) 100%);
                    border-radius: 0 26px 26px 0;
                    text-indent: 36px;
                    padding-right: 18px;
                    position: absolute;
                    font-size:20px;
                    font-family:STYuanti-SC-Bold,STYuanti-SC;
                    font-weight:bold;
                    color:rgba(255,254,254,1);
                    line-height:50px;
                }
                .name {
                    top: 148px;
                    left: 0;
                }
                .money {
                    top: 204px;
                    left: 0;
                }
            }
            .map {
                position: absolute;
                top: 196px;
                z-index: 10;
                width: 750px;
                height: 894px;
                position: relative;
                background: url(./images/map.png) no-repeat 0 0;
                background-size: 750px 894px;
                .destination {
                    width: 166px;
                    height: 144px;
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .tarTime {
                        width:140px;
                        height:42px;
                        font-size:30px;
                        font-family:Helvetica;
                        color:rgba(255,255,254,1);
                        line-height:36px;
                        text-shadow:0px 2px 4px rgba(180,110,35,1);
                        text-align: center;
                        position: absolute;
                        left: 13px;
                        top: 10px;
                        font-weight: 900;
                    }
                    .coin {
                        width: 80px;
                        height: 70px;
                        background: url(./images/coin.png) no-repeat 0 0;
                        background-size: 80px 56px;
                    }
                    .money {
                        height:42px;
                        font-size:30px;
                        font-family:Helvetica;
                        color:rgba(255,255,254,1);
                        line-height:36px;
                        text-shadow:0px 2px 4px rgba(180,110,35,1);
                        padding-bottom: 10px;
                        font-weight: 900;
                    }
                }
                .item0 {
                    left: 585px;
                    top: 472px;
                }
                .item1 {
                    left: 292px;
                    top: 402px;
                }
                .item2 {
                    left: -20px;
                    top: 336px;
                }
                .item3 {
                    left: 283px;
                    top: 114px;
                }
                .model {
                    width: 96px ;
                    height: 136px;
                    background: url(./images/model.png) no-repeat 0 0;
                    background-size: 96px 136px;
                    position: absolute;
                    transform: translate(-50%,-100%);
                    .cumulative {
                        width: 118px;
                        height: 86px;
                        position: absolute;
                        top: -43px;
                        box-sizing: border-box;
                        padding: 16px 0 20px 0;
                        .cumulativeContent {
                            font-size:19px;
                            font-family:STYuanti-SC-Bold,STYuanti-SC;
                            font-weight:bold;
                            color:rgba(180,110,35,1);
                            text-align: center;
                            &:nth-child(2) {
                                &::before {
                                    content: '¥ ';
                                    color:rgba(180,110,35,1);
                                    font-size: 10px;
                                }
                            }
                        }
                    }
                    .leftTips {
                        left: -90px;
                        background: url(./images/leftTips.png) no-repeat 0 0;
                        background-size: 118px 86px;
                    }
                    .rightTips {
                        left: 70px;
                        background: url(./images/rightTips.png) no-repeat 0 0;
                        background-size: 118px 86px;
                    }
                }
            }  
            .bottomButton {
                position: absolute;
                bottom: 0;
                z-index: 9;
                width: 750px;
                height: 378px;
                background: url(./images/pinkClouds.png) no-repeat 0 0;
                background-size: 750px 378px;
                padding-top: 202px;
                box-sizing: border-box;
            }
            .btnBox {
                position:absolute;
                bottom:50px;
                left:0;
                right:0;
                z-index:15;
                display: flex;
                justify-content: space-around;
                .btnItem {
                    width: 260px;
                    height: 114px;
                    line-height: 114px;
                    font-size:34px;
                    font-family:STYuanti-SC-Bold,STYuanti-SC;
                    font-weight:bold;
                    color:rgba(255,241,241,1);
                    text-align: center;
                    background: url(./images/btnItem.png) no-repeat 0 9px;
                    background-size: 260px auto;
                    box-shadow:0px 4px 8px 0px rgba(151,149,149,0.5);
                    border-radius:57px;
                    padding-top: 10px;
                }
            }

            .mark {
                position: fixed;
                top: 0;
                left: 0;
                bottom:0;
                right: 0;
                background:rgba(0,0,0,.6);
            }

            .buttonShow {
                z-index: 20;
                .contentBox {
                    width:100%;
                    height:1018px;
                    background:rgba(246,245,250,1);
                    border-radius:40px 40px 0px 0px;
                    position: absolute;
                    bottom: 0;
                    .buttonFlag {
                        width:56px;
                        height:56px;
                        background: url(./images/buttonFlag.png) no-repeat 0 0;
                        background-size: 56px 56px;
                        right: 16px;
                        top: -90px;
                        position: absolute;
                    }
                    .contentTitle {
                        width:750px;
                        height:162px;
                        background: url(./images/contentTitle.png) no-repeat 0 0;
                        background-size: 750px 162px;
                        box-shadow:0px 0px 8px 0px rgba(170,120,6,0.82);
                        .titleName {
                            height:50px;
                            font-size:36px;
                            font-family:PingFangSC-Medium,PingFang SC;
                            font-weight:700;
                            color:rgba(180,110,35,1);
                            line-height:50px;
                            padding: 36px 0 6px;
                            text-align: center;
                        }
                        .titleTips {
                            height:36px;
                            font-size:26px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(180,110,35,1);
                            line-height:36px;
                            text-align: center;
                        }
                    }
                    .sectionProduct {
                        margin-top: 18px;
                        padding-top: 18px ;
                        padding-bottom: 18px ;
                        padding-left: 36px;
                        overflow-y: auto;
                        height: 856px;
                        box-sizing: border-box;
                        .proItem {
                            width:680px;
                            height:230px;
                            background:rgba(255,255,255,1);
                            border-radius:20px;
                            margin-bottom: 16px;
                            user-select:none;
                            .orgName {
                                border-bottom: #f4f4f4 2px solid;
                                font-size:26px;
                                font-family:PingFangSC-Medium,PingFang SC;
                                font-weight:700;
                                color:rgba(95,95,95,1);
                                padding: 25px 86px 25px 34px;
                                width: 100%;
                                box-sizing: border-box;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .itemBox {
                                display: flex;
                                padding: 26px 32px 0 32px;
                                justify-content: space-between;
                                .interestRate {
                                    .rate {
                                        font-size:44px;
                                        font-family:has_buy;
                                        font-weight:bold;
                                        color:rgba(255,78,0,1);
                                        padding: 4px 0;
                                    }
                                    .rateText {
                                        height:32px;
                                        font-size:22px;
                                        font-family:PingFangSC-Regular,PingFang SC;
                                        font-weight:400;
                                        color:rgba(102,102,102,1);
                                        line-height:32px;
                                    }
                                }
                                .introduce {
                                    .introduceText {
                                        height:36px;
                                        font-size:26px;
                                        font-family:PingFangSC-Medium,PingFang SC;
                                        font-weight:700;
                                        color:rgba(73,72,72,1);
                                        line-height:36px;
                                        margin-bottom: 14px;
                                        text-align: right;
                                    }
                                    .tags {
                                        display: flex;
                                        p {
                                            background:rgba(255,233,210,0.63);
                                            border-radius:2px;
                                            border:1px solid rgba(253,178,128,1);
                                            font-size:18px;
                                            font-family:PingFangSC-Regular,PingFang SC;
                                            font-weight:400;
                                            color:rgba(253,172,118,1);
                                            padding: 5px 3px;
                                            margin-left: 18px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .myOrder {
                        margin-top: 32px;
                        padding-left: 52px;
                        height: 856px;
                        overflow-y: auto;
                        .orderStatus {
                            border-left: #d8d8d8 solid 8px;
                            padding: 56px 0 20px 30px;
                            position: relative;
                            user-select:none;
                            .express {
                                position: absolute;
                                top: 0;
                                height:36px;
                                font-size:26px;
                                font-family:PingFangSC-Regular,PingFang SC;
                                font-weight:400;
                                color:rgba(73,72,72,1);
                                line-height:36px;
                                &::before {
                                    content: '';
                                    width:24px;
                                    height:24px;
                                    background:rgba(216,216,216,1);
                                    border-radius: 12px;
                                    position: absolute;
                                    top: 0;
                                    left: -46px;
                                }   
                            }
                            .orderItem {
                                width:618px;
                                height:204px;   
                                background:rgba(255,254,254,1);
                                box-shadow:0px 0px 22px 0px rgba(235,235,235,1);
                                border-radius:20px;
                                margin-bottom: 16px;
                                box-sizing: border-box;
                                padding: 28px 0 26px 34px;
                                position: relative;
                                .orderName {
                                    height:36px;
                                    font-size:26px;
                                    font-family:PingFangSC-Medium,PingFang SC;
                                    font-weight:700;
                                    color:rgba(95,95,95,1);
                                    line-height:36px;
                                    padding-bottom: 33px;
                                    width: 402px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }
                                .identical {
                                    height:36px;
                                    font-size:26px;
                                    font-family:PingFangSC-Regular,PingFang SC;
                                    font-weight:400;
                                    color:rgba(73,72,72,1);
                                    line-height:36px;
                                    margin-top: 3px;
                                    span {
                                        color: #ff4e00;
                                    }
                                }
                                .amount {
                                    margin-bottom:6px;
                                }
                                .currentOrder {
                                    font-size:18px;
                                    font-family:PingFangSC-Regular,PingFang SC;
                                    font-weight:400;
                                    color:rgba(255,252,252,1);
                                    padding: 2px 8px 2px 16px;
                                    position: absolute;
                                    right: 0;
                                    top: 8px;
                                    z-index: 21;
                                    background: url(./images/currentOrder.png) no-repeat 0 0;
                                    background-size: 100% auto;
                                }
                                .keepDay {
                                    height:36px;
                                    font-size:26px;
                                    font-family:PingFangSC-Regular,PingFang SC;
                                    font-weight:400;
                                    color:rgba(73,72,72,1);
                                    line-height:36px;
                                    position: absolute;
                                    right: 20px;
                                    top: 100px;
                                    span {
                                        font-weight: 600;
                                    }
                                }
                                .buyTime {
                                    height:36px;
                                    font-size:26px;
                                    font-family:PingFangSC-Regular,PingFang SC;
                                    font-weight:400;
                                    color:rgba(73,72,72,1);
                                    line-height:36px;
                                    position: absolute;
                                    right: 20px;
                                    top: 142px;
                                }
                            }
                            &:last-child {
                                margin-bottom: 32px;
                            }
                        }
                    }
                }
            }
            
            .activityEnd {
                z-index: 30;
                .endTips {
                    width: 564px;
                    height: 684px;
                    background: url(./images/activityEnd.png) no-repeat 0 0;
                    background-size: 564px 684px;
                    position: relative;
                    margin: 172px auto 0;
                    .closeEnd {
                        width: 44px;
                        height: 44px;
                        background: url(./images/buttonFlag.png) no-repeat 0 0;
                        background-size: 44px 44px;
                        position: absolute;
                        top:-44px;
                        right: 0;
                    }
                    .closeEndNow {
                        width: 296px;
                        height: 90px;
                        position: absolute;
                        bottom: 4px;
                        left: 134px;
                        // background: red;
                    }
                }
            }
            .activityReward {
                z-index: 40;
                .closeReward {
                    width: 44px;
                    height: 44px;
                    background: url(./images/buttonFlag.png) no-repeat 0 0;
                    background-size: 44px 44px;
                    position: absolute;
                    top:-44px;
                    right: 0;
                }
                .unactivation {
                    width: 724px;
                    height: 728px;
                    background: url(./images/unactivation.png) no-repeat 0 0;
                    background-size: 724px 728px;
                    position: absolute;
                    top: 170px;
                    left: 18px;
                    z-index: 42;
                }
                .activation {
                    width: 564px;
                    height: 686px;
                    background: url(./images/activation.png) no-repeat 0 0;
                    background-size: 564px 686px;
                    position: absolute;
                    top: 170px;
                    left: 93px;
                    z-index: 41;
                    .rewardMoney {
                        padding-top:330px ;
                        font-size:90px;
                        font-family:STYuanti-SC-Bold,STYuanti-SC;
                        font-weight:bold;
                        color:rgba(143,28,2,1);
                        text-align: center;
                        padding-bottom: 22px;
                    }
                    .rewardInfo {
                        font-size:26px;
                        font-family:STYuanti-SC-Regular,STYuanti-SC;
                        font-weight:400;
                        color:rgba(200,120,29,1);
                        line-height:36px;
                        text-align: center;
                    }
                    .rewardKnow {
                        width: 296px;
                        height: 96px;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
            }


        }
    }
}
.grayscale {
    filter: grayscale(100%);
}

.slide-enter-active,
.slide-leave-active {
    transition: all .5s ease-out;
}
.slide-enter {
    bottom: -1200px !important;
}
.slide-enter-to {
    bottom: 0 !important;
}

.scale-enter-active,
.scale-leave-active {
    transition: all 1s ease-out;
}
.scale-enter {
    transform: scale(.1);
}
.scale-enter-to {
    transform: scale(1);
}

.next-enter-active,
.next-leave-active {
    transition: all .5s ease-out;
}
.next-leave {
    transform: scale(1);
}
.next-leave-to {
    transform: scale(.5) translateY(-60%);
}
</style>