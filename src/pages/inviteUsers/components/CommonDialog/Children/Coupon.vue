<template>
  <DialogCommonBox class="dialog-money">
    <div slot="card" class="dialog-money-card">
      <hr v-if="componentData.isCoupon">
      <div class="top-border">
        {{componentData.title}}
      </div>
    </div>
    <div class="dialog-money-content">
      <p class="desc" v-if="componentData.desc">{{componentData.desc}}</p>
      <p class="content" :class="componentData.desc?'':'nodesc'" v-if="componentData.content">{{componentData.content}}</p>
      <p class="contentStatus" v-if="componentData.contentStatus">{{componentData.contentStatus}}</p>
      <p class="contentDesc" v-if="componentData.contentDesc">{{componentData.contentDesc}}</p>
    </div>
  </DialogCommonBox>
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

  }
}
</script>

<style lang="less" scoped>
.dialog-money-card {
  background: #fff4e3;
  display: flex;
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  hr {
    width: 96%;
    height: 8px;
    position: absolute;
    left: 0px;
    top: 0px;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      top: -10px;
      bottom: 0px;
      left: 13px;
      width: 100%;
      height: 20px;
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6) 8px,
        transparent 10px
      );
      background-size: 26px 20px;
    }
  }
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
      height: 100%;
      display: inline-block;
      position: absolute;
      border: 4px solid #f7d1ac;
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
  .contentStatus,
  .contentDesc {
    font-size: 28px;
  }
  .desc {
    margin: 16px 0 40px;
  }
  .nodesc {
    margin-top: 80px;
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
}
</style>
