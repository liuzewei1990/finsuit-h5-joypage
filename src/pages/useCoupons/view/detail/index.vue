<template>
  <div class="detail">
    <template v-if="detailData.couponName">
      <coupon-card :detailData="detailData"></coupon-card>
      <!-- 奖励规则 -->
      <div class="d-rule">
        <h2>奖励规则</h2>
        <ruleTable :configList="detailData.configList" :couponType="detailData.couponType"></ruleTable>
      </div>

      <!-- 使用说明 -->
      <div class="d-describe">
        <h2>使用说明</h2>
        <p v-html="detailData.couponRule"></p>
      </div>
    </template>

    <template v-if="dataSkeleton">
      <detailSkeleton></detailSkeleton>
    </template>
  </div>
</template>

<script>
import couponCard from './modules/couponCard'
import ruleTable from './modules/ruleTable'
import detailSkeleton from './modules/detailSkeleton'
export default {
  components: { couponCard, ruleTable, detailSkeleton },
  data () {
    return {
      detailData: {},
      dataSkeleton: true,
    };
  },
  created () {
    this.$bcBridge.updateTitle("卡券详情")
    this.getData()
  },
  mounted () {

  },
  methods: {
    async getData () {
      try {
        let params = { routeKey: "WealCouponAppServiceImpl-getCouponDetailsInfo", memCouponId: this.$route.query.memCouponId, couponVersion: this.$route.query.couponVersion }
        let data = await this.$api.getnouselist(params, { TYPE: "CAMPAIGN_SERVICE_HANDLER" })
        this.detailData = data.data;
      } catch (error) {
        console.log(error);
      }
      this.dataSkeleton = false;
    }
  }
};
</script>

<style scoped lang="less">
.detail {
  padding: 32px;
  box-sizing: border-box;
  .h2 {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: rgba(48, 49, 51, 1);
    margin: 25px 0;
  }
  .d-rule {
    h2 {
      .h2;
    }
  }
  .d-describe {
    h2 {
      .h2;
    }
    p {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: rgba(48, 49, 51, 1);
    }
  }
}
</style>
