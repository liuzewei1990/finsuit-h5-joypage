<!-- 首页底部按钮 -->
<template>
  <section class='module-footer' @click="$checkLogin({action:toCard})" v-show="$store.state.APP_FLAG==='PC' || $store.state.APP_FLAG==='BC'">
    查看我的卡券 <i class="icon"></i>
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
    toCard () {
      // 按钮点击埋点
      this.$trackEvents.ACB0R017();

      let helpCenterCode = {
        "BC": "BC_MY_WALLET_COUPON",
        "PC": "PC_MY_WALLET_COUPON"
      }
      let tabsPos = {
        "BC": "nouse",//比财有领券中心,指定到未使用tab中
        "PC": ""// 拼财没有领券中心，默认就行
      }
      let url = this.$Config.cardBaseUrl;
      url += `#/coupons_index`;
      url += `?helpCenterCode=${helpCenterCode[this.$store.state.APP_FLAG]}`;
      url += `&nouse=${tabsPos[this.$store.state.APP_FLAG]}`;
      url += `&hideRightShare=`;
      this.$bcBridge.openWebview(url);
    }
  },
}
</script>
<style lang='less' scoped>
.module-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 98px;
  background: #e45b24;
  color: #fff;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  box-sizing: content-box;
  z-index: 3;
  .icon {
    display: block;
    width: 15px;
    height: 15px;
    border-top: 3px solid #ddd;
    border-right: 3px solid #ddd;
    transform: rotate(45deg);
  }
}
</style>