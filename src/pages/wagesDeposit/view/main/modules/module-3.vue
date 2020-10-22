<template>
  <div class="pad-30">
    <h2>common包公共store信息</h2>
    <pre>{{$store.state}}</pre>
    <h2>common包工具方法</h2>
    <p v-for="(item,index) in $utils" :key="index">this.$utils.{{index}}()</p>
    <h2>common包挂载原型方法</h2>
    <p v-for="(item,key) in __proto__.__proto__" :key="key" v-show="key.indexOf('$') === 0">this.{{key}}()</p>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
export default {
  components: { Button },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
