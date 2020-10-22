<template>
  <div>
    <!-- 任务ui模版 -->
    <TaskTemplate :data="taskData" @icon-click="openRule" @content-click="openRule">
      <min-button slot="action" v-show="taskData.taskStatus === 'BEGIN' && taskData.investTaskData.taskPosition === null" @on-click="$checkLogin({action:toPrdDetail},false)" :show-loding="false" type="start">去投资</min-button>
      <min-button slot="action" v-show="taskData.taskStatus === 'BEGIN' && taskData.investTaskData.taskPosition !== null" @on-click="$checkLogin({action:toDetail},false)" :show-loding="false" type="start">{{taskData.investTaskData.taskPosition}}/{{taskData.investTaskData.taskPositionEnd}}天</min-button>
      <min-button slot="action" v-show="taskData.taskStatus === 'AWAIT'" @on-click="$checkLogin({action:openLottery},false)" :show-loding="btnLoading" type="await">领取奖励</min-button>
      <min-button slot="action" v-show="taskData.taskStatus === 'COMPLETE'" type="success">已完成</min-button>
    </TaskTemplate>
  </div>
</template>

<script>
/**
 * 投资任务
 */
import TaskTemplate from "../../../../components/TaskTemplate"
import MinButton from "../../../../components/MinButton"
export default {
  components: { TaskTemplate, MinButton },
  props: {
    taskData: () => {
      return {}
    }
  },

  data () {
    return {
      // 按钮loading
      btnLoading: false,
    }
  },

  methods: {
    // 去投资
    toPrdDetail () {
      this.$trackEvents.ACB0Q003({ ITEM_VALUE: "去投资", ITEM_VALUE1: this.taskData.taskId });
      let prdId = this.taskData.investTaskData.prdId;
      this.$h5PrdDetail(prdId, "alone");
    },

    // 规则
    openRule () {
      this.$CommonDialog({
        componentName: "DialogRule",
        defaultcloseBtnVisible: false,
        appendElement: this.$root.$el.querySelector("#page"),
        icon: this.$transfromAliyunUrl(this.taskData.taskIcon),
        title: this.taskData.taskTitle,
        content: this.taskData.taskRule
      });
      this.$trackEvents.ACB0Q002({ ITEM_VALUE: this.taskData.taskTitle });
    },

    // 查看我的进度
    async toDetail () {
      this.$trackEvents.ACB0Q003({ ITEM_VALUE: "查看进度", ITEM_VALUE1: this.taskData.taskId, ITEM_VALUE2: this.taskData.investTaskData.taskPosition });
      let PC_V = (this.$store.state.APP_FLAG === "PC") && this.$utils.isVersion(this.$store.state.VERSION, "1.2.4");
      let BC_V = (this.$store.state.APP_FLAG === "BC") && this.$utils.isVersion(this.$store.state.VERSION, "3.2.4");
      if (PC_V || BC_V) {
        let params = { INVEST_ID: this.taskData.investTaskData.prdId };
        let data = await this.$api.getHoldingAssets(params);
        let appParams = {
          // 产品类型id
          PRD_TYPE_ID: data.prdTypeId,
          // 存款类型id
          DEPOSIT_TYPE_ID: data.depositTypeId,
          // 投资记录id
          ID: data.buyHistoryId
        };
        this.$bcBridge.holdingAssets(appParams);
      } else {
        this.$Toast("App版本过低，请打开资产-持有中查看");
      }
    },


    // 领取奖励
    async openLottery () {
      this.btnLoading = true;
      try {
        await this.$commonGetRewardApi({
          taskId: this.taskData.taskId,
          taskRewardType: this.taskData.taskRewardType,
          taskRewardImg: this.$transfromAliyunUrl(this.taskData.taskRewardImg),
          taskRewardLink: this.taskData.taskRewardLink,
          updateList: () => { this.$emit("on-update") }
        });
      } catch (error) {
        console.error(error);
      }
      this.btnLoading = false;
      this.$trackEvents.ACB0Q003({ ITEM_VALUE: "领取奖励", ITEM_VALUE1: this.taskData.taskId });
    }
  }

}
</script>

<style lang="less" scoped>
</style>
