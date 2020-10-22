<template>
  <div id="page" class="home">
    <!-- 签到模块 -->
    <SignIn class="sign-in-module" ref="SignIn" />
    <!-- 精选活动 -->
    <ActityList class="activity-list-module" v-if="isLoad" />
    <!-- 任务列表 -->
    <TaskList class="task-list-module" ref="TaskList" v-if="isLoad" />
    <!-- 分享组件 -->
    <SharePopup ref="SharePopup" />
  </div>
</template>

<script>
import SignIn from "./modules/signIn.vue"
import SharePopup from "@common/finsuit-components/SharePopup/index.3.0.vue"
const ActityList = () => import(/* webpackChunkName: "module-actityList" */ "./modules/actityList.vue");
const TaskList = () => import(/* webpackChunkName: "module-taskList" */ "./modules/taskList.vue");

export default {
  components: { SignIn, ActityList, TaskList, SharePopup },
  provide () {
    return {
      openShare: this.openShare
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  created () {
    this.init();
  },
  mounted () {
    //  打点
    this.$trackEvents.B000A467();
  },
  activated () {
    // 当完善个人信息任务完成后，这里要更新签到数据，更新头像及名称
    this.$bus.$on("pageAppear", () => { this.getSignData() });
  },
  deactivated () {
    this.$bus.$off("pageAppear");
  },
  methods: {
    // init入口
    async init () {
      let promise = [];
      promise.push(this.getSignData());
      promise.push(this.getLevelData());
      await Promise.all(promise);

      // 自动签到
      this.autoSign();
    },

    // 获取签到信息
    async getSignData () {
      let params = {};
      let data = await this.$api.getSignData(params).then(this.$interfaceApi.getSignData);
      this.$store.commit("SET_SIGN_DATA", data);
    },

    // 开始签到
    async autoSign () {
      try {
        await this.$refs["SignIn"].sign();
      } catch (error) {

      }
      this.isLoad = true;
    },

    // 获取会员等级信息
    async getLevelData () {
      let params = {
        memberId: this.$store.state.ID
      };
      let data = await this.$api.getUserLevelInfo(params);
      this.$store.commit("SET_LEVEL_DATA", data);
    },

    // 打开分享
    openShare (shareJson, callBack = () => { }) {
      this.$refs.SharePopup.open(shareJson, callBack);
    },
  }
}
</script>

<style lang="less" scoped>
.home {
  min-height: 100vh;
  //   background: #fff;

  display: flex;
  flex-direction: column;

  .task-list-module {
    flex: 1;
  }
}
</style>
