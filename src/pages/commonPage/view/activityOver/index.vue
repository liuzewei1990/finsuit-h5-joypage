<!-- 下载引导页 -->
<template>
  <section class='over'>
    <div class="overContent">
      <img src="../../assets/images/kong.png" alt="">
      <p>活动已结束</p>
    </div>
  </section>
</template>

<script>
// customBar=1 原生导航白色
export default {
  components: {},
  data () {
    return {

    }
  },
  created () {

  },
  //方法集合
  methods: {

  },
}
</script>
<style lang='less' scoped>
.over {
  background: rgba(255, 255, 255, 1);
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 262px;
  box-sizing: border-box;
  .overContent {
    text-align: center;
    img {
      width: 454px;
      height: 360px;
      transform: translateX(-20px);
    }
    p {
      color: rgba(163, 167, 173, 1);
      font-size: 26px;
      margin-top: 32px;
    }
  }
}
</style>