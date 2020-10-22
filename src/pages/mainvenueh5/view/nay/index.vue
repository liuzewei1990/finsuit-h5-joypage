<template>
  <div class="box">
    <img class="a" :src="$assets.mainptjs_a">
    <img class="b" :src="$assets.mainptjs_b">
  </div>
</template>
<script>
  export default {
    name: '',
    props: [],
    data() {
      return {}
    },
    methods: {},
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
  }
</script>
<style lang="less" scoped>
  .box{
    background: #FE6134;
  }
  img{
    width: 100%;
    height: auto;
  }
  .a{
    height: 1526px;
  }
  .b{
    height: 1154px;
  }
</style>
