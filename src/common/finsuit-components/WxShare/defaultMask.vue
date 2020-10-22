<!-- 分享遮罩 -->
<template>
  <section class='wx-share-mask' v-show="show" @click="close">
    <div id="wxShare">默认值</div>
  </section>
</template>

<script>


export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    close () {
      this.show = false;
    }
  },
}
</script>
<style lang='less' scoped>
.wx-share-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1111;
}
</style>