<!-- 任务列表 -->
<template>
  <section class='task-list-module mar-top-20'>

    <div class="panel-head">
      <p class="title ellipsis">福利任务</p>
      <span class="desc" @click="toUrl">查看历史任务<i class="icon"></i></span>
    </div>

    <div class="panel-body">
      <div class="task-list">
        <ul v-show="!isEmpty">
          <li class="task-item" v-for="(item) in taskList" :key="item.taskId">
            <components :is="item.taskComponent" :taskData="item" @onGetTask="onGetTask" @onGoTask="onGoTask" @onGetReward="onGetReward" @onContentClick="openRule" @onUpdata="onUpdata"></components>
            <!-- <pre>{{item}}</pre> -->
          </li>
        </ul>
      </div>
      <div class="empty-data-box" v-show="isEmpty">
        <EmptyData class="empty-data" imgStyle="width:5.46rem;height:4.61rem;margin:0.5rem auto;" :imgUrl="require('../../../assets/images/is-empty.png')" text="<span style='font-size:0.35rem; color:#999;'>无内容</span>"></EmptyData>
      </div>
      <a href="javascript:void(0);" class="footer-btn" @click="$router.push('/taskRule')">任务规则说明</a>
    </div>
  </section>
</template>

<script>

import EmptyData from "@common/finsuit-components/EmptyData"
import tasks from "../../../tasks" // 所有任务组件
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  components: { ...tasks, EmptyData },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({
      // 导出签到数据
      taskList: state => state.MainData.taskList,
    })
  },
  watch: {
    isLogin () {
      this.renderData();
    }
  },
  data () {
    return {
      isEmpty: false,
      loading: this.$Loading()
    };
  },
  created () {
    this.renderData();
  },
  mounted () {
    this.$bus.$on("pageAppear", () => { this.renderData() });
  },
  activated () {
    this.renderData();
    this.$bus.$on("pageAppear", () => { this.renderData() });
  },
  deactivated () {
    this.$bus.$off("pageAppear");
  },
  //方法集合
  methods: {
    // 获取任务列表 或 更新任务列表
    async renderData () {
      let params = {};
      try {
        let data = await this.$api.getTaskList(params).then(this.$interfaceApi.getTaskList);
        this.$store.commit("SET_TASK_LIST", data || []);
      } catch (error) { }
      this.isEmpty = this.taskList.length === 0;
    },

    onUpdata () {
      this.renderData();
    },

    /**
     * 通用 : 领取任务---任务子组件"领取任务"按钮触发
     */
    async onGetTask (taskData) {
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: taskData.taskTitle, ITEM_VALUE1: "领取任务" });

      if (this.loading.isShow) return;
      this.loading.show();
      try {
        let params = { taskId: taskData.taskId };
        let data = await this.$api.getTask(params);
        taskData.taskStatus = "1";
        // 领取成功 刷新列表
        this.renderData();
      } catch (error) { }
      this.loading.close();
    },

    // 去执行任务---执行逻辑在各个任务子组件中
    onGoTask (taskData) {
    },

    /**
     * 通用 : 领取奖励 ----- 任务子组件“领取奖励”按钮触发
     */
    async onGetReward (taskData) {
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: taskData.taskTitle, ITEM_VALUE1: "领取奖励" });

      if (this.loading.isShow) return;
      this.loading.show();
      try {
        let params = { taskId: taskData.taskId, taskRecordId: taskData.flowId };
        let data = await this.$api.getReward(params);
        // 前端任务状态变为已完成
        taskData.taskStatus = "3";
        this.rewardDialog(data);
      } catch (error) { }
      this.loading.close();
    },

    // 查看历史任务
    toUrl () {
      // 打点
      this.$trackEvents.B000A472({});

      this.$router.push({ path: '/taskHistory' });
    },

    // 领取奖励弹窗 奖励类型，1：红包；2：优惠券；3：积分 4：奖励链接
    rewardDialog (data) {
      // 奖励类型为4：奖励链接
      if (data.awardType == "4") {
        this.$openWebview(data.awardData);
        return;
      }

      // 领取奖励-----弹窗
      let Dialog = this.$CommonDialog({
        componentName: "RewardType",
        hideOnBlur: false,
        defaultcloseBtnVisible: false,
        appendElement: this.$root.$el.querySelector("#page"),
        icon: require("../../../assets/images/reward.png"),
        title: "恭喜！领取成功",
        content: data.awardData,
        btnText: "知道了",
        btnClick: () => {
          Dialog.close();
          // 点击关闭弹窗后，在刷新列表
          this.renderData();
          // 刷新签到接口，获取最新积分
          data.awardType == "3" && this.$parent.getSignData();
        }
      });
    },

    // 查看任务规则弹窗
    openRule (taskData) {
      if (!taskData.taskRule) return;
      this.$CommonDialog({
        componentName: "TaskRule",
        hideOnBlur: false,
        defaultcloseBtnVisible: false,
        appendElement: this.$root.$el.querySelector("#page"),
        icon: this.$transfromAliyunUrl(taskData.taskIcon),
        title: taskData.taskTitle,
        content: taskData.taskRule
      });
    }
  },
}
</script>
<style lang='less' scoped>
.task-list-module {
  background: #fff;
  padding: 32px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  .panel-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .title {
      flex: 1;
      font-size: 36px;
      font-weight: 600;
      color: rgba(48, 49, 51, 1);
    }
    .desc {
      font-size: 24px;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        margin-right: 10px;
        width: 15px;
        height: 15px;
        transform: rotate(-45deg);
        border-bottom: 2px solid #606266;
        border-right: 2px solid #606266;
      }
    }
  }

  .panel-body {
    margin-top: 26px;
    // border: 1px solid red;
    flex: 1;
    display: flex;
    flex-direction: column;
    .task-list {
      flex: 1;
    }

    .empty-data-box {
      height: 600px;
      position: relative;
    }

    .footer-btn {
      background: #fff;
      font-size: 28px;
      font-weight: 400;
      color: rgba(48, 49, 51, 1);
      text-align: center;
      display: block;
      margin-top: 22px;
    }
  }
}
</style>