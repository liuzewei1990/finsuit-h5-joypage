<!--  -->
<template>
  <section class='com-header-pic'>
    <img :src='require("../../../assets/images/header.png")' alt="">
    <span class="rule-btn" @click="toTeamPrdUrl">活动规则</span>
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
    // 点击拼金额活动规则跳转页面
    toTeamPrdUrl () {
      let url = this.$Config.teamItemUrl;
      url += `#/rule`;
      url += `?ACTITY_ID=111`;
      this.$bcBridge.openWebview(url);
    },
  },
}
</script>
<style lang='less' scoped>
.com-header-pic {
  height: 430px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .rule-btn {
    position: absolute;
    right: 0;
    top: 30px;
    width: 150px;
    line-height: 50px;
    background: hsla(0, 0%, 100%, 0.25);
    border-top-left-radius: 500px;
    border-bottom-left-radius: 500px;
    text-align: center;
    color: #fff;
    font-size: 26px;
  }
}
</style>