<template>
  <div class="card">
    <div class="cover">
      <img src="https://dummyimage.com/343x130" alt="活动封面">
    </div>

    <h2></h2>
    <p></p>
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
.card {
  padding: 32px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 24px;
  .cover {
    min-height: 260px;
    background: burlywood;
    img {
      max-height: 260px;
      width: 100%;
    }
  }
  h2 {
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(48, 49, 51, 1);
    margin: 24px 0 10px;
  }
  p {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
  }
}
</style>

