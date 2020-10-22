<!-- 下载落地页 -->
<template>
  <section class='page'>
    <component :is="$store.state.FROM_APP_FLAG" ref="childrenComponent" :backgroundImg="backgroundImg"></component>
  </section>
</template>

<script>
import BC from './view/downloadBC'
import PC from './view/downloadPC'
export default {
  components: {},
  data () {
    return {
      getQuery: {},
      backgroundImg: ""
    };
  },
  components: { BC, PC },
  created () {
    this.getQuery = this.$utils.getQueryStr();
    this.getBackgroundImg()
  },
  mounted () {
    if (this.getQuery["isAutoDownload"] == 1) {
      this.$refs.childrenComponent.downloadApp();
    }
  },
  //方法集合
  methods: {
    async getBackgroundImg () {
      try {
        let params = {
          "SHARE_TYPE": "2",
          "LIST_TYPE": "1"
        }
        let data = await this.$api.getImg(params, { "APP_FLAG": this.$store.state.FROM_APP_FLAG });
        console.log("页面图片地址数据：", data);
        this.backgroundImg = data.SHARING[0] && data.SHARING[0].H5_IOS_ANDRIOD_URL;
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>
<style lang='less' scoped>
.page {
  max-width: 10rem;
  margin: 0 auto;
}
</style>