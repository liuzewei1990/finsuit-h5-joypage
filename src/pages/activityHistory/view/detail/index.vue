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
    let encodeOrder = this.$route.query["orderData"];
    encodeOrder && this.renderData(encodeOrder);
  },

  methods: {
    renderData (encodeOrder) {
      try {
        this.orderData = JSON.parse(decodeURIComponent(encodeOrder));
      } catch (error) {
        this.$Toast("解析出错");
      }
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes pageShow {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.pageShow {
  animation: pageShow 0.3s ease-in-out both;
}
.detail {
  padding: 24px;
  box-sizing: border-box;

  min-height: 100vh;
}
</style>
