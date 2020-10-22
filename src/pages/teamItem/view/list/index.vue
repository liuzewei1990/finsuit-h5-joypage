<!--  -->
<template>
  <section class='list-page'>
    <!-- 顶部预留位置 -->
    <div id="headerContainer"></div>

    <!-- 时间轴列表 -->
    <TimerList :key="dataKey" v-model="currentTabviewIndex"></TimerList>

  </section>
</template>

<script>

import bus from "@common/finsuit-h5/libs/bus.js"
import { mapState, mapActions, mapGetters } from "vuex"
import TimerList from "./modules/TimerList.vue"
export default {
  components: { TimerList },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({
      // 拼团产品数据
      teamData: state => state.MainData.teamData
    })
  },
  watch: {
    isLogin () {
      this.getTeamList();
    }
  },
  data () {
    return {
      dataKey: 1,
      currentTabviewIndex: 0,
      loading: this.$Loading({ className: "list-page-loading", iconClass: "list-page-loading-1", isColumn: true, message: "正在加载" })
    };
  },
  created () {
    this.init()
  },
  mounted () {
    //  监听app返回事件 刷新必要的数据
    bus.$on("pageAppear", () => {
      this.getTeamList();
    });

    // 全局登陆过期时触发
    bus.$once("TOKEN_EXPIRE", () => {
      this.$Toast("登录过期，请重新登录");
    })
  },
  //方法集合
  methods: {
    async init () {
      let promise = [];
      promise.push(this.getTeamList());

      if (this.loading.isShow) return;
      this.loading.show(false, 0);
      try {
        await Promise.all(promise);
      } catch (error) {
        console.error(error);
      }
      this.loading.close();

      this.initCurrentTabviewIndex();
    },

    // 获取拼团列表
    async getTeamList () {
      let data = await this.$api.getTeamDateList({ DEVICE_ID: this.$store.state.DEVICE_ID });

      this.$store.commit("SET_TEAM_LIST_DATA", data);
      // 刷新组件
      this.refreshTimerListComponent();
    },

    // 初始化TimerList索引位置
    initCurrentTabviewIndex () {
      let index = this.teamData.findIndex(item => item.STATUS == 3);
      index = index === -1 ? 0 : index;
      this.currentTabviewIndex = index;
    },

    // 刷新时间轴列表组件
    refreshTimerListComponent () {
      this.dataKey++;
    }

  },
}
</script>
<style lang='less' scoped>
.list-page {
  font-family: PingFangSC-Regular, PingFang SC;
}
</style>