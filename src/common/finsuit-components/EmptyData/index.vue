<template>
  <div class="common-emptydata">
    <img :src="imgUrl" alt="" :style="imgStyle">
    <p v-html="text"></p>
    <span v-html="descText"></span>
  </div>
</template>

<script>
const imgUrl = require("../../finsuit-assets/images/emptydata.png");

export default {
  props: {
    text: {
      type: String,
      default: "暂无数据"
    },
    descText: {
      type: String,
      default: ""
    },
    imgUrl: {
      type: String,
      default: imgUrl
    },
    imgStyle: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
.common-emptydata {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;
  overflow: hidden;

  img {
    margin: 100px auto 80px;
  }

  p {
    font-size: 30px;
    font-size: #999999;
    color: #333;
  }

  span {
    display: block;
    margin: 20px 0;
    font-size: 24px;
    color: #999;
  }
}
</style>