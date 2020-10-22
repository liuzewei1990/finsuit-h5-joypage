<!-- 首页 -->
<template>
  <section class="page" id="page">

    <div class="header-container" id="headerContainer">
      <!-- 公共header -->
      <ComHeader ref="ComHeader" v-if="isLogin && URLConfig.isHead"></ComHeader>
      <!-- 滚动通知 -->
      <BcNotice v-if="noticeList.length > 0" :noticeList="noticeList"></BcNotice>
      <!-- 轮播图 -->
      <ComBanner v-if="URLConfig.isBanner"></ComBanner>
    </div>

    <div class="main-container">
      <!-- Tab view组件 -->
      <ComTabView v-if="onLoad" :key="ComTabViewKey" v-model="currentTabviewIndex"></ComTabView>
    </div>

    <div class="footer-container">
      <!-- 底部footer -->
    </div>

    <!-- 分享popup组件 -->
    <SharePopup ref="SharePopup" :isLogin="isLogin" @clickLogin="clickShareLogin" />

  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import bus from "@common/finsuit-h5/libs/bus.js"
/* 分组模块 */
import ComHeader from "./view/modules/com-header.vue"
import ComBanner from "./view/modules/com-banner.vue"
import ComTabView from "./view/com-tab-view.vue"

import BcNotice from "@common/finsuit-common-modules/BcNotice"

