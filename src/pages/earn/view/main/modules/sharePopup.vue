<template>
  <div>
    <popup v-model="show" position="bottom" :show-mask="true" :hide-on-blur="true" :is-transparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
      <div class="shareAlert-content">
        <p class="shareAlert-title">请选择分享方式</p>
        <div class="share-box" id="debounce">
          <div v-show="shareToFridend" class="share-list" @click="share(1)">
            <img src="../../../assets/images/weixin@2x.png" alt="">
            <p>微信</p>
          </div>
          <div v-show="shareToFridendCirle" class="share-list" @click="share(2)">
            <img src="../../../assets/images/pengyouquan@2x.png" alt="">
            <p>朋友圈</p>
          </div>
          <div v-show="shareToQCode" class="share-list" tag="div" @click="toSaomaInvitive">
            <img src="../../../assets/images/share-shaoma.png" alt="">
            <p>扫码邀请</p>
          </div>
          <div v-show="shareToDuanxin" class="share-list" @click="share(3)">
            <img src="../../../assets/images/share-duanxin.png" alt="">
            <p>短信邀请</p>
          </div>
          <div v-show="shareToQQ" class="share-list" @click="share(4)">
            <img src="../../../assets/images/QQ@2x.png" alt="">
            <p>QQ邀请</p>
          </div>
        </div>
        <p class="shareAlert-close" @click="show = false">取消</p>
      </div>
    </popup>
  </div>
</template>

