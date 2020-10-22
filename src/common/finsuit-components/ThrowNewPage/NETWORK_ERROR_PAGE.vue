<template>
  <div class="container" @click="handleClick">
    <div class="content">
      <img src="../../finsuit-assets/images/network.png" alt="">
      <h3>网络异常，点击屏幕重试</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    componentData: {
      type: Object,
      default () { return {} }
    }
  },
  created () {
  },
  methods: {
    handleClick () {
      this.$parent.visible = false;
      this.componentData.onClick && this.componentData.onClick();
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #fff;
  box-shadow: 0px 0px 10px 5px #cfcfcf;

  align-items: center;
  justify-content: center;

  .content {
    margin-top: -20%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 256px;
    }

    h3 {
      font-size: 28px;
      color: #333;
    }
  }
}
</style>
