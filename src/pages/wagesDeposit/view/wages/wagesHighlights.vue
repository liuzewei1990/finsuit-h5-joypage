<template>
    <div class="highlights">
        <div class="highlightsImgBox">
            <img :src="imgLevel[`${gender}${level}`]">
        </div>
        <div class="highlightsText">人生巅峰</div>
        <div class="template">
            <div class="templateItem">
                <div class="templateItemCeil">3<span>个月</span></div>
                <div class="templateItemFloor">历史最长连续转入</div>
            </div>
            <div class="templateItem">
                <div class="templateItemCeil">2000<span>元</span></div>
                <div class="templateItemFloor">单笔最高存入金额</div>
            </div>
        </div>
        <div class="template">
            <div class="templateItem">
                <div class="templateItemCeil">10086<span>元</span></div>
                <div class="templateItemFloor">历史单月最高转入</div>
            </div>
            <div class="templateItem">
                <div class="templateItemCeil">200202<span>元</span></div>
                <div class="templateItemFloor">历史最高持仓金额</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgLevel:{
                boy0:require('./images/boy-0.png'),
                boy1:require('./images/boy-1.png'),
                boy2:require('./images/boy-2.png'),
                boy3:require('./images/boy-3.png'),
                boy4:require('./images/boy-4.png'),
                boy5:require('./images/boy-5.png'),
                boy6:require('./images/boy-6.png'),
                girl0:require('./images/girl-0.png'),
                girl1:require('./images/girl-1.png'),
                girl2:require('./images/girl-2.png'),
                girl3:require('./images/girl-3.png'),
                girl4:require('./images/girl-4.png'),
                girl5:require('./images/girl-5.png'),
                girl6:require('./images/girl-6.png'),
            },
            level:0,
            gender:'boy',
        }
    }
}
</script>

<style lang="less">
.highlights {
    height: 100%;
    background:rgba(248,250,253,1);
    .highlightsImgBox {
        width:250px ;
        height:256px;
        margin:0 auto;
        padding-top: 84px;
        padding-bottom: 24px;
        img {
            height: 100%;
        }
    }
    .highlightsText {
        height:44px;
        font-size:32px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:700;
        color:rgba(64,64,64,1);
        line-height:44px;
        text-align: center;
        margin-bottom:172px;
    }
    .template {
        margin-bottom: 114px;
        display: flex;
        .templateItem {
            &:first-child {
                padding-left: 94px;
            }
            .templateItemCeil {
                width:340px;
                height:72px;
                font-size:50px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(64,64,64,1);
                line-height:72px;
                span{
                    font-size:28px;
                    color:rgba(64,64,64,1);
                }
            }
            .templateItemFloor {
                height:40px;
                font-size:28px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(134,142,158,1);
                line-height:40px;
            }
        }
    }

}
</style>
