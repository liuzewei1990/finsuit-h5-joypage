<!--  -->
<template>
  <section class=''>
    <h2 class="mar-top-30">跳转活动</h2>
    <aaa>@一库</aaa><br>
    <Button type="primary" v-for="(item,val) in this.$activityUrls" :key="val" @click.native="toUrl(item)">{{val}}</Button>
  </section>
</template>

<script>
import Button from "@common/finsuit-components/Button"
import Vue from "vue"


export default {
  components: { Button },
  data () {
    return {

    };
  },
  created () {
    console.log(this.$activityUrls);
  },

  //方法集合
  methods: {
    toUrl (url) {
      window.location.href = url;
    }

  },
}
</script>
<style lang='less' scoped>
</style>