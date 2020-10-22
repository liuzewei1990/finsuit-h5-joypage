<!-- 分享任务  -->
<template>
  <TaskTemplate :data="taskData" @icon-click="iconClick" @content-click="contentClick">
    <min-button slot="action" v-show="taskData.taskStatus == '0'" :show-loding="false" type="start" @on-click="$checkLogin({action:getTask},false)">领取任务</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '1'" :show-loding="btnLoading" type="await" @on-click="$checkLogin({action:goTask},false)">去分享</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '2'" :show-loding="false" type="success" @on-click="$checkLogin({action:getReward},false)">领取奖励</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '3'" :show-loding="false" type="await">已完成</min-button>
    <min-button slot="action" v-show="taskData.taskStatus == '4'" :show-loding="false" type="await">已失效</min-button>
  </TaskTemplate>
</template>

<script>

/**
 * 任务组件：分享任务
 * 任务说明：
 * 
 */

export default {
  components: {},
  inject: ["openShare"],
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
    async goTask () {
      this.$emit("onGoTask", this.taskData);
      // 打点
      this.$trackEvents.B000A473({ ITEM_VALUE: this.taskData.taskTitle, ITEM_VALUE1: "去分享" });

      if (typeof this.openShare !== "function") {
        this.$showTips("请在父组件provide注入openShare方法");
        return;
      }

      if (this.taskData.dataset.shareContent === "3") {
        this.openShare(await this.getShareConfig("BC"), this.shareSuccess);

      } else if (this.taskData.dataset.shareContent === "4") {
        this.openShare(await this.getShareConfig("PC"), this.shareSuccess);

      } else if (this.taskData.dataset.shareContent === "5") {
        this.openShare(await this.getShareConfig("PMP"), this.shareSuccess);

      } else {
        this.$showTips("目前只支持分享拼财下载落地页、比财下载落地页、拼财小程序");
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

    // 分享成功回调
    shareSuccess () {
      this.taskComplete();
      this.$showTips("分享成功，快去领取奖励吧~");
      //   this.$emit("onUpdata");
    },

    // 完成分享任务
    async taskComplete () {
      let params = {
        taskRecordId: this.taskData.flowId,
        taskId: this.taskData.taskId,
        taskType: this.taskData.taskType
      };
      let data = await this.$api.taskComplete(params);
      if (data.status == "0") {
        //  任务完成，按钮改成领取奖励
        // this.taskData.taskStatus = 2;
        this.$emit("onUpdata");
      }
    },

    // 根据分享内容获取分享配置  分享内容： 1：产品 2：资讯 3：比财 4：拼财 5：小程序
    async getShareConfig (APP_FLAG = "BC") {

      if (APP_FLAG === "BC") {
        return [
          {
            // 分享方式 0:图片   1:链接  2: 小程序
            SHARE_TYPE: "1",
            // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
            SHARE_PLACE: "0",
            // 分享图标（目前APP不支持自定义分享图标）
            SHARE_HEAD_IMG: "",
            // 分享标题
            SHARE_TITLE: "银行理财,比财直达",
            // 分享描述
            SHARE_DESC: "比财-银行理财产品第三方比价平台",
            // 分享链接
            SHARE_URL: "https://finsuit.bicai365.com/activity/downloadApp/index.html?FROM_APP_FLAG=BC",
            // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
            SHARE_IMAGE: ""
          },
          {
            // 分享方式 0:图片   1:链接  2: 小程序
            SHARE_TYPE: "1",
            // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
            SHARE_PLACE: "1",
            // 分享图标（目前APP不支持自定义分享图标）
            SHARE_HEAD_IMG: "",
            // 分享标题
            SHARE_TITLE: "银行理财,比财直达",
            // 分享描述
            SHARE_DESC: "比财-银行理财产品第三方比价平台",
            // 分享链接
            SHARE_URL: "https://finsuit.bicai365.com/activity/downloadApp/index.html?FROM_APP_FLAG=BC",
            // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
            SHARE_IMAGE: ""
          }
        ]
      } else if (APP_FLAG === "PC") {
        return [
          {
            // 分享方式 0:图片   1:链接  2: 小程序
            SHARE_TYPE: "1",
            // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
            SHARE_PLACE: "0",
            // 分享图标（目前APP不支持自定义分享图标）
            SHARE_HEAD_IMG: "",
            // 分享标题
            SHARE_TITLE: "银行理财,拼财直达",
            // 分享描述
            SHARE_DESC: "拼财-银行理财产品第三方拼团平台",
            // 分享链接
            SHARE_URL: "https://finsuit.bicai365.com/activity/downloadApp/index.html?FROM_APP_FLAG=PC",
            // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
            SHARE_IMAGE: ""
          },
          {
            // 分享方式 0:图片   1:链接  2: 小程序
            SHARE_TYPE: "1",
            // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
            SHARE_PLACE: "1",
            // 分享图标（目前APP不支持自定义分享图标）
            SHARE_HEAD_IMG: "",
            // 分享标题
            SHARE_TITLE: "银行理财,拼财直达",
            // 分享描述
            SHARE_DESC: "拼财-银行理财产品第三方拼团平台",
            // 分享链接
            SHARE_URL: "https://finsuit.bicai365.com/activity/downloadApp/index.html?FROM_APP_FLAG=PC",
            // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
            SHARE_IMAGE: ""
          }
        ]
      } else if (APP_FLAG === "PMP") {
        let SHARE_IMAGE = await this.$utils.toBase64(require("../assets/images/pmp-share.png"));
        return [
          {
            // 分享方式 0:图片   1:链接  2: 小程序
            SHARE_TYPE: "2",
            // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
            SHARE_PLACE: "0",
            // 分享图标（目前APP不支持自定义分享图标）
            SHARE_HEAD_IMG: "",
            // 分享标题
            SHARE_TITLE: "银行理财,拼财直达",
            // 分享描述
            SHARE_DESC: "",
            // 分享链接
            SHARE_URL: "",
            // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
            SHARE_IMAGE: SHARE_IMAGE
          }
        ]
      }
    }

  },
}
</script>
<style lang='less' scoped>
</style>