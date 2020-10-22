<template>
  <div class="dialog-component">
    <div class="close" @click="close"></div>
    <div class="icon">
      <img :src="componentData.icon" alt="">
    </div>
    <h5 class="title" v-html="componentData.title"></h5>
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
.dialog-component {
  background: #fff;
  width: 560px;
  height: 670px;
  border-radius: 10px;
  padding: 45px 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;

  .close {
    width: 52px;
    height: 52px;
    background: url(./cc-close-crude.png) no-repeat;
    background-size: 100%;
    background-position: center center;
    position: absolute;
    right: 10px;
    top: 10px;
    // padding: 15px;
  }

  .icon {
    width: 120px;
    height: 120px;
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
    margin: 15px 0;
    text-align: center;
  }

  .content {
    flex: 1;
    overflow: scroll;
    color: #999990;
    font-size: 26px;
    line-height: 40px;
    text-align: justify;
  }
}
</style>
