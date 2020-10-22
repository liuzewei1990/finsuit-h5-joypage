<template>
  <ModuleBox class="module-rewardInnerDetail" showTitle title="邀请任务奖励" type="blue">
    <div class="container">
      <step :title="stepTitle"></step>
      <inviteTable class="mar-top-40" :taskAwardList="mainData.taskAwardList"></inviteTable>
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@inviteUsers/components/ModuleBox/index.vue"
import step from './step'
import inviteTable from './inviteTable'
import { mapState } from "vuex"

export default {
  components: { step, ModuleBox, inviteTable },
  computed: {
    ...mapState({
      mainData: state => state.main.mainData
    }),
  },
  data () {
    return {
      stepTitle: {
        t1: "成功邀请好友",
        t2: "可获取额外任务奖励",
        t3: "被邀请好友",
        t4: "需满足投资金额和持仓时间",
      }
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
</style>
