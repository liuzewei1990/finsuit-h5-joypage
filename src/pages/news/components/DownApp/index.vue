<template>
  <div class="down-app">
    <div class="container">
      <img src="../../../../common/finsuit-assets/images/bicai.png" class="logo" alt="">
      <div class="title">
        <p>{{title}}</p>
        <span>{{subTitle}}</span>
      </div>
      <button class="btn" @click="downloadApp">立即下载</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "subTitle"],
  methods: {
    downloadApp () {
      this.$downloadApp({}, false);
      this.$emit('on-click');
    }
  }
}
</script>

<style lang="less" scoped>
.down-app {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  color: #fff;
  background: #000;
  .container {
    height: 120px;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .logo {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 20px;
    }
    .title {
      flex: 1;
      p {
        font-size: 30px;
      }
      span {
        font-size: 24px;
        margin-top: 10px;
      }
    }
    .btn {
      background: #4690ff;
      font-size: 32px;
      color: #fff;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }
}
</style>
