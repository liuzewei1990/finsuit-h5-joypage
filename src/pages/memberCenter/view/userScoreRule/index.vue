<!-- 会员积分规则 -->
<template>
  <section class='user-score-rule-page'>
    <div class="content common-rich-max-img" v-html="ruleHtml"></div>
  </section>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      ruleHtml: ""
    };
  },
  activated () {
    this.getRule();
  },
  //方法集合
  methods: {
    async getRule () {
      let params = { CODE: "INTEGRAL_SIGN_ACTIVITY" };
      let data = await this.$api.getRule(params);
      this.ruleHtml = data.RULE_CONTENT;
      if (!this.ruleHtml) {
        this.$showTips("暂无内容")
      }
    }
  },
}
</script>
<style lang='less' scoped>
.user-score-rule-page {
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  &::after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.5px;
    background: #f2f2f2;
  }
}
</style>