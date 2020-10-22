<template>
  <TaskTemplate :data="taskData" @icon-click="iconClick" @content-click="contentClick">
    <min-button slot="action" v-show="taskData.taskStatus == '0'" @on-click="$checkLogin({action:getTask},false)" :show-loding="false" type="start">领取任务</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '1'" @on-click="$checkLogin({action:goTask},false)" :show-loding="btnLoading" type="await">去认证</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '2'" @on-click="$checkLogin({action:getReward},false)" :show-loding="false" type="success">领取奖励</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '3'" :show-loding="false" type="await">已完成</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '4'" :show-loding="false" type="await">已失效</min-button>
  </TaskTemplate>
</template>

<script>
/**
 * 实名认证任务
 */
export default {
  components: {},
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
    goTask () {
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: this.taskData.taskTitle, ITEM_VALUE1: "去认证" });
      this.$emit("onGoTask", this.taskData);

      // APP实名认证跳原生 接受回调函数
      if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.h5Certify({
          data: {
            ACTION_JSON: this.$Config.actityCode
          },
          success: (v) => {
            // this.taskComplete();
          },
          fail: () => {
            this.$showTips("认证失败,请重试")
          },
        });
      }
      // 小程序实名认证跳H5认证页，认证成功回调地址
      else {
        // let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        // this.$h5RealNameAuth();
        this.$showTips("当前环境暂不支持实名认证任务");
      }
    },

    // 完成任务
    async taskComplete () {
      let params = {
        taskRecordId: this.taskData.flowId,
        taskId: this.taskData.taskId,
        taskType: this.taskData.taskType
      };
      let data = await this.$api.taskComplete(params);
      if (data.status == "0") {
        //  任务完成，按钮改成领取奖励
        this.taskData.taskStatus = 2;
      }
    },

    // 领取奖励
    async getReward () {
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
