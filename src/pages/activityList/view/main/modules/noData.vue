<template>
  <div class="no-data">
    <img src="@activityList/assets/images/noData.png" alt="">
    <slot></slot>
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
.no-data {
  img {
    max-width: 454px;
    max-height: 360px;
    margin: 320px auto 60px;
  }
  p {
    text-align: center;
    font-size: 26px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(163, 167, 173, 1);
  }
}
</style>
