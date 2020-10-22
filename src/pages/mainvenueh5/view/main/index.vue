<template>
  <section id="page" class="main">
    <Loading v-show="isLoading" :num="loadingValue"></Loading>
    <component :is="coms[currSceneIndex]"></component>
    <SharePopup ref="SharePopup" />
    <i @click="goBack" v-if="($store.state.APP_FLAG === 'PC' && $utils.isVersion($store.state.VERSION, '1.2.6')) || ($store.state.APP_FLAG === 'BC' && $utils.isVersion($store.state.VERSION, '3.2.6'))">
      <img class="main-back" v-if="currSceneIndex == '6'" :src="$assets.mainback">
      <img class="scene-back" v-else :src="$assets.sceneBack">
    </i>
  </section>
</template>

<script>
import Scene1 from "./modules/scene-1.vue"
import Scene2 from "./modules/scene-2.vue"
import Scene3 from "./modules/scene-3.vue"
import Scene4 from "./modules/scene-4.vue"
import Scene5 from "./modules/scene-5.vue"
import Scene6 from "./modules/scene-6.vue"
import SharePopup from "../../components/SharePopup"
import Preload from "@common/finsuit-plugins/preload.js"
import Loading from "../../components/Loading/index.vue"
export default {
  components: { Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, SharePopup, Loading },
  data () {
    return {
      isLoading: false,
      loadingValue: 0,
      currSceneIndex: 0,
      coms: {
        "1": "Scene1",
        "2": "Scene2",
        "3": "Scene3",
        "4": "Scene4",
        "5": "Scene5",
        "6": "Scene6",
      },
      shareConfig: []
    }
  },
  created () {
    if (this.$route.query.isRead) {
      this.$localStore("set", { key: 'isRead', value: '0' })
    }

    this.init();
  },
  mounted () {
    this.initShareConfig();
    this.$wxShare.registerShare(this.shareConfig);
  },
  methods: {
    // 返回
    goBack () {
      this.$bcBridge.gotoPreviousPage();
      //      if (type == 1) {
      //        this.$bcBridge.gotoPreviousPage();
      //      } else {
      //        if (this.currSceneIndex == 1) {
      //          this.$bcBridge.gotoPreviousPage();
      //        } else {
      //         if (this.currSceneIndex > 1) {
      //           this.currSceneIndex -= 1
      //         }
      //        }
      //      }
    },
    async init () {
      this.isLoading = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      let imgs = Object.keys(this.$assets).map(i => this.$assets[i]);
      let preload = await new Preload({
        progress: (index, count) => {
          let value = Math.floor(index / count * 100);
          this.loadingValue = value;
          if (value == 100) {
            this.stopLoading();
          }
        }
      }).load(imgs);


      this.$localStore("get", { key: 'isRead' }, (res) => {
        console.debug("已读标记：", res);
        if (res.value == '1') {
          this.currSceneIndex = 6;
        } else {
          this.currSceneIndex = 1;
        }
      })
    },
    touchmove (pos) {

      switch (pos) {
        case "left":

          break;
        case "right":

          break;
        case "top":
          this.currSceneIndex += 1;
          break;
        case "bottom":
          if (this.currSceneIndex <= 1) return;
          this.currSceneIndex -= 1;
          break;

        default:
          break;
      }
    },

    // 关闭loading
    async stopLoading () {
      await new Promise(resolve => setTimeout(resolve, 100));
      this.isLoading = false;
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

    initShareConfig () {
      let shareBtns = [{ SHARE_PLACE: "0" }, { SHARE_PLACE: "1" }];
      this.shareConfig = this.getShareConfig(shareBtns);
    },

    /**
     * 获取分享配置
     */
    getShareConfig (shareBtns) {
      let shareLink = this.getShareLink();
      return shareBtns.map(item => {
        // 分享方式 0:图片   1:链接  2: 小程序
        item["SHARE_TYPE"] = "1";
        // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
        item["SHARE_PLACE"] = item.SHARE_PLACE;

        // 分享标题
        item["SHARE_TITLE"] = "你不理财，财不理你";
        // 分享描述
        item["SHARE_DESC"] = "1218开启你的财富之旅";
        // 分享链接
        item["SHARE_URL"] = shareLink;
        // 分享IOCN或者图片
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
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #223856;
  .main-back {
    left: 32px;
  }
  .scene-back {
    left: 38px;
  }
  img {
    position: fixed;
    width: 68px;
    height: 68px;
    top: 80px;
  }
}
</style>