<script>
import Popup from "@src/common/finsuit-components/Popup"
export default {
  components: { Popup },
  data () {
    return {
      show: false,
      shareLoading: this.$Loading(),
      shareBtnLoading: this.$Loading(),
      shareTo: "",
      shareImgQcodeval: "",
      shareToFridend: "", // 微信
      shareToFridendCirle: "",  // 朋友圈
      shareToQQ: "", // QQ
      shareToDuanxin: "", // 短信
      shareToQCode: "",  // 扫码跳转
      head: {
        APP_FLAG: this.$store.state.APP_FLAG || "BC",
        ID: this.$store.state.ID || "",
      },
    }
  },
  created () {
    this.getShareData();
  },
  mounted () {
  },
  methods: {
    open () {
      this.show = true;
      this.btns.length === 0 && this.getShareBtn();
      window.sharedResult = this.sharedResult;
    },
    // 分享回调 APP调用
    sharedResult (res) {
      this.show = false;
      window.sharedResult = null;
      this.$emit("shareCallback", this.currClickShareBtn);
    },
    async getShareData () {
      let params = { APP_PLACE: 2, ACTITY_CODE: "EARN" };
      let data = await this.$api.getShareBtn(params);
      this.getShareDataJson = data;
      console.log("首页分享配置数据")
      console.log(this.getShareDataJson)
      this.splitObjData();
    },
    async splitObjData () {
      // &分享链接
      this.shareImgQcodeval = `${location.href.split("#")[0]}#/outSide?PMP_FLAG=${encodeURI(this.head.APP_FLAG)}&MEMBER_ID=${encodeURI(this.head.ID)}&ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.getShareDataJson.forEach((element, index) => {
        if (element.SHARE_PLACE == 0) {  // 朋友
          this.shareToFridend = element;
        } else if (element.SHARE_PLACE == 1) {  // 朋友圈
          this.shareToFridendCirle = element;
        } else if (element.SHARE_PLACE == 2) {  // QQ
          this.shareToQQ = element;
        } else if (element.SHARE_PLACE == 3) {  // 短信
          this.shareToDuanxin = element;
        } else if (element.SHARE_PLACE == 4) {
          this.shareToQCode = element;
        }
      });
    },
    share (type) {
      this.shareTo = type;
      this.show = false;
      this.shareLoading.show()
      // 微信分享
      let obj = {
        SOURCE_ID: type,  //  渠道
        FUNCTION_STATUS: "1",  // 状态
      }
      this.$trackEvents.ACB0K009(() => { }, obj);
      if (type == 1) {
        if (this.shareToFridend.SHARE_TYPE == 0) { // 图片
          this.$createShareImage((baseimg64) => {
            this.shareImageTo(type, baseimg64)
          })
        } else if (this.shareToFridend.SHARE_TYPE == 1) { // 外链
          this.toh5ShareLink(type, this.shareImgQcodeval)
        }
      } else if (type == 2) { // 朋友圈分享
        if (this.shareToFridendCirle.SHARE_TYPE == 0) { // 图片
          this.$createShareImage((baseimg64) => {
            this.shareImageTo(type, baseimg64)
          })
        } else if (this.shareToFridendCirle.SHARE_TYPE == 1) { // 外链
          this.toh5ShareLink(type, this.shareImgQcodeval)
        }
      } else if (type == 3) { // 短信
        this.shareLoading.close();
        let obj = {
          message: this.shareToDuanxin.MSG_CONTENT,
          sendByUser: 0,
          INVITE_ID: this.head.ID,
          ACTITY_CODE: "EARN",
          ACTITY_ID: this.$route.query.ACTITY_ID  // 活动id
        }
        this.$bcBridge.launchSMS(obj)
      } else if (type == 4) { // QQ
        if (this.shareToQQ.SHARE_TYPE == 0) { // 图片
          --this.shareTo;
          this.$createShareImage((baseimg64) => {
            this.shareImageTo(type, baseimg64)
          })
        } else if (this.shareToQQ.SHARE_TYPE == 1) { // 外链
          this.toh5ShareLink(3, this.shareImgQcodeval)
        }
      }
    },
    toh5ShareLink (val, url) {
      let data = {
        share_type: val,
        share_title: "体验即可领取35元",
        share_msg: "随时提现，还可领取更多福利！",
        share_url: url
      };
      this.shareLoading.close();
      if (window.android) {
        this.$bcBridge.h5Share(data);
      } else if (window.IOSWebJSInterface) {
        this.$bcBridge.h5Share(data);
      } else if (window.webkit) {
        this.$bcBridge.h5Share(data);
      }
    },
    toSaomaInvitive () {
      let obj = {
        SOURCE_ID: 5,  //  渠道
        FUNCTION_STATUS: "1",  // 状态
      }
      this.$trackEvents.ACB0K009(() => { }, obj);
      let url = "";
      url = window.location.href.split("#")[0];
      url += `#/scanInvite`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
      this.show = false;
      //   this.$router.push({
      //     path: "/scanInvite",
      //     query: {  }
      //   })
    },
    /**
     * 分享图片类型到 指定渠道
     * @param {Str} SHARE_PLACE     私有域参数
     * @param {Url} IMG_SRC         公共域参数
     */
    async shareImageTo (SHARE_PLACE = 1, IMG_SRC) {
      try {
        // let imgUrl = this.$Config.aliyuncHost + IMG_SRC; IMG_SRC为图片类型时，后台配置全连接
        let imgUrl = IMG_SRC;
        let maxImgBase64 = await this.$utils.toBase64(imgUrl);
        let minImgBase64 = await this.$utils.toBase64(imgUrl, 10);
        let img = maxImgBase64.split("base64,")[1];
        let thumb = minImgBase64.split("base64,")[1];
        let params = {};
        params["type"] = SHARE_PLACE;
        params["img"] = window.android ? maxImgBase64 : img;
        params["thumb"] = window.android ? maxImgBase64 : thumb;
        this.$bcBridge.h5ShareImage(params);
      } catch (error) {
        console.error(error);
        this.$Toast("shareImageTo function error")
      }
      this.shareLoading.close()
    },
  }
}
</script>
<style lang="less" scoped>
.shareAlert-content {
  background: #fff;
  .shareAlert-title {
    color: #333333;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    padding: 34px 0;
  }
  .shareAlert-close {
    color: #333333;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    margin-top: 45px;
    height: 80px;
    letter-spacing: 2px;
    line-height: 80px;
  }
  .share-box {
    display: flex;
    .share-list {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 58px;
        height: 58px;
      }
      p {
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
#imgShare {
  background: linear-gradient(to bottom, #ff8762, #ff6949);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  left: -2222px;
  top: 1000px;
  z-index: 99999;
  overflow-y: scroll;
  box-sizing: border-box;
  .imgShare-tag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 41px;
    .imgShare-main {
      display: inline-block;
      max-width: 750px;
      overflow-x: hidden;
      vertical-align: middle;
      height: 58px;
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      padding: 10px 20px;
      box-sizing: border-box;
      background: #fe6432;
      span {
        font-size: 26px;
        color: #ffffff;
        font-weight: 700;
      }
      img {
        display: inline-block;
        width: 40px;
        height: 40px;
      }
    }
  }
  .imgShare-title1 {
    font-size: 69px;
    color: #fff;
    font-family: Helvetica;
    margin-top: 95px;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 0px 2px 16px rgba(244, 77, 42, 1);
  }
  .imgShare-title2 {
    width: 586px;
    height: 57px;
    overflow: hidden;
    background: #fff;
    position: relative;
    top: 0px;
    left: 82px;
    margin-top: 24px;
    border-radius: 12px;
    color: #ff835f;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70px;
      position: absolute;
      right: -42px;
      top: -20px;
      z-index: -1;
    }
  }
  .imgShare-saoyisao {
    margin: 0 auto 0;
    position: relative;
    width: 670px;
    img {
      width: 100%;
    }
    .erweima {
      width: 350px;
      height: 350px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -77%);
    }
    p {
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
      letter-spacing: 2px;
      text-shadow: 0px 2px 10px rgba(208, 112, 4, 0.2);
      position: absolute;
      bottom: 10%;
      width: 100%;
    }
  }
  p {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 45px;
    letter-spacing: 2px;
    text-shadow: 0px 2px 10px rgba(208, 112, 4, 0.2);
    text-align: center;
    margin: 30px 0 30px;
    span {
      position: relative;
      display: inline-block;
      width: 320px;
      // background: linear-gradient(to bottom, #ff8762, #ff6949);
      line-height: 52px;
    }
    span:after {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
      top: 40px;
      right: -12px;
      border-width: 0 2px 2px 0;
      border-style: solid;
    }
    span:before {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
      top: -2px;
      left: -14px;
      border-width: 2px 0 0 2px;
      border-style: solid;
    }
  }
}
</style>

