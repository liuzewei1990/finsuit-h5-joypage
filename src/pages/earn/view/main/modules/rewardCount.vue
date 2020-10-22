<template>
  <ModuleBox class="module-inviteUserCount">
    <div class="container">
      <div class="title">
        <span class="name">获得权益</span>
        <span class="btn" @click="toMyPrize">我的权益<i class="icon"></i></span>
      </div>
      <div class="detail">
        <span>红包<i>{{inviteUserCount.money}}</i>元</span>
        <span>券<i>{{inviteUserCount.compon}}</i>张</span>
        <span>爱奇艺会员<i>{{inviteUserCount.aqiyi}}</i>个</span>
      </div>
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@earn/components/ModuleBox/index.vue"
import { mapState } from "vuex"
export default {
  components: { ModuleBox },
  computed: {
    ...mapState({
      inviteUserCount: state => state.main.inviteUserCount
    })
  },
  mounted () {

  },

  methods: {
    toMyPrize () {
      this.$trackEvents.ACB0K017();
      let url = "";
      url = window.location.href.split("#")[0];
      url += `#/myPrize`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 18px;
  box-sizing: border-box;
  .title {
    display: flex;
    font-size: 26px;
    align-items: center;
    .name {
      flex: 1;
    }
    .btn {
      font-size: 24px;
      color: #b5b5b5;
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      .icon {
        display: block;
        width: 14px;
        height: 14px;
        border-top: 2px solid #b5b5b5;
        border-right: 2px solid #b5b5b5;
        transform-origin: center center;
        transform: rotate(45deg);
      }
    }
  }

  .detail {
    display: flex;
    font-size: 26px;
    justify-content: space-between;
    margin-top: 20px;
    span {
      i {
        font-size: 40px;
        color: #eb4928;
      }
    }
  }
}
</style>
