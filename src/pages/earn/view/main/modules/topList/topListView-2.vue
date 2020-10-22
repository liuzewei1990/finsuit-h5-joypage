<template>
  <section class="top-list-view-2">
    <TopList :list="LAST_MONTH_LIST"></TopList>
  </section>
</template>

<script>
import TopList from "./topListItem.vue";
import { mapState } from "vuex"
export default {
  components: { TopList },
  computed: {
    ...mapState({
      LAST_MONTH_LIST: state => state.main.LAST_MONTH_LIST
    })
  },
  data () {
    return {
      list: [
        {
          userHeader: "http://dummyimage.com/84x84",
          userPhone: "134****3485",
          userNums: "100"
        }
      ]
    }
  },

  mounted () {

    console.log("创建2");
  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
.top-list-view-2 {
}
</style>
