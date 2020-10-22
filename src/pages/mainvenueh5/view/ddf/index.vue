<template>
  <div class="box">
    <img class="a" :src="$assets.mainddfgl_a">
    <img class="b" :src="$assets.mainddfgl_b">
    <img class="c" :src="$assets.mainddfgl_c">
    <img class="d" :src="$assets.mainddfgl_d">
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
    background: #FEC255;
  }
  img{
    width: 100%;
    height: auto;
  }
  .a{
    height: 766px;
  }
  .b{
    height: 1640px;
    margin-top: -2px;
  }
  .c{
    height: 1510px;
  }
  .d{
    height: 1390px;
  }
</style>
