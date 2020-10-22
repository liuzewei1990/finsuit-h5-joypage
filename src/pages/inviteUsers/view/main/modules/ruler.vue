<template>
  <div class="page">
    <p class="eg">例：好友首笔投资</p>
    <div class="input-box">
      <p>
        <span id="ruler-val" class="ruler-val">20.00</span>
        <span>万元</span>
        <span class="triangle"><em></em></span>
      </p>
    </div>
    <div class="ruler-wrap" id="ruler3"></div>
    <p class="meget">
      <span>我获得奖励：</span>
      <span class="amount">{{meGet}}</span>元
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex"

import ruler from '@inviteUsers/utils/ruler';
export default {

  computed: {
    ...mapState({
      mainData: state => state.main.mainData
    }),
    meGet () {
      return this.mainData.rebateScaleList[20].rebateReward
    }
  },
  data () {
    return {
      //   meGet:
    };
  },
  created () {

  },
  mounted () {
    var rulerText3 = document.getElementById("ruler-val");
    rulerText3.innerText = "20.00";
    let that = this;
    //调用刻度尺方法
    ruler.initPlugin({
      el: "ruler3", //容器id
      height: 50, //刻度尺高度
      maxScale: 41, //最大刻度
      startValue: 20, //刻度开始的初始值
      region: [0, 40], //选择刻度的区间范围
      background: "#fff", //刻度尺背景色
      color: "", //刻度线和字体的颜色
      markColor: "#FF6129", //中心刻度标记颜色
      isConstant: false, //是否不断地获取值
      success: function (res) {
        console.log(res);
        that.meGet = that.mainData.rebateScaleList[res]
        rulerText3.innerText = res + ".00";
        // rulerText3.innerText = that.mainData.rebateScaleList.length && that.mainData.rebateScaleList[res].rebateReward + ".00";
      }
    });
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.page {
  width: 100%;
  min-height: 198px;
  background-color: #fff;
  margin: 48px auto 0;
  min-height: 396px;
  border-radius: 16px;
  .eg {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    margin-top: 30px;
    text-align: center;
  }
  .input-box {
    margin-top: 50px;
    text-align: center;
    font-weight: bold;
    color: #303133;
    font-family: HelveticaNeue-Bold, HelveticaNeue;
    & > p {
      position: relative;
      display: inline-block;
      border-bottom: 2px solid #303133;
      .ruler-val {
        min-width: 216px;
        font-size: 60px;
        span:last-of-type {
          font-size: 32px;
        }
      }
      .triangle {
        width: 100%;
        height: 10px;
        position: absolute;
        bottom: -21px;
        left: 0;
        em {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #303133;
        }
      }
    }
  }
  .ruler-wrap {
    width: 80%;
    margin-top: 20px;
    padding-left: 6px;
  }
  .meget {
    font-size: 28px;
    color: #303133;
    height: 100px;
    line-height: 100px;
    text-align: center;
    .amount {
      color: #ff6129;
    }
  }
}
</style>
