<template>
  <div class="activeDetail">
    <div class="activeDetail-titleImg"><img src="../../assets/images/dhruledetail.png" alt=""></div>
    <div class="activeDetail-main" v-for="(n,index) in getlistData" :key="index">
      <span><span class="activeDetail-num">{{index + 1}}</span></span>
      <span class="activeDetail-text" v-html="n"></span>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
import { Base64 } from 'js-base64';
export default {
  data () {
    return {
      getlistData: [],
      loading: this.$Loading(""),
    }
  },
  mounted () {
    // 规则页打开埋点
    this.$trackEvents.ACB0R014();
  },
  created () {
    this.getData();
  },
  computed: {

  },
  methods: {
    // 活动规则
    async getData () {
      this.loading.show();
      try {
        let params = { APP_PLACE: 2, ACTITY_CODE: this.$Config.actityCode };
        let data = await this.$api.getAvctiveRule(params);
        this.getlistData = data;
      } catch (error) {
        console.log(error)
      }
      this.loading.close();
    },
  }
}
</script>
<style lang="less" scoped>
.activeDetail {
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  min-height: 277px;
  height: 277px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  background: #fff;
  left: 0;
  height: 100%;
  .activeDetail-titleImg {
    height: 220px;
    img {
      width: 100%;
    }
  }
  .activeDetail-main {
    display: flex;
    padding: 0px 24px;
    box-sizing: border-box;
    &:not(:last-of-type) {
      margin-bottom: 44px;
    }
    .activeDetail-num {
      display: inline-block;
      // padding: 5px;
      background: rgba(255, 154, 118, 1);
      border-radius: 50%;
      text-align: center;
      width: 36px;
      height: 36px;
      font-size: 24px;
      line-height: 36px;
      color: #ffffff;
    }
    .activeDetail-text {
      margin-left: 10px;
      font-size: 28px;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: #333333;
      line-height: 40px;
    }
  }
}
</style>
