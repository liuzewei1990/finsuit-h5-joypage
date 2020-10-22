<template>
  <!-- <DialogCommonBox class="dialog-money">

  </DialogCommonBox> -->
  <div class="dialog-auth-main">
    <p class="dialog-auth-title">{{componentData.title}}</p>
    <p class="dialog-auth-content">{{componentData.content}}</p>
    <a class="dialog-auth-btn" href="javascript:void(0)" @click="toAuth">{{componentData.btn}}</a>
  </div>
</template>


<script>
import DialogCommonBox from "../DialogCommonBox";
export default {
  components: { DialogCommonBox },
  props: {
    componentData: {
      type: Object,
      default () { return {} }
    }
  },
  created () {
    console.log(this.componentData);
  },
  methods: {
    toAuth () {
      this.componentData.btnCallback && this.componentData.btnCallback()
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-auth-main {
  width: 550px;
  height: 500px;
  background: #fff;
  border-radius: 20px;
  padding-top: 60px;
  box-sizing: border-box;
  .dialog-auth-title {
    font-size: 40px;
    font-weight: 700;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .dialog-auth-content {
    font-size: 30px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .dialog-auth-btn {
    width: 300px;
    height: 100px;
    border-radius: 500px;
    background: linear-gradient(180deg, #ffcd50 0%, #ffb81e 100%);
    margin: 0 auto;
    display: block;
    line-height: 100px;
    text-align: center;
    margin-top: 60px;
    color: #91562c;
    font-size: 30px;
    font-weight: 700;
  }
}
</style>
