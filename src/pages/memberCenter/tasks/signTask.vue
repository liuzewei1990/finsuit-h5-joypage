<!-- 签到任务  -->
<template>
  <TaskTemplate :data="taskData" @icon-click="iconClick" @content-click="contentClick">
    <min-button slot="action" v-show="taskData.taskStatus == '0'" :show-loding="false" type="start" @on-click="$checkLogin({action:getTask},false)">领取任务</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '1'" :show-loding="false" type="await">{{taskData.dataset.completedDay}}/{{taskData.dataset.allDay}}天</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '2'" :show-loding="false" type="success" @on-click="$checkLogin({action:getReward},false)">领取奖励</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '3'" :show-loding="false" type="await">已完成</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '4'" :show-loding="false" type="await">已失效</min-button>
  </TaskTemplate>
</template>

<script>
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