<template>
  <div class="rule-box">
    <div class="rule-conent" v-html="html">{{html}}</div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      html: "",
    };
  },
  created () {
    this.getRuleMsg();
  },
  methods: {
    // 获取活动规则
    async getRuleMsg () {
      let code = this.$store.state.APP_FLAG == "PC" ? "PC_SFACT" : "SFACT"
      try {
        let params = {
          CODE: code
        };
        let data = await this.$api.getRuleMsg(params);
        console.log("获取活动规则：", data);
        this.html = data.RULE_CONTENT;
      } catch (error) {
        console.log("获取活动规则：", error);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rule-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(245, 245, 249, 1);
  height: max-content;
  min-height: 100%;
  .rule-conent {
    width: 702px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 62px 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 3px solid rgba(220, 235, 255, 1);
  }
}
</style>
