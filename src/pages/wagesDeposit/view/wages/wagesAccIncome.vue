<template>
    <div class="accIncome">
        <div id="canvas"></div>
        <div class="incomeDetailed">
            <div class="incomeDetailedTitle">收益</div>
            <div class="incomeDetailedItem" v-for="(item,index) in data" :key="index">
                <div class="incomeDetailedItemColor" :style="{'background':color[index]}"></div>
                <div class="incomeDetailedItemName">{{item.name}}</div>
                <div class="incomeDetailedItemMoney">+{{item.value}}元</div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts"
export default {
    data () {
        return {
            addMoney:21.67,
            data: [
                {value: 12.03, name: '金慧存周周盈'},
                {value: 11.60, name: '客易存'},
                {value: 0.63, name: '节节高'},
                {value: 13, name: '活动收益'},
                {value: 18, name: '银行收益'}
            ],
            color:['#508BEF','#FE9617', '#FF6B5D', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            let myChart = echarts.init(document.getElementById('canvas'));
            let option = {
                title:{
                    text:`累计总收益: ${this.addMoney}元`,
                    textStyle:{
                        color: '#4E4E4E',
                        fontWeight :'normal',
                        fontSize:16
                    },
                    bottom: 20,
                    left:'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}元 ({d}%)',
                },
                series: [
                    {
                        name: '累计收益',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data:this.data
                    }
                ],
                color: this.color
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style lang="less">
.accIncome {
    height: 100%;
    background:#F8FAFD;
    position: relative;
    #canvas {
        height:516px;
    }
    .incomeDetailed {
        position: absolute;
        top: 516px;
        bottom: 0;
        left: 0;
        width:750px;
        background:rgba(255,255,255,1);
        box-shadow:0px -4px 16px 0px rgba(238,221,218,0.58);
        border-radius:30px 30px 0px 0px;
        box-sizing: border-box;
        padding:0 42px;
        overflow-y: scroll;
        .incomeDetailedTitle {
            padding-left: 64px;
            height: 110px;
            background:url(./images/incomeDetailedTitle.png) 4px center no-repeat;
            background-size: 38px 38px;
            font-size:36px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:600;
            color:rgba(64,64,64,1);
            line-height:110px;
            border-bottom: 2px solid #EFEDED;
        }
        .incomeDetailedItem {
            border-bottom: 2px solid #EFEDED;
            height: 98px;
            display:flex;
            align-items:center;
            .incomeDetailedItemColor {
                width:48px;
                height:48px;
                border-radius: 50%;
                transform:scale(.5);
            }
            .incomeDetailedItemName {
                flex: 1;
                font-size:32px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(64,64,64,1);
            }
            .incomeDetailedItemMoney {
                padding-right: 24px;
                font-size:28px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(64,64,64,1);
            }
        }
    }
}
</style>
