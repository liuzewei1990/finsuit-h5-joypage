<template>
  <div class="box">
    <img class="a" :src="$assets.mainxsfljs_a" alt="">
    <img class="b" :src="$assets.mainxsfljs_b" alt="">
    <img class="c" :src="$assets.mainxsfljs_c" alt="">
    <img class="d" :src="$assets.mainxsfljs_d" alt="">
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
    background: #F0F2F4;
  }
  img{
    width: 100%;
    height: auto;
  }
  .a{
    height: 424px;
  }
  .b{
    height: 798px;
  }
  .c{
    height: 908px;
  }
  .d{
    height: 724px;
  }

</style>
