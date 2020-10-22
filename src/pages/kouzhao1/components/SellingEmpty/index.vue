<!-- 口罩售罄 -->
<template>
  <section class='card-status'>
    <div class="selling-empty">
      <a class="btn" href="javascript:void(0);">今日口罩抢购已结束，明日再来</a>
    </div>
  </section>
</template>

<script>

export default {
  components: {},
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {

  },
}
</script>
<style lang='less' scoped>
.selling-empty {
  margin: 50px 0 20px;
  box-sizing: border-box;
  .btn {
    display: block;
    margin: 0 auto;
    width: 607px;
    height: 86px;
    background: #a4a4a4;
    border-radius: 10px;

    font-size: 33px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 86px;
    text-align: center;
  }
}
</style>