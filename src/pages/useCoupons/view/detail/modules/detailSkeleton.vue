<template>
  <div class="detailSke">
    <div class="card com-bg"></div>
    <!-- 奖励规则 -->
    <div class="d-rule com-bg"></div>
    <!-- 使用说明 -->
    <div class="d-describe">
      <h2 class="com-bg"></h2>
      <p class="com-bg"></p>
      <p class="com-bg"></p>
      <p class="com-bg"></p>
    </div>
  </div>
</template>

<script>
export default {
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
.detailSke {
  .card {
    height: 400px;
  }
  .d-rule {
    height: 290px;
    margin-top: 50px;
  }
  .d-describe {
    margin-top: 50px;
    h2 {
      width: 200px;
      height: 0.6rem;
    }
    p {
      margin-top: 50px;
      width: 600px;
      height: 0.4rem;
    }
  }
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
</style>
