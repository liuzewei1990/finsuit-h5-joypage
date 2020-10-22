<template>
  <div id="page" class="main-page" ref="main-page">
    <!-- 每日一题 -->
    <one-topic></one-topic>
    <!-- 开户有奖  小程序中不支持-->
    <module-account v-if="$store.state.APP_FLAG !== 'PMP'" />
    <!-- 精选产品 -->
    <module-goods-up />
    <!-- 精彩活动 -->
    <module-market />

    <!-- 分享模块 -->
    <share-popup ref="SharePopup"></share-popup>
    <!-- 分享图片专用 -->
    <share-image ref="ShareImage"></share-image>
  </div>
</template>

<script>

import OneTopic from "./modules/oneTopic"
import ModuleAccount from "./modules/account"
import SharePopup from "@common/finsuit-components/SharePopup/index.vue"
const ShareImage = () => import(/* webpackChunkName: "module-share-image" */ "@topic/view/main/modules/shareImage");
const ModuleGoodsUp = () => import(/* webpackChunkName: "module-goods-up" */ "./modules/goodsUp");
const ModuleMarket = () => import(/* webpackChunkName: "module-market" */ "./modules/market");
export default {
  components: { OneTopic, ModuleAccount, ModuleGoodsUp, ModuleMarket, SharePopup, ShareImage },
  mounted () {
    // 页面埋点
    this.$trackEvents.ACB0I014();
    this.getShareBtn();
  },
  methods: {
    // 获取分享配置接口
    async getShareBtn () {
      let data = await this.$api.getShareBtn({ APP_PLACE: "2", ACTITY_CODE: this.$Config.actityCode });
      this.$store.commit("SET_SHARE_DATA", data);
    }
  }
}
</script>

<style lang="less" scoped>
</style>
