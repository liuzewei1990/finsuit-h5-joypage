<template>
  <div id="skeleton">
    <div class="p-card" v-for="n in 5">
      <p class="p-title com-bg"></p>
      <div class="p-describe">
        <div class="p-l">
          <p class="com-bg"></p>
          <p class="com-bg"></p>
        </div>
        <div class="p-r">
          <p class="com-bg"></p>
          <p class="com-bg"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    dataList: Array
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
.p-card {
  padding: 34px 10px 14px 0;
  min-height: 200px;
  border-bottom: 1px solid #e8eaed;
  .p-title {
    width: 500px;
    height: 0.4rem;
  }
  .p-describe {
    display: flex;
    .p-l {
      border-right: 1px solid #e8eaed;
      margin-top: 28px;
      width: 250px;
      margin-right: 50px;
      p:first-of-type {
        width: 200px;
        height: 0.8rem;
        margin-top: 20px;
      }
      p:last-of-type {
        width: 200px;
        height: 0.4rem;
        margin-top: 10px;
      }
    }
    .p-r {
      margin-top: 28px;
      p:first-of-type {
        width: 100px;
        height: 0.4rem;
        margin-top: 40px;
      }
      p:last-of-type {
        width: 250px;
        height: 0.4rem;
        margin-top: 20px;
      }
    }
  }
}

#skeleton {
  padding: 32px;
  box-sizing: border-box;
  background: #fff;
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
