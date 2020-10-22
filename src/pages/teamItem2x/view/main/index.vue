<!-- 首页 -->
<template>
  <section class="page" id="page">

    <div class="header-container" id="headerContainer">
      <!-- 想英雄致敬 -->
      <!-- <ComHeaderPic></ComHeaderPic> -->
    </div>

    <div class="main-container">
      <!-- Tab view组件 -->
      <ComTabView v-if="onLoad"></ComTabView>
    </div>

    <div class="footer-container">
      <!-- 底部footer -->
    </div>

    <!-- 底部 我的拼团记录 -->
    <ComFixedBtn></ComFixedBtn>

    <!-- 分享popup组件 -->
    <SharePopup ref="SharePopup" :isLogin="isLogin" @clickLogin="clickShareLogin" />

    <!-- 站外下载悬浮按钮 -->
    <DownloadApp v-if="$store.state.APP_FLAG==''"></DownloadApp>

  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import bus from "@common/finsuit-h5/libs/bus.js"
/* 分组模块 */
// import ComHeaderPic from "./modules/com-header-pic.vue"
import ComTabView from "./modules/com-tab-view.vue"
import ComFixedBtn from "./modules/com-fixed-btn.vue"

import SharePopup from "../../components/SharePopup"
import DownloadApp from "../../components/DownloadApp"
export default {
  components: { ComTabView, ComFixedBtn, SharePopup, DownloadApp },
  data () {
    return {
      _cacheShareJson: [],
      viewLoging: this.$Loading("")
    };
  },
  computed: {
    ...mapState({
      onLoad: state => state.MainConfig.onLoad
    }),
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin () {
      // 无需监听登陆变化，ios每次登陆登陆会强刷页面，安卓每次pinCaiPageDidAppear返回会触发loginResult回调
      //   this.init();
    }
  },
  created () {
    this.init();
    this.asyncInit();
    this.shortMsgLink();
  },
  mounted () {
    // 页面初始化打点
    this.$trackEvents.ACB0G027();

    //  监听app返回事件 刷新必要的数据
    bus.$on("pageAppear", () => {
      this.getTeamList();
      this.getPersonData();
    })
    // 打开分享
    bus.$on("openShare", this.openShare);
    // 刷新拼团数据
    bus.$on("getTeamList", this.getTeamList);
    // 刷新拼人数数据
    bus.$on("getPersonData", this.getPersonData);
  },
  methods: {

    //  init
    async init () {
      this.viewLoging.show();
      let promise = [];
      promise.push(this.getTabsConfig());
      promise.push(this.getTeamList());
      promise.push(this.getPersonData());
      // 如果要展示底部银行、评价等数据，去掉注释即可
      if (this.$store.state.APP_FLAG === "BC" || this.$store.state.APP_FLAG === "PC") {

      } else {
        promise.push(this.getFooterData());
        promise.push(this.getCommentData());
      }

      try {
        await Promise.all(promise);
      } catch (error) {
        console.error(error);
      }

      this.$store.commit("SET_ON_LOAD", true);
      this.viewLoging.close();
    },

    // 异步接口init
    asyncInit () {
      setTimeout(() => {
        this.getPersonShareBtn();
        this.getTeamShareBtn();
      }, 2000);
    },

    //  获取tab配置接口
    async getTabsConfig () {
      let data = await this.$api.getTabsConfig();
      this.$store.commit("SET_MAIN_TABS", data);
    },

    //  获取底部数据接口
    async getFooterData () {
      let data = await this.$api.getFooterData();
      this.$store.commit("SET_FOOTER_DATA", data);
    },

    // 获取拼人数数据接口
    async getPersonData () {
      let data = await this.$api.getPersonData();
      this.$store.commit("SET_PERSON_DATA", data);
    },

    // 获取拼人数分享配置接口
    async getPersonShareBtn () {
      let data = await this.$api.getShareBtn({ APP_PLACE: "2", ACTITY_CODE: "ASSEMBLE_PERSON_HOME" });
      this.$store.commit("SET_PRS_SHARE_DATA", data);
    },

    // 获取拼金额分享配置接口
    async getTeamShareBtn () {
      let data = await this.$api.getShareBtn({ APP_PLACE: "2", ACTITY_CODE: "SFACT_TEAM" });
      this.$store.commit("SET_TEAM_SHARE_DATA", data);
    },

    // 获取拼团列表
    async getTeamList () {
      let data = await this.$api.getTeamList({ DEVICE_ID: this.$store.state.DEVICE_ID });
      this.$store.commit("SET_TEAM_LIST_DATA", data);
    },

    // 获取下一批评论
    async getCommentData () {
      let data = await this.$api.getFooterComment();
      let list = JSON.parse(JSON.stringify(data.COMMENT.COMMENT_LIST));
      this.$store.commit("SET_COMMENT_DATA", data.COMMENT);
      this.$store.commit("SET_COMMENT_LIST", list);
      let data1 = await this.$api.getFooterComment();
      this.$store.commit("SET_COMMENT_LIST", data1.COMMENT.COMMENT_LIST);
    },

    // 唤起分享组件 提供拼金额和拼人数分享按钮公共调用
    openShare (shareJson = []) {
      // 缓存json 方便再次分享调用
      this._cacheShareJson = shareJson;
      this.$refs.SharePopup.open(shareJson, this.shareSuccess);
    },

    // 分享成功回调
    async shareSuccess (btnItem) {
      // 未登录无法领取红包
      if (!this.$store.state.TOKEN) return;
      // 分享渠道点位
      this.$trackEvents.ACB0G022({ ITEM_VALUE: btnItem.SHARE_PLACE });

      let data = await this.$api.postShareRedPacket({ MEMBER_ID: this.$store.state.ID });
      if (data.RESULT == 0 && data.GIFT_AMOUNT) {
        this.lotteryMoneyDialog(data.GIFT_AMOUNT);
      } else {
        this.lotteryMoneyFailDialog();
      }
    },

    // 分享得红包成功弹窗
    lotteryMoneyDialog (money) {
      this.$CommonDialog({
        componentName: "LotteryMoney",
        appendElement: document.getElementById("#page"),
        title: "恭喜获得",
        value: `${money}`,
        btn: "查看红包",
        btnCallBack: () => {
          if (this.$store.state.APP_FLAG === "BC") {
            let url = this.$Config.gotoSuperAccount;
            url += `#/redPacket`;
            url += `?ACTITY_CODE=${this.$Config.actityCode}`;
            url += `&customBar=1`;
            url += `&h5HandleRightItems=1`;
            this.$openWebview(url);
          }
          else if (this.$store.state.APP_FLAG === "PC") {
            let url = this.$Config.gotoSuperAccount;
            url += "#/pocketMoneyAccounts";
            this.$bcBridge.gotoPocketMoney({ url: url });
          }
          else {
            this.$Toast("请下载比财app领取奖励");
          }
          // 打点
          this.$trackEvents.ACB0G023({ ITEM_VALUE: "查看红包", ITEM_VALUE1: money });
        }
      })
    },

    // 分享得红包未获得弹窗
    lotteryMoneyFailDialog () {
      let dialog = this.$CommonDialog({
        componentName: "LotteryMoneyFail",
        appendElement: document.getElementById("#page"),
        title: "很遗憾，本次分享您未获得奖励红包",
        value: "请再接再厉",
        btn: "再次分享",
        btnCallBack: () => {
          dialog.close();
          this.openShare(this._cacheShareJson);
          // 打点
          this.$trackEvents.ACB0G024({ ITEM_VALUE: "再次分享" });
        }
      })
    },

    // 分享popup没有登陆点击登陆按钮
    clickShareLogin () {
      this.$login();
    },

    // 是否是短信链接下载，储存下载App标识
    shortMsgLink () {
      if (this.$route.query["shortMsg"] === "1") {
        sessionStorage.setItem("shortMsg", "1");
      } else {

      }
    }
  }
}
</script>
<style lang='less' scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  .main-container {
    flex: 1;
    position: relative;
  }
}
</style>