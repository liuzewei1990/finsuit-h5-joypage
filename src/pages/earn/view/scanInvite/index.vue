<template>
  <div>
    <div class="saomaInvitive">
      <!-- 消息滚动 -->
      <MsgScroll></MsgScroll>
      <div class="saomaInvitive-top">
        <img src="../../assets/images/mianduimainsao@2x.png" alt="">
      </div>
      <div class="saomaInvitive-saoyisao">
        <img :src="qrcodeSrc" class="firstImg" alt="">
        <img class="secondImg" src="../../assets/images/rightyezi.png" alt="">
        <img class="threeImg" src="../../assets/images/leftyezi@2x.png" alt="">
      </div>
      <div class="saomaInvitive-list">
        <div class="saomaInvitive-li">
          <img src="../../assets/images/wechat@2x.png" alt="">
          <p>好友打开微信</p>
          <hr />
        </div>
        <div class="saomaInvitive-li">
          <img src="../../assets/images/saoma-3@2x.png" alt="">
          <p>扫一扫二维码</p>
          <hr />
        </div>
        <div class="saomaInvitive-li">
          <img src="../../assets/images/download@2x.png" alt="">
          <p>下载安装APP</p>
          <hr />
        </div>
        <div class="saomaInvitive-li">
          <img src="../../assets/images/zuorenwu2@2x.png" alt="">
          <p>做任务得红包</p>
        </div>
      </div>
      <p class="saomaInvitive-btn" @click="sendToSoft">{{getShareDataJson[0]&&getShareDataJson[0].EXTEND_CONFIG_MAP.SWEEP_YARD_TEXT}}</p>
      <p class="saomaInvitive-boottomTtitle" @click="clickSaveImg">保存为图片</p>
    </div>
  </div>

