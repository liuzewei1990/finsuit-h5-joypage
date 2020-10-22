<template>
  <div class="main" id="page">
    <!-- banner -->
    <Banner></Banner>
    <!-- 优惠券列表 -->
    <div class="modules">
      <CouponList></CouponList>
    </div>
    <!-- 底部按钮 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Banner from "./modules/banner.vue"
import CouponList from "./modules/couponList.vue"
import Footer from "./modules/footer.vue"
export default {
  components: { Banner, CouponList, Footer },
  mounted () {
    // 首页打开埋点
    this.$trackEvents.ACB0R013();
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ff8c4f, #ff804d);
  background-image: url(../../assets/images/main-bj.png);
  background-size: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  box-sizing: content-box;

  .modules {
    flex: 1;
  }
}
</style>
