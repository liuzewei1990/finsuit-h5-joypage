<template>
  <section class="footerBarBox">
    <section class="module-footerBar">
      <!-- <Airbubbles class="airBubbles" v-if="EARN_SHARE_REWARD_TURN==1 && this.$store.state.APP_FLAG != 'PMP'"></Airbubbles> -->
      <a @click="showAlert" class="btn">邀请好友得奖励，多邀多得</a>
    </section>
  </section>
</template>

<script>
import Airbubbles from "./airBubbles"
import { mapState } from "vuex"
export default {
  components: { Airbubbles },
  data () {
    return {
      // 版本开关 1.0.8 版本的拼财不支持该方法 h5Certify()   (v1 < v2) 
      vFlag: this.$utils.isVersion("1.0.8", this.$store.state.VERSION),
      pageLoading: this.$Loading(),
    }
  },
  computed: {
    ...mapState({
      JSON_CONDITIONS: state => state.main.JSON_CONDITIONS,
      EARN_SHARE_REWARD_TURN: state => state.main.newRootObj.EARN_SHARE_REWARD_TURN, // 0关 1开
    })
  },
  mounted () {

  },

  methods: {
    showAlert () {
      //   if (this.pageLoading.isShow) {
      //     return;
      //   }
      //   this.pageLoading.show(false, 0);
      //   this.$createShareImage((baseimg64) => {
      //     this.pageLoading.close()
      //     this.$router.push({
      //       path: '/mpmscanInvite',
      //       query: {
      //         ACTITY_ID: this.$store.state.ACTITY_ID,
      //         baseimg64: baseimg64
      //       }
      //     })
      //   })
      //   return;


      this.$trackEvents.ACB0K006();
      let isPmp = this.$store.state.APP_FLAG;
      // JSON_CONDITIONS 0 不弹，1实名弹框 2开户弹框 3投资弹框
      if (this.JSON_CONDITIONS == 1) { // 去实名
        let dialogComponent = this.$CommonDialog({
          componentName: "EmotionalHint",
          appendElement: document.getElementById("page"),
          title: "友情提示",
          content: "本活动需要先实名认证才能参与哦",
          btn: "去实名",
          btnCallback: () => {
            this.$trackEvents.ACB0K020();
            //   去实名
            this.toAuthPage();
          }
        })
      } else if (this.JSON_CONDITIONS == 2) { // 去开户
        let dialogComponent = this.$CommonDialog({
          componentName: "EmotionalHint",
          appendElement: document.getElementById("page"),
          title: "友情提示",
          content: isPmp == "PMP" ? "本活动需要先投资才能参与哦" : "本活动需要先开户才能参与哦",
          btn: isPmp == "PMP" ? "去投资" : "去开户",
          btnCallback: () => {
            this.$trackEvents.ACB0K020();
            //   去开户
            this.toOpenaccount()
          }
        })
      } else if (this.JSON_CONDITIONS == 3) { // 去投资
        let dialogComponent = this.$CommonDialog({
          componentName: "EmotionalHint",
          appendElement: document.getElementById("page"),
          title: "友情提示",
          content: "本活动需要先投资才能参与哦",
          btn: "去投资",
          btnCallback: () => {
            this.$trackEvents.ACB0K020();
            //   去投资
            this.toInvestment()
          }
        })
      } else if (isPmp == "PMP") {
        if (this.pageLoading.isShow) {
          return;
        }
        this.pageLoading.show(false, 0);
        this.$createShareImage((baseimg64) => {
          //   let url = "";
          //   url = window.location.href.split("#")[0];
          //   url += `#/mpmscanInvite`;
          //   url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
          //   url += `&baseimg64=${baseimg64}`;
          this.pageLoading.close()
          this.$router.push({
            path: '/mpmscanInvite',
            query: {
              ACTITY_ID: this.$store.state.ACTITY_ID,
              baseimg64: baseimg64
            }
          })
          //   this.$bcBridge.openWebview(url)
        })
      } else if (this.JSON_CONDITIONS == 0) {
        this.$emit('shareBtnCallBack')
      }
    },
    // 去认证
    toAuthPage () {
      //   this.$trackEvents.ACB0Q003({ ITEM_VALUE: "去认证", ITEM_VALUE1: this.taskData.taskId });
      // APP实名认证跳原生 接受回调函数
      if ((this.$store.state.APP_FLAG === "PC" && this.vFlag === false) || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.h5Certify({
          success: (v) => { },
          fail: () => { this.$Toast("认证失败,请重试") },
        });
      }
      //  拼财app版本1.0.8版本跳转h5实名认证
      else if (this.$store.state.APP_FLAG === "PC" && this.vFlag === true) {
        // let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        this.$h5RealNameAuth();
      }
      // 小程序实名认证跳H5认证页，认证成功回调地址
      else {
        // let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        this.$h5RealNameAuth();
      }

    },
    toOpenaccount () {
      if (this.$store.state.APP_FLAG == "PMP") {
        this.pmpToNps();
      } else if (this.$store.state.APP_FLAG == "PC" || this.$store.state.APP_FLAG == "BC") {
        this.$bcBridge.openAccount()
      }
    },
    toInvestment () {
      if (this.$store.state.APP_FLAG == "PMP") {
        this.pmpToNps();
      } else if (this.$store.state.APP_FLAG == "PC" || this.$store.state.APP_FLAG == "BC") {
        this.$bcBridge.openWebview(this.$Config.baseUrlHostNps + "/#")
      }
    },
    pmpToNps () {
      let url = "/#";
      url += "?PMP_FLAG=1";
      url += "&PHONE_NUM=" + this.$store.state.PHONE_NUM;
      url += "&TOKEN=" + this.$store.state.TOKEN;
      url += "&SESSION_ID=" + this.$store.state.SESSION_ID;
      url += "&CHANNEL_ID=" + this.$store.state.CHANNEL_ID;
      url += "&SYSTEM_TYPE=" + this.$store.state.SYSTEM_TYPE;
      url += "&MEMBER_ID=" + this.$store.state.ID;
      url += "&MODEL=" + this.$store.state.MODEL;
      url += "&OPEN_API_CHANNEL_ID=" + this.$store.state.OPEN_API_CHANNEL_ID;
      this.$bcBridge.openWebview(this.$Config.baseUrlHostNps + url)
    }
  }
}
</script>

<style lang="less" scoped>
.footerBarBox {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  .module-footerBar {
    padding: 20px;
    background: #fff;
    position: relative;
    .airBubbles {
      position: absolute;
      right: 60px;
      top: -72px;
    }
    .btn {
      display: block;
      width: 622px;
      height: 80px;
      line-height: 80px;
      margin: 0 auto;

      background: linear-gradient(180deg, #fff4a2 0%, #ffc812 100%);
      border-radius: 40px;
      text-align: center;

      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #b14318;
      font-weight: 600;
    }
  }
}
</style>
