<template>
  <section class="top-list-view-1">
    <TopList :list="THIS_MONTH_LIST"></TopList>
  </section>
</template>

<script>
import TopList from "./topListItem.vue";
import { mapState } from "vuex"
export default {
  components: { TopList },
  computed: {
    ...mapState({
      THIS_MONTH_LIST: state => state.main.THIS_MONTH_LIST
    })
  },
  data () {
    return {
      list: [{
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3481",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3482",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3483",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3484",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      }, {
        userHeader: "http://dummyimage.com/84x84",
        userPhone: "134****3485",
        userNums: "100"
      },]
    }
  },
  mounted () {
    console.log("创建1");
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.top-list-view-1 {
  flex: 1;
}
</style>
