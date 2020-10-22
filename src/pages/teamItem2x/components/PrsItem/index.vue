
<template>
  <div class="prs-producd" ref="prs-producd">

    <div class="item">
      <!-- 角标 -->
      <div class="tip ellipsis" v-show="item.STATUS_DESCRIPT">
        {{item.STATUS_DESCRIPT}}
      </div>

      <!-- 银行名称 -->
      <div class="bank">
        <span class="t1" v-show="item.SUPER_ASSEMBLE_TYPE"><span>{{item.SUPER_ASSEMBLE_TYPE}}</span></span>
        <span>{{item.ORG_NAME}}</span>
        <span v-show="item.SHOW_ORG_FLAG=='1'">·{{item.ORG_DESCRIPT}}</span>
      </div>

      <!-- 标题+产品 -->
      <div class="title">
        {{item.PRD_NAME}}
      </div>

      <!-- 利率+加息 -->
      <RateTemplate :rateData="$handlePrdRate.handleTeamRateAndCouponRate('', item.PRD_RATE, item.STANDARDS_RATE)" :label="item.LABEL_EXTRA_REWARD_DESC" :prdRateText="item.PRD_RATE_NAME"></RateTemplate>

      <!-- 标签 -->
      <div class="tags" v-if="item.LABEL_DESCRIPT_LIST && item.LABEL_DESCRIPT_LIST.length">
        <span v-for="(item,index) in item.LABEL_DESCRIPT_LIST" :key="index">{{item}}</span>
      </div>

    </div>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
import RateTemplate from "./RateTemplate.vue"
import ProgressBar from "./ProgressBar.vue"
import Countdown from "./Countdown.vue"
export default {
  components: { Button, RateTemplate, ProgressBar, Countdown },
  props: {
    item: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      list: [],
      // 当前点击item
      currClickItem: {},
      // 预约按钮文案
      btnText: {
        "PC": "立即预约",
        "BC": "立即预约",
        "PMP": "即将开始"
      }
    }
  },
  mounted () {
  },
  methods: {

    // 点击立即拼团 以及产品区域
    async handleClickItem (item) {

    },

    // 点击立即预约
    handleClickReminBtn (item) {

    },

    // 发起预约
    async openRemindApi (item) {

    },

    // 拼团产品倒计时结束后
    countdownOver () {

    }
  }

}
</script>

<style lang="less" scoped>
.prs-producd {
  position: relative;
  min-height: 438px;
  margin: 0px auto 30px;
  //   background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px 2px rgba(0, 128, 213, 0.17);
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.bank {
  //   border: 1px solid red;
  width: 95%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-top: 80px;
  color: #333333;
  .t1 {
    padding: 3px 10px;
    margin-right: 16px;
    transform: skew(-20deg);
    background: linear-gradient(90deg, #ff9c4c, #ff801a);
    border-radius: 10px 0 10px 0;
    display: inline-block;
    font-size: 24px;
    color: #fff;
    font-weight: 400;
    display: flex;
    align-items: center;
    span {
      transform: skew(20deg);
      display: inline-block;
    }
  }
}

.item {
  position: relative;
  display: flex;
  flex-direction: column;
  //   margin: 10px 0 30px;
}

.title {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  text-align: center;
  font-size: 30px;
  color: #666666;
}

.tags {
  display: flex;
  justify-content: center;
  opacity: 0.8;
  margin: 20px 0;
  span {
    font-size: 22px;
    border: 1.5px solid #ff801a;
    color: #ff801a;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 0 5px;
  }
}

.tip {
  position: absolute;
  left: -65px;
  top: 25px;
  width: 227px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  transform-origin: center center;
  font-size: 24px;
  background: linear-gradient(82deg, #ff811b, #ffb739);
  box-sizing: border-box;
  transform: rotate(-45deg);
}
</style>
