<template>
  <div class="turnplate-container">
    <div class="turnplate-outer">
      <canvas class="turnplate-inner" ref="canvas" id="wheelcanvas" width="422px" height="422px" style="transform: rotate(252deg);"></canvas>
      <div class="pointer" @click="btnClick"></div>
    </div>
  </div>
</template>

<script>
import "./zepto.min.js"
import "./awardRotate.js"
import drawRouletteWheel from "./drawRouletteWheel.js"
export default {
  props: {
    list: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      // 配置选项
      turnplate: {
        restaraunts: [],			//大转盘奖品名称
        colors: [],					//大转盘奖品区块对应背景颜色
        outsideRadius: 215,			//大转盘外圆的半径
        textRadius: 175,			//大转盘奖品位置距离圆心的距离
        insideRadius: 10,			//大转盘内圆的半径
        startAngle: 0,				//开始角度
      }
    }
  },

  mounted () {
    this.init();
  },

  methods: {
    init (restaraunts) {
      this.turnplate.restaraunts = this.list;
      //   this.turnplate.startAngle = (360 / this.turnplate.restaraunts.length);
      this.turnplate.colors = ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF"];
      // 使用canvas绘制
      drawRouletteWheel(this.$refs["canvas"], this.turnplate);
    },

    /**
     * 开始旋转转盘并停止到指定位置
     * index:奖品所在数组中的位置
     */
    goto (index) {
      if (typeof index !== "number") {
        alert("抽奖出错")
        return;
      }
      // 中奖后，计算转盘准备停止的目标角度
      var angles = index * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2));
      if (angles < 270) {
        angles = 270 - angles;
      } else {
        angles = 360 - angles + 270;
      }

      $('#wheelcanvas').stopRotate();
      $('#wheelcanvas').rotate({
        angle: 0,
        // 转动的圈数 5*360
        animateTo: angles + 1800,
        // 总时长
        duration: 8000,
        // 停止后的回调
        callback: () => {
          console.log("停止了");
        }
      });
    },

    btnClick () {
      this.$emit("on-click");
    },
  }
}
</script>

<style lang="less" scoped>
.turnplate-container {
  //   border: 1px solid red;
  padding: 30px 0;
  box-sizing: border-box;
  .turnplate-outer {
    position: relative;
    width: 640px;
    height: 640px;
    margin: 0 auto;
    background-image: url(./turnplate-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .turnplate-inner {
    width: 550px;
    height: 550px;
    border-radius: 500px;
    overflow: hidden;
    // background-image: url(./demo.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .pointer {
    width: 212px;
    height: 234px;
    background-image: url(./turnplate-pointer.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    position: absolute;
    left: 50%;
    top: 186px;
    transform: translate(-50%, 0%);
  }
}
</style>
