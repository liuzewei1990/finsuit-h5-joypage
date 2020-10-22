<template>
  <ModuleBox class="module-rewardInnerDetail" showTitle title="如何获得奖励" type="blue">
    <div class="container" v-if="mainData.noviceReward">
      <step :title="stepTitle"></step>
      <ruler></ruler>
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@inviteUsers/components/ModuleBox/index.vue"
import step from './step'
import ruler from "./ruler"

import { mapState } from "vuex"
export default {
  components: { ModuleBox, step, ruler },
  computed: {
    ...mapState({
      mainData: state => state.main.mainData
    }),
    stepTitle () {
      return {
        t1: "分享活动给好友",
        t2: `好友可得${this.mainData.noviceReward}元新手红包`,
        t3: "好友完成首笔投资",
        t4: `最高可得好友投资额${this.mainData.rebateProportion}的${this.mainData.inviteRewardType == 1 ? '现金红包' : '积分'}`,
      }
    }

  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {
  },

  methods: {
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
