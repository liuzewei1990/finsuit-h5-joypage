<template>
  <section id="page" class="uid-help">
    <div class="title">
      <h5>如何获取用户UID</h5>
    </div>
    <div class="content">
      <img :src="img" alt="">
    </div>
  </section>
</template>

<script>
export default {

  data () {
    return {
      img: ""
    }
  },

  created () {
    this.img = this.$transfromAliyunUrl(this.$route.query["uuidPic"]);
  }
}
</script>

<style lang="less" scoped>
.uid-help {
  background: #fff;
  .title {
    font-size: 38px;
    text-align: center;

    h5 {
      position: relative;
      display: inline-block;
      line-height: 120px;
      &::after,
      &::before {
        content: "";
        display: block;
        border-bottom: 5px solid #ececec;
        width: 60px;
        position: absolute;
        top: 49.5%;
      }
      &::after {
        left: 110%;
      }

      &::before {
        right: 110%;
      }
    }
  }

  .content {
    padding: 0 20px;
    box-sizing: border-box;

    img {
      width: 100%;
    }
  }
}
</style>