import SharePopup from "./components/SharePopup"
import Timerfornum from "./utils/Timerfornum.js"
export default {
  components: { ComHeader, BcNotice, ComBanner, ComTabView, SharePopup },
  data () {
    return {
      _cacheShareJson: [],
      viewLoging: this.$Loading(""),
      ComTabViewKey: 0,
      currentTabviewIndex: Number(this.$utils.getQueryStr()["tabIndex"]) || 0,
    };
  },
  computed: {
    ...mapState({
      onLoad: state => state.MainConfig.onLoad,
      URLConfig: state => state.MainConfig.URLConfig,
      tabs: state => state.MainConfig.tabs,
      noticeList: state => state.MainConfig.noticeList
    }),
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin () {
      // 无需监听登陆变化，ios每次登陆登陆会强刷页面，安卓每次pinCaiPageDidAppear返回会触发loginResult回调
      //   this.init();
      this.getHeaderLeftData();
      this.getAllAsset();
      this.getIndexYsdIncome();
      //   this.getAssetTimerfornum();
      this.getHeaderRightData();
      this.getHeaderBanner();

      this.heavyLoad();
    }
  },
  created () {
    // 缓存URLConfig 
    this.handleURLConfig();

    this.getNotice();
    this.init();
    this.asyncInit();
  },
  mounted () {
    // 拼财App首页比较特殊，每次webview返回都会调用loginResult方法，所以在这里注册函数监听，用户登陆信息变化
    this.$listenLoginResult();

    //  监听app返回事件 刷新必要的数据
    bus.$on("pinCaiPageDidAppear", () => {
      this.getAllAsset();
      //   this.getAssetTimerfornum();
    })
  },
  methods: {
    // 重载组件
    heavyLoad () {
      this.ComTabViewKey++;
    },

    //  init
    async init () {
      this.viewLoging.show();
      let promise = [];
      promise.push(this.getHeaderLeftData());
      promise.push(this.getIndexYsdIncome());
      //   promise.push(this.getAssetTimerfornum());
      promise.push(this.getHeaderRightData());
      promise.push(this.getTabsConfig());
      promise.push(this.getFooterData());
      promise.push(this.getCommentData());

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
        this.getHeaderBanner();
        this.getAllAsset();

        // 页面初始化打点
        this.$trackEvents.ACB0G027({ ITEM_VALUE: this.tabs[this.currentTabviewIndex].MODULE_TITLE + "-Tab" });
        //  初始化的tab点位
        this.$trackEvents.PCB000A486({ ITEM_VALUE: this.tabs[this.currentTabviewIndex].MODULE_TITLE });
      }, 2000);
    },

    // 获取头部左侧收益数据
    async getHeaderLeftData () {
      let data = await this.$api.getHeaderLeftData();
      this.$store.commit("SET_HEADER_MONEY_CONFIG", data);
    },

    /**
     * 注意：更换的新接口，总资产 + 昨日收益合并了，原始字段也改变了，所以这里暂时继续保持原始字段。
     * holdPrincipal  总资产
     * holdYesterdayIncome  昨日资产
     */
    async getAsset () {
      let head = { CT_VER: this.$store.state.CT_VER };
      let params = {};
      let data = await this.$api.getAsset(params, head);
      this.$store.commit("GET_ALL_ASSET", { TOTAL_AMT: data.holdPrincipal });
      this.$store.commit("GET_INDEX_YSD_INCOME", { YSD_INCOME: data.holdYesterdayIncome });
    },

    // 总资产
    async getAllAsset () {
      let head = { CT_VER: this.$store.state.CT_VER };
      let params = {};
      let data = await this.$api.getAllAsset(params, head);
      this.$store.commit("GET_ALL_ASSET", data);
    },

    // 昨日收益
    async getIndexYsdIncome () {
      let head = { CT_VER: this.$store.state.CT_VER };
      let params = {};
      let data = await this.$api.getIndexYsdIncome(params, head);
      this.$store.commit("GET_INDEX_YSD_INCOME", data);
    },


    // 获取头部右侧按钮数据 限制数量4个
    async getHeaderRightData () {
      // CT_VER 注意：该字段后台需要
      let head = { CT_VER: this.$store.state.CT_VER };
      let params = { BTN_TYPE: 1 };
      let data = await this.$api.getHeaderRightData(params, head);
      data = data.splice(0, 4);
      this.$store.commit("SET_HEADER_MENU_CONFIG", data);
    },

    // 获取banner数据
    async getHeaderBanner () {
      let head = { CT_VER: this.$store.state.CT_VER };
      let params = { BANNER_SEAT: "6", SHOW_TYPE: "1" };
      let data = await this.$api.getHeaderBanner(params, head);
      this.$store.commit('SET_BANNER_DATA', data);
    },

    // 获取首页公告列表
    async getNotice () {
      let head = { CT_VER: this.$store.state.CT_VER };
      let params = { positionCode: "SY" };
      let data = await this.$api.getNotice(params, head);
      this.$store.commit("SET_NOTICE_LIST", data.noticeList || []);
    },
    //  获取tab配置接口
    async getTabsConfig () {
      //   let data = await this.$api.getTabsConfig();
      let tabs = [{
        MODULE_CODE: "TEAM_VIEW",
        MODULE_TITLE: "拼团"
      }, {
        MODULE_CODE: "ALONE_VIEW",
        MODULE_TITLE: "优选"
      }]

      this.$store.commit("SET_MAIN_TABS", tabs);
    },

    //  获取底部数据接口
    async getFooterData () {
      let data = await this.$api.getFooterData();
      this.$store.commit("SET_FOOTER_DATA", data);
    },

    // 获取拼人数分享配置接口
    async getPersonShareBtn () {
      let data = await this.$api.getShareBtn({ APP_PLACE: "2", ACTITY_CODE: "PC_ASSEMBLE_PERSON_HOME" });
      this.$store.commit("SET_PRS_SHARE_DATA", data);
    },

    // 获取拼金额分享配置接口
    async getTeamShareBtn () {
      let data = await this.$api.getShareBtn({ APP_PLACE: "2", ACTITY_CODE: "PC_SFACT_TEAM" });
      this.$store.commit("SET_TEAM_SHARE_DATA", data);
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
            url += "#/pocketMoneyAccounts"
            this.$bcBridge.gotoPocketMoney({ url: url });
          } else if (this.$store.state.APP_FLAG === "PC") {
            this.$bcBridge.toAppWalletPage();
          } else {
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

    // 缓存URL配置参数
    handleURLConfig () {
      let URLQuery = this.$utils.getQueryStr();
      this.$store.commit("SET_URL_CONFIG", URLQuery);
    },

    // 轮询获取资产数据 5秒一次 共13次
    getAssetTimerfornum () {
      if (this.isLogin === true) {
        new Timerfornum({ num: 12, timerms: 5000 }).exec(this.getAsset);
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
  .main-container {
    flex: 1;
    position: relative;
  }
}
</style>