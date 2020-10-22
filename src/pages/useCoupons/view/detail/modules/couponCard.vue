<template>
  <div class="c-card" v-if="detailData.couponName">
    <h2>{{detailData.couponName}}</h2>

    <div class="c-rate">
      <!-- 加息券 -->
      <rate :rateNumber="detailData.couponWeal" :rateDescribe="rateDescribe" v-if="detailData.couponType==2"></rate>

      <!-- 现金券 -->
      <cashmoney :cashNumber="detailData.couponWeal" :cashDescribe="rateDescribe" v-if="detailData.couponType==1" mdirection="leftTop"></cashmoney>
    </div>

    <div class="c-date">
      <p v-if="detailData.couponStatus==0">已于 {{detailData.invalidDate}}过期</p>
      <p v-if="detailData.couponStatus==1">有效期至 {{detailData.invalidDate}}</p>
      <p v-if="detailData.couponStatus==2">使用时间 {{detailData.startDate}} 至 {{detailData.endDate}}</p>
      <p v-if="detailData.couponStatus==3">已于 {{detailData.invalidDate}}使用</p>
      <p class="c-describe">{{detailData.couponDescribe}}</p>
    </div>

    <div class="c-status c-s2" @click="toUse(detailData)" v-if="detailData.couponStatus==1">立即使用</div>
    <div class="c-status c-s1" v-else>{{statusText[detailData.couponStatus]}}</div>
  </div>
</template>

<script>
import rate from '../../main/modules/rate'
import cashmoney from '../../main/modules/cashMoney'
export default {
  props: {
    detailData: Object
  },
  data () {
    return {
      statusText: {
        "0": "已过期",
        "1": "立即使用",
        "2": "未开始",
        "3": "已使用",
      }
    };
  },
  computed: {
    rateDescribe () {
      //现金券---一档和多档
      if (this.detailData.couponType == 1) {
        return this.detailData.configList && this.detailData.configList.length == 1 ? "专属权益" : "最高权益";
      } else {
        //加息券----一档和多档
        return this.detailData.configList && this.detailData.configList.length == 1 ? "助力权益" : "最高助力";
      }
    }
  },
  components: { rate, cashmoney },
  created () {

  },
  mounted () {

  },
  methods: {
    toUse (item) {
      this.$trackEvents.B000A493(() => { }, { FROM_ID: item.couponId, ITEM_VALUE: item.couponType });
      this.$router.push({
        path: "/canUse",
        query: { couponId: item.couponId, memCouponId: item.memCouponId, couponVersion: item.couponVersion }
      })
    }
  }
};
</script>

<style scoped lang="less">
.c-card {
  min-height: 350px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 32px 0px rgba(235, 239, 245, 1);
  border-radius: 16px;
  overflow: hidden;
  padding: 34px 0 0;
  box-sizing: border-box;
  & > h2 {
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(48, 49, 51, 1);
    text-align: center;
    padding: 0 10px;
  }
  .c-date {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(163, 167, 173, 1);
    text-align: center;
    margin: 22px 0;
    line-height: 1.5;
    padding: 0 10px;
  }
  .c-status {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .c-s1 {
    background: rgba(163, 167, 173, 1);
  }
  .c-s2 {
    background: rgba(80, 140, 238, 1);
  }
}
</style>
