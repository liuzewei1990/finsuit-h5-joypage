<!-- 签到成功弹窗 -->
<template>
  <section class='sign-success bounceIn'>
    <div class="content">
      <p class="title">{{componentData.title}}</p>
      <span class="desc">{{componentData.content}}</span>
      <img class="img" :src="require('../../../assets/images/sign-success.png')" alt="">
    </div>
    <a href="javascript:void(0);" class="btn" @click="componentData.btnClick">{{componentData.btnText}}</a>
  </section>
</template>

<script>

export default {
  props: {
    componentData: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {},
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {

  },
}
</script>
<style lang='less' scoped>
.sign-success {
  width: 540px;
  min-height: 520px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    text-align: center;
  }

  .title {
    font-size: 32px;
    font-weight: 500;
    margin-top: 48px;
  }

  .desc {
    font-size: 28px;
    font-weight: 400;
    color: rgba(231, 93, 34, 1);
    margin-top: 8px;
  }

  .img {
    width: 282px;
    margin: 28px auto;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 98px;
    font-size: 36px;
    font-weight: 400;
    color: rgba(80, 140, 238, 1);
    border-top: 1.5px solid rgba(220, 222, 224, 1);
  }
}
</style>