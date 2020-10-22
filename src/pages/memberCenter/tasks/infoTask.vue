<!-- 完善个人信息任务  -->
<template>
  <TaskTemplate :data="taskData" @icon-click="iconClick" @content-click="contentClick">
    <min-button slot="action" v-show="taskData.taskStatus == '0'" @on-click="$checkLogin({action:getTask},false)" :show-loding="false" type="start">领取任务</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '1'" @on-click="$checkLogin({action:goTask},false)" :show-loding="btnLoading" type="await">去完善</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '2'" @on-click="$checkLogin({action:getReward},false)" :show-loding="false" type="success">领取奖励</min-button>
  </TaskTemplate>
</template>

<script>

/**
 * 任务组件：完善个人信息任务
 * 任务说明：
 * 去完善：初始按键状态为“去完善”，点击跳转个人主页；
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

    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    // 领取任务:派发事件，通知父级领取任务并刷新任务列表
    getTask () {
      this.$emit("onGetTask", this.taskData);
    },

    // 执行任务
    goTask () {

      this.$emit("onGoTask", this.taskData);
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: this.taskData.taskTitle, ITEM_VALUE1: "去完善" });

      if (this.$store.state.APP_FLAG === "BC" && this.$hasVersion("3.3.8")) {
        let schemeUrl = this.$bcBridge.getSchemeUrl({ "LINK_TO": "USER_INFO" });
        this.$openWebview(schemeUrl);
      } else if (this.$store.state.APP_FLAG === "PC" && this.$hasVersion("1.3.8")) {
        let schemeUrl = this.$bcBridge.getSchemeUrl({ "LINK_TO": "USER_INFO" });
        this.$openWebview(schemeUrl);
      } else {
        this.$showTips("当前版本过低，请升级App版本");
      }

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

  },
}
</script>
<style lang='less' scoped>
</style>