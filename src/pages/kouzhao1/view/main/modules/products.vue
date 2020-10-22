<!-- 产品模块 -->
<template>
  <section class="module-products">
    <!-- 标题 -->
    <div class="title"></div>
    <!-- 描述文案 -->
    <p class="sub-title">{{investInfo}}</p>

    <!-- 产品列表 -->
    <PrdItem v-for="(item,index) in prdList" :key="index" :item="item" @click.native="$checkLogin({action:toBuy,data:item},false)"></PrdItem>

    <!-- 用户参与状态 -->
    <CardStatus :status="userStatus.memberInvestStatus" :userStatus="userStatus"></CardStatus>
    <!-- 今日口罩抢购已结束，明日再来 -->
    <SellingEmpty v-if="isSell == '0' && userStatus.memberInvestStatus == '5'"></SellingEmpty>

  </section>
</template>

<script>
const dialogConfig = {
  // dialog子组件
  componentName: "Tip",
  // 是否点击蒙层关闭
  hideOnBlur: false,
  // 是否显示默认底部关闭按钮
  defaultcloseBtnVisible: false,
  // 是否动画效果
  animation: true,
  // 是否显示右上角关闭按钮
  closeVisible: true,
}
import { mapState, mapActions, mapGetters } from "vuex"

import PrdItem from "../../../components/PrdItem"
import CardStatus from "./cardStatus"
import SellingEmpty from "../../../components/SellingEmpty"
export default {
  components: { PrdItem, CardStatus, SellingEmpty },
  data () {
    return {
      loading: this.$Loading()
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({
      // 产品列表
      prdList: state => state.MainData.prdList,
      // 说明文案
      investInfo: state => state.MainData.investInfo,
      // 用户是否新手 1-新手 0-不是新手
      memberNoviceStatus: state => state.MainData.memberNoviceStatus,
      /**
       * userStatus 当前用户参与情况信息
       * userStatus.memberInvestStatus 用户参与状态 0：奖励失效 1：持仓中 2：等待发货 3：已发货 4：已参与，未填写地址 5：未参与
       */
      userStatus: state => state.MainData.userStatus,
      // 口罩是否售罄 1-未售罄 0-售罄
      isSell: state => state.MainConfig.isSell,
    }),
  },
  created () {
  },
  mounted () {

  },

  methods: {
    // 点击立即购买及产品区域
    async toBuy (item) {
      // 打点
      this.$trackEvents.ACB0Y003({ ITEM_VALUE: item.prdIndexId, ITEM_VALUE1: item.investId });

      if (this.checkUserActivityStatus() && this.checkNewUser()) {
        if (this.loading.isShow) return;
        this.loading.show();
        try {
          let params = {};
          let data = await this.$api.checkTime(params);
          // data.popUp = 44;
          // data.popUp ========>  0:小于十分钟 1：大于十分钟 2：口罩售罄
          if (data.popUp == 0) {
            this.nextBuyTip1(item);
          } else if (data.popUp == 1) {
            this.nextBuyTip2(item);
          } else if (data.popUp == 2) {
            this.checkIsSell();
          } else {
            this.$Toast("对不起，购买人数较多，请稍候再试");
          }
        } catch (error) {
          console.error(error);
        }
        this.loading.close();
      }
    },

    /**
     * 继续购买
     */
    nextBuyTip1 (item) {
      let dialog = this.$CommonDialog({
        ...dialogConfig,
        // 默认append到body中
        appendElement: document.getElementById("page"),
        title: "提示",
        desc: "当前口罩数量有限，建议您尽快下单完成购买，否则口罩有缺货风险",
        btnText: "继续购买",
        btnClick: () => {
          // 打点
          this.$trackEvents.ACB0Y004({ ITEM_VALUE: item.prdIndexId, ITEM_VALUE1: item.investId });
          dialog.close();
          this.$h5PrdDetail(item.investId, "alone");
        }
      });
    },

    /**
     * 继续购买
     */
    nextBuyTip2 (item) {
      let dialog = this.$CommonDialog({
        ...dialogConfig,
        // 默认append到body中
        appendElement: document.getElementById("page"),
        title: "提示",
        desc: "特殊时期口罩数量有限，根据我们的大数据计算，建议您再半小时内完成购买否则口罩有抢光风险哦",
        btnText: "继续购买",
        btnClick: () => {
          // 打点
          this.$trackEvents.ACB0Y004({ ITEM_VALUE: item.prdIndexId, ITEM_VALUE1: item.investId });
          dialog.close();
          this.$h5PrdDetail(item.investId, "alone");
        }
      });
    },

    /**
     * 您已参与本活动哦
     */
    checkUserActivityStatus () {
      // 还未参加活动
      if (this.userStatus.memberInvestStatus == 5) return true;
      // 已参加活动 还未填写地址
      if (this.userStatus.memberInvestStatus == 4) {
        let dialog = this.$CommonDialog({
          ...dialogConfig,
          // 默认append到body中
          appendElement: document.getElementById("page"),
          title: "您已参与本活动哦",
          desc: "请在购买后5天内填写地址，防止奖励失效哦",
          btnText: "去填写地址等待发货吧",
          btnClick: () => {
            // 打点
            this.$trackEvents.ACB0Y011();
            dialog.close();
            this.toAddress();
          }
        });
      } else {
        let dialog = this.$CommonDialog({
          ...dialogConfig,
          // 默认append到body中
          appendElement: document.getElementById("page"),
          title: "您已参与本活动哦",
          desc: "",
          btnText: "我知道了",
          btnClick: () => {
            dialog.close();
          }
        });
      }
    },

    /**
     * 检查口罩是否售罄
     */
    checkIsSell () {
      let dialog = this.$CommonDialog({
        ...dialogConfig,
        // 默认append到body中
        appendElement: document.getElementById("page"),
        title: "提示",
        desc: "很抱歉口罩已抢光，明天早点来吧",
        btnText: "我知道了",
        btnClick: () => {
          dialog.close();
        }
      });
    },

    /**
     * 检查是否是新用户
     */
    checkNewUser () {
      if (this.memberNoviceStatus == 1) return true;
      let dialog = this.$CommonDialog({
        ...dialogConfig,
        // 默认append到body中
        appendElement: document.getElementById("page"),
        title: "您不是新用户哦",
        desc: "不能领取此奖品",
        btnText: "去看看其他活动",
        btnClick: () => {
          // 打点
          this.$trackEvents.ACB0Y010();
          dialog.close();
          this.toxkt();
        }
      });
    },

    /**
     * 跳转到零花钱页面
     */
    toxkt () {
      let url = this.$Config.xktHost;
      url += `#/activityCenter`;
      url += `?APP_FLAG=${this.$store.state.APP_FLAG}`;
      url += `&hideRightShare=`;
      this.$bcBridge.openWebview(url);
    },

    /**
     * 跳转到地址填写
     */
    toAddress () {
      let url = this.$Config.kouzhaoHost;
      url += `#/address`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
    },
  }
};
</script>
<style lang='less' scoped>
.module-products {
  width: 673px;
  min-height: 412px;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  margin: 0 auto;
  box-shadow: 15px 15px 0px #ffc600;
  position: relative;
  left: -7.5px;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 50px;
  .title {
    width: 480px;
    height: 94px;
    margin: 0 auto;
    background: url(../../../assets/images/9.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 50px;
  }

  .sub-title {
    margin: 30px 0;
    text-align: center;
    font-size: 28px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(96, 96, 96, 1);
    line-height: 30px;
  }
}
</style>