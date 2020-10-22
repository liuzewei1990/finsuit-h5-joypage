<!-- 弹窗提示 -->
<template>
  <section class="tip" :class="{'animation':componentData.animation}">
    <p class="title">{{componentData.title}}</p>
    <p class="desc">{{componentData.desc}}</p>
    <a
      class="btn"
      href="javascript:void(0);"
      @click="componentData.btnClick"
    >{{componentData.btnText}}</a>
    <a
      class="close icon-close-1"
      href="javascript:void(0);"
      v-show="componentData.closeVisible"
      @click="$parent.visible = false"
    ></a>
  </section>
</template>

<script>
export default {
  props: {
    componentData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  //方法集合
  methods: {
   
  }
};
</script>
<style lang='less' scoped>
.animation {
  animation: show 0.2s ease-out;
}
@keyframes show {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.tip {
  position: relative;
  background: #fff;
  width: 603px;
  padding: 58px 45px;
  box-sizing: border-box;
  border-radius: 10px;
  min-height: 355px;
  text-align: center;

  .title {
    font-size: 40px;
    text-align: center;
    font-family: Source Han Sans SC;
  }
  .desc {
    font-size: 29px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    line-height: 43px;
    padding: 35px 0;
    text-align: left;
    display: inline-block;
  }
  .btn {
    display: block;
    margin: 0 auto;
    width: 493px;
    height: 86px;
    background: rgba(73, 109, 242, 1);
    box-shadow: 0px 4px 13px 0px rgba(73, 109, 242, 1);
    border-radius: 500px;

    font-size: 33px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 86px;
    text-align: center;
  }
  .close {
    position: absolute;
    right: 28px;
    top: 28px;
    font-size: 50px;
    color: #888888;
  }
}
</style>