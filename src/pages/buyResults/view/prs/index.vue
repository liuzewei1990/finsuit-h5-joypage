<template>
  <section id="page" class="main ">
    <div class="progress-box">
      <div class="progress-left">
        <p class="icon"><img src="../../assets/images/successful@2x.png" alt=""></p>
        <p class="icon-p1"></p>
        <p class="icon-p2"></p>
        <p class="icon"><img src="../../assets/images/calculator@2x.png" alt=""></p>
        <p class="icon-p2"></p>
        <p class="icon-p2"></p>
        <p class="icon"><img src="../../assets/images/qian@2x.png" alt=""></p>
      </div>
      <div class="progress-right">
        <p class="fontsize1 successText fontcolor">成功购买{{amount}}元</p>
        <p class="fontsize2">今天</p>
        <p></p>
        <p class="fontsize1 successText">{{stepList && stepList.revenueDate}}</p>
        <p class="fontsize2">预计产生收益</p>
        <p></p>
        <template v-if="jsonData.assembleStatus==1 && jsonData.joinStatus==0">
          <p class="fontsize1 successText">还差{{jsonData.residueCount}}人成团，赶快邀请好友参与吧</p>
          <p class="fontsize3">
            <span>距离拼团结束</span>
            <countdown @changeFn="changeFn" :data="jsonData" :type="2"></countdown>
          </p>
        </template>

        <template v-if="jsonData.assembleStatus==2 && jsonData.joinStatus==0">
          <p class="fontsize1 successText">拼团成功</p>
          <p class="fontsize2">拼团权益将在满足持仓时间之后发放至您的会员权益</p>
        </template>

        <template v-if="jsonData.joinStatus==1">
          <p class="fontsize1 successText">参团失败</p>
          <p class="fontsize2">未满足最低购买金额，无法获取拼团收益</p>
        </template>

      </div>
    </div>
    <div class="over">
      <template v-if="this.$bcBridge.APP_FLAG === 'PC' || this.$bcBridge.APP_FLAG === 'BC'">
        <p @click="invite" v-if="jsonData.assembleStatus==1 && jsonData.joinStatus==0">邀请好友拼团</p>
        <p @click="toHoldingAssets" v-if="jsonData.assembleStatus==2 || jsonData.joinStatus==1">查看我的持仓</p>
      </template>
      <p @click="toDownloadApp" v-else>下载APP查看详情</p>
      <p @click="toIndex">完成</p>
    </div>
    <div class="line"></div>
    <sharePopup ref="SharePopup" :isLogin="isLogin" @clickLogin="clickShareLogin" />
  </section>
</template>

