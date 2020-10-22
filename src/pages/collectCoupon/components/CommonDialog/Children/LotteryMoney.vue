<template>
  <DialogCommonBox class="dialog-money">
    <div slot="card" class="dialog-money-card">
      <div class="top-border" v-html="componentData.value"></div>
    </div>
    <div class="dialog-money-content">
      <p class="title">{{componentData.title}}</p>
      <p class="desc" @click="componentData.descCallBack">{{componentData.desc}}</p>
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
  background: #fff4e3;
  display: flex;
  flex: 1;
  border-radius: 10px;
  .top-border {
    width: 86%;
    height: 74%;
    margin: 34px auto;
    border-radius: 20px;
    border: 2px solid #f7d1ac;
    border-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #eb4928;
    font-size: 80px;
    // font-family: "has_buy";
    font-weight: 700;
    &:before {
      content: "";
      width: 90%;
      height: 80%;
      display: inline-block;
      position: absolute;
      border: 2px solid #f7d1ac;
      border-bottom: 0;
      left: 4.5%;
      top: 10%;
      border-radius: 20px;
    }
  }
}
.dialog-money-content {
  color: #fff;
  letter-spacing: 4px;
  margin: 0 auto;
  text-align: center;

  .title {
    font-size: 55px;
    color: #fffaea;
    margin-top: 120px;
    letter-spacing: 1px;
  }
  .desc {
    margin: 20px 0;
    font-size: 26px;
    color: #fff;
  }
}
</style>
