<template>
  <div class="page">
    <img :src="imgUrl" alt="">
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: ""
    }
  },
  created () {
    this.imgUrl = this.$route.query.baseimg64;
  },
}
</script>
<style lang="less" scoped>
.page {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  background: linear-gradient(to bottom, #ff8762, #ff6949);
  img {
    width: 100%;
  }
}
</style>