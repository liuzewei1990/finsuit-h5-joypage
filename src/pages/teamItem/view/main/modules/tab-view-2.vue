<!-- 其他视图 -->
<template>
  <section class=''>
    <EmptyData class="empty-data" descText='<span style="width:4.3rem;display:inline-block;">不要看了~ 这里什么都没有</span>' text="" :imgUrl="require('../../../assets/images/empty-data.png')" imgStyle="width:4.5rem;height:5rem;margin:0rem auto 1rem;"></EmptyData>
  </section>
</template>

<script>

import EmptyData from "@common/finsuit-components/EmptyData"
export default {
  components: { EmptyData },
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
</style>