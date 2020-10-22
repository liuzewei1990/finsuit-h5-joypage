<!-- 规则模块 -->
<template>
  <section class="module-rule">
    <div class="title"></div>
    <p class="content">
      3月17日~3月31日，新用户成功投资100元，可获赠5个口罩，快递到家，先到先得
    </p>
    <a class="btn" @click="toRule" href="javascript:void(0);">查看活动规则详情></a>
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

  methods: {
    toRule () {
      // 打点
      this.$trackEvents.ACB0Y002();
      this.$router.push({ path: "/rule" });
    }
  }
};
</script>
<style lang='less' scoped>
.module-rule {
  width: 673px;
  min-height: 412px;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  margin: 0 auto;
  box-shadow: 15px 15px 0px #ffc600;
  position: relative;
  left: -7.5px;
  padding: 20px;
  box-sizing: border-box;

  .title {
    width: 480px;
    height: 94px;
    margin: 0 auto;
    background: url(../../../assets/images/10.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 50px;
  }

  .content {
    text-align: justify;
    padding: 20px 40px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    line-height: 43px;
  }

  .btn {
    padding: 20px 40px;
    font-size: 29px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(73, 109, 242, 1);
    line-height: 38px;
  }
}
</style>