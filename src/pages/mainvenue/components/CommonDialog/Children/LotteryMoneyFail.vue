<template>
  <DialogCommonBox class="dialog-money">
    <div slot="card" class="dialog-money-card">
      <div class="top-border">
        <p class="title" v-html="componentData.title"></p>
        <p class="value">{{componentData.value}}</p>
      </div>
    </div>
    <div class="dialog-money-content">
      <a href="javascript:void(0);" class="btn" @click="componentData.btnCallBack">{{componentData.btn}}</a>
    </div>
  </DialogCommonBox>
</template>

<script>
import mcopy from 'modern-copy'
import DialogCommonBox from "../DialogCommonBox";
export default {
  components: { DialogCommonBox },
  props: {
    componentData: {
      type: Object,
      default () { return {} }
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-money-card {
  background: #fff;
  flex: 1;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;

  .top-border {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 2px solid #d12b19;
    border-bottom: 0;
    position: relative;
    // font-family: "has_buy";
    // &::after {
    //   content: "";
    //   display: block;
    //   width: 100%;
    //   height: 2px;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   //   background: red;
    //   box-shadow: 0px -85px 61px 1px red;
    // }
  }

  .title {
    font-size: 24px;
    color: #666666;
    margin-top: 35px;
    // letter-spacing: 1px;
  }

  .value {
    font-size: 54px;
    color: #666666;
    margin-top: 15px;
    // font-family: "has_buy";
    // letter-spacing: 1px;
    span {
      font-size: 35px;
    }
  }
}
.dialog-money-content {
  color: #fff;
  //   letter-spacing: 4px;
  margin: 0 auto;
  text-align: center;

  .btn {
    padding: 15px 80px;
    background: linear-gradient(to bottom, #fad14f, #eeb840 70%);
    border-radius: 500px;
    color: #744144;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 220px;
  }
}
</style>
