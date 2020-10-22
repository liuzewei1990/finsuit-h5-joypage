<template>
  <div>
    <!-- 任务ui模版 -->
    <TaskTemplate :data="taskData" :btnStatusText="btnStatusText" @btn-click="btnClick" @icon-click="iconClick" @content-click="contentClick">
      <!-- <min-button slot="action" @on-click="$checkLogin({action:openApiBank},false)" :show-loding="false" type="start">去开户</min-button> -->
      <!-- <min-button slot="action" @on-click="$checkLogin({action:openLottery},false)" :show-loding="false" type="await">领取奖励</min-button> -->
      <min-button slot="action" @on-click="$checkLogin({action:openLottery},false)" :show-loding="false" type="success">已完成</min-button>
    </TaskTemplate>
  </div>
</template>

<script>
/**
 * 分享任务
 */
import TaskTemplate from "../../../../components/TaskTemplate"
import MinButton from "../../../../components/MinButton"
export default {
  components: { TaskTemplate, MinButton },
  props: {
    taskData: () => {
      return {}
    }
  },

  data () {
    return {

    }
  },


  methods: {
    btnClick () {
      this.openLottery();
    },

    iconClick () {
      this.openRule();
    },

    contentClick () {
      this.openRule();
    },

    // 规则
    openRule () {
      this.$CommonDialog({
        componentName: "DialogRule",
        defaultcloseBtnVisible: false,
        appendElement: this.$root.$el.querySelector("#page"),
        icon: this.$transfromAliyunUrl(this.taskData.taskIcon),
        title: this.data.taskTitle,
        content: this.data.taskRule
      })
    },

    // 领取奖励
    openLottery () {
      let CommonDialog = this.$CommonDialog({
        componentName: "DialogLottery",
        defaultcloseBtnVisible: false,
        appendElement: this.$root.$el.querySelector("#page"),
        title: '<p>恭喜获得现金红包<span style="color:#FF8E31;">5元</span></p>',
        desc: "已发放至钱包",
        content: require("../../../../assets/images/jb.png"),
        btnText: "我知道了",
        btnCallback: () => {
          CommonDialog.close();
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
</style>
