<template>
  <div class="dialog-component">
    <!-- <div class="close" @click="close"></div> -->
    <div class="icon">
      <img :src="componentData.icon" alt />
    </div>
    <h5 class="title" v-html="componentData.title"></h5>
    <div class="content common-rich-max-img" v-html="componentData.content"></div>
    <div class="btnCon">
      <button
        @click="componentData.btnCallback(index)"
        v-for="(item, index) in componentData.btnList"
        :key="index"
      >{{item}}</button>
    </div>
  </div>
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
  created() {
    console.log("红包组件", this.componentData);
  },
  methods: {
    close() {
      this.$parent.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-component {
  background: #fff;
  width: 560px;
  // height: 670px;
  border-radius: 10px;
  padding: 34px 0px 0 0px;
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
    width: 292px;
    margin: 0px auto;
    overflow: hidden;
    img {
      width: 100%;
      min-height: 282px;
    }
  }

  .title {
    font-size: 36px;
    color: #434343;
    margin: 15px 0;
    text-align: center;
    font-weight: 600;
    color: rgba(67, 67, 67, 1);
    line-height: 50px;
  }
  .content {
    flex: 1;
    overflow: scroll;
    color: #525252;
    font-size: 30px;
    line-height: 42px;
    text-align: center;
  }
  .btnCon {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    border-top: 2px solid #f6f6f6;
    button {
      flex: 1;
      height: 108px;
      background: #fff;
      font-size: 34px;
      font-weight: 500;
      &:first-child {
        border-right: 2px solid #f6f6f6;
        color: #5e5e5e;
      }
      &:last-child {
        color: #ff821b;
      }
    }
  }
}
</style>
