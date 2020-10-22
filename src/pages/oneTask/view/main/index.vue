<template>
  <div id="page" class="home">
    <!-- 轮播图模块 -->
    <Banner></Banner>
    <!-- 任务列表 -->
    <TaskList></TaskList>

  </div>
</template>

<script>
import Banner from "./modules/banner.vue"
import TaskList from "./modules/taskList/index.vue"
export default {
  components: { Banner, TaskList },
  mounted () {
    setTimeout(() => {
      this.$trackEvents.ACB0Q001();
    }, 2000);
  }
}
</script>

<style lang="less" scoped>
.home {
  min-height: 100vh;
  padding: 20px 32px 42px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
