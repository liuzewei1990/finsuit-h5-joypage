<template>
  <div class="mask">
    <div class="text">
      <div><img src="../../assets/images/weixin.png" alt=""></div>
      <p>点击右上角<br>选择在浏览器中打开该页面</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.mask {
  .text {
    color: #fff;
    font-size: 40px;
    & > div {
      display: flex;
      justify-content: flex-end;
      padding: 20px 40px;
      img {
        height: 206px;
        width: 180px;
      }
    }
    & > p {
      text-align: center;
      margin-top: -40px;
    }
  }
}
</style>
