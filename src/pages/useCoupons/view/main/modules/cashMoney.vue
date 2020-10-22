<template>
  <div class="cash-money">
    <p class="m-top" :class="this.$browser.OS">
      <span>{{cashNumber}}</span>
      <span :class="`s-${mdirection}`">￥</span>
    </p>
    <p class="m-bottom">{{cashDescribe}}</p>
  </div>
</template>

<script>
export default {
  props: {
    mdirection: {
      type: String,
      default: "rightBottom"
    },
    cashNumber: {
      type: [Number, String],
      default: "-"
    },
    cashDescribe: {
      type: [String],
      default: "最高权益"
    }
  },
  data () {
    return {

    };
  },
  created () {
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.cash-money {
  text-align: center;
  .m-top {
    position: relative;
    display: inline-block;
    font-family: PingFangSC-Medium, PingFang SC;
    text-align: center;
    span:first-of-type {
      font-size: 76px;
      font-weight: 500;
      color: rgba(231, 93, 34, 1);
    }
  }
  //  ios 定制样式
  .IOS {
    .s-rightBottom {
      font-size: 26px;
      font-weight: 700;
      color: rgba(231, 93, 34, 1);
      position: absolute;
      right: -20px;
      bottom: 14px;
    }
    .s-leftTop {
      font-size: 26px;
      font-weight: 700;
      color: rgba(231, 93, 34, 1);
      position: absolute;
      left: -22px;
      top: 20px;
    }
  }
  //  安卓 定制样式
  .Android {
    .s-rightBottom {
      font-size: 26px;
      font-weight: 700;
      color: rgba(231, 93, 34, 1);
      position: absolute;
      right: -24px;
      bottom: 12px;
    }
    .s-leftTop {
      font-size: 26px;
      font-weight: 700;
      color: rgba(231, 93, 34, 1);
      position: absolute;
      left: -18px;
      top: 10px;
    }
  }
  .m-bottom {
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(231, 93, 34, 1);
  }
}
</style>
