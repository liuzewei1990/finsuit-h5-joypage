<!-- 底部固定按钮 -->
<template>
  <section class='com-fixed-btn'>
    <a class="btn" href="javascript:void(0);" @click="$checkLogin({action:toActivityHistory})">我的拼团记录</a>
  </section>
</template>

<script>

export default {
  components: {},
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    toActivityHistory () {
      // 打点
      this.$trackEvents.ACB0G011();

      let url = this.$Config.activityHistoryUrl;
      url += `#/`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&position=team`;
      this.$bcBridge.openWebview(url);
    }
  },
}
</script>
<style lang='less' scoped>
.com-fixed-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #fff;
  font-size: 36px;
  box-shadow: 1px 1px 0.2rem #e5e8f0;
  border-top: 1.5px solid #e5e8f0;
  color: #3b6adc;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  box-sizing: content-box;

  .btn {
    padding: 15px;
  }
}
</style>