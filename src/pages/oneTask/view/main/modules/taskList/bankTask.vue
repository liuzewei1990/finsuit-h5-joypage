<template>
  <div>
    <!-- 任务ui模版 -->
    <TaskTemplate :data="taskData" @icon-click="openRule" @content-click="openRule">
      <min-button slot="action" v-show="taskData.taskStatus == 'BEGIN'" @on-click="$checkLogin({action:openApiBank},false)" :show-loding="btnLoading" type="start">去开户</min-button>
      <min-button slot="action" v-show="taskData.taskStatus == 'AWAIT'" @on-click="$checkLogin({action:openLottery},false)" :show-loding="btnLoading" type="await">领取奖励</min-button>
      <min-button slot="action" v-show="taskData.taskStatus == 'COMPLETE'" type="success">已完成</min-button>
    </TaskTemplate>
  </div>
</template>

<script>
/**
 * 银行开户任务
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
    // 去开户
    async openApiBank () {
      this.$trackEvents.ACB0Q003({ ITEM_VALUE: "去开户", ITEM_VALUE1: this.taskData.taskId });
      // 判断是进行存量用户活体验证
      this.btnLoading = true;
      try {
        if (await this.isFaceDiscern()) {
          let params = { ORG_ID: this.taskData.bankTaskData.orgId };
          let data = await this.$api.getOpenBankAccountInfo(params);
          let appParams = {};
          appParams["ORG_ID"] = this.taskData.bankTaskData.orgId;
          appParams["ORG_NAME"] = data.orgName;
          appParams["LOGO_URL"] = data.logoUrl;
          appParams["BANK_DOCK_TYPE"] = data.bankDockType;
          appParams["SKIP_PAGE_INFO"] = data.skipPageInfo;
          appParams["BANK_TIPS_PAGE"] = "1";
          this.$bcBridge.openBankAccount(appParams);
        }
      } catch (error) {
        console.error(error);
      }
      this.btnLoading = false;
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
    },

    // 查询是否已经完成活体检测，去完成,只针对存量用户
    async isFaceDiscern () {
      let params = {};
      let data = await this.$api.getFaceDiscernStatus(params);

      let PC_V = (this.$store.state.APP_FLAG === "PC") && this.$utils.isVersion(this.$store.state.VERSION, "1.2.2");
      let BC_V = (this.$store.state.APP_FLAG === "BC") && this.$utils.isVersion(this.$store.state.VERSION, "3.2.2");

      if ((PC_V || BC_V) && (data.AUTH_STATUS == "0" || data.AUTH_STATUS == "4") && data.AUTH_DETECTION == "0") {
        let name = data.ID_NAME;
        let IDCardNo = data.ID_NUMBER;
        this.$finsuitConfirm({
          title: "提示",
          text: "为了保护您的资产和交易安全，进行本操作前请进行人脸认证",
          cancelText: "取消",
          okText: "去认证",
          remindDuration: 650,
          appendChildDom: this.$root.$el.querySelector("#page")
        }).then(res => {
          let params = { name, IDCardNo };
          this.$bcBridge.faceDiscern(params, res => {
            console.log("faceDiscernResult:", res);
          });
        }).catch(res => { })
        return false;
      }

      return true;
    },
  }

}
</script>

<style lang="less" scoped>
</style>
