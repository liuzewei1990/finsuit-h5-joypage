<!--  -->
<template>
  <section class='main'>
    <List class="list"></List>
    <ComFooter></ComFooter>
  </section>
</template>

<script>
import List from "./modules/list.vue"
import ComFooter from "./modules/com-footer.vue"
export default {
  components: { List, ComFooter },
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
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;

  .list {
    flex: 1;
  }
}
</style>