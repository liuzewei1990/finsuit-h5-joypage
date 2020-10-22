<template>
  <div class="turnplate-container">
    <div class="turnplate-outer">
      <div class="turnplate-inner" id="wheelcanvas" :style="{backgroundImage:`url(${gameCoverImg})`}"></div>
      <div class="pointer" :class="{'pointer-bg-gray':showPointerbg=='gray','pointer-bg-light':showPointerbg=='light'}" @click="btnClick"></div>
    </div>
  </div>
</template>

<script>
import "./zepto.min.js"
import "./awardRotate.js"
export default {
  props: {
    list: {
      type: Array,
      default: () => { return [] }
    },
    gameCoverImg: String,
    pointerbg: String
  },
  data () {
    return {
    }
  },
  computed: {
    showPointerbg () {
      return this.pointerbg;
    }
  },
  mounted () {
  },

  methods: {
    /**
     * 开始旋转转盘并停止到指定位置
     * index:奖品所在数组中的位置
     */
    goto (angles) {

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
          this.$emit("gameOver")
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
  }

  .turnplate-inner {
    width: 640px;
    height: 640px;
    margin: 0 auto;
    // background-image: url();
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 800px;
  }

  .pointer {
    width: 192px;
    height: 214px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translate(-50%, 0%);
  }
  .pointer-bg-gray {
    background-image: url(./turnplate-pointer.png);
  }
  .pointer-bg-light {
    background-image: url(./turnplate-pointer-light.png);
  }
}
</style>
