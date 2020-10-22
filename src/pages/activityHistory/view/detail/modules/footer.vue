<!-- 模版底部 -->
<template>
  <section class='template-footer'>

    <div class="pmp-tip" v-show="$store.state.APP_FLAG === 'PMP'">
      <span>办理支取等操作，可以下载拼财App</span>
      <a class="btn" href="javascript:void(0);" @click="toUrl">下载App</a>
    </div>
    <div class="detail-tip" v-show="orderData.tips">小贴士：{{orderData.tips}}</div>
  </section>
</template>

<script>

export default {
  props: {
    orderData: {
      type: Object,
      default () { return {} }
    }
  },
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
    toUrl () {
      this.$Toast("跳转到公共页")
    }
  },
}
</script>
<style lang='less' scoped>
.template-footer {
  margin-top: 20px;
  overflow: hidden;
}
.pmp-tip {
  margin-top: 30px;
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 24px;
  .btn {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    border: 2px solid #4f82ff;
    color: #4f82ff;
    margin-left: 10px;
  }
}
.detail-tip {
  font-size: 24px;
  color: #999;
  text-align: center;
  padding: 30px;
  line-height: 30px;
}
</style>