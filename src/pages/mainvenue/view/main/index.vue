<template>
  <section class="main" id="page">
    <!-- 场景切换控制器 -->
    <Main v-if="isShow" :sceneId="sceneId"></Main>
    <!-- <SwiperBanner /> -->
    <SharePopup ref="SharePopup" />
  </section>
</template>

<script>
import Main from "./modules/main.vue"
import SharePopup from "../../components/SharePopup"
import assets from "../../config/assets.config.js"
import imageLoad from "../../utils/imgLoad.js"
import Preload from "@common/finsuit-plugins/preload.js"

export default {
  components: { Main, SharePopup },
  data () {
    return {
      isShow: false,
      sceneId: "",
      // 分享配置
      shareConfig: [],
    }
  },
  created () {
    this.init();
  },
  mounted () {
    // 打点
    this.trackEvents();
    // 初始化分享配置
    this.initShareConfig();
    // 注册微信分享
    this.$wxShare.registerShare(this.shareConfig);
  },
  methods: {

    // 资源预加载
    async init () {
      let imgs = Object.keys(assets).map(i => assets[i]);

      let data = this.$api.getActivityFlag({});
      let preload = new Preload().load(imgs);

      let preloadData = null;
      let apiData = null;

      Promise.all([preload, data]).then(allRes => {
        console.debug("资源加载完毕");
        preloadData = allRes[0];
        apiData = allRes[1];
        this.queryLocalUserIsOpen(apiData);
        this.stopLoading();
      })
    },

    // 查询用户是否已读
    queryLocalUserIsOpen (apiData = {}) {
      // 活动开启-进入场景3，详情见：main组件的场景值
      if (apiData.ACTITY_OPEN_FLAG == "1") {
        this.getIsOpen(apiData.ACTITY_OPEN_FLAG, (userIsOpen) => {
          if (userIsOpen) this.openStage(4);
          else this.openStage(3);
        });
      }
      // 活动未开启-进入场景1，详情见：main组件的场景值
      else {
        this.getIsOpen(apiData.ACTITY_OPEN_FLAG, (userIsOpen) => {
          if (userIsOpen) this.openStage(2);
          else this.openStage(1);
        });
      }
    },

    // 根据场景id打开舞台
    openStage (sceneId) {
      console.debug("OpenStageSceneId:", sceneId);
      this.isShow = true;
      this.sceneId = sceneId;
    },

    // 获取用户已读状态标记
    getIsOpen (ACTITY_OPEN_FLAG, callBack = () => { }) {
      // 用户是否已读
      this.$localStore("get", { key: "is_open" }, (res = {}) => {
        console.debug("用户已读标记", res);
        if (res.value) {
          let value = JSON.parse(res.value);
          if (value.isRead == "1" && value.isOpen == ACTITY_OPEN_FLAG) callBack(true);
          else callBack(false);
        } else {
          callBack(false);
        }
      });
    },

    // 关闭loading
    stopLoading () {
      if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
        // 关闭webview的loading
        this.$bcBridge.stopLoading();
      } else {

      }
    },

    /**
     * 打开分享popup
     */
    openSharePopup () {
      this.$refs["SharePopup"].open(this.shareConfig, this.shareSuccess);
    },

    /**
     * 初始化分享配置
     */
    initShareConfig () {
      let shareBtns = [{ SHARE_PLACE: "0", SHARE_TYPE: "1" }, { SHARE_PLACE: "1", SHARE_TYPE: "1" }];
      this.shareConfig = this.getShareConfig(shareBtns);
    },

    /**
     * 获取分享配置
     */
    getShareConfig (shareBtns) {
      let shareLink = this.getShareLink();
      return shareBtns.map(item => {
        // 分享方式 0:图片   1:链接  2: 小程序
        item["SHARE_TYPE"] = item.SHARE_TYPE;
        // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
        item["SHARE_PLACE"] = item.SHARE_PLACE;

        // 分享标题
        item["SHARE_TITLE"] = "补贴疯狂抢";
        // 分享描述
        item["SHARE_DESC"] = "1218理财节";
        // 分享链接
        item["SHARE_URL"] = shareLink;
        // 分享IOCN或者图片
        // item["SHARE_IMAGE"] = require("../../assets/images/shareIcon.png");
        item["SHARE_IMAGE"] = "";

        return item;
      })
    },

    /**
     * 获取分享链接
     */
    getShareLink () {
      let url;
      url = window.location.href.split("#")[0];
      url += `?a=1`;
      url += `#/`;
      // 活动id
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      // 站外打开时来源APP_FLAG
      url += `&FROM_APP_FLAG=${this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG}`;
      return url;
    },

    /**
     * 分享成功
     */
    async shareSuccess (btnItem) {
      // 未登录无法领取红包
      if (!this.$store.state.TOKEN) return;
      // 分享渠道点位
      this.$trackEvents.ACB0R009({ ITEM_VALUE: btnItem.SHARE_PLACE });

      let params = {
        ACTIVITY_CODE: this.$Config.actityCode,
        RWARD_CODE: "COLLAGE_CLUB_RWARD_CODE"
      };
      let data = await this.$api.getShareLottery(params);

      // 未开启
      if (data.IS_OPEN) return;

      if (data.AMOUNT != "0") {
        this.$CommonDialog({
          componentName: "LotteryMoney",
          appendElement: document.getElementById("#page"),
          title: "恭喜获得",
          value: `${data.AMOUNT}`,
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
            this.$trackEvents.ACB0R007({ ITEM_VALUE: "查看红包" });
          }
        })
      } else {
        let dialog = this.$CommonDialog({
          componentName: "LotteryMoneyFail",
          appendElement: document.getElementById("#page"),
          title: "很遗憾，本次分享您未获得奖励红包",
          value: "请再接再厉",
          btn: "再次分享",
          btnCallBack: () => {
            dialog.close();
            this.openSharePopup();
            this.$trackEvents.ACB0R007({ ITEM_VALUE: "再次分享" });
          }
        })
      }
    },

    // 页面打开点位
    trackEvents () {
      if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
        this.$trackEvents.ACB0R001();
      } else {
        this.$trackEvents.ACB0R010();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #fd7451;
}
</style>
