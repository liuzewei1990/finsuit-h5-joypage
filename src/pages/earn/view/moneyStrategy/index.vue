<template>
  <div id="page" class="money-strategy">
    <img :src="strategyUrl" alt="赚钱攻略" title="赚钱攻略">
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data () {
    return {
      strategyUrl: ""
    }
  },
  computed: {
    ...mapState({
      MARK_MONEY_STRATEGY: state => state.main.MARK_MONEY_STRATEGY
    })
  },
  created () {
    this.strategyUrl = this.$route.query.strategyUrl;
  },
  mounted () {
    this.$bcBridge.updateTitle("赚钱攻略")
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.money-strategy {
  padding: 20px;
  img {
    width: 100%;
  }
}
</style>
