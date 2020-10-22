<!-- 开启场景转场 -->
<template>
  <section class='scene-transfrom-open' id="out-container" :style="{backgroundImage:`url(${assets.background})`}">
    <section class="container dev" id="container"> </section>
  </section>
</template>

<script>
import assets from "../../../config/assets.config.js"
import scene1 from "../../../utils/mixins.scene-1.js"
import scene2 from "../../../utils/mixins.scene-2.js"
import stageObj from "../../../utils/mixins.stage-obj.js"
import SwiperBanner from "./swiper.vue"
import store from "../../../store/index"
import Vue from "vue"

export default {
  props: ["sceneId"],
  components: {},
  mixins: [stageObj, scene1, scene2],
  data () {
    return {
      stage: null,
      assets: assets,
      TweenLine: JTL.create(),
      TweenLineScale: 1,
      sceneStatus: {
        "1": "未开启-前",
        "2": "未开启-后",
        "3": "开启-前",
        "4": "开启-后",
      }
    };
  },
  mounted () {
    this.controller(this.sceneId);
  },
  //方法集合
  methods: {
    controller (sceneId) {
      let sceneStatus = this.sceneStatus[sceneId];
      switch (sceneStatus) {
        case "未开启-前":
          this.initStageOneBefore();
          break;
        case "未开启-后":
          this.initStageOneAfter();
          break;
        case "开启-前":
          this.initStageTwoBefore();
          break;
        case "开启-后":
          this.initStageTwoAfter();
          break;

        default:
          break;
      }
    },

    // 点击活动投资按钮
    touziBtnClick () {
      this.$trackEvents.ACB0R005();
      this.$checkLogin({ action: this.toActivityHistoryUrl });
    },

    // 点击预约领券按钮
    couponBtnClick () {
      this.$trackEvents.ACB0R006();
      this.$checkLogin({ action: this.toCollectCouponUrl });
    },

    // 点击攻略按钮
    ruleBtnClick () {
      this.$trackEvents.ACB0R003();
      let url = this.$Config.mainvenueh5;
      url += "#/";
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&hideNavigationBar=1`;
      url += `&__with_login__=1`;
      //   url += `&keepLoading=1`;
      this.$bcBridge.openWebview(url);
    },

    // 点击分享按钮
    shareBtnClick () {
      this.$parent.openSharePopup();
      this.$trackEvents.ACB0R002();
    },

    // 福袋点击立即预约
    fudaiBtnClick () {
      this.$trackEvents.ACB0R008();
      this.$checkLogin({ action: this.toCollectCouponUrl });
    },

    // 跳转到预约抢券活动页面
    toCollectCouponUrl () {
      let url = this.$Config.collectCouponHost;
      url += `#/`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&loading=1218`;
      url += `&__with_login__=1`;
      this.$bcBridge.openWebview(url);
    },

    // 跳转到活动投资页面
    toActivityHistoryUrl () {
      let url = this.$Config.activityHistoryHost;
      url += `#/`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&loading=1218`;
      url += `&__with_login__=1`;
      this.$bcBridge.openWebview(url);
    },

    // swiper组件挂载
    $mountSwiper (id) {
      let SwiperFn = Vue.extend(SwiperBanner);
      let swiperCom = new SwiperFn({ store });
      swiperCom.$mount(id);
    },

  },
}
</script>
<style lang='less' scoped>
.absolute(@x,@y,@w,@h) {
  position: absolute;
  left: @x;
  top: @y;
  width: @w;
  height: @h;
}
.scene-transfrom-open {
  position: relative;
  height: 100vh;
  min-height: 1206px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  //   bottom: 0;
  margin: auto;
  width: 750px;
  height: 1206px;
  //   border: 1px solid red;
}
</style>