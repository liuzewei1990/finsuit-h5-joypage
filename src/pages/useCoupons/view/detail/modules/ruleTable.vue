<template>
  <div class="t-table">
    <!-- 加息券 -->
    <template v-if="couponType==2">
      <div class="t-t1">
        <span>持仓时间</span>
        <span>助力权益</span>
        <span>最高权益</span>
      </div>

      <div class="t-t2" v-for="(item, index) in configList" :key="index">
        <span>{{item.amountText}}</span>
        <span>{{item.couponRate}}%</span>
        <span>{{item.rewardTopLimit}}元</span>
      </div>
    </template>

    <!-- 现金券 -->
    <template v-if="couponType==1">
      <div class="t-t1">
        <span>投资金额</span>
        <span>持仓时间</span>
        <span>专属权益</span>
      </div>
      <div class="t-t2" v-for="(item, index) in configList" :key="index">
        <span>{{item.amountText}}</span>
        <span>{{item.holdDay}}天</span>
        <span>{{item.couponAmount}}元</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    configList: Array,
    couponType: [String, Number]
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
.t-table {
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  .t-t1 {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: rgba(48, 49, 51, 1);
    display: flex;
    line-height: 3;
    span {
      border: 1.5px solid #e5e8f0;
      line-height: 3;
    }
    span:nth-child(even) {
      border-left: 0;
      border-right: 0;
    }
    span:first-of-type {
      flex: 1.5;
      border-top-left-radius: 16px;
    }
    span:nth-of-type(2) {
      flex: 1;
    }
    span:nth-of-type(3) {
      flex: 1;
      border-top-right-radius: 16px;
    }
  }
  .t-t2 {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
    display: flex;
    span {
      border: 1.5px solid #e5e8f0;
      border-top: 0;
      line-height: 3;
    }
    span:nth-child(even) {
      border-left: 0;
      border-right: 0;
    }
    span:first-of-type {
      flex: 1.5;
    }
    span:nth-of-type(2) {
      flex: 1;
    }
    span:nth-of-type(3) {
      flex: 1;
    }
  }
  .t-t2:last-of-type {
    span:first-of-type {
      border-bottom-left-radius: 16px;
    }
    span:nth-of-type(3) {
      border-bottom-right-radius: 16px;
    }
  }
}
</style>
