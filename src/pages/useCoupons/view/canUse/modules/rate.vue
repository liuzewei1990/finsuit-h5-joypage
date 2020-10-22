<template>
  <div class="cash-money">
    <p class="m-top" :class="this.$browser.OS">
      <span>{{rateNumber}}</span>
      <span :class="`s-${mdirection}`">%</span>
    </p>
    <p class="m-bottom">{{rateDescribe}}</p>
  </div>
</template>

<script>
export default {
  props: {
    mdirection: {
      type: String,
      default: "rightBottom"
    },
    rateNumber: {
      type: [Number, String],
      default: "--"
    },
    rateDescribe: {
      type: [String],
      default: "最高助力"
    }
  },
  data () {
    return {

    };
  },
  computed: {
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
  .m-top {
    position: relative;
    font-family: PingFangSC-Medium, PingFang SC;
    display: inline-block;
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    color: rgba(231, 93, 34, 1);
    span:first-of-type {
      font-size: 58px;
      font-weight: 500;
      color: rgba(231, 93, 34, 1);
    }
  }
  //  ios 定制样式
  .IOS {
    .s-rightBottom {
      position: absolute;
      right: -34px;
      bottom: 10px;
    }
    .s-leftTop {
      position: absolute;
      left: -18px;
      top: 20px;
    }
  }
  //  安卓 定制样式
  .Android {
    .s-rightBottom {
      position: absolute;
      right: -24px;
      bottom: 10px;
    }
    .s-leftTop {
      position: absolute;
      left: -18px;
      top: 10px;
    }
  }
  .m-bottom {
    font-size: 24px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(96, 98, 102, 1);
  }
}
</style>
