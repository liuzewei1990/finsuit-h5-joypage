<template>
  <div class="ske">
    <div class="cash com-bg" v-for="n in 5">
      <div class="cash-top">
        <div class="top-left">
          <h2></h2>
          <span></span>
        </div>
        <div class="top-right">
        </div>
      </div>
      <div class="cash-bottom">
      </div>
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
.ske {
  padding: 26px 32px;
  box-sizing: border-box;
}
.cash {
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 24px;
  min-height: 260px;
  padding: 34px 0 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f5f7fa;
    position: absolute;
    bottom: 70px;
    left: -15px;
  }
  &::after {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f5f7fa;
    position: absolute;
    bottom: 70px;
    right: -15px;
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
