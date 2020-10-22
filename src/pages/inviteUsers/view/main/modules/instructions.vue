<template>
  <ModuleBox class="module-rewardInnerDetail" showTitle title="如何获得奖励" type="blue">
    <div class="container" v-html="activityRule">
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@inviteUsers/components/ModuleBox/index.vue"
export default {
  components: { ModuleBox },
  data () {
    return {
      activityRule: ""
    }
  },
  created () {
    this.getRule()
  },
  mounted () {

  },

  methods: {
    async getRule () {
      let data = await this.$api.getData({
        "routeKey": "activityRule-queryRuleByActivityCode"
      });
      this.activityRule = data.data.ruleContent;
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 15px;
}
</style>
