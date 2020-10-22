<template>
  <section class="detail pageShow">
    <component :is="statusComponents[orderData.orderStatus]" :orderData="orderData"></component>
    <Footer :orderData="orderData" />
  </section>
</template>

<script>
import RewardSuccess from "./modules/rewardSuccess.vue"
import RewardAwait from "./modules/rewardAwait.vue"
import RewardFail from "./modules/rewardFail.vue"
import Footer from "./modules/footer.vue"
export default {
  components: { RewardSuccess, RewardAwait, RewardFail, Footer },
  data () {
    return {
      statusComponents: {
        "0": "RewardAwait",
        "1": "RewardSuccess",
        "2": "RewardFail"
      },
      orderData: {}
    }
  },

  created () {
    let seqNo = this.$route.query["seqNo"];
    seqNo && this.renderData(seqNo);
  },

  methods: {
    async renderData (encodeSeqNo) {
      try {
        let params = {
          routeKey: "activityRecordService-getActivityRecordBySeqNo",
          seqNo: encodeSeqNo
        };
        let data = await this.$api.getCampaign(params);

        if (data.code == "S_SUCCESS") {
          let transformArr = [];
          transformArr.push(data.data);
          this.orderData = this.$apiDataTransfrom(transformArr)[0];
        } else {
          this.$Toast("data.code ->", data.code);
        }
      } catch (error) {
        this.$Toast("解析出错");
      }
    },
  }
}
</script>

<style lang="less" scoped>
.detail {
  padding: 24px;
  box-sizing: border-box;

  min-height: 100vh;
}
</style>
