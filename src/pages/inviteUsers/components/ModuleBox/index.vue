<template>
  <section class="module-box">
    <div class="module-box-inner">
      <div class="module-box-title" :class="`module-box-title-${type}`" v-show="showTitle">{{title}}</div>
      <slot></slot>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    showTitle: Boolean,
    title: String,
    type: {
      type: String,
      default: "green"
    }
  }
}
</script>

<style lang="less" scoped>
.module-box {
  position: relative;
  border-radius: 20px;
  //   background: #fff;
  //   padding: 15px;
  box-sizing: border-box;

  .module-box-inner {
    // border: 1.5px solid #ffe9b1;
    // border-radius: 20px;
  }
  .module-box-title {
    width: 341px;
    height: 65px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: -25px auto 0;
    font-size: 30px;
    color: #fff;
    line-height: 60px;
    text-align: center;
  }
  .module-box-title-green {
    background-image: url("../../assets/images/title-bj@2x.png");
  }
  .module-box-title-orange {
    background-image: url("../../assets/images/title-bj@2x.png");
  }
  .module-box-title-red {
    background-image: url("../../assets/images/title-bj@2x.png");
  }
  .module-box-title-blue {
    background-image: url("../../assets/images/title-bj@2x.png");
  }
}
</style>
