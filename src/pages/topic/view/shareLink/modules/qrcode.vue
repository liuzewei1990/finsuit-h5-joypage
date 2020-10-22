<template>
  <div class="share-qrcode">
    <div class="txt">
      <h5>我正在{{$store.state.APP_FLAG=="BC"?"比财":"拼财"}}参加每日一题活动</h5>
      <p>答对有奖<i class="icon"></i></p>
      <span>你也赶快来参加吧～</span>
    </div>
    <div id="qrcode" class="qrcode" ref="qrcode">
      <img :src="qrcodeSrc" alt="">
    </div>
  </div>
</template>

<script>
const PMPCodeLink = require("../../../assets/images/pmp-topic-code.jpg");
export default {
  data () {
    return {
      qrcodeSrc: PMPCodeLink,
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.share-qrcode {
  padding: 30px 50px 50px;
  box-sizing: border-box;
  background: #3990ff;
  display: flex;
  color: #fff;

  .txt {
    flex: 1;
    h5 {
      font-size: 30px;
      margin-bottom: 30px;
    }
    p {
      display: block;
      font-size: 26px;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        width: 28px;
        height: 32px;
        background: url("../../../assets/images/box.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 5px;
      }
    }
    span {
      font-size: 26px;
    }
  }

  .qrcode {
    padding: 5px;
    background: #fff;
    border-radius: 6px;
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
