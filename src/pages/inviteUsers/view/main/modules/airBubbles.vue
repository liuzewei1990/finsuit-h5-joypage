<template>
  <section class="bubblesbox">
    <div class="bubbles">
      <p>分享得红包({{(DAILY_LIMIT_NUMBER_TOTAL - RECEIVE_DAILY_LIMIT_NUMBER) > 0 ? (DAILY_LIMIT_NUMBER_TOTAL - RECEIVE_DAILY_LIMIT_NUMBER) : "0"}}/{{DAILY_LIMIT_NUMBER_TOTAL}})</p>
      <span></span>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
  components: {},
  computed: {
    ...mapState({
      RECEIVE_DAILY_LIMIT_NUMBER: state => state.main.newRootObj.RECEIVE_DAILY_LIMIT_NUMBER, // 已领次数
      DAILY_LIMIT_NUMBER_TOTAL: state => state.main.newRootObj.DAILY_LIMIT_NUMBER_TOTAL // 总数
    })
  },
  created () {
    window.sharedResult = this.sharedResult;
  },
  mounted () {

  },

  methods: {
    ...mapActions(["getNewNumber"]),
    async sharedResult () {
      let params = {
        routeKey: "finsuitSysShareService-getRandomReward",
        CODE: "EARN_RWARD_CODE",
        ACTIVITY_CODE: "EARN"
      }
      let data = await this.$api.getRGET_REWARD(params);
      console.log("获取红包数据->", data);
      let isPmp = this.$store.state.APP_FLAG;
      let contentDes = "";
      if (isPmp == "PMP") {
        contentDes = "请到我的账户中查看";
      } else if (this.$browser.OS == "IOS" && isPmp == "PC") {
        contentDes = "请到我的账户中查看";
      } else {
        contentDes = "请到我的红包查看";
      }
      if (data.data.AMOUNT != 0) {
        let dialogComponent = this.$CommonDialog({
          componentName: "backenvelope",
          appendElement: document.getElementById("page"),
          title: data.data.AMOUNT,
          content: "恭喜获得现金红包",
          contentDesc: contentDes,
          isCoupon: false // 是否为加息券
        })
      }
      this.getNewNumber(data.data.RECEIVE_DAILY_LIMIT_NUMBER);
    }
  }
}
</script>

<style lang="less" scoped>
.bubblesbox {
  .bubbles {
    min-width: 175px;
    height: 54px;
    border-radius: 40px;
    background: #feedd8;
    color: #fb9015;
    font-size: 20px;
    text-align: center;
    line-height: 54px;
    padding: 0 13px;
    position: relative;
    & > span {
      position: absolute;
      left: 28px;
      bottom: -15px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 20px 20px 0 20px;
      border-color: #feedd8 transparent transparent transparent;
    }
  }
}
</style>