</template>
<script>
import MsgScroll from "./modules/msgScroll.vue";
import { Base64 } from 'js-base64';
import QRCode from "qrcode";
export default {
  data () {
    return {
      loading: this.$Loading(""),
      value: '',
      getShareDataJson: [],
      shareTo: "",
      qrcodeSrc: "",
    }
  },
  components: {
    MsgScroll
  },
  computed: {
  },
  created () {
    this.getShareData();
    this.value = this.createQrcodeUrl();
    window.sendSaveImgAlbumBack = this.sendSaveImgAlbumBack;
    window.sharedResult = this.sharedResult; //分享返回
  },
  mounted () {
  },
  methods: {

    // 创建二维码地址
    createQrcodeUrl () {
      let url;
      url = location.href.split("#")[0];
      url += `#/outSide`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&PMP_FLAG=${this.$store.state.APP_FLAG}`;
      url += `&MEMBER_ID=${this.$store.state.ID}`; /// == INVITE_ID 邀请人id
      return url;
    },
    sharedResult () { },
    async getqrcode () {
      this.qrcodeSrc = await QRCode.toDataURL(this.value, { margin: 2 });
    },
    async getShareData () {
      let params = { APP_PLACE: 3, ACTITY_CODE: "", OTHER_TYPE_CODE: "EARN_SCAN_CODE" };
      let data = await this.$api.getShareBtn(params);
      this.getShareDataJson = data;
      console.log("分享配置数据2")
      console.log(this.getShareDataJson)
      if (!!data[0].PMP_QR_Code) {
        this.qrcodeSrc = data[0].PMP_QR_Code;
      } else {
        this.qrcodeSrc = await QRCode.toDataURL(this.value, { margin: 2 });
      }
    },
    sendToSoft () {
      this.loading.show()
      console.log("this.value:")
      console.log(this.value)
      this.$trackEvents.ACB0K011();
      let element = this.getShareDataJson[0];
      this.shareTo = element.SHARE_PLACE;
      if (element.SHARE_PLACE == 0) {  // 朋友
        if (element.SHARE_TYPE == 0) { // 分享图片
          this.$createShareImage((baseimg64) => {
            this.shareImageTo(1, baseimg64)
          })
        } else if (element.SHARE_TYPE == 1) {  // 外链
          this.toh5ShareLink(1, this.value)
        }
      } else if (element.SHARE_PLACE == 1) {  // 朋友圈
        if (element.SHARE_TYPE == 0) { // 分享图片
          this.$createShareImage((baseimg64) => {
            this.shareImageTo(2, baseimg64)
          })
        } else if (element.SHARE_TYPE == 1) {  // 外链
          this.toh5ShareLink(2, this.value)
        }
      } else if (element.SHARE_PLACE == 2) {  // QQ
        if (element.SHARE_TYPE == 0) { // 分享图片
          this.$createShareImage((baseimg64) => {
            this.shareImageTo(4, baseimg64)
          })
        } else if (element.SHARE_TYPE == 1) {  // 外链
          this.toh5ShareLink(3, this.value)
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
      this.loading.close()
      if (window.android) {
        this.$bcBridge.h5Share(data);
      } else if (window.IOSWebJSInterface) {
        this.$bcBridge.h5Share(data);
      } else if (window.webkit) {
        this.$bcBridge.h5Share(data);
      }
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
      this.loading.close()
    },
    clickSaveImg () {
      this.loading.show()
      this.$createShareImage((baseimg64) => {
        if (window.android) {
          this.$bcBridge.saveImgAlbumForBack(baseimg64);
        } else {
          this.$bcBridge.saveImgAlbumForBack(baseimg64.split(",")[1]);
        }
        this.loading.close()
      })
    },
    sendSaveImgAlbumBack (flag) {
      let result = JSON.parse(Base64.decode(flag));
      this.loading.close();
      console.log("result")
      console.log(result)
      if (result.flag == 1) {
        this.$Toast("保存成功")
      } else {
        this.$Toast("保存失败")
      }
    },
  }
}
</script>
<style lang="less" scoped>
.saomaInvitive {
  background: linear-gradient(to bottom, #ff8762, #ff6949);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  padding: 70px 0 50px;
  box-sizing: border-box;
  overflow-y: scroll;
  .saomaInvitive-top {
    min-height: 207px;
    padding: 0 21px 0 55px;
    box-sizing: border-box;
    img {
      width: 100%;
    }
  }
  .saomaInvitive-saoyisao {
    margin: 20px auto 0;
    position: relative;
    width: 444px;
    height: 444px;
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    .firstImg {
      width: 361px;
      height: 361px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .secondImg {
      position: absolute;
      top: -10px;
      right: -86px;
      width: 198px;
      z-index: -1;
    }
    .threeImg {
      position: absolute;
      top: 226px;
      left: -98px;
      width: 145px;
      z-index: -1;
    }
  }
  .saomaInvitive-list {
    display: flex;
    margin-top: 78px;
    .saomaInvitive-li {
      text-align: center;
      flex: 1;
      position: relative;
      img {
        width: 54px;
        height: 54px;
        display: initial;
      }
      &:nth-of-type(3) img {
        width: 58px;
        // height: 54px;
      }
      &:last-of-type img {
        width: 42px;
        // height: 54px;
      }
      p {
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
        margin-top: 21px;
      }
      hr {
        height: 1px;
        border: none;
        border-top: 2px dashed #ffffff;
        position: absolute;
        top: 26px;
        left: 73%;
        width: 100px;
      }
    }
  }
  p.saomaInvitive-btn {
    width: 600px;
    height: 88px;
    background: linear-gradient(
      180deg,
      rgba(255, 225, 105, 1) 0%,
      rgba(255, 178, 17, 1) 100%
    );
    box-shadow: 0px 10px 20px 0px rgba(236, 75, 42, 0.2);
    border-radius: 44px;
    font-size: 32px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(136, 77, 43, 1);
    line-height: 45px;
    letter-spacing: 2px;
    text-shadow: 0px 2px 10px rgba(208, 112, 4, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 79px auto 37px;
  }
  p.saomaInvitive-boottomTtitle {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 70px;
    letter-spacing: 2px;
    text-shadow: 0px 2px 10px rgba(208, 112, 4, 0.2);
    text-align: center;
    margin-top: 10px;
  }
}
.imgShare {
  background: linear-gradient(to bottom, #ff8762, #ff6949);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  top: 0;
  z-index: -1;
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
