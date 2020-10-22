<!-- 下载引导页 -->
<template>
  <section class='download-info'>
    <img :src="imgUrl" alt="">
  </section>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      imgUrl: ""
    }
  },
  created () {
    this.getDowloadAppHelpData();
  },
  //方法集合
  methods: {
    async getDowloadAppHelpData () {
      let data = await this.$api.getDowloadAppHelpData();
      this.imgUrl = this.$transfromAliyunUrl(data.PIC_URL);
    }
  },
}
</script>
<style lang='less' scoped>
.download-info {
  img {
    width: 100%;
  }
}
</style>