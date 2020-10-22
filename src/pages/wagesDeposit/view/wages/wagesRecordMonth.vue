<template>
    <div class="monthItem">
        <div class="monthBox">
            <div class="monthText">{{month+1}}月</div>
            <div class="monthHas">已攒2000元</div>
            <div class="monthPos" :class="dayFlag?'monthPosNext':''" @click="dayFlag=!dayFlag">></div>
        </div>
        <div class="dayList" v-show="dayFlag">
            <div class="dayItem" :class="'dayItemInvalid'" v-for="item in 2" :key="item">
                <div class="dayItemLeft">
                    <div class="bankName">鄂尔多斯银行</div>
                    <div class="proName">周周盈</div>
                    <div class="rateNumber">1.9500%</div>
                    <div class="rateText">利率</div>
                </div>
                <div class="dayItemRight">
                    <div class="numberItem">存入金额：<span>500000.00元</span></div>
                    <div class="numberItem">目前持仓：<span>500000.00元</span></div>
                    <div class="numberItem">参考收益：<span>50.00元</span></div>
                    <div class="profit">活动收益：0.12元</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['month'],
    data () {
        return {
            dayFlag:false,
        }
    }
}
</script>

<style lang="less">
.monthItem {
    &:last-child {
        .monthBox {
            border:0;
        }
    }
    .monthBox {
        height: 80px;
        background:#ffffff;
        border-bottom: 2px solid #E4E4E4;
        display: flex;
        justify-content:space-between;
        align-items:center;
        padding:0 96px 0 48px;
        position: relative;
        .monthText {
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(16,16,16,1);
        }
        .monthHas {
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(16,16,16,1);
        }
        .monthPos {
            position: absolute;
            right:12px;
            top: 0;
            font-size: 30px;
            padding:24px;
            transform: rotateZ(90deg) scaleY(2);
            transition: transform 0.3s linear;
        }
        .monthPosNext {
            transform: rotateZ(-90deg) scaleY(2);
        }
    }
    .dayList {
        min-height: 100px;
        .dayItem {
            width:650px;
            height:256px;
            background:rgba(248,250,253,1);
            margin-bottom: 10px;
            box-sizing: border-box;
            padding:36px 36px 0 48px;
            display: flex;
            &:last-child {
                margin-bottom:0;
            }
            .dayItemLeft {
                .bankName {
                    width:300px;
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:700;
                    color:rgba(64,64,64,1);
                    line-height:40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-bottom: 4px;
                }
                .proName {
                    width:300px;
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(64,64,64,1);
                    line-height:40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .rateNumber {
                    width:140px;
                    height:52px;
                    font-size:44px;
                    font-family:has_buy;
                    font-weight:bold;
                    color:rgba(253,93,86,1);
                    line-height:52px;
                    padding-top: 16px;
                    padding-bottom:10px;
                }
                .rateText {
                    width:48px;
                    height:34px;
                    font-size:24px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(64,64,64,1);
                    line-height:34px;
                }
            }
            .dayItemRight {
                flex: 1;
                .numberItem {
                    height:34px;
                    font-size:24px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(134,142,158,1);
                    line-height:34px;
                    margin-bottom: 20px;
                    span {
                        color:#101010;
                    }
                }
                .profit {
                    height:34px;
                    font-size:24px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(253,93,86,1);
                    line-height:34px;
                }
            }
        }
        .dayItemInvalid {
            background:rgba(248,250,253,1) url(./images/invalid.png) 254px 98px no-repeat;
            background-size: 144px 104px;
        }
    }
}
</style>
