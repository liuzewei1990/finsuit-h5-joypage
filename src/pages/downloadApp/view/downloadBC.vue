<template>
  <div id="page">
    <div class="setImgBox">
      <div>
        <img src="../assets/images/shareAPP_phone.png" alt="">
        <img v-if="backgroundImg" :src="$Config.aliyuncHost + backgroundImg" alt="未配置图片">
      </div>
    </div>
    <div class="btnBox">
      <img src="../assets/images/shareAPP_but_top2.png" alt="">
      <div><img src="../assets/images/shareAPP_btn.png" alt="" v-copy="copyValue" v-copy:callback="copyCallback" @click="downloadApp"></div>
    </div>
  </div>
</template>

<script>
import Mask from '../components/Mask/index.vue'
export default {
  props: {
    backgroundImg: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      copyValue: this.$parent.getQuery["CHANNEL_CODE"] || "",
      shareArr: [
        {
          // 分享方式 0:图片   1:链接  2: 小程序
          SHARE_TYPE: "1",
          // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
          SHARE_PLACE: "",
          // 分享图标（目前APP不支持自定义分享图标）
          SHARE_HEAD_IMG: "",
          // 分享标题
          SHARE_TITLE: "比财-直销银行理财收益比价平台",
          // 分享描述
          SHARE_DESC: "创新的直销银行理财收益比价平台，比较收益、一键购买",
          // 分享链接
          SHARE_URL: window.location.href,
          // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
          SHARE_IMAGE: "",
          //分享成功回调
          SUCCESS: () => { },
          // 取消分享回调 App内无效
          CANCEL: () => { }
        }
      ]
    };
  },
  created () {
    this.$wxShare.registerShare(this.shareArr);
  },
  mounted () {

  },
  methods: {
    downloadApp () {
      this.$trackEvents.B000A064();
      let h5Url = this.$parent.getQuery["h5Url"];
      let linkTo = this.$parent.getQuery["linkTo"];
      let needLogin = this.$parent.getQuery["needLogin"];
      let useLink = this.$parent.getQuery["useLink"];
      let showMask = this.$parent.getQuery["showMask"];
      let params = {
        path: "applink",
      }

      let param = {
        pjsonkey: this.$bcBridge.base64Encode({ "LINK_TO": linkTo || "WEB_H5", "H5_URL": h5Url, "NEED_LOGIN": needLogin || "0", "USE_LINK": useLink || "1" })
      }
      if (h5Url) {
        params.param = param;
      }
      if (showMask) {
        this.$wxShare.showMask(Mask)
        return;
      }
      this.$callapp.bicai.open(params);

      // 兼容个别安卓机型
      if (this.$browser.OS === "Android") {
        setTimeout(() => {
          window.location.href = this.$callapp.bicai.generateScheme(params);
        }, 1000);
      }
    },
    copyCallback () {
      //   this.$Toast("复制成功")
      console.log("复制成功")
    }
  }
};
</script>

<style scoped lang="less">
#page {
  max-width: 10rem;
  height: 100vh;
  overflow: hidden;
  background: url("../assets/images/shareAPP_BG.png");
  background-size: 100% 100%;
  .setImgBox {
    position: relative;
    width: 100%;
    margin: 1.5rem 0 0 2rem;
    & > div {
      width: 6.32rem;
      img {
        width: 100%;
      }
      img:last-of-type {
        width: 5.7rem;
        position: absolute;
        top: 1.3rem;
        left: 0.3rem;
      }
    }
  }
  .btnBox {
    height: 8.5rem;
    position: fixed;
    left: -50%;
    bottom: 0;
    right: -50%;
    margin: auto;
    max-width: 10rem;
    & > img {
      width: 100%;
      min-height: 5.6rem;
    }
    & > div {
      height: 100%;
      background: #426be3;
      img {
        width: 80%;
        margin: 0 auto;
      }
    }
  }
}
</style>
