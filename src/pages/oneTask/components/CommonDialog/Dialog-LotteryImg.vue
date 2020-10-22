<template>
  <div class="dialog-component animation-show" @click="componentData.clickCallback">
    <div class="content">
      <img :src="componentData.lotteryCoverImg" alt="">
    </div>
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

  }
}
</script>

<style lang="less" scoped>
.dialog-component {
  background: #fff;
  width: 560px;
  //   min-height: 650px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      margin: 0 auto;
    }
  }
}
.animation-show {
  animation: bounce-in 0.2s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
