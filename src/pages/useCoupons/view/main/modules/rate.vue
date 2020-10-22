<template>
  <div class="cash-money">
    <p class="m-top" :class="this.$browser.OS">
      <span>{{ratenum.maxNum}}</span>
      <span class="m-min" v-if="ratenum.showMin">{{ratenum.minNum}}</span>
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
      default: "0"
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
    ratenum () {
      let rates = {};
      let num = this.rateNumber + "";
      if (num.includes(".")) {
        return { maxNum: num.split(".")[0], showMin: true, minNum: "." + num.split(".")[1] }
      } else {
        return { maxNum: this.rateNumber, showMin: false, minNum: "-" }
      }
    }
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
    font-family: PingFangSC-Medium, PingFang SC;
    display: inline-block;
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: rgba(231, 93, 34, 1);
    span:first-of-type {
      font-size: 76px;
      font-weight: 500;
      color: rgba(231, 93, 34, 1);
    }
    .m-min {
      font-size: 44px;
      font-weight: 600;
    }
  }
  //  ios 定制样式
  .IOS {
    .s-rightBottom {
      position: absolute;
      right: -24px;
      bottom: 14px;
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
      bottom: 12px;
    }
    .s-leftTop {
      position: absolute;
      left: -18px;
      top: 10px;
    }
  }
  .m-bottom {
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: rgba(231, 93, 34, 1);
  }
}
</style>
