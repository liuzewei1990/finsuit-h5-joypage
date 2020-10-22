<template>
  <DialogCommonBox class="dialog-money">
    <div slot="card" class="dialog-money-card">
      <div class="top-border">
        {{componentData.title}}
      </div>
    </div>
    <div class="dialog-money-content">
      <p class="desc">{{componentData.desc}}</p>
      <p class="content">{{componentData.content}}</p>
      <p class="exchange-code">兑换码:&ensp; {{componentData.exchangeCode}}</p>
      <p class="copy-btn" @click="copyCode">复制</p>
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
  },
  created () {
    console.log(this.componentData);
  },
  methods: {
    copyCode () {
      mcopy(this.componentData.exchangeCode)
      this.componentData.copyCallBack();
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-money-card {
  background: #fff4e3;
  display: flex;
  flex: 1;
  border-radius: 20px;
  .top-border {
    width: 85%;
    height: 75%;
    margin: 48px auto;
    border-radius: 20px;
    border: 2px solid #f7d1ac;
    border-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #eb4928;
    font-size: 50px;
    font-weight: 700;
    &:before {
      content: "";
      width: 92%;
      height: 85%;
      display: inline-block;
      position: absolute;
      border: 4px solid #f7d1ac;
      border-bottom: 0;
      left: 3.3%;
      top: 13%;
      border-radius: 20px;
    }
  }
}
.dialog-money-content {
  color: #fff;
  letter-spacing: 4px;
  margin: 0 auto;
  text-align: center;
  .desc,
  .exchange-code,
  .copy-btn {
    font-size: 28px;
  }
  .desc {
    margin: 20px 0 20px;
  }
  .content {
    margin-bottom: 40px;
    font-size: 60px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 700;
    text-shadow: 0px 2px 20px rgba(226, 48, 10, 0.6);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 232, 161, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .copy-btn {
    height: 88px;
    width: 327px;
    background: linear-gradient(
      180deg,
      rgba(255, 215, 102, 1) 0%,
      rgba(255, 179, 18, 1) 100%
    );
    border-radius: 51px;
    text-align: center;
    line-height: 88px;
    color: #884d2b;
    font-size: 32px;
    font-weight: 700;
    margin: 28px auto 0;
  }
}
</style>
