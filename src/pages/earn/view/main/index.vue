<template>
  <section id="page" class="main">
    <!-- 消息滚动 -->
    <MsgScroll></MsgScroll>

    <!-- Banner头部 -->
    <Banner></Banner>

    <div class="main-modules">

      <!-- 邀请用户总数 -->
      <InviteUserCount class="mar-top-40"></InviteUserCount>

      <!-- 奖励总数 -->
      <RewardCount class="mar-top-40"></RewardCount>

      <!-- 我邀请的好友 -->
      <InviteUserList class="mar-top-40"></InviteUserList>

      <!-- 大转盘抽奖 -->
      <LotteryGema class="mar-top-40"></LotteryGema>

      <!-- 我获得 -->
      <RewardInnerDetail class="mar-top-40"></RewardInnerDetail>

      <!-- 朋友获得 -->
      <RewardOuterDetail class="mar-top-40"></RewardOuterDetail>

      <!-- 排行榜 -->
      <TopList class="mar-top-40"></TopList>

    </div>

    <!-- 简单四步立享多重好礼 -->
    <Footer></Footer>

    <!-- 底部bar -->
    <FooterBar @shareBtnCallBack="shareBtnCallBack"></FooterBar>
    <!-- 分享popup -->
    <share-popup ref="share-popup" @shareCallback="shareCallback"></share-popup>
  </section>
</template>

<script>
import SharePopup from "./modules/sharePopup.vue"
import MsgScroll from "./modules/msgScroll"
import Banner from "./modules/banner"
import InviteUserList from "./modules/inviteUserList"
import InviteUserCount from "./modules/inviteUserCount"
import RewardCount from "./modules/rewardCount"
import RewardInnerDetail from "./modules/rewardInnerDetail"
import RewardOuterDetail from "./modules/rewardOuterDetail"
import LotteryGema from "./modules/lotteryGema"
import TopList from "./modules/topList"
import Footer from "./modules/footer"
import FooterBar from "./modules/footerBar"
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
export default {
  components: { SharePopup, MsgScroll, Banner, InviteUserList, InviteUserCount, RewardCount, RewardInnerDetail, RewardOuterDetail, LotteryGema, TopList, Footer, FooterBar },
  data () {
    return {
    }
  },
  created () {
    this.getMainData(this);
    this.$trackEvents.ACB0K001();
  },
  mounted () {
  },

  methods: {
    ...mapActions(["getMainData"]),
    shareCallback () {
    },
    shareBtnCallBack () {
      this.$refs["share-popup"].show = true;
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #ff6748;
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
}

.main-modules {
  padding: 24px;
  box-sizing: border-box;
  flex: 1;
  margin-top: -200px;
}
</style>
