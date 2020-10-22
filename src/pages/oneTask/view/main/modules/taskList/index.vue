<template>
  <div class="task-list">
    <empty-data v-show="isEmptyData" text='<p style="color:#999999;">暂时没有任务可以去完成哦</p>'></empty-data>
    <components v-for="(item,index) in taskList" :taskData="item" :key="index" :is="useComponent[item.taskType]" @on-update="renderData"></components>
  </div>
</template>

<script>
import AuthTask from "./authTask.vue"
import BankTask from "./bankTask.vue"
import InvestTask from "./investTask.vue"
import ShareTask from "./shareTask.vue"
import EmptyData from "@common/finsuit-components/EmptyData"
import bus from "@common/finsuit-h5/libs/bus.js"
export default {
  components: { AuthTask, BankTask, InvestTask, ShareTask, EmptyData },
  data () {
    return {
      // 任务是否为空
      isEmptyData: false,
      // 任务列表
      taskList: [],
      // 任务列表组件映射
      useComponent: {
        AuthTask: "AuthTask",
        BankTask: "BankTask",
        InvestTask: "InvestTask",
        ShareTask: "ShareTask"
      }
    }
  },
  created () {
    this.renderData();
  },

  mounted () {
    bus.$on("pageAppear", this.renderData);
  },

  methods: {
    async renderData () {
      try {
        let params = {};
        let data = await this.$api.getTaskList(params);
        this.taskList = data;
        if (this.taskList.length === 0) this.isEmptyData = true;
        else this.isEmptyData = false;
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.task-list {
  position: relative;
  flex: 1;
}
</style>
