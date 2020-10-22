<!-- tab-view-item -->
<template>
  <section class='tab-view-item'>
    <slot></slot>
  </section>
</template>

<script>

export default {
  mounted () {

    this.$nextTick(() => {
      this.$parent.rerender()
    })
  },
  beforeDestroy () {
    //   注释掉是因为tab-view-item组件销毁后无需重新rerender，否则会报错
    // const $parent = this.$parent
    // this.$nextTick(() => {
    //   $parent.rerender()
    // })
  }
}
</script>
<style lang='less' scoped>
.tab-view-item {
  //   display: inline-block;
  float: left;
  height: 100%;
  width: 100%;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
</style>