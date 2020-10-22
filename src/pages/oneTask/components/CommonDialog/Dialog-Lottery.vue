<template>
  <div class="dialog-component bounceIn">
    <h5 class="title" v-html="componentData.title"></h5>
    <p class="desc">{{componentData.desc}}</p>
    <div class="content">
      <img :src="componentData.content" alt="">
    </div>
    <a href="javascript:void(0);" class="btn" @click="componentData.btnCallback">{{componentData.btnText}}</a>
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
    console.log("获奖弹窗组件创建", this.componentData);

  }
}
</script>

<style lang="less" scoped>
.dialog-component {
  background: #fff;
  width: 560px;
  min-height: 650px;
  border-radius: 10px;
  text-align: center;
  padding: 68px 20px 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 36px;
    color: #1d1e1f;
  }

  .desc {
    font-size: 28px;
    color: #868686;
    margin: 16px 0;
  }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    img {
      width: 488px;
      margin: 0 auto;
    }
  }

  .btn {
    width: 396px;
    height: 66px;
    border-radius: 500px;
    margin: 0 auto;
    font-size: 32px;
    color: #fff;
    background-image: linear-gradient(to bottom, #ffb738, #ff801a);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
