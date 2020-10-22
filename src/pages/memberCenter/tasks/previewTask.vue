<!-- 浏览任务  -->
<template>
  <TaskTemplate :data="taskData" @icon-click="iconClick" @content-click="contentClick">
    <min-button slot="action" v-show="taskData.taskStatus == '0'" @on-click="$checkLogin({action:getTask},false)" :show-loding="false" type="start">领取任务</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '1'" @on-click="$checkLogin({action:goTask},false)" :show-loding="btnLoading" type="await">去浏览</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '2'" @on-click="$checkLogin({action:getReward},false)" :show-loding="false" type="success">领取奖励</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '3'" :show-loding="false" type="await">已完成</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '4'" :show-loding="false" type="await">已失效</min-button>
  </TaskTemplate>
</template>

<script>

/**
 * 任务组件：浏览任务
 * 任务说明：
 * 
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
      if (!this.taskData.dataset.clickurl) {
        this.$showTips("无效的浏览对象地址");
        return;
      }

      this.$emit("onGoTask", this.taskData);
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: this.taskData.taskTitle, ITEM_VALUE1: "去浏览" });

      this.$openWebview(this.taskData.dataset.clickurl);

      //   if (this.$store.state.APP_FLAG === "BC" && this.$hasVersion("3.3.6")) {
      //     this.$openWebview(this.taskData.dataset.clickurl);
      //   } else if (this.$store.state.APP_FLAG === "PC" && this.$hasVersion("1.3.6")) {
      //     this.$openWebview(this.taskData.dataset.clickurl);
      //   } else {
      //     this.$showTips("当前版本过低，请升级App版本");
      //   }

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