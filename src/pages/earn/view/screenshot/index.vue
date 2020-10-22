<template>
  <div>
    <div v-show="allTitle.EARN_MAIN_TITLE" class="imgShare" id="imgShare" style="width: 375px;height: 667px;position: relative;top: -11111px;">
      <div class="imgShare-tag">
        <div class="imgShare-main">
          <img :src="$Config.aliyuncHost+allTitle.HEAD_ING_URL" alt=""> <span>{{allTitle.EARN_VICE_TITLE_1}}</span>
        </div>
      </div>
      <p class="imgShare-title1">{{allTitle.EARN_MAIN_TITLE}}</p>
      <div class="imgShare-title2">
        <span>{{allTitle.EARN_VICE_TITLE_2}}</span><img src="../../assets/images/titile2yezi@2x.png" alt="">
      </div>
      <div class="imgShare-saoyisao">
        <img src="../../assets/images/imgShare-saoyisao.png" alt="">
        <img :src="qrcodeSrc" class="erweima" alt="">
        <p>微信扫一扫</p>
      </div>
      <p><span>长按二维码领取福利</span></p>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcode";
export default {
  data () {
    return {
      allTitle: {},
      qrcodeSrc: "",
      pmpimgurl: ""
    }
  },
  async mounted () {
    setTimeout(() => {
      this.autoHtml2canvas();
    }, 1200);
  },
  created () {
    this.renderTitle();
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
    autoHtml2canvas () {
      let that = this;
      var canvas = document.createElement("canvas");
      var scale = 1.3;
      canvas.width = 620;
      canvas.height = 1026;
      canvas.getContext("2d").scale(scale, scale);
      var opts = {
        scale: scale,
        canvas: canvas,
        useCORS: true
      };
      html2canvas(document.getElementById("imgShare"), opts).then(function (canvas) {
        var context = canvas.getContext("2d");
        var testImg = canvas.toDataURL("image/jpeg", 1);
        console.log("截图成功", that.$store.state.APP_FLAG);
        window.parent.html2canvasCallBack(testImg);
      });
    },
    async renderTitle () {
      let params = { INVITE_ID: this.$store.state.ID };
      let res = await this.$api.getAllTitle(params);
      console.log("主副标题", res);
      this.allTitle = res;
      // 二维码&链接
      if (!!res.PMP_QR_Code) {
        this.qrcodeSrc = res.PMP_QR_Code;
      } else {
        let shareImgQcodeval = this.createQrcodeUrl();
        this.qrcodeSrc = await QRCode.toDataURL(shareImgQcodeval, { margin: 2 });
      }
    },
  }
}
</script>

<style lang="less" scoped>
#imgShare {
  background: linear-gradient(to bottom, #ff8762, #ff6949);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
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
        letter-spacing: 1px;
      }
      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 4px;
      }
    }
  }
  .imgShare-title1 {
    font-size: 69px;
    color: #fff;
    font-family: Helvetica;
    margin-top: 95px;
    margin-bottom: 60px;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 0px 2px 16px rgba(244, 77, 42, 1);
  }
  .imgShare-title2 {
    position: relative;
    top: 0px;
    margin-bottom: 16px;
    span {
      width: 92%;
      margin: 24px auto 0;
      position: relative;
      z-index: 1;
      background: #fff;
      border-radius: 12px;
      color: #ff835f;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      height: 22px;
      // display: block;
      padding: 16px 0;
    }
    img {
      width: 70px;
      position: absolute;
      right: 5px;
      top: -20px;
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
