<template>
  <section id="page" class="new-user">
    <a href="javascript:void(0);" class="btn" @click="downloadApp">打开APP参与</a>
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
.new-user {
  background: #fe804d url("../../assets/images/newuser2x.png") no-repeat;
  background-size: 100%;
  min-height: 100vh;
  overflow: hidden;

  .btn {
    width: 80%;
    height: 70px;
    background: linear-gradient(to right, #ff7345, #f12c21);
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
