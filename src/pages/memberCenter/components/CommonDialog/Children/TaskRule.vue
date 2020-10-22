<template>
  <div class="dialog-component pageShow">
    <div class="close icon-close-1" @click="close"></div>
    <div class="icon">
      <img :src="componentData.icon" alt="">
    </div>
    <p class="title" v-html="componentData.title"></p>
    <div class="content common-rich-max-img" v-html="componentData.content"></div>
  </div>
</template>

<script>
export default {
  props: {
    componentData: {
      type: Object,
      default () { return {} }
    }
  },
  created () {
    console.log("规则弹窗组件创建", this.componentData);
  },
  methods: {
    close () {
      this.$parent.visible = false;
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes pageShow {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.pageShow {
  animation: pageShow 0.3s both;
}
.dialog-component {
  background: #fff;
  width: 560px;
  height: 692px;
  border-radius: 10px;
  padding: 45px 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;

  .close {
    font-size: 36px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #a3a7ad;
    padding: 15px;
  }

  .icon {
    width: 132px;
    height: 132px;
    padding: 20px;
    box-sizing: border-box;
    margin: 0px auto;
    border-radius: 500px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    font-size: 36px;
    color: #1d1e1f;
    margin: 12px 0;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
  }

  .content {
    flex: 1;
    overflow: scroll;
    color: #303133;
    font-size: 28px;
    line-height: 40px;
    text-align: justify;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
