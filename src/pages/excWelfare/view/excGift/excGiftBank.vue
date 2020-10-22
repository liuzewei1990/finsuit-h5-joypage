<template>
    <div class="bankItem" :class="data[0].PURCHASE_STATUS==0?'alBuy':''">
        <div class="bankHead">
            <div class="bankAmount">{{data[0].REWARD_AMOUNT}}</div>
            <div class="bankInfo" >
                <!-- {{$Config.aliyuncHost}} -->
                <img :src="$Config.aliyuncHost+data[0].LOGO_URL">
                <div class="bankName">{{data[0].ORG_NAME}}</div>
                <div class="bankDetail">{{data[0].REWARD_INSTRUCTION}}</div>
            </div>
            <div class="buySign"></div>
            <div class="circular" v-for="circular in 2" :key="'circular'+circular"></div>
        </div>
        <div class="shrink"><p @click="pattern = !pattern">银行产品<img :src="pattern?src1:src2" ></p></div>
        <div class="listRota" v-show="pattern">
            <!-- <Swiper class="swiper" height="100%" :list="bannerList" v-model="bindSwiperIndex" @on-click-list-item="clickBanner" :showDescMask="false" :showDots="false" :loop="true" :auto="true"> -->
            <Swiper class="swiper" height="100%" :loop="true">
                <SwiperItem  class="swiperItem" v-for="(item,index) in data" :key="index+'pro'" >
                    <div class="proItem" @click="toDetail(item,false)">
                        <div class="itemTop">
                            <div class="itemTopLeft">
                                <div class="proName">{{item.PRD_NAME}}</div>
                                <div class="proRate">{{(item.PRD_RATE*1).toFixed(4)}}%</div>
                            </div>
                            <div class="itemTopRight">
                                <div class="goBuy">立即购买</div>
                            </div>
                        </div>
                        <div class="itemBottom">
                            <div class="proRateText">{{item.PRD_RATE_TEXT}}</div>
                            <div class="tags">
                                <div class="tag" v-for="(it,ind) in item.SPREAD_TEXT2.split(',')" :key="'label'+ind" 
                                     v-if="ind<2">{{it}}</div>
                            </div>
                        </div>
                    </div>
                </SwiperItem>
                <!--slot dots -->
                <!-- <div class="dots" slot="dots" v-show="true">
                    <div class="dot" :class="{'dot-active':index===item}" v-for="(item,index) in 2" :key="index"></div>
                </div> -->
            </Swiper>
        </div>
        <div class="listTile" v-show="!pattern">
            <div class="proItem" v-for="(item,index) in data" :key="index+'pro'" @click="toDetail(item,false)">
                <div class="itemTop">
                    <div class="itemTopLeft">
                        <div class="proName">{{item.PRD_NAME}}</div>
                        <div class="proRate">{{(item.PRD_RATE*1).toFixed(4)}}%</div>
                    </div>
                    <div class="itemTopRight">
                        <div class="goBuy">立即购买</div>
                    </div>
                </div>
                <div class="itemBottom">
                    <div class="proRateText">{{item.PRD_RATE_TEXT}}</div>
                    <div class="tags">
                        <div class="tag" v-for="(it,ind) in item.SPREAD_TEXT2.split(',')" :key="'label'+ind" 
                                v-if="ind<2">{{it}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from "./Swiper"

export default {
    props:['data','toDetail'],
    data () {
        return {
            pattern:true,//轮播平铺切换
            src1:require('./images/button.png'),
            src2:require('./images/button2.png'),
            bindSwiperIndex: 0,
        }
    },
    components: { Swiper, SwiperItem },
}
</script>

<style lang="less">
.bankItem {
    width:654px;
    background:rgba(251,235,217,1);
    border-radius:14px;
    margin:0 auto;
    margin-bottom: 35px;
    position: relative;
    &:last-child {
        margin-bottom: 25px;
    }
    .bankHead {
        height: 194px;
        border-bottom: dashed 2px #A5A5A5;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        padding-left: 81px;
        .bankAmount {
            width: 184px;
            height: 194px;
            font-size:102px;
            font-family:SFProDisplay;
            font-weight:bold;
            color: #FF8539;
            line-height:194px;
            &::before {
                content: '¥';
                font-size: 45px;
            }
        }
        .bankInfo {
            padding-left: 82px;
            height: 194px;
            position: relative;
            img {
                width: 40px;
                height: 40px;
                position: absolute;
                left: 30px;
                top: 33px;
            }
            .bankName {
                width:260px;
                height:113px;
                font-size:34px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(0,0,0,1);
                line-height:113px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .bankDetail {
                width:260px;
                height:31px;
                font-size:30px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(165,165,165,1);
                line-height:31px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .buySign {
            width:156px;
            height:156px;
            background: url(./images/buySign.png) no-repeat 0 0 ;
            background-size: 156px 156px;
            position: absolute;
            top: -10px;
            left: -10px;
        }
        .circular {
            width:19px;
            height:38px;
            background:linear-gradient(0deg,rgba(254,136,53,1) 0%,rgba(254,145,11,1) 99%);
            position: absolute;
            bottom: -19px;
            &:nth-child(4) {
                border-radius:0 19px 19px 0;
                left: 0;
            }
            &:nth-child(5) {
                border-radius:19px 0 0 19px;
                right: 0;
            }
        }
    }
    .shrink {
        height:30px;
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:#F38951;
        line-height:31px;
        text-align: right;
        padding-right: 67px;
        p {
            position: absolute;
            right: 0;
            padding-right: 41px;
            margin-right: 38px;
            img {
                width:29px;
                height:33px;
                position: absolute;
                right: 0;
                top: -6px;
            }
        }
    }
    .listRota {
        height: 251px;
        .swiper {
            height: 100%;
            .swiperItem{
                height: 184px !important;
            }
            .vux-indicator ,.vux-indicator-right {
                width: 100%;
                height: 86px;
                position: absolute;
                left: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                a {
                    width:20px;
                    height:20px;
                    margin-left: 31px !important;
                    &:first-child {
                        margin-left: 0px !important;
                    }
                } 
                .vux-icon-dot {
                    width:20px;
                    height:20px;
                    background:rgba(253,139,35,1);
                    opacity:0.2;
                    border-radius:20px;
                }
                .active {
                    background:rgba(253,139,35,1) !important;
                    opacity:1;
                }
            }
        }
    }
    .listTile {
        padding-bottom: 1px;
        .proItem {
            margin-bottom: 70px;
        }
    }
    .proItem {
        height: 184px;
        padding: 0 22px 0 28px;
        .itemTop {
            display: flex;
            height: 103px;
            justify-content: space-between;
            .itemTopLeft {
                flex: 1;
                .proName {
                    width:335px;
                    height:31px;
                    font-size:30px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(0,0,0,1);
                    padding-bottom: 30px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                }
                .proRate {
                    height:41px;
                    font-size:64px;
                    font-family:has_buy;
                    font-weight:bold;
                    color:#FF9352;
                    line-height:70px;
                }
            }
            .itemTopRight {
                width: 265px;
                .goBuy {
                    width:265px;
                    height:58px;
                    background:linear-gradient(-90deg,rgba(255,113,47,1) 0%,rgba(255,147,82,1) 100%);
                    box-shadow:0px 2px 4px 0px rgba(223,124,2,0.48);
                    border-radius:29px;
                    text-align: center;
                    font-size:29px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:60px;
                    margin-top: 30px;
                }
            }
        }
        .itemBottom {
            display: flex;
            .proRateText{
                height:25px;
                font-size:24px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(153,153,153,1);
                margin-top: 32px;
            }
            .tags {
                margin-top: 17px;
                flex: 1;
                display: flex;
                justify-content: flex-end;
                .tag {
                    border:2px solid rgba(255,111,45,1);
                    border-radius:10px;
                    font-size:24px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,113,47,1);
                    padding: 8px 12px;
                    margin-left:26px ;
                }
            }
        }
    }
}    

.alBuy {
    background: #E3E3E3;
    .bankHead {
        border-bottom: dashed 2px #A5A5A5;
        .bankAmount {
            color: #767676;
        }
        .buySign {
            background: url(./images/already.png) no-repeat 0 0 ;
            background-size: 156px 156px;
        }
    }
    .shrink {
        filter: grayscale(100%);
    }
    .proItem {
        .itemTop {
            .itemTopLeft {
                .proRate {
                    color:#767676;
                }
            }
            .itemTopRight {
                filter: grayscale(100%);
            }
        }
        .itemBottom {
            .tags {
                .tag {
                    border:2px solid #767676;
                    color:#767676;
                }
            }
        }
    }
} 
</style>