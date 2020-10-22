<template>
  <div>
    <div v-show="allTitle.EARN_MAIN_TITLE" class="imgShare" id="imgShare" style="width: 375px;height: 667px;position: relative;top: -11111px;">
      <p class="imgShare-title1"><img src="../../assets/images/newtext.png" alt=""></p>
      <div class="fromuserinvite"><img :src="$Config.aliyuncHost+allTitle.HEAD_ING_URL" alt="" v-if="allTitle.HEAD_ING_URL">&nbsp;{{allTitle.EARN_VICE_TITLE_1}}</div>
      <div class="imgShare-saoyisao">
        <div class="er-box">
          <div class="erweima">
            <img :src="qrcodeSrc" alt="" class="m1">
          </div>
          <img src="../../assets/images/rightyezi.png" alt="" class="m2">
          <img src="../../assets/images/leftyezi@2x.png" alt="" class="m3">
        </div>
        <p>微信扫一扫</p>
      </div>
      <p class="btn">长按二维码领取福利</p>
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
  background: #ffe7be;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 auto;
  overflow-y: scroll;
  box-sizing: border-box;

  .imgShare-title1 {
    margin-top: 165px;
    text-align: center;
    img {
      width: 85%;
      display: inline-block;
    }
  }
  .fromuserinvite {
    letter-spacing: 4px;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 700;
    color: #303133;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .imgShare-saoyisao {
    margin: 72px auto 20px;
    width: 670px;
    img {
      width: 100%;
    }
    .er-box {
      position: relative;
      z-index: 1;
      .erweima {
        width: 444px;
        height: 444px;
        background-color: #fff;
        border-radius: 16px;
        overflow: hidden;
        margin: 0 auto 30px;
        .m1 {
          width: 350px;
          height: 350px;
          margin: 47px auto 0;
        }
      }
      .m2 {
        position: absolute;
        z-index: -1;
        width: 220px;
        height: 214px;
        margin-top: -466px;
        margin-left: 430px;
      }
      .m3 {
        position: absolute;
        z-index: -1;
        width: 106px;
        height: 124px;
        margin-top: -206px;
        margin-left: 50px;
      }
    }

    p {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #303133;
      line-height: 45px;
      letter-spacing: 2px;
      text-shadow: 0px 2px 10px rgba(208, 112, 4, 0.2);
      width: 100%;
      text-align: center;
    }
  }
  p.btn {
    width: 600px;
    height: 88px;
    background: linear-gradient(180deg, #ffe169 0%, #ffb211 100%);
    border-radius: 44px;
    line-height: 88px;
    text-align: center;
    color: #884d2b;
    font-size: 32px;
    font-weight: 600;
    margin: 138px auto;
  }
}
</style>
