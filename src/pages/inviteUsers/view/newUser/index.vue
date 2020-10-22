<template>
  <!-- <section id="page" class="new-user" :style="{backgroundImage:`url(${pic})`}"> -->
  <section id="page" class="new-user">
    <div>
      <!-- <img :src="pic" alt=""> -->
      <img src="../../assets/images/newuser2x.png" alt="">
    </div>
    <a href="javascript:void(0);" class="btn" @click="downloadApp">下载APP参与</a>
  </section>
</template>

<script>
export default {
  data () {
    return {
      pic: ""
    }
  },
  created () {
    this.getBackground()
  },
  methods: {
    downloadApp () {
      this.$trackEvents.ACB0K008({ ITEM_VALUE: this.$route.query["phoneNum"] });
      let flag = this.$store.state.APP_FLAG == "PC" ? "PC" : "BC";
      this.$downloadApp({ FROM_APP_FLAG: flag });
    },
    async getBackground () {
      let params = {
        routeKey: "earnAppService-getOusidePagePicInfo",
        userStatus: "1"
      }
      try {
        let data = await this.$api.getUSER_BACKGROUND(params);
        this.pic = this.$Config.aliyuncHost + data.data.PIC_URL;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.new-user {
  //   background: #fe804d url("../../assets/images/newuser2x.png") no-repeat;
  //   background-repeat: no-repeat;
  //   background-size: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  .btn {
    width: 90%;
    height: 98px;

    background: linear-gradient(180deg, #fff4a2 0%, #ffc812 100%);
    color: #b14318;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
    border-radius: 500px;
    // margin: 1160px auto 100px;
    position: fixed;
    bottom: 90px;
    left: 5%;
  }
}
</style>
