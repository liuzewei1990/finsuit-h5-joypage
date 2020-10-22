<template>
  <section id="page" class="main">
    <!-- 消息滚动 -->
    <MsgScroll></MsgScroll>

    <!-- Banner头部 -->
    <Banner></Banner>

    <div class="main-modules">

      <!-- 如何获得奖励 -->
      <HowtoGetReward class="mar-top-50"></HowtoGetReward>

      <!-- 邀请任务奖励 -->
      <Invitetaskrewards class="mar-top-50"></Invitetaskrewards>

      <!-- 活动说明 -->
      <Instructions class="mar-top-50"></Instructions>

    </div>
    <!-- 底部bar -->
    <FooterBar @shareBtnCallBack="shareBtnCallBack"></FooterBar>
    <!-- 分享popup -->
    <!-- <share-popup ref="share-popup"></share-popup> -->
  </section>
</template>

<script>
import SharePopup from "./modules/sharePopup.vue"
import MsgScroll from "./modules/msgScroll"
import Banner from "./modules/banner"
import Instructions from "./modules/instructions"
import FooterBar from "./modules/footerBar"
import HowtoGetReward from "./modules/howtoGetReward"
import Invitetaskrewards from "./modules/invitetaskrewards"

import { mapState, mapActions, mapGetters, mapMutations } from "vuex"
export default {
  components: { SharePopup, HowtoGetReward, MsgScroll, Banner, Instructions, FooterBar, Invitetaskrewards },
  data () {
    return {
      isLogin: true
    }
  },
  created () {
    this.getMainData(this);

    this.$trackEvents.ACB0K001();
  },
  mounted () {
  },

  methods: {
    ...mapActions(["getMainData", "getReward"]),
    clickShareLogin () {
    },
    shareBtnCallBack () {
      this.$refs["share-popup"].show = true;
    },
    invite () {
      let shareJson = [
        {
          // 分享方式 0:图片   1:链接  2: 小程序
          SHARE_TYPE: "1",
          // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
          SHARE_PLACE: "0",
          // 分享图标（目前APP不支持自定义分享图标）
          SHARE_HEAD_IMG: "",
          // 分享标题
          SHARE_TITLE: "getrandomText().maintitle",
          // 分享描述
          SHARE_DESC: "getrandomText().subtitle",
          // 分享链接
          SHARE_URL: decodeURIComponent("https://pm.bicai365.com/zentao/story-view-1012.html"),
          // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
          SHARE_IMAGE: "",
          //分享成功回调
          SUCCESS: () => { },
          // 取消分享回调 App内无效
          CANCEL: () => { }
        },
        {
          // 分享方式 0:图片   1:链接  2: 小程序
          SHARE_TYPE: "1",
          // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
          SHARE_PLACE: "1",
          // 分享图标（目前APP不支持自定义分享图标）
          SHARE_HEAD_IMG: "",
          // 分享标题
          SHARE_TITLE: "getrandomText().maintitle",
          // 分享描述
          SHARE_DESC: "getrandomText().subtitle",
          // 分享链接
          SHARE_URL: decodeURIComponent("https://pm.bicai365.com/zentao/story-view-1012.html"),
          // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
          SHARE_IMAGE: "",
          //分享成功回调
          SUCCESS: () => { },
          // 取消分享回调 App内无效
          CANCEL: () => { }
        }
      ]
      this.$refs["share-popup"].open(shareJson, this.shareSuccess);
    },
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #ffe7be;
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
}

.main-modules {
  padding: 24px;
  box-sizing: border-box;
  flex: 1;
  //   margin-top: -200px;
}
</style>
