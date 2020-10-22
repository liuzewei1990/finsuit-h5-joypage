<template>
  <div>
    <!-- 任务ui模版 -->
    <TaskTemplate :data="taskData" @icon-click="openRule" @content-click="openRule">
      <min-button slot="action" v-show="taskData.taskStatus === 'BEGIN'" @on-click="$checkLogin({action:toAuthPage},false)" :show-loding="false" type="start">去认证</min-button>
      <min-button slot="action" v-show="taskData.taskStatus === 'AWAIT'" @on-click="$checkLogin({action:openLottery},false)" :show-loding="btnLoading" type="await">领取奖励</min-button>
      <min-button slot="action" v-show="taskData.taskStatus === 'COMPLETE'" type="success">已完成</min-button>
    </TaskTemplate>
  </div>
</template>

<script>
/**
 * 实名认证任务
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
      // 版本开关 1.0.8 版本的拼财不支持该方法 h5Certify()   (v1 < v2) 
      vFlag: this.$utils.isVersion(this.$Config.PC_V, this.$store.state.VERSION),

      // 按钮loading
      btnLoading: false,
    }
  },

  methods: {
    // 去认证
    toAuthPage () {
      this.$trackEvents.ACB0Q003({ ITEM_VALUE: "去认证", ITEM_VALUE1: this.taskData.taskId });

      // APP实名认证跳原生 接受回调函数
      if ((this.$store.state.APP_FLAG === "PC" && this.vFlag === false) || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.h5Certify({
          success: (v) => { },
          fail: () => { this.$Toast("认证失败,请重试") },
        });
      }

      //  拼财app版本1.0.8版本跳转h5实名认证
      else if (this.$store.state.APP_FLAG === "PC" && this.vFlag === true) {
        // let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        this.$h5RealNameAuth();
      }

      // 小程序实名认证跳H5认证页，认证成功回调地址
      else {
        // let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        this.$h5RealNameAuth();
      }

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
