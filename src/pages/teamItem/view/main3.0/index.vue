<!--  -->
<template>
  <section class=''>
    <SetupRightItems></SetupRightItems>
    <Tabview2></Tabview2>
    <ComFooter></ComFooter>
  </section>
</template>

<script>
import SetupRightItems from "./modules/setupRightItems.vue"
import Tabview2 from "./modules/tab-view-2.vue"
import ComFooter from "./modules/com-footer.vue"
export default {
  components: { SetupRightItems, Tabview2, ComFooter },
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