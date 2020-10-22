<template>
  <TaskTemplate :data="taskData" @icon-click="iconClick" @content-click="contentClick">
    <min-button slot="action" v-show="taskData.taskStatus == '0'" @on-click="$checkLogin({action:getTask},false)" :show-loding="btnLoading" type="start">领取任务</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '1'" @on-click="$checkLogin({action:goTask},false)" :show-loding="btnLoading" type="await">去开户</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '2'" @on-click="$checkLogin({action:getReward},false)" :show-loding="false" type="success">领取奖励</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '3'" :show-loding="false" type="await">已完成</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '4'" :show-loding="false" type="await">已失效</min-button>
  </TaskTemplate>
</template>

<script>
/**
 * 银行开户任务
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
  mounted () {
    this.$bus.$on("pageAppear", () => {
      this.$bus.$emit("pageAppear:openBankAccount");
    })
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
      this.$trackEvents.B000A473({ ITEM_VALUE: this.taskData.taskTitle, ITEM_VALUE1: "去开户" });
      // 判断是进行存量用户活体验证
      this.btnLoading = true;
      try {
        if (await this.isFaceDiscern()) {
          let params = { ORG_ID: this.taskData.dataset.orgId };
          let data = await this.$api.getOpenBankAccountInfo(params);
          let appParams = {};
          appParams["ORG_ID"] = this.taskData.dataset.orgId;
          appParams["ORG_NAME"] = data.ORG_NAME;
          appParams["LOGO_URL"] = data.LOGO_URL;
          appParams["BANK_DOCK_TYPE"] = data.BANK_DOCK_TYPE;
          appParams["SKIP_PAGE_INFO"] = data.SKIP_PAGE_INFO;
          appParams["BANK_TIPS_PAGE"] = "1";
          appParams["ACTION_JSON"] = this.$Config.actityCode;
          this.$bcBridge.openBankAccount(appParams);
          //  页面返回
          //   this.$bus.$off("pageAppear:openBankAccount").$once("pageAppear:openBankAccount", () => {
          //     console.log("银行开户：pageAppear");
          //     this.taskComplete();
          //   })
        }
      } catch (error) {
        console.error(error);
      }
      this.btnLoading = false;
    },

    // 完成任务
    async taskComplete () {
      let params = {
        taskRecordId: this.taskData.flowId,
        taskId: this.taskData.taskId,
        taskType: this.taskData.taskType,
        orgId: this.taskData.dataset.orgId
      };
      let data = await this.$api.taskComplete(params);
      if (data.status == "0") {
        //  任务完成，按钮改成领取奖励
        this.taskData.taskStatus = 2;
      }
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
