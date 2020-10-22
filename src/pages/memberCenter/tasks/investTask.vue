<template>
  <div>
    <!-- 任务ui模版 -->
    <TaskTemplate :data="taskData" @icon-click="iconClick" @content-click="contentClick">
      <min-button slot="action" v-show="taskData.taskStatus == '0'" @on-click="$checkLogin({action:getTask},false)" :show-loding="btnLoading" type="start">领取任务</min-button>
      <min-button slot="action" v-show="taskData.taskStatus == '1' && taskData.dataset.completedDay == null" @on-click="$checkLogin({action:goTask},false)" :show-loding="btnLoading" type="await">去投资</min-button>
      <min-button slot="action" v-show="taskData.taskStatus == '1' && taskData.dataset.completedDay != null" @on-click="$checkLogin({action:toDetail},false)" :show-loding="btnLoading" type="await">{{taskData.dataset.completedDay}}/{{taskData.dataset.allDay}}天</min-button>
      <min-button slot="action" v-show="taskData.taskStatus == '2'" @on-click="$checkLogin({action:getReward},false)" :show-loding="false" type="success">领取奖励</min-button>
      <min-button slot="action" v-show="taskData.taskStatus == '3'" :show-loding="false" type="await">已完成</min-button>
      <min-button slot="action" v-show="taskData.taskStatus == '4'" :show-loding="false" type="await">已失效</min-button>
    </TaskTemplate>
  </div>
</template>

<script>
/**
 * 投资任务
 */
import { Base64 } from "js-base64";
export default {
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
    // 领取任务:派发事件，通知父级领取任务并刷新任务列表
    getTask () {
      this.$emit("onGetTask", this.taskData);
    },

    // 执行任务
    async goTask () {
      this.$emit("onGoTask", this.taskData);
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: this.taskData.taskTitle, ITEM_VALUE1: "去投资" });

      if (false
        || (this.$store.state.APP_FLAG === "BC" && this.$hasVersion("3.3.9"))
        || (this.$store.state.APP_FLAG === "PC" && this.$hasVersion("1.3.9"))
      ) {
        let prdType = this.$h5Detail.handelPrdType(this.taskData.dataset.prdTypeId, this.taskData.dataset.depositTypeId);
        this.$h5Detail(prdType, {
          ID: this.taskData.dataset.prdIndexId,
          PRD_INDEX_ID: this.taskData.dataset.prdIndexId,
          ORG_ID: this.taskData.dataset.prdOrgId,
          RATE_ID: this.taskData.dataset.rateId,
          MEN_COUPON_ID: "",
          BUY_PARAM_KEY: Base64.encode(JSON.stringify({ activityCode: this.$Config.actityCode, taskId: this.taskData.taskId, flowId: this.taskData.flowId }))
        });
      } else {
        this.$showTips("当前版本过低，请升级App版本");
        // this.$bcBridge.toAppPage({
        //   LINK_TO: "PRD_DETAIL",
        //   PRD_TYPE: this.taskData.dataset.prdTypeId,
        //   PRD_ID: this.taskData.dataset.prdIndexId,
        //   RATEID: this.taskData.dataset.rateId,
        //   COUPON_ID: "",
        //   MEM_COUPON_ID: ""
        // });

      }
    },

    // 查看我的进度
    async toDetail () {
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: this.taskData.taskTitle, ITEM_VALUE1: "查看我的进度" });

      let appParams = {
        // 产品类型id
        PRD_TYPE_ID: this.taskData.dataset.prdTypeId,
        // 存款类型id
        DEPOSIT_TYPE_ID: this.taskData.dataset.depositTypeId
      };
      this.$bcBridge.holdingAssets(appParams);

    },

    // 任务完成领取奖励
    getReward () {
      this.$emit("onGetReward", this.taskData);
    },

    // 点击icon
    iconClick () {
      this.$emit("onIconClick", this.taskData);
    },

    // 点击内容
    contentClick () {
      this.$emit("onContentClick", this.taskData);
    },
  }

}
</script>

<style lang="less" scoped>
</style>
