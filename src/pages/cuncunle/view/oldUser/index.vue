<template>
  <section id="page" class="old-user">
    <a href="javascript:void(0);" class="btn" @click="downloadApp">打开APP领取</a>
  </section>
</template>

<script>
export default {
  methods: {
    downloadApp () {
      this.$trackEvents.ACB0K008({ ITEM_VALUE: this.$route.query["phoneNum"] });
      this.$downloadApp({ FROM_APP_FLAG: 'PC' });
    }
  }
}
</script>

<style lang="less" scoped>
.old-user {
  background: #fe704b url("../../assets/images/olduser2x.png") no-repeat;
  background-size: 100%;
  min-height: 100vh;
  overflow: hidden;

  .btn {
    width: 80%;
    height: 70px;
    background: linear-gradient(to right, #fdb53b, #fdac31);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    border-radius: 500px;
    margin: 1160px auto 100px;
  }
}
</style>
