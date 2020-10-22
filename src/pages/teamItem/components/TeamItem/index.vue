<!--
    item：
        {
          // 拼团ID
          ID: item.ID,
          // 拼团产品ID   
          TEAM_PRD_INDEX_ID: item.TEAM_PRD_INDEX_ID,
          // 银行名称
          ORG_NAME: item.ORG_NAME,
          // 产品名称
          PRD_NAME: item.PRD_NAME,

          /**
           * 登录前展示央行基准利率上浮30%，登陆后展示2.7300%或者央行基准利率上浮30%；
           * 加息文案前端默认展示+N%形式，后台可以将该加息手动修改为文字和符号形式，前端则显示后台修改的文字符号样式。
           */
          _rateData: this.$handlePrdRate.handleTeamRateAndCouponRate(item.RATE_TEXT, item.PRD_RATE, item.COUPON_RATE),

          // 产品利率描述
          PRD_RATE_TEXT: item.PRD_RATE_TEXT,

          // 产品标签
          TAGS: this.handleTagsRule(item.SPREAD_TEXT2, [item.ICON_1, item.ICON_2, item.ICON_3]),

          // 产品切角标签
          AWARD_TEXT: item.AWARD_TEXT,

          // 拼团进度 0-100
          TEAM_SCHEDULE: item.TEAM_SCHEDULE || 0,

          // 剩余拼团金额
          COLLAGED_AMOUNT: item.COLLAGED_AMOUNT,

          // 产品标签不带icon
          // SPREAD_TEXT3: item.SPREAD_TEXT3,

          // 拼团状态 1即将开始 2 立即拼团
          START_STATUS: item.START_STATUS,

          // 是否预约 0否 1是
          IS_REMIND: item.IS_REMIND,

          // 倒计时
          countdown: {
            START_STATUS: item.START_STATUS,
            THIS_SYS_TIME: item.THIS_SYS_TIME,
            // 拼团结束时间
            TEAM_END_TIME: item.TEAM_END_TIME,
            // 拼团开始时间
            TEAM_START_TIME: item.TEAM_START_TIME,
            ID: item.ID
          },

          // 银行自有包装页地址
          DEFINE_URL: item.DEFINE_URL
        }
-->
<template>
  <div class="team-producd" ref="team-producd">
    <!-- 银行名称 -->
    <div class="bank">
      <i class="icon">
        <img :src="$transfromAliyunUrl(item.LOGO_URL)" alt="">
      </i>
      <span>{{item.ORG_NAME}}</span>
    </div>

    <div class="item">
      <!-- 角标 -->
      <div class="tip ellipsis" v-show="item.AWARD_TEXT">
        {{item.AWARD_TEXT}}
      </div>

      <!-- 标题+产品 -->
      <div class="title">
        {{item.PRD_NAME}}
      </div>

      <!-- 利率+加息 -->
      <RateTemplate :rateData="$handlePrdRate.handleTeamRateAndCouponRate('',item.PRD_RATE,item.COUPON_RATE)" :prdRateText="item.PRD_RATE_TEXT"></RateTemplate>

      <!-- 标签 -->
      <div class="tags">
        <span v-for="(item,index) in tags" :key="index">{{item}}</span>
      </div>

      <!-- 标签描述 -->
      <div class="tags-desc" v-show="item.MAIN_RECOMMEND_WORD">
        {{item.MAIN_RECOMMEND_WORD}}
      </div>

      <!-- 拼团进度条 -->
      <div class="progress-bar-box">
        <progress-bar v-if="item.START_STATUS == '2'" type="success" :value="item.TEAM_SCHEDULE" :max="100" :haveAcount="true" :acount="item.COLLAGED_AMOUNT"></progress-bar>
      </div>

      <!-- 拼团倒计时 -->
      <div class="progress-bar-box">
        <countdown v-if="item.START_STATUS" :data="countdownData" :changeFn="countdownOver"></countdown>
      </div>

      <!-- btn按钮 -->
      <div class="footer">
        <Button class="btn" :showLoading="false" type="default" :disabled="false" v-if="item.START_STATUS == '2' && item.IS_REMIND == '0'">立即拼团</Button>
        <Button class="btn" :showLoading="false" type="default" :disabled="false" v-if="item.START_STATUS == '1' && item.IS_REMIND == '0'" @click.native.stop="handleClickReminBtn(item)">{{btnText[$store.state.APP_FLAG] || '即将开始'}}</Button>
        <Button class="btn" :showLoading="false" type="default" :disabled="false" v-if="item.START_STATUS == '1' && item.IS_REMIND == '1'">已预约，查看该产品</Button>
        <Button class="btn" :showLoading="false" type="default" :disabled="true" v-if="!item.START_STATUS">拼团已过期</Button>
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
  computed: {
    tags () {
      if (!this.item.LABEL_TEXT1) return [];
      return this.item.LABEL_TEXT1.split(",")
    },
    countdownData () {
      return {
        START_STATUS: this.item.START_STATUS,
        THIS_SYS_TIME: this.item.THIS_SYS_TIME,
        // 拼团结束时间
        TEAM_END_TIME: this.item.TEAM_END_TIME,
        // 拼团开始时间
        TEAM_START_TIME: this.item.TEAM_START_TIME,
      }
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



    // 点击立即预约
    handleClickReminBtn (item) {
      this.$emit("reminBtn", item);
    },

    // 拼团产品倒计时结束后
    countdownOver () {
      this.$emit("countdownOver");
    }
  }

}
</script>

<style lang="less" scoped>
.team-producd {
  //   overflow-y: hidden;
  min-height: 476px;
  position: relative;
  min-height: 500px;
  box-shadow: 0px 2px 12px 2px rgba(0, 128, 213, 0.17);
  background: #fff;
}

.bank {
  width: 95%;
  height: 90px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 30px;
  border-bottom: 1.5px solid #e5e8f0;
  .icon {
    width: 46px;
    height: 46px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.item {
  border-radius: 14px;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 0 30px;
}

.title {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  text-align: center;
  font-size: 30px;
  margin-top: 48px;
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

.tags-desc {
  font-size: 22px;
  color: #999999;
  text-align: center;
}

.progress-bar-box {
  padding: 0px 30px;
}

.footer {
  padding: 20px 28px 41px;
  .btn {
    background: linear-gradient(to bottom right, #4f82ff, #3b6adc);
    color: #fff;
    border-radius: 4px;
    // 不加block载ios 10中文字会不居中
    display: block;
  }
}

.tip {
  position: absolute;
  left: -55px;
  top: 25px;
  width: 227px;
  height: 66px;
  //   background: url("../../../assets/images/tip.png") no-repeat;
  border: 1px solid red;
  background-size: 100% 100%;
  text-align: center;
  transform-origin: center center;
  font-size: 20px;
  //   color: #fff;
  box-sizing: border-box;
  transform: rotate(-45deg);
  padding: 10px 30px 0;
}
</style>
