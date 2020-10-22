<template>
  <div class="page">
    <div class="left">
      <p class="lp1 lpflag">&emsp;</p>
      <p class="lp2">&emsp;</p>
      <p class="lp3">&emsp;</p>
      <p class="lp4 lpflag">&emsp;</p>
      <p class="lp5">&emsp;</p>
    </div>
    <div class="right">
      <p>{{title.t1}}</p>
      <p>{{title.t2}}</p>
      <p>&emsp;</p>
      <p>{{title.t3}}</p>
      <p>{{title.t4}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: Object
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
.page {
  display: flex;
  padding-left: 10px;
}
.left {
  p {
    height: 38px;
    width: 28px;
  }
  .lpflag {
    &::before {
      content: "1";
      width: 36px;
      height: 36px;
      text-align: center;
      color: #fff;
      line-height: 36px;
      border-radius: 50%;
      position: absolute;
      margin-left: -18px;
      background: linear-gradient(180deg, #bdf679 0%, #3ccf20 100%);
    }
  }
  .lp2 {
    border-left: 2px solid #4bd830;
  }
  .lp3 {
    border-left: 2px solid #4bd830;
  }
  .lp4 {
    &::before {
      content: "2";
    }
  }
}
.right {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #303133;
}
</style>
