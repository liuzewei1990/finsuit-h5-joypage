<template>
  <!-- <section class="module-banner" :style="{backgroundImage:`url(${this.$Config.aliyuncHost + HEAD_PIC_URL})`}"> -->
  <section class="module-banner">
    <p class="p1">每邀请1位好友最高奖励</p>
    <p class="p2">
      <span>{{mainData.inviteReward}}<em v-if="mainData.inviteRewardType==1">元</em><em v-if="mainData.inviteRewardType==2">积分</em>
      </span>
    </p>
    <p class="p3">好友投资后即可获得奖励，多邀多得</p>
    <p class="p4" @click="toDetail">查看邀请及奖励明细 ></p>
  </section>
</template>

<script>
import { mapState } from "vuex"
export default {
  components: {},
  computed: {
    ...mapState({
      mainData: state => state.main.mainData
    })
  },
  mounted () {
  },

  methods: {
    toDetail () {
      //   if (!this.$store.getters.isLogin) {
      //     this.$bcBridge.goLogin();
      //     return
      //   }
      let url = "";
      url = window.location.href.split("#")[0];
      url += `#/myPrize`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
      //   this.$router.push({
      //     path: "/myPrize"
      //   })
    },
  }
}
</script>

<style lang="less" scoped>
.module-banner {
  height: 458px;
  background-image: url("../../../assets/images/banner.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 120px 10px 0;
  p {
    position: absolute;
  }
  .p1 {
    font-size: 28px;
    color: #303133;
    position: absolute;
    margin-top: 100px;
    width: calc(100% - 20px);
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .p2 {
    font-size: 88px;
    color: #ff6129;
    position: absolute;
    margin-top: 160px;
    width: calc(100% - 20px);
    text-align: center;
    font-weight: bold;
    font-family: Helvetica;
    em {
      font-size: 48px;
    }
  }
  .p3 {
    font-size: 20px;
    color: #a3a7ad;
    position: absolute;
    margin-top: 286px;
    width: calc(100% - 20px);
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .p4 {
    font-size: 24px;
    color: #ffffff;
    position: absolute;
    margin-top: 380px;
    width: calc(100% - 20px);
    text-align: center;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
</style>