<script>
import countdown from './modules/countdown'
// import sharePopup from '../../components/SharePopup' // 老版UI
import sharePopup from '@src/common/finsuit-components/SharePopup/index.3.0'  // 新版UI
import getrandomText from '../../utils/randomText'
export default {
  components: { countdown, sharePopup },
  data () {
    return {
      jsonData: {},
      riqi: {
        ASSEMBLE_END_TIME: "2020/09/17 14:37:55", // 结束时间
        NOW_TIME: "2020/09/10 14:37:55", //此时时间
      },
      amount: this.$route.query.amount, //购买金额
      isLogin: false,
      bankData: this.$route.query.bankData && JSON.parse(this.$route.query.bankData),
      stepList: this.$route.query.stepList && JSON.parse(this.$route.query.stepList),
      buyParams: this.$route.query.buyParams && JSON.parse(this.$route.query.buyParams),
    }
  },
  created () {
    if (/miniProgram/i.test(navigator.userAgent.toLowerCase())) {
      this.$store.state.APP_FLAG = "PMP"
    }
    this.$trackEvents.B000A553();
    this.getData()
    this.$bcBridge.updateTitle("存入结果");
  },
  mounted () {
  },

  methods: {
    clickShareLogin () {

    },
    currentSystem () {

      if (this.$bcBridge.APP_FLAG === "PC" || this.$bcBridge.APP_FLAG === "BC") {
        return true
      } else {
        return false
      }
    },
    async getData () {
      try {
        let params = { routeKey: "actAssemblePerson-selResultPageData", buyParamKey: this.buyParams.BUY_PARAM_KEY }
        let head = {
          TYPE: "CAMPAIGN_SERVICE_HANDLER"
        }
        if (this.$store.state.APP_FLAG == "PMP") {
          head.APP_FLAG = "PMP";
        }
        let data = await this.$api.getInfo(params, head)
        this.jsonData = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    toIndex () {
      //   "/activity/teamItem/index.html#/?ACTITY_ID=1000&FROM_APP_FLAG=APP_FLAG"
      // 小程序 内
      if (this.$store.state.APP_FLAG == "PMP") {
        this.$openWebview("pmp:/pages/index/index");
      } else if (this.$bcBridge.APP_FLAG === "PC" || this.$bcBridge.APP_FLAG === "BC") {
        this.$bcBridge.toAppPage({ "LINK_TO": "APP_TAB", "index": "0" })
      } else {
        // this.$openWebview(this.$Config.baseUrlHost + "/activity/teamItem/index.html#/?ACTITY_ID=1000&FROM_APP_FLAG=" + this.BUY_PARAM_KEY.fromapp);
        this.$openWebview(decodeURIComponent(this.jsonData.shareLink))
      }
    },
    invite () {
      let shareJson = [
        {
          // 分享方式 0:图片   1:链接  2: 小程序
          SHARE_TYPE: "1",
          // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
          SHARE_PLACE: "0",
          // 分享图标（目前APP不支持自定义分享图标）
          SHARE_HEAD_IMG: "",
          // 分享标题
          SHARE_TITLE: getrandomText().maintitle,
          // 分享描述
          SHARE_DESC: getrandomText().subtitle,
          // 分享链接
          SHARE_URL: decodeURIComponent(this.jsonData.shareLink),
          // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
          SHARE_IMAGE: "",
          //分享成功回调
          SUCCESS: () => { },
          // 取消分享回调 App内无效
          CANCEL: () => { }
        },
        {
          // 分享方式 0:图片   1:链接  2: 小程序
          SHARE_TYPE: "1",
          // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
          SHARE_PLACE: "1",
          // 分享图标（目前APP不支持自定义分享图标）
          SHARE_HEAD_IMG: "",
          // 分享标题
          SHARE_TITLE: getrandomText().maintitle,
          // 分享描述
          SHARE_DESC: getrandomText().subtitle,
          // 分享链接
          SHARE_URL: decodeURIComponent(this.jsonData.shareLink),
          // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
          SHARE_IMAGE: "",
          //分享成功回调
          SUCCESS: () => { },
          // 取消分享回调 App内无效
          CANCEL: () => { }
        }
      ]
      this.$refs.SharePopup.open(shareJson, this.shareSuccess);
    },
    shareSuccess () { },
    toDownloadApp () {
      let componentsFlag = this.jsonData.fromapp;
      if (this.$store.state.APP_FLAG == "PMP") {
        componentsFlag = "PC";
      }
      this.$openWebview(this.$Config.baseUrlHost + "/activity/downloadApp/index.html#/?FROM_APP_FLAG=" + componentsFlag);
    },
    toHoldingAssets () {
      let params = {
        "ORG_ID": this.bankData.orgId,
        "BANK_DOCK_TYPE": "2",
        "BANK_TIPS_PAGE": "",
        "ORG_NAME": this.bankData.orgName,
        "BANK_LOGO_URL": this.bankData.orgLogo,
        "SKIP_PAGE_INFO": "",
        "DETAIL_URL": ""
      };
      this.$bcBridge.gotoOpenAPIBankDetail(params)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #ffffff;
  box-sizing: border-box;
  font-family: "PingFangSC-Regular, PingFang SC";
  .progress-box {
    display: flex;
    padding: 54px 32px;
    p {
      height: 50px;
    }
    .progress-left {
      margin-left: 24px;
      .icon {
        img {
          width: 48px;
          height: 48px;
          margin-left: -22px;
        }
      }
      .icon-p1 {
        border-left: 4px solid #508cee;
      }
      .icon-p2 {
        border-left: 4px solid #cccccc;
      }
    }
    .progress-right {
      margin-left: 10px;
      .successText {
        font-weight: 600;
      }
      .fontsize1 {
        font-size: 32px;
        color: #303133;
      }
      .fontcolor {
        color: #508cee;
      }
      .fontsize2 {
        font-size: 28px;
        color: #a3a7ad;
      }
      .fontsize3 {
        & > span {
          color: #303133;
          font-size: 20px;
        }
      }
    }
  }
  .over {
    padding: 54px 32px;
    p {
      height: 98px;
      background: #508cee;
      border-radius: 4px;
      color: #fff;
      font-size: 36px;
      text-align: center;
      line-height: 98px;
      margin: 24px 0;
    }
    p:last-of-type {
      color: #508cee;
      border: 2px solid #508cee;
      background-color: #fff;
    }
  }
  .line {
    height: 24px;
    background: #f5f7fa;
  }
}
</style>
