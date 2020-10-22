<!--  -->
<template>
  <section class='task-rule'>
    <div class="content common-rich-max-img" v-html="ruleHtml"></div>
  </section>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      ruleHtml: "",
    };
  },
  activated () {
    this.getRule();
  },
  mounted () {

  },
  //方法集合
  methods: {
    async getRule () {
      let params = { CODE: this.$Config.actityCode };
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
.task-rule {
  min-height: 100vh;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
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