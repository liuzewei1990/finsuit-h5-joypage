<template>
  <div id="skeleton">
    <div class='ske-list' v-for="n in 4" :key="n">
      <div class="box common-box com-bg"></div>
      <h2 class="h2 common-h2 com-bg"></h2>
      <p class="des conmmon-des com-bg"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
#skeleton {
  padding: 32px;
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow: hidden;
  .ske-list {
    margin-bottom: 24px;
    background: #fff;
  }
  .box {
    min-height: 260px;
  }
  .h2 {
    margin: 24px 0 10px;
    width: 200px;
    height: 0.4rem;
  }
  .des {
    width: 100%;
    height: 0.4rem;
  }
  .com-bg {
    background-image: linear-gradient(
      90deg,
      #f2f2f2 25%,
      #e6e6e6 37%,
      #f2f2f2 63%
    );
    list-style: none;
    background-size: 400% 100%;
    background-position: 100% 50%;
    animation: skeleton-loading 1.4s ease infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>

