<template>
  <div class="main">
    <Main></Main>
    <ActivityList v-show="isShowActivityList" class="mar-top-20"></ActivityList>
  </div>
</template>

<script>
import Main from "./modules/main.vue"
import ActivityList from "./modules/activityList.vue"
export default {
  components: { Main, ActivityList },
  data () {
    return {
      isShowActivityList: false
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #fff;
}
</style>
