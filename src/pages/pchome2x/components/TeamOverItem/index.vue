<!-- 拼团结束模板 -->
<template>
  <section class='team-over-item'>
    <div class="l">
      <RateTemplate :prdName="item.PRD_NAME" :rateData='$handlePrdRate.handleTeamRateAndCouponRate("",item.PRD_RATE,item.COUPON_RATE)' :prdRateText="item.PRD_RATE_TEXT"></RateTemplate>
      <ProgressBar type="success" :value="item.TEAM_SCHEDULE" :max="100" :haveAcount="true" acount="100%"></ProgressBar>
    </div>
    <div class="r" :class="status[item.TEAM_STATUS]"></div>
  </section>
</template>

<script>

import RateTemplate from "./RateTemplate.vue"
import ProgressBar from "./ProgressBar.vue"
export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: { RateTemplate, ProgressBar },
  data () {
    return {
      status: {
        "2": "r-success",
        "3": "r-fail"
      }
    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {

  },
}
</script>
<style lang='less' scoped>
.team-over-item {
  min-height: 212px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px 2px rgba(0, 128, 213, 0.17);
  border-radius: 5px;
  padding: 20px 20px;
  box-sizing: border-box;
  opacity: 0.8;

  display: flex;
  align-items: center;

  .l {
    flex: 1;
    padding: 20px;
  }

  .r {
    width: 120px;
    height: 120px;
    // margin: 20px;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .r-success {
    background-image: url(../../assets/images/home_yz_cg.png);
  }

  .r-fail {
    background-image: url(../../assets/images/home_yz_sb.png);
  }
}
</style>