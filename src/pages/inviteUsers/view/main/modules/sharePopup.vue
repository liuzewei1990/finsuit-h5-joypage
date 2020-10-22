<template>
  <div>
    <popup v-model="show" position="bottom" :show-mask="true" :hide-on-blur="true" :is-transparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
      <div class="shareAlert-content">
        <div class="share-box" id="debounce">
          <div v-show="shareToFridend" class="share-list" @click="share(1)">
            <img src="@src/common/finsuit-assets/images/share_wechat.png" alt="">
            <p>微信</p>
          </div>
          <div v-show="shareToFridendCirle" class="share-list" @click="share(2)">
            <img src="@src/common/finsuit-assets/images/share_pyq.png" alt="">
            <p>朋友圈</p>
          </div>
        </div>
        <p class="shareAlert-close" @click="show = false">取消</p>
      </div>
    </popup>
  </div>
</template>

<script>
import Popup from "../../../components/Popup"
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
      let data = await this.$api.getData({
        "routeKey": "actShareInterFaceService-queryActShareList"
      });
      this.getShareDataJson = data.data;
      console.log("分享配置数据->", this.getShareDataJson)
      this.splitObjData();
    },
    async splitObjData () {
      // &分享链接
      this.shareImgQcodeval = `${location.href.split("#")[0]}#/outSide?PMP_FLAG=${encodeURI(this.head.APP_FLAG)}&MEMBER_ID=${encodeURI(this.head.ID)}&ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      //   this.getShareDataJson.forEach((element, index) => {
      //     if (element.SHARE_PLACE == 0) {  // 朋友
      //       this.shareToFridend = element;
      //     } else if (element.SHARE_PLACE == 1) {  // 朋友圈
      //       this.shareToFridendCirle = element;
      //     } else if (element.SHARE_PLACE == 2) {  // QQ
      //       this.shareToQQ = element;
      //     } else if (element.SHARE_PLACE == 3) {  // 短信
      //       this.shareToDuanxin = element;
      //     } else if (element.SHARE_PLACE == 4) {
      //       this.shareToQCode = element;
      //     }
      //   });
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
  .shareAlert-close {
    color: #333333;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    height: 160px;
    letter-spacing: 2px;
    line-height: 4;
  }
  .share-box {
    display: flex;
    background-color: #f5f7fa;
    .share-list {
      display: flex;
      flex: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 64px;
      img {
        width: 112px;
        height: 112px;
      }
      p {
        margin: 20px 0;
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

